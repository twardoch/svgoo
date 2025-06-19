// this_file: src/config.rs

//! Configuration management for svgoo

use crate::error::{Result, SvgooError};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::path::Path;

/// Main configuration structure that mirrors svgo's configuration format
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Config {
    /// Whether to make the output pretty (formatted)
    #[serde(default)]
    pub pretty: bool,

    /// Precision for numeric values
    #[serde(default = "default_precision")]
    pub precision: u32,

    /// Plugin configurations
    #[serde(default)]
    pub plugins: Vec<PluginConfig>,

    /// Additional options
    #[serde(flatten)]
    pub options: HashMap<String, serde_json::Value>,
}

/// Configuration for individual plugins
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PluginConfig {
    /// Plugin name
    pub name: String,

    /// Whether the plugin is enabled
    #[serde(default = "default_true")]
    pub enabled: bool,

    /// Plugin-specific parameters
    #[serde(default)]
    pub params: HashMap<String, serde_json::Value>,
}

fn default_precision() -> u32 {
    5
}

fn default_true() -> bool {
    true
}

impl Default for Config {
    fn default() -> Self {
        Self {
            pretty: false,
            precision: default_precision(),
            plugins: Self::default_plugins(),
            options: HashMap::new(),
        }
    }
}

impl Config {
    /// Create a new configuration with default svgo plugins
    pub fn new() -> Self {
        Self::default()
    }

    /// Load configuration from a file
    pub fn load_from_file<P: AsRef<Path>>(path: P) -> Result<Self> {
        let content = fs::read_to_string(path)?;

        // Try to parse as JSON first, then as JS module (simplified)
        if let Ok(config) = serde_json::from_str::<Config>(&content) {
            Ok(config)
        } else {
            // TODO: Implement proper JS module parsing later
            Err(SvgooError::config_error(
                "Configuration file must be valid JSON for now",
            ))
        }
    }

    /// Save configuration to a file
    pub fn save_to_file<P: AsRef<Path>>(&self, path: P) -> Result<()> {
        let content = serde_json::to_string_pretty(self)?;
        fs::write(path, content)?;
        Ok(())
    }

    /// Set pretty printing option
    pub fn set_pretty(&mut self, pretty: bool) {
        self.pretty = pretty;
    }

    /// Set numeric precision
    pub fn set_precision(&mut self, precision: u32) {
        self.precision = precision;
    }

    /// Enable a plugin by name
    pub fn enable_plugin(&mut self, plugin_name: &str) {
        if let Some(plugin) = self.plugins.iter_mut().find(|p| p.name == plugin_name) {
            plugin.enabled = true;
        } else {
            self.plugins.push(PluginConfig {
                name: plugin_name.to_string(),
                enabled: true,
                params: HashMap::new(),
            });
        }
    }

    /// Disable a plugin by name
    pub fn disable_plugin(&mut self, plugin_name: &str) {
        if let Some(plugin) = self.plugins.iter_mut().find(|p| p.name == plugin_name) {
            plugin.enabled = false;
        }
    }

    /// Get default plugin configuration matching svgo's preset-default
    fn default_plugins() -> Vec<PluginConfig> {
        vec![PluginConfig {
            name: "preset-default".to_string(),
            enabled: true,
            params: HashMap::new(),
        }]
    }

    /// Convert to JavaScript configuration object for embedding
    pub fn to_js_config(&self) -> Result<String> {
        let json = serde_json::to_string(self)?;
        Ok(json)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_config() {
        let config = Config::default();
        assert_eq!(config.pretty, false);
        assert_eq!(config.precision, 5);
        assert_eq!(config.plugins.len(), 1);
        assert_eq!(config.plugins[0].name, "preset-default");
    }

    #[test]
    fn test_plugin_management() {
        let mut config = Config::default();

        config.enable_plugin("removeComments");
        assert_eq!(config.plugins.len(), 2);

        config.disable_plugin("preset-default");
        assert_eq!(config.plugins[0].enabled, false);
    }

    #[test]
    fn test_serialization() {
        let config = Config::default();
        let json = config.to_js_config().unwrap();
        assert!(json.contains("preset-default"));
    }
}
