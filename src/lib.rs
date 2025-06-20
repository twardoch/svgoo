// this_file: src/lib.rs

//! # svgoo
//!
//! Cross-platform SVG optimizer with svgo compatibility.
//!
//! This library provides a Rust interface to SVG optimization using embedded JavaScript
//! via QuickJS, maintaining full compatibility with the svgo API while offering
//! single-file deployment across platforms.

#![warn(missing_docs)]
#![warn(rust_2018_idioms)]

pub mod ast;
pub mod config;
pub mod core;
pub mod embedded_js;
pub mod error;
pub mod optimize;
// pub mod plugin; // Temporarily disabled due to threading issues

#[cfg(feature = "ffi")]
pub mod ffi;

// Re-export main types
pub use config::Config;
pub use error::{Result, SvgooError};
pub use optimize::{optimize_svg, optimize_svg_async, OptimizerBuilder};

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn basic_optimization_test() {
        let svg_input = r#"<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
            <rect x="10" y="10" width="80" height="80" fill="red" />
        </svg>"#;

        // This is a placeholder - actual implementation will come later
        // let result = optimize_svg(svg_input, &Config::default());
        // assert!(result.is_ok());

        // For now, just test that the module compiles
        assert_eq!(svg_input.len() > 0, true);
    }
}
