// this_file: src/error.rs

//! Error types for svgoo

use thiserror::Error;

/// Result type alias for svgoo operations
pub type Result<T> = std::result::Result<T, SvgooError>;

/// Main error type for svgoo operations
#[derive(Error, Debug)]
pub enum SvgooError {
    /// JavaScript runtime errors
    #[error("JavaScript runtime error: {0}")]
    JavaScriptError(String),

    /// SVG parsing or processing errors  
    #[error("SVG processing error: {0}")]
    SvgProcessingError(String),

    /// Configuration errors
    #[error("Configuration error: {0}")]
    ConfigError(String),

    /// File I/O errors
    #[error("File I/O error: {0}")]
    IoError(#[from] std::io::Error),

    /// JSON parsing errors for configuration
    #[error("JSON parsing error: {0}")]
    JsonError(#[from] serde_json::Error),

    /// Plugin-related errors
    #[error("Plugin error: {plugin_name}: {message}")]
    PluginError {
        /// Name of the plugin that caused the error
        plugin_name: String,
        /// Error message from the plugin
        message: String,
    },

    /// Invalid input errors
    #[error("Invalid input: {0}")]
    InvalidInput(String),
    
    /// QuickJS runtime errors
    #[error("QuickJS error: {0}")]
    QuickJsError(String),
}

impl From<rquickjs::Error> for SvgooError {
    fn from(err: rquickjs::Error) -> Self {
        Self::QuickJsError(err.to_string())
    }
}

impl SvgooError {
    /// Create a new JavaScript error
    pub fn javascript_error<S: Into<String>>(message: S) -> Self {
        Self::JavaScriptError(message.into())
    }

    /// Create a new SVG processing error
    pub fn svg_processing_error<S: Into<String>>(message: S) -> Self {
        Self::SvgProcessingError(message.into())
    }

    /// Create a new configuration error
    pub fn config_error<S: Into<String>>(message: S) -> Self {
        Self::ConfigError(message.into())
    }

    /// Create a new plugin error
    pub fn plugin_error<S: Into<String>>(plugin_name: S, message: S) -> Self {
        Self::PluginError {
            plugin_name: plugin_name.into(),
            message: message.into(),
        }
    }

    /// Create a new invalid input error
    pub fn invalid_input<S: Into<String>>(message: S) -> Self {
        Self::InvalidInput(message.into())
    }
}
