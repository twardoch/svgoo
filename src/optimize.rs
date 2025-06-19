// this_file: src/optimize.rs

//! SVG optimization functions and builder pattern

use crate::config::Config;
use crate::core::SvgooRuntime;
use crate::error::{Result, SvgooError};

/// Synchronous SVG optimization function
///
/// This function provides a blocking interface for SVG optimization.
/// Internally, it uses the async runtime but blocks on the result.
pub fn optimize_svg(svg_content: &str, config: &Config) -> Result<String> {
    // Use tokio's block_in_place to avoid blocking the async runtime
    tokio::task::block_in_place(|| {
        let rt = tokio::runtime::Runtime::new().map_err(|e| {
            SvgooError::javascript_error(format!("Failed to create async runtime: {}", e))
        })?;

        rt.block_on(optimize_svg_async(svg_content, config))
    })
}

/// Asynchronous SVG optimization function
pub async fn optimize_svg_async(svg_content: &str, config: &Config) -> Result<String> {
    // Validate input
    if svg_content.trim().is_empty() {
        return Err(SvgooError::invalid_input("SVG content cannot be empty"));
    }

    // Create new runtime and context for each operation
    // This avoids thread safety issues with global state
    let runtime = SvgooRuntime::new().await?;
    let context = runtime.create_context().await?;

    // Initialize svgo
    context.initialize_svgo().await?;

    // Convert config to JSON
    let config_json = config.to_js_config()?;

    // Perform optimization
    let result = context.optimize_svg(svg_content, &config_json).await?;

    Ok(result)
}

/// Builder pattern for SVG optimization with fluent interface
pub struct OptimizerBuilder {
    config: Config,
}

impl OptimizerBuilder {
    /// Create a new optimizer builder with default configuration
    pub fn new() -> Self {
        Self {
            config: Config::default(),
        }
    }

    /// Enable pretty printing
    pub fn pretty(mut self, pretty: bool) -> Self {
        self.config.set_pretty(pretty);
        self
    }

    /// Set numeric precision
    pub fn precision(mut self, precision: u32) -> Self {
        self.config.set_precision(precision);
        self
    }

    /// Enable a specific plugin
    pub fn enable_plugin<S: AsRef<str>>(mut self, plugin_name: S) -> Self {
        self.config.enable_plugin(plugin_name.as_ref());
        self
    }

    /// Disable a specific plugin
    pub fn disable_plugin<S: AsRef<str>>(mut self, plugin_name: S) -> Self {
        self.config.disable_plugin(plugin_name.as_ref());
        self
    }

    /// Load configuration from file
    pub fn config_from_file<P: AsRef<std::path::Path>>(mut self, path: P) -> Result<Self> {
        self.config = Config::load_from_file(path)?;
        Ok(self)
    }

    /// Use a specific configuration
    pub fn config(mut self, config: Config) -> Self {
        self.config = config;
        self
    }

    /// Perform synchronous optimization
    pub fn optimize<S: AsRef<str>>(self, svg_content: S) -> Result<String> {
        optimize_svg(svg_content.as_ref(), &self.config)
    }

    /// Perform asynchronous optimization
    pub async fn optimize_async<S: AsRef<str>>(self, svg_content: S) -> Result<String> {
        optimize_svg_async(svg_content.as_ref(), &self.config).await
    }
}

impl Default for OptimizerBuilder {
    fn default() -> Self {
        Self::new()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEST_SVG: &str = r#"<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
        <rect x="10" y="10" width="80" height="80" fill="red" />
    </svg>"#;

    #[test]
    fn test_optimize_svg_sync() {
        let config = Config::default();
        let result = optimize_svg(TEST_SVG, &config);

        // For now, just test that it doesn't panic
        // Real tests will be added once svgo is properly embedded
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_optimize_svg_async() {
        let config = Config::default();
        let result = optimize_svg_async(TEST_SVG, &config).await;

        assert!(result.is_ok());
        let optimized = result.unwrap();
        assert!(!optimized.is_empty());
    }

    #[test]
    fn test_optimizer_builder() {
        let builder = OptimizerBuilder::new()
            .pretty(true)
            .precision(3)
            .enable_plugin("removeComments")
            .disable_plugin("preset-default");

        // Test that builder can be constructed
        assert_eq!(builder.config.pretty, true);
        assert_eq!(builder.config.precision, 3);
    }

    #[tokio::test]
    async fn test_optimizer_builder_async() {
        let result = OptimizerBuilder::new()
            .pretty(true)
            .optimize_async(TEST_SVG)
            .await;

        assert!(result.is_ok());
    }

    #[test]
    fn test_empty_input_validation() {
        let config = Config::default();
        let result = optimize_svg("", &config);

        assert!(result.is_err());
        match result.unwrap_err() {
            SvgooError::InvalidInput(_) => {}
            _ => panic!("Expected InvalidInput error"),
        }
    }
}
