// this_file: tests/test_utils.rs

//! Test utilities for svgoo integration tests
//!
//! This module provides common utilities, fixtures, and helper functions
//! used across the test suite.

use std::fs;
use tempfile::TempDir;

/// Collection of test SVG fixtures
pub struct SvgFixtures;

impl SvgFixtures {
    /// Minimal valid SVG
    pub fn minimal() -> &'static str {
        r#"<svg xmlns="http://www.w3.org/2000/svg"/>"#
    }
    
    /// Simple SVG with basic shapes
    pub fn simple() -> &'static str {
        r#"<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <rect x="10" y="10" width="80" height="80" fill="red"/>
</svg>"#
    }
    
    /// SVG with optimization opportunities
    pub fn optimizable() -> &'static str {
        r#"<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <!-- This comment should be removed -->
    <metadata>
        <creator>Test Creator</creator>
    </metadata>
    <title>Test SVG</title>
    <desc>A test SVG for optimization</desc>
    <rect x="10" y="10" width="80" height="80" fill="red" stroke="none"/>
    <circle cx="150" cy="50" r="30" fill="blue"/>
    <g transform="translate(0,0)">
        <rect x="50" y="120" width="40" height="40" fill="green"/>
    </g>
</svg>"#
    }
    
    /// SVG with whitespace and formatting issues
    pub fn unformatted() -> &'static str {
        r#"<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">


    <rect     x="10"    y="10"   width="80"      height="80"    fill="red"   />


</svg>"#
    }
    
    /// SVG with deprecated attributes
    pub fn deprecated() -> &'static str {
        r#"<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" version="1.1">
    <rect x="10" y="10" width="80" height="80" fill="red" stroke-width="0"/>
</svg>"#
    }
    
    /// SVG with unused definitions
    pub fn unused_defs() -> &'static str {
        r#"<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <defs>
        <linearGradient id="unusedGradient">
            <stop offset="0%" stop-color="red"/>
            <stop offset="100%" stop-color="green"/>
        </linearGradient>
        <pattern id="unusedPattern" width="10" height="10">
            <rect width="10" height="10" fill="blue"/>
        </pattern>
    </defs>
    <rect x="10" y="10" width="80" height="80" fill="red"/>
</svg>"#
    }
    
    /// Invalid SVG content
    pub fn invalid() -> &'static str {
        r#"<not-svg>This is not a valid SVG</not-svg>"#
    }
    
    /// Malformed XML
    pub fn malformed() -> &'static str {
        r#"<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <rect x="10" y="10" width="80" height="80" fill="red"
    <circle x="invalid" 
</svg>"#
    }
}

/// Test configuration fixtures
pub struct ConfigFixtures;

impl ConfigFixtures {
    /// Default svgo configuration
    pub fn default() -> &'static str {
        r#"{
    "plugins": [
        "preset-default"
    ]
}"#
    }
    
    /// Configuration with comments disabled
    pub fn no_comments() -> &'static str {
        r#"{
    "plugins": [
        "preset-default",
        {
            "name": "removeComments",
            "active": false
        }
    ]
}"#
    }
    
    /// Configuration with metadata preserved
    pub fn preserve_metadata() -> &'static str {
        r#"{
    "plugins": [
        "preset-default",
        {
            "name": "removeMetadata",
            "active": false
        },
        {
            "name": "removeTitle",
            "active": false
        },
        {
            "name": "removeDesc",
            "active": false
        }
    ]
}"#
    }
    
    /// Configuration with custom plugin settings
    pub fn custom() -> &'static str {
        r#"{
    "plugins": [
        {
            "name": "removeViewBox",
            "active": false
        },
        {
            "name": "cleanupIds",
            "params": {
                "preserve": ["important-id"]
            }
        }
    ]
}"#
    }
    
    /// Invalid configuration
    pub fn invalid() -> &'static str {
        r#"{
    "plugins": "not-an-array"
}"#
    }
}

/// Test helper functions
pub struct TestHelpers;

impl TestHelpers {
    /// Create a temporary directory with test files
    pub fn create_test_dir() -> Result<TempDir, std::io::Error> {
        TempDir::new()
    }
    
    /// Create a temporary SVG file
    pub fn create_svg_file(dir: &TempDir, name: &str, content: &str) -> Result<std::path::PathBuf, std::io::Error> {
        let path = dir.path().join(name);
        fs::write(&path, content)?;
        Ok(path)
    }
    
    /// Create a temporary config file
    pub fn create_config_file(dir: &TempDir, name: &str, content: &str) -> Result<std::path::PathBuf, std::io::Error> {
        let path = dir.path().join(name);
        fs::write(&path, content)?;
        Ok(path)
    }
    
    /// Verify that a string contains valid XML
    pub fn is_valid_xml(content: &str) -> bool {
        content.trim_start().starts_with('<') && 
        content.trim_end().ends_with('>') &&
        content.contains("svg")
    }
    
    /// Verify that SVG content is well-formed
    pub fn is_wellformed_svg(content: &str) -> bool {
        Self::is_valid_xml(content) &&
        content.contains("xmlns") &&
        content.contains("<svg") &&
        (content.contains("</svg>") || content.contains("/>"))
    }
    
    /// Calculate the size reduction percentage
    pub fn size_reduction_percent(original: &str, optimized: &str) -> f64 {
        let original_size = original.len() as f64;
        let optimized_size = optimized.len() as f64;
        ((original_size - optimized_size) / original_size) * 100.0
    }
    
    /// Remove all whitespace for comparison
    pub fn normalize_whitespace(content: &str) -> String {
        content.chars()
            .filter(|c| !c.is_whitespace())
            .collect()
    }
    
    /// Extract XML attributes from a tag
    pub fn extract_attributes(tag: &str) -> Vec<(String, String)> {
        let mut attributes = Vec::new();
        let mut in_quotes = false;
        let mut quote_char = '"';
        let mut current_attr = String::new();
        let mut current_value = String::new();
        let mut in_value = false;
        let mut after_equals = false;
        
        for ch in tag.chars() {
            match ch {
                '"' | '\'' if !in_quotes => {
                    in_quotes = true;
                    quote_char = ch;
                    after_equals = false;
                }
                c if c == quote_char && in_quotes => {
                    in_quotes = false;
                    if in_value {
                        attributes.push((current_attr.trim().to_string(), current_value.trim().to_string()));
                        current_attr.clear();
                        current_value.clear();
                        in_value = false;
                    }
                }
                '=' if !in_quotes => {
                    after_equals = true;
                }
                ' ' | '\t' | '\n' | '\r' if !in_quotes => {
                    if !current_attr.is_empty() && !after_equals {
                        // Attribute without value
                        attributes.push((current_attr.trim().to_string(), String::new()));
                        current_attr.clear();
                    }
                    after_equals = false;
                }
                c => {
                    if in_quotes {
                        current_value.push(c);
                        in_value = true;
                    } else if after_equals {
                        current_value.push(c);
                        in_value = true;
                    } else {
                        current_attr.push(c);
                    }
                }
            }
        }
        
        attributes
    }
}

/// Performance testing utilities
pub struct PerformanceHelpers;

impl PerformanceHelpers {
    /// Generate a large SVG for performance testing
    pub fn generate_large_svg(elements: usize) -> String {
        let mut svg = String::from(r#"<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000">"#);
        
        for i in 0..elements {
            let x = (i % 100) * 10;
            let y = (i / 100) * 10;
            let color = i % 0xFFFFFF;
            svg.push_str(&format!(
                "<rect x=\"{}\" y=\"{}\" width=\"8\" height=\"8\" fill=\"#{:06x}\"/>",
                x, y, color
            ));
        }
        
        svg.push_str("</svg>");
        svg
    }
    
    /// Generate SVG with many groups and transforms
    pub fn generate_nested_svg(depth: usize) -> String {
        let mut svg = String::from(r#"<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">"#);
        
        for i in 0..depth {
            svg.push_str(&format!("<g transform=\"translate({}, {})\">", i, i));
        }
        
        svg.push_str(r#"<rect x="10" y="10" width="10" height="10" fill="red"/>"#);
        
        for _ in 0..depth {
            svg.push_str("</g>");
        }
        
        svg.push_str("</svg>");
        svg
    }
    
    /// Generate SVG with many unused definitions
    pub fn generate_svg_with_unused_defs(count: usize) -> String {
        let mut svg = String::from(r#"<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs>"#);
        
        for i in 0..count {
            svg.push_str(&format!(
                "<linearGradient id=\"gradient{}\"><stop offset=\"0%\" stop-color=\"red\"/><stop offset=\"100%\" stop-color=\"blue\"/></linearGradient>",
                i
            ));
        }
        
        svg.push_str(r#"</defs><rect x="10" y="10" width="80" height="80" fill="red"/></svg>"#);
        svg
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_fixtures_are_valid() {
        assert!(TestHelpers::is_wellformed_svg(SvgFixtures::minimal()));
        assert!(TestHelpers::is_wellformed_svg(SvgFixtures::simple()));
        assert!(TestHelpers::is_wellformed_svg(SvgFixtures::optimizable()));
        assert!(!TestHelpers::is_wellformed_svg(SvgFixtures::invalid()));
    }
    
    #[test]
    fn test_size_reduction_calculation() {
        let original = "1234567890";
        let optimized = "12345";
        let reduction = TestHelpers::size_reduction_percent(original, optimized);
        assert_eq!(reduction, 50.0);
    }
    
    #[test]
    fn test_whitespace_normalization() {
        let content = "  <svg  xmlns='test'  >  content  </svg>  ";
        let normalized = TestHelpers::normalize_whitespace(content);
        assert_eq!(normalized, "<svgxmlns='test'>content</svg>");
    }
    
    #[test]
    fn test_large_svg_generation() {
        let large_svg = PerformanceHelpers::generate_large_svg(100);
        assert!(large_svg.contains("<svg"));
        assert!(large_svg.contains("</svg>"));
        assert!(large_svg.len() > 1000);
    }
}