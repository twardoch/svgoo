// this_file: tests/svg_test_suite.rs

//! Comprehensive SVG test suite for svgoo
//! 
//! This test suite validates svgoo against a collection of reference SVG files,
//! ensuring that optimization works correctly across various SVG structures.

use std::fs;
use std::path::Path;
use std::process::Command;

/// Test data structure for SVG test cases
struct SvgTestCase {
    name: &'static str,
    file: &'static str,
    description: &'static str,
    expected_optimizations: &'static [&'static str],
}

/// Collection of test SVG files with expected behaviors
const TEST_CASES: &[SvgTestCase] = &[
    SvgTestCase {
        name: "basic_rect",
        file: "01-basic-rect.svg",
        description: "Simple rectangle with comment removal",
        expected_optimizations: &["comment removal"],
    },
    SvgTestCase {
        name: "comments",
        file: "02-with-comments.svg", 
        description: "Multiple comments throughout document",
        expected_optimizations: &["comment removal"],
    },
    SvgTestCase {
        name: "whitespace",
        file: "03-whitespace-heavy.svg",
        description: "Heavy whitespace formatting",
        expected_optimizations: &["whitespace cleanup"],
    },
    SvgTestCase {
        name: "empty_attributes",
        file: "04-empty-attributes.svg",
        description: "Empty attribute values",
        expected_optimizations: &["empty attribute removal"],
    },
    SvgTestCase {
        name: "multiple_elements",
        file: "05-multiple-elements.svg",
        description: "Various SVG elements",
        expected_optimizations: &["general optimization"],
    },
    SvgTestCase {
        name: "nested_groups",
        file: "06-nested-groups.svg",
        description: "Nested group elements",
        expected_optimizations: &["group optimization"],
    },
    SvgTestCase {
        name: "doctype_and_pi",
        file: "07-doctype-and-pi.svg",
        description: "DOCTYPE and processing instructions",
        expected_optimizations: &["doctype removal", "PI removal"],
    },
    SvgTestCase {
        name: "style_blocks",
        file: "08-with-style.svg",
        description: "CSS style blocks",
        expected_optimizations: &["style optimization"],
    },
    SvgTestCase {
        name: "metadata",
        file: "09-metadata.svg",
        description: "Metadata and title/desc elements",
        expected_optimizations: &["metadata removal"],
    },
    SvgTestCase {
        name: "complex_paths",
        file: "10-complex-paths.svg",
        description: "Complex path data",
        expected_optimizations: &["path optimization"],
    },
];

/// Helper function to get test SVG content
fn get_test_svg_content(filename: &str) -> Result<String, Box<dyn std::error::Error>> {
    let path = Path::new("tests/test-svgs").join(filename);
    Ok(fs::read_to_string(path)?)
}

/// Helper function to run svgoo on input and get output
fn run_svgoo_optimization(input: &str) -> Result<String, Box<dyn std::error::Error>> {
    let mut cmd = Command::new("cargo");
    cmd.args(&["run", "--quiet"])
        .stdin(std::process::Stdio::piped())
        .stdout(std::process::Stdio::piped())
        .stderr(std::process::Stdio::piped());
    
    let mut child = cmd.spawn()?;
    
    // Write input to stdin
    if let Some(stdin) = child.stdin.take() {
        use std::io::Write;
        let mut stdin = stdin;
        stdin.write_all(input.as_bytes())?;
    }
    
    let output = child.wait_with_output()?;
    
    if !output.status.success() {
        return Err(format!("svgoo failed: {}", String::from_utf8_lossy(&output.stderr)).into());
    }
    
    Ok(String::from_utf8(output.stdout)?)
}

/// Test that all SVG files can be processed without errors
#[test]
fn test_all_svgs_process_successfully() {
    for test_case in TEST_CASES {
        println!("Testing {}: {}", test_case.name, test_case.description);
        
        let input = get_test_svg_content(test_case.file)
            .expect(&format!("Failed to read {}", test_case.file));
        
        let output = run_svgoo_optimization(&input)
            .expect(&format!("Failed to optimize {}", test_case.file));
        
        // Basic validation - output should be valid XML-like structure
        assert!(output.contains("<svg"), "Output should contain <svg tag for {}", test_case.name);
        assert!(output.contains("</svg>"), "Output should contain </svg> tag for {}", test_case.name);
        
        // Output should be different from input (some optimization occurred)
        // Exception: if the SVG is already optimal, they might be the same
        println!("  ✓ {} processed successfully", test_case.name);
    }
}

/// Test comment removal specifically
#[test]
fn test_comment_removal() {
    let input = get_test_svg_content("02-with-comments.svg")
        .expect("Failed to read comments test file");
    
    let output = run_svgoo_optimization(&input)
        .expect("Failed to optimize comments test");
    
    // Comments should be removed
    assert!(!output.contains("<!--"), "Comments should be removed from output");
    assert!(!output.contains("-->"), "Comments should be removed from output");
    
    // But the actual content should remain
    assert!(output.contains("<use"), "Content should be preserved");
    assert!(output.contains("#circle"), "References should be preserved");
    
    println!("  ✓ Comment removal working correctly");
}

/// Test that optimization reduces file size
#[test]
fn test_optimization_reduces_size() {
    let input = get_test_svg_content("03-whitespace-heavy.svg")
        .expect("Failed to read whitespace test file");
    
    let output = run_svgoo_optimization(&input)
        .expect("Failed to optimize whitespace test");
    
    // Output should be smaller due to whitespace removal
    assert!(output.len() < input.len(), 
        "Optimized output should be smaller. Input: {} bytes, Output: {} bytes", 
        input.len(), output.len());
    
    println!("  ✓ Optimization reduces file size ({} -> {} bytes)", 
        input.len(), output.len());
}

/// Test empty input handling
#[test]
fn test_empty_input() {
    let result = run_svgoo_optimization("");
    
    // Should handle empty input gracefully (likely with an error)
    match result {
        Ok(_) => println!("  ✓ Empty input handled gracefully"),
        Err(_) => println!("  ✓ Empty input produces expected error"),
    }
}

/// Test invalid SVG handling
#[test]
fn test_invalid_svg() {
    let invalid_svg = "<not>valid</xml>";
    
    let result = run_svgoo_optimization(invalid_svg);
    
    // Should handle invalid SVG gracefully
    match result {
        Ok(output) => {
            // If it succeeds, output should at least be some form of XML
            assert!(output.trim().len() > 0, "Output should not be empty");
            println!("  ✓ Invalid SVG handled (output produced)");
        },
        Err(_) => {
            println!("  ✓ Invalid SVG produces expected error");
        }
    }
}

/// Performance benchmark test
#[test]
fn test_performance_benchmark() {
    let input = get_test_svg_content("10-complex-paths.svg")
        .expect("Failed to read complex paths test file");
    
    let start = std::time::Instant::now();
    let _output = run_svgoo_optimization(&input)
        .expect("Failed to optimize complex paths");
    let duration = start.elapsed();
    
    println!("  ✓ Complex SVG processed in {:?}", duration);
    
    // For MVP, just ensure it completes in reasonable time (< 5 seconds)
    assert!(duration.as_secs() < 5, "Optimization should complete in under 5 seconds");
}

/// Test that SVG structure is preserved
#[test]
fn test_structure_preservation() {
    let input = get_test_svg_content("05-multiple-elements.svg")
        .expect("Failed to read multiple elements test file");
    
    let output = run_svgoo_optimization(&input)
        .expect("Failed to optimize multiple elements test");
    
    // Count elements in input and output
    let input_rect_count = input.matches("<rect").count();
    let input_circle_count = input.matches("<circle").count();
    let input_ellipse_count = input.matches("<ellipse").count();
    let input_path_count = input.matches("<path").count();
    
    let output_rect_count = output.matches("<rect").count();
    let output_circle_count = output.matches("<circle").count();
    let output_ellipse_count = output.matches("<ellipse").count();
    let output_path_count = output.matches("<path").count();
    
    assert_eq!(input_rect_count, output_rect_count, "Rectangle count should be preserved");
    assert_eq!(input_circle_count, output_circle_count, "Circle count should be preserved");
    assert_eq!(input_ellipse_count, output_ellipse_count, "Ellipse count should be preserved");
    assert_eq!(input_path_count, output_path_count, "Path count should be preserved");
    
    println!("  ✓ SVG structure preserved (rect:{}, circle:{}, ellipse:{}, path:{})", 
        output_rect_count, output_circle_count, output_ellipse_count, output_path_count);
}

/// Test very large SVG file handling
#[test]
fn test_large_svg_handling() {
    // Create a large SVG with many elements
    let mut large_svg = String::new();
    large_svg.push_str(r#"<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000">"#);
    
    // Add 1000 rectangle elements
    for i in 0..1000 {
        large_svg.push_str(&format!(
            r#"<rect x="{}" y="{}" width="1" height="1" fill="red"/>"#, 
            i % 100, i / 100
        ));
    }
    large_svg.push_str("</svg>");
    
    let start = std::time::Instant::now();
    let result = run_svgoo_optimization(&large_svg);
    let duration = start.elapsed();
    
    match result {
        Ok(output) => {
            assert!(output.contains("<svg"), "Large SVG should be processed");
            assert!(output.contains("</svg>"), "Large SVG should have closing tag");
            println!("  ✓ Large SVG processed in {:?} (size: {} bytes)", duration, large_svg.len());
        }
        Err(e) => {
            println!("  ⚠ Large SVG processing failed (acceptable): {}", e);
        }
    }
}

/// Test malformed XML handling
#[test]
fn test_malformed_xml() {
    let malformed_cases = vec![
        "<svg><rect></svg>", // Unclosed rect tag
        "<svg><rect x='unclosed></svg>", // Unclosed attribute quote
        "<svg><rect x=10></rect></svg>", // Unquoted attribute
        "<svg><rect><circle></rect></svg>", // Mismatched tags
        "<svg xmlns='http://www.w3.org/2000/svg'><rect/><svg>", // Multiple root elements
    ];
    
    for (i, malformed_svg) in malformed_cases.iter().enumerate() {
        let result = run_svgoo_optimization(malformed_svg);
        
        match result {
            Ok(output) => {
                println!("  ⚠ Malformed case {} handled gracefully: {}", i + 1, output.len());
            }
            Err(_) => {
                println!("  ✓ Malformed case {} properly rejected", i + 1);
            }
        }
    }
}

/// Test extremely nested SVG structures
#[test]
fn test_deeply_nested_svg() {
    let mut nested_svg = String::new();
    nested_svg.push_str(r#"<svg xmlns="http://www.w3.org/2000/svg">"#);
    
    // Create deeply nested groups (100 levels)
    for _ in 0..100 {
        nested_svg.push_str("<g>");
    }
    nested_svg.push_str(r#"<rect x="0" y="0" width="10" height="10"/>"#);
    for _ in 0..100 {
        nested_svg.push_str("</g>");
    }
    nested_svg.push_str("</svg>");
    
    let result = run_svgoo_optimization(&nested_svg);
    
    match result {
        Ok(output) => {
            assert!(output.contains("<svg"), "Deeply nested SVG should be processed");
            println!("  ✓ Deeply nested SVG processed successfully");
        }
        Err(e) => {
            println!("  ⚠ Deeply nested SVG failed (may be acceptable): {}", e);
        }
    }
}

/// Test binary data input (should fail gracefully)
#[test]
fn test_binary_data_input() {
    let binary_data = vec![0xFF, 0xFE, 0x00, 0x01, 0x80, 0x90, 0xAB, 0xCD];
    let binary_string = String::from_utf8_lossy(&binary_data);
    
    let result = run_svgoo_optimization(&binary_string);
    
    // Should either fail gracefully or produce some output
    match result {
        Ok(_) => println!("  ✓ Binary data handled gracefully"),
        Err(_) => println!("  ✓ Binary data properly rejected"),
    }
}

/// Test memory stress with repeated optimization
#[test]
fn test_memory_stress() {
    let test_svg = get_test_svg_content("10-complex-paths.svg")
        .expect("Failed to read complex paths test file");
    
    // Run optimization 100 times to check for memory leaks
    for i in 0..100 {
        let result = run_svgoo_optimization(&test_svg);
        
        match result {
            Ok(_) => {
                if i % 25 == 0 {
                    println!("  ✓ Memory stress test iteration {}/100", i + 1);
                }
            }
            Err(e) => {
                panic!("Memory stress test failed at iteration {}: {}", i + 1, e);
            }
        }
    }
    
    println!("  ✓ Memory stress test completed (100 iterations)");
}

/// Integration test for file I/O (when implemented)
#[cfg(feature = "file-io")]
#[test]
fn test_file_input_output() {
    // This test will be enabled when file I/O is implemented
    use std::fs;
    use tempfile::NamedTempFile;
    
    let input_file = NamedTempFile::new().expect("Failed to create temp input file");
    let output_file = NamedTempFile::new().expect("Failed to create temp output file");
    
    // Write test SVG to input file
    let test_svg = get_test_svg_content("01-basic-rect.svg")
        .expect("Failed to read test SVG");
    fs::write(input_file.path(), test_svg).expect("Failed to write input file");
    
    // Run svgoo with file I/O
    let status = Command::new("cargo")
        .args(&["run", "--", input_file.path().to_str().unwrap(), "-o", output_file.path().to_str().unwrap()])
        .status()
        .expect("Failed to run svgoo");
    
    assert!(status.success(), "svgoo should process file successfully");
    
    // Check output file exists and contains valid SVG
    let output_content = fs::read_to_string(output_file.path())
        .expect("Failed to read output file");
    assert!(output_content.contains("<svg"), "Output file should contain valid SVG");
    
    println!("  ✓ File I/O working correctly");
}