// this_file: src/core.rs

//! Core JavaScript runtime management for svgoo

use crate::error::{Result, SvgooError};
use rquickjs::{AsyncContext, AsyncRuntime};

/// JavaScript runtime manager for SVG optimization
pub struct SvgooRuntime {
    runtime: AsyncRuntime,
}

/// Context manager for SVG optimization operations
pub struct SvgooContext {
    context: AsyncContext,
}

impl SvgooRuntime {
    /// Create a new SVG optimization runtime
    pub async fn new() -> Result<Self> {
        let runtime = AsyncRuntime::new().map_err(|e| {
            SvgooError::javascript_error(format!("Failed to create runtime: {}", e))
        })?;

        Ok(Self { runtime })
    }

    /// Create a new context for SVG operations
    pub async fn create_context(&self) -> Result<SvgooContext> {
        let context = AsyncContext::full(&self.runtime).await.map_err(|e| {
            SvgooError::javascript_error(format!("Failed to create context: {}", e))
        })?;

        Ok(SvgooContext { context })
    }
}

impl SvgooContext {
    /// Initialize the embedded svgo JavaScript code
    pub async fn initialize_svgo(&self) -> Result<()> {
        self.context
            .with(|ctx| {
                // Improved implementation with basic SVG processing
                // This provides actual optimization capabilities while we work on full svgo integration
                let code = r#"
                globalThis.svgo = {
                    VERSION: "4.0.0-svgoo",
                    
                    optimize: function(svgString, config) {
                        config = config || {};
                        
                        // Basic SVG optimizations
                        let optimized = svgString;
                        
                        // Remove comments
                        optimized = optimized.replace(/<!--[\s\S]*?-->/g, '');
                        
                        // Remove unnecessary whitespace between tags
                        optimized = optimized.replace(/>\s+</g, '><');
                        
                        // Trim leading/trailing whitespace
                        optimized = optimized.trim();
                        
                        // Remove empty attributes
                        optimized = optimized.replace(/\s+\w+=""\s*/g, ' ');
                        
                        // Normalize multiple spaces
                        optimized = optimized.replace(/\s+/g, ' ');
                        
                        // Extract dimensions if possible
                        const widthMatch = optimized.match(/width="([^"]*?)"/);
                        const heightMatch = optimized.match(/height="([^"]*?)"/);
                        
                        return {
                            data: optimized,
                            info: {
                                width: widthMatch ? widthMatch[1] : undefined,
                                height: heightMatch ? heightMatch[1] : undefined
                            }
                        };
                    },
                    
                    getPlugins: function() {
                        return [
                            { name: 'removeComments', description: 'Remove HTML comments' },
                            { name: 'removeEmptyAttrs', description: 'Remove empty attributes' },
                            { name: 'collapseWhitespace', description: 'Collapse whitespace' }
                        ];
                    },
                    
                    validateSvg: function(input) {
                        if (typeof input !== 'string') return false;
                        const trimmed = input.trim();
                        return trimmed.includes('<svg') || trimmed.includes('<?xml');
                    }
                };
            "#;

                ctx.eval::<(), _>(code).map_err(|e| {
                    SvgooError::javascript_error(format!("Failed to initialize svgo: {}", e))
                })
            })
            .await
    }

    /// Optimize an SVG string using the embedded svgo
    pub async fn optimize_svg(&self, svg_content: &str, config_json: &str) -> Result<String> {
        self.context
            .with(|ctx| {
                // Prepare the JavaScript call
                let js_code = format!(
                    r#"
                    (function() {{
                        const svgString = `{}`;
                        const config = {};
                        const result = globalThis.svgo.optimize(svgString, config);
                        return result.data;
                    }})()
                "#,
                    svg_content.replace("`", "\\`"),
                    config_json
                );

                ctx.eval::<String, _>(js_code).map_err(|e| {
                    SvgooError::javascript_error(format!("SVG optimization failed: {}", e))
                })
            })
            .await
    }

    /// Execute JavaScript code and return a Promise
    pub async fn eval_async<T>(&self, code: &str) -> Result<T>
    where
        T: for<'js> rquickjs::FromJs<'js> + 'static,
    {
        self.context
            .with(|ctx| {
                ctx.eval::<T, _>(code).map_err(|e| {
                    SvgooError::javascript_error(format!("JavaScript evaluation failed: {}", e))
                })
            })
            .await
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use tokio;

    #[tokio::test]
    async fn test_runtime_creation() {
        let runtime = SvgooRuntime::new().await;
        assert!(runtime.is_ok());
    }

    #[tokio::test]
    async fn test_context_creation() {
        let runtime = SvgooRuntime::new().await.unwrap();
        let context = runtime.create_context().await;
        assert!(context.is_ok());
    }

    #[tokio::test]
    async fn test_svgo_initialization() {
        let runtime = SvgooRuntime::new().await.unwrap();
        let context = runtime.create_context().await.unwrap();
        let result = context.initialize_svgo().await;
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_basic_optimization() {
        let runtime = SvgooRuntime::new().await.unwrap();
        let context = runtime.create_context().await.unwrap();
        context.initialize_svgo().await.unwrap();

        let svg = r#"<svg xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="100" height="100"/></svg>"#;
        let config = "{}";

        let result = context.optimize_svg(svg, config).await;
        assert!(result.is_ok());

        let optimized = result.unwrap();
        assert!(!optimized.is_empty());
    }
}
