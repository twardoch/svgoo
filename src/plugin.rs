// this_file: src/plugin.rs

//! Plugin system for svgoo
//! 
//! This module implements the plugin architecture that bridges Rust and JavaScript
//! plugins, maintaining compatibility with svgo's plugin system.

use crate::ast::{PluginInfo, PluginParams, PluginResult, Visitor, XastNode};
use crate::core::SvgooRuntime;
use crate::error::SvgooError;
use rquickjs::{Ctx, Object, Value};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

/// Plugin metadata
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PluginMeta {
    pub name: String,
    pub description: String,
}

/// Plugin trait that all plugins must implement
pub trait Plugin: Send + Sync {
    /// Get plugin metadata
    fn meta(&self) -> &PluginMeta;

    /// Execute the plugin and return a visitor
    fn execute(
        &self,
        root: &XastNode,
        params: &PluginParams,
        info: &PluginInfo,
    ) -> PluginResult;
}

/// Built-in Rust plugin implementation
pub struct RustPlugin {
    meta: PluginMeta,
    execute_fn: Box<dyn Fn(&XastNode, &PluginParams, &PluginInfo) -> PluginResult + Send + Sync>,
}

impl Plugin for RustPlugin {
    fn meta(&self) -> &PluginMeta {
        &self.meta
    }

    fn execute(
        &self,
        root: &XastNode,
        params: &PluginParams,
        info: &PluginInfo,
    ) -> PluginResult {
        (self.execute_fn)(root, params, info)
    }
}

/// JavaScript plugin that runs in QuickJS
pub struct JsPlugin {
    meta: PluginMeta,
    runtime: SvgooRuntime,
}

impl JsPlugin {
    /// Create a new JavaScript plugin
    pub async fn new(name: String, runtime: SvgooRuntime) -> Result<Self, SvgooError> {
        // Get plugin metadata from JavaScript
        let meta = runtime.with_context(|ctx| {
            ctx.with(|ctx| -> Result<PluginMeta, SvgooError> {
                let global = ctx.globals()?;
                let svgoo: Object<'_> = global.get("svgoo")?;
                let get_plugin_fn: rquickjs::Function<'_> = svgoo.get("getPlugin")?;
                let plugin_obj: Object<'_> = get_plugin_fn.call((name.clone(),))?;
                
                let description: String = plugin_obj.get("description")
                    .unwrap_or_else(|_| "No description".to_string());
                
                Ok(PluginMeta {
                    name: name.clone(),
                    description,
                })
            })
        }).await?;

        Ok(Self { meta, runtime })
    }

    /// Convert Rust AST to JavaScript object
    fn ast_to_js<'js>(&self, ctx: Ctx<'js>, node: &XastNode) -> Result<Value<'js>, SvgooError> {
        let json_str = serde_json::to_string(node)?;
        let eval_str = format!("JSON.parse('{}')", json_str.replace('\'', "\\'"));
        let parsed: Value<'js> = ctx.eval(eval_str)?;
        Ok(parsed)
    }

    /// Convert JavaScript visitor to Rust visitor
    fn js_visitor_to_rust(&self, _js_visitor: Object<'_>) -> Result<Option<Visitor>, SvgooError> {
        // This is a simplified version - in practice we'd need to handle callbacks
        // through the QuickJS runtime
        Ok(Some(Visitor::default()))
    }
}

impl Plugin for JsPlugin {
    fn meta(&self) -> &PluginMeta {
        &self.meta
    }

    fn execute(
        &self,
        root: &XastNode,
        params: &PluginParams,
        info: &PluginInfo,
    ) -> PluginResult {
        // Execute plugin in JavaScript context
        let result = futures::executor::block_on(self.runtime.with_context(|ctx| {
            ctx.with(|ctx| -> Result<Option<Visitor>, SvgooError> {
                // Get the plugin function
                let global = ctx.globals()?;
                let svgoo: Object<'_> = global.get("svgoo")?;
                let execute_plugin_fn: rquickjs::Function<'_> = svgoo.get("executePlugin")?;
                
                // Convert parameters
                let js_root = self.ast_to_js(ctx.clone(), root)?;
                let js_params = ctx.eval(&serde_json::to_string(params)?)?;
                let js_info = ctx.eval(&serde_json::to_string(info)?)?;
                
                // Execute plugin
                let result: Value = execute_plugin_fn.call((
                    self.meta.name.clone(),
                    js_root,
                    js_params,
                    js_info,
                ))?;
                
                // Convert result back to Rust visitor
                if result.is_null() || result.is_undefined() {
                    Ok(None)
                } else {
                    let visitor_obj: Object<'_> = result.try_into()?;
                    self.js_visitor_to_rust(visitor_obj)
                }
            })
        }));

        match result {
            Ok(visitor) => Ok(visitor),
            Err(e) => Err(e.to_string()),
        }
    }
}

/// Plugin configuration
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum PluginConfig {
    /// Just the plugin name (use default params)
    Name(String),
    /// Plugin with configuration
    Config {
        name: String,
        #[serde(default)]
        params: PluginParams,
    },
}

impl PluginConfig {
    /// Get the plugin name
    pub fn name(&self) -> &str {
        match self {
            PluginConfig::Name(name) => name,
            PluginConfig::Config { name, .. } => name,
        }
    }

    /// Get the plugin parameters
    pub fn params(&self) -> PluginParams {
        match self {
            PluginConfig::Name(_) => serde_json::Value::Object(serde_json::Map::new()),
            PluginConfig::Config { params, .. } => params.clone(),
        }
    }
}

/// Plugin registry that manages all available plugins
pub struct PluginRegistry {
    plugins: HashMap<String, Box<dyn Plugin>>,
}

impl PluginRegistry {
    /// Create a new plugin registry
    pub fn new() -> Self {
        Self {
            plugins: HashMap::new(),
        }
    }

    /// Register a plugin
    pub fn register(&mut self, plugin: Box<dyn Plugin>) {
        let name = plugin.meta().name.clone();
        self.plugins.insert(name, plugin);
    }

    /// Get a plugin by name
    pub fn get(&self, name: &str) -> Option<&dyn Plugin> {
        self.plugins.get(name).map(|p| p.as_ref())
    }

    /// Get all plugin names
    pub fn plugin_names(&self) -> Vec<&str> {
        self.plugins.keys().map(|s| s.as_str()).collect()
    }

    /// Load built-in svgo plugins from JavaScript
    pub async fn load_builtin_plugins(&mut self, runtime: SvgooRuntime) -> Result<(), SvgooError> {
        // Get list of built-in plugins from JavaScript
        let plugin_names = runtime.with_context(|ctx| {
            ctx.with(|ctx| -> Result<Vec<String>, SvgooError> {
                let global = ctx.globals()?;
                let svgoo: Object<'_> = global.get("svgoo")?;
                let get_plugin_names_fn: rquickjs::Function<'_> = svgoo.get("getPluginNames")?;
                let names: Vec<String> = get_plugin_names_fn.call(())?;
                Ok(names)
            })
        }).await?;

        // Load each plugin
        for name in plugin_names {
            let plugin = JsPlugin::new(name, runtime.clone()).await?;
            self.register(Box::new(plugin));
        }

        Ok(())
    }
}

impl Default for PluginRegistry {
    fn default() -> Self {
        Self::new()
    }
}

/// Execute plugins on an AST
pub fn invoke_plugins(
    root: &mut XastNode,
    plugins: &[PluginConfig],
    registry: &PluginRegistry,
    info: &PluginInfo,
    overrides: &PluginParams,
) -> Result<(), SvgooError> {
    for plugin_config in plugins {
        let plugin_name = plugin_config.name();
        let plugin = registry.get(plugin_name)
            .ok_or_else(|| SvgooError::plugin_error(plugin_name, "Plugin not found"))?;

        // Merge parameters
        let mut params = plugin_config.params();
        if let (serde_json::Value::Object(mut params_obj), serde_json::Value::Object(overrides_obj)) = 
            (params, overrides.clone()) {
            for (key, value) in overrides_obj {
                params_obj.insert(key, value);
            }
            params = serde_json::Value::Object(params_obj);
        }

        // Execute plugin
        match plugin.execute(root, &params, info)? {
            Some(visitor) => {
                crate::ast::visit(root, &visitor);
            }
            None => {
                // Plugin returned no visitor, skip
            }
        }
    }

    Ok(())
}

/// Create the default plugin preset
pub fn create_default_preset() -> Vec<PluginConfig> {
    vec![
        PluginConfig::Name("removeDoctype".to_string()),
        PluginConfig::Name("removeXMLProcInst".to_string()),
        PluginConfig::Name("removeComments".to_string()),
        PluginConfig::Name("removeMetadata".to_string()),
        PluginConfig::Name("removeEditorsNSData".to_string()),
        PluginConfig::Name("cleanupAttrs".to_string()),
        PluginConfig::Name("mergeStyles".to_string()),
        PluginConfig::Name("inlineStyles".to_string()),
        PluginConfig::Name("minifyStyles".to_string()),
        PluginConfig::Name("cleanupIds".to_string()),
        PluginConfig::Name("removeUselessDefs".to_string()),
        PluginConfig::Name("cleanupNumericValues".to_string()),
        PluginConfig::Name("convertColors".to_string()),
        PluginConfig::Name("removeUnknownsAndDefaults".to_string()),
        PluginConfig::Name("removeNonInheritableGroupAttrs".to_string()),
        PluginConfig::Name("removeUselessStrokeAndFill".to_string()),
        PluginConfig::Name("removeViewBox".to_string()),
        PluginConfig::Name("cleanupEnableBackground".to_string()),
        PluginConfig::Name("removeHiddenElems".to_string()),
        PluginConfig::Name("removeEmptyText".to_string()),
        PluginConfig::Name("convertShapeToPath".to_string()),
        PluginConfig::Name("convertEllipseToCircle".to_string()),
        PluginConfig::Name("moveElemsAttrsToGroup".to_string()),
        PluginConfig::Name("moveGroupAttrsToElems".to_string()),
        PluginConfig::Name("collapseGroups".to_string()),
        PluginConfig::Name("convertPathData".to_string()),
        PluginConfig::Name("convertTransform".to_string()),
        PluginConfig::Name("removeEmptyAttrs".to_string()),
        PluginConfig::Name("removeEmptyContainers".to_string()),
        PluginConfig::Name("mergePaths".to_string()),
        PluginConfig::Name("removeUnusedNS".to_string()),
        PluginConfig::Name("sortDefsChildren".to_string()),
        PluginConfig::Name("removeTitle".to_string()),
        PluginConfig::Name("removeDesc".to_string()),
    ]
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_plugin_config() {
        let config1 = PluginConfig::Name("test".to_string());
        assert_eq!(config1.name(), "test");
        assert_eq!(config1.params(), serde_json::Value::Object(serde_json::Map::new()));

        let config2 = PluginConfig::Config {
            name: "test2".to_string(),
            params: serde_json::json!({ "foo": "bar" }),
        };
        assert_eq!(config2.name(), "test2");
        assert_eq!(config2.params(), serde_json::json!({ "foo": "bar" }));
    }

    #[test]
    fn test_plugin_registry() {
        let mut registry = PluginRegistry::new();
        assert_eq!(registry.plugin_names().len(), 0);

        // Add a test plugin
        let plugin = RustPlugin {
            meta: PluginMeta {
                name: "test".to_string(),
                description: "Test plugin".to_string(),
            },
            execute_fn: Box::new(|_, _, _| Ok(None)),
        };
        registry.register(Box::new(plugin));

        assert_eq!(registry.plugin_names().len(), 1);
        assert!(registry.get("test").is_some());
        assert!(registry.get("nonexistent").is_none());
    }
}