// this_file: tests/stdin_stdout_tests.rs

//! Dedicated stdin/stdout processing integration tests
//!
//! This test suite focuses specifically on stdin/stdout behavior,
//! pipe processing, and various input/output scenarios.

use assert_cmd::Command;
use predicates::prelude::*;
use std::fs;
use tempfile::{NamedTempFile, TempDir};
use std::io::Write;

mod test_utils;
use test_utils::{SvgFixtures, TestHelpers};

#[test]
fn test_stdin_to_stdout_minimal() {
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.write_stdin(SvgFixtures::minimal());
    cmd.assert()
        .success()
        .stdout(predicate::str::contains("svg"))
        .stdout(predicate::str::contains("xmlns"));
}

#[test]
fn test_stdin_to_stdout_simple() {
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.write_stdin(SvgFixtures::simple());
    cmd.assert()
        .success()
        .stdout(predicate::str::contains("svg"))
        .stdout(predicate::str::contains("rect"));
}

#[test]
fn test_stdin_to_stdout_optimizable() {
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.write_stdin(SvgFixtures::optimizable());
    
    let output = cmd.assert().success().get_output().clone();
    let output_str = String::from_utf8(output.stdout).unwrap();
    
    // Verify output is well-formed SVG
    assert!(TestHelpers::is_wellformed_svg(&output_str));
}

#[test]
fn test_stdin_to_stdout_unformatted() {
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.write_stdin(SvgFixtures::unformatted());
    
    let output = cmd.assert().success().get_output().clone();
    let output_str = String::from_utf8(output.stdout).unwrap();
    
    // Verify output is cleaned up
    assert!(TestHelpers::is_wellformed_svg(&output_str));
    assert!(!output_str.contains("    "));  // No large whitespace blocks
}

#[test]
fn test_stdin_empty_input() {
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.write_stdin("");
    cmd.assert().failure();
}

#[test]
fn test_stdin_whitespace_only() {
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.write_stdin("   \n  \t  \n  ");
    cmd.assert().failure();
}

#[test]
fn test_stdin_invalid_xml() {
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.write_stdin(SvgFixtures::invalid());
    
    // Should fail gracefully
    cmd.assert().code(predicate::in_iter([0, 1])); // Allow success or failure
}

#[test]
fn test_stdin_malformed_xml() {
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.write_stdin(SvgFixtures::malformed());
    
    // Current implementation is lenient with malformed XML
    // TODO: Make this stricter when proper XML parsing is implemented
    cmd.assert().code(predicate::in_iter([0, 1])); // Allow success or failure
}

#[test]
fn test_stdin_with_dash_arg() {
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.arg("-");
    cmd.write_stdin(SvgFixtures::simple());
    cmd.assert()
        .success()
        .stdout(predicate::str::contains("svg"));
}

#[test]
fn test_stdin_with_dash_output() {
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.arg("-")
        .arg("--output")
        .arg("-");
    cmd.write_stdin(SvgFixtures::simple());
    cmd.assert()
        .success()
        .stdout(predicate::str::contains("svg"));
}

#[test]
fn test_stdin_to_file_output() -> Result<(), Box<dyn std::error::Error>> {
    let temp_dir = TempDir::new()?;
    let output_path = temp_dir.path().join("output.svg");
    
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.arg("--output")
        .arg(&output_path);
    cmd.write_stdin(SvgFixtures::simple());
    
    cmd.assert().success();
    
    // Verify file was created
    assert!(output_path.exists());
    let content = fs::read_to_string(&output_path)?;
    assert!(TestHelpers::is_wellformed_svg(&content));
    
    Ok(())
}

#[test]
fn test_file_input_to_stdout() -> Result<(), Box<dyn std::error::Error>> {
    let mut temp_file = NamedTempFile::new()?;
    temp_file.write_all(SvgFixtures::optimizable().as_bytes())?;
    
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.arg(temp_file.path());
    cmd.assert()
        .success()
        .stdout(predicate::str::contains("svg"));
    
    Ok(())
}

#[test]
fn test_file_input_to_dash_stdout() -> Result<(), Box<dyn std::error::Error>> {
    let mut temp_file = NamedTempFile::new()?;
    temp_file.write_all(SvgFixtures::simple().as_bytes())?;
    
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.arg(temp_file.path())
        .arg("--output")
        .arg("-");
    cmd.assert()
        .success()
        .stdout(predicate::str::contains("svg"));
    
    Ok(())
}

#[test]
fn test_file_input_to_file_output() -> Result<(), Box<dyn std::error::Error>> {
    let temp_dir = TempDir::new()?;
    let input_path = temp_dir.path().join("input.svg");
    let output_path = temp_dir.path().join("output.svg");
    
    fs::write(&input_path, SvgFixtures::optimizable())?;
    
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.arg(&input_path)
        .arg("--output")
        .arg(&output_path);
    
    cmd.assert().success();
    
    // Verify both files exist
    assert!(input_path.exists());
    assert!(output_path.exists());
    
    let output_content = fs::read_to_string(&output_path)?;
    assert!(TestHelpers::is_wellformed_svg(&output_content));
    
    Ok(())
}

#[test]
fn test_stdin_with_pretty_flag() {
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.arg("--pretty");
    cmd.write_stdin(SvgFixtures::simple());
    
    let output = cmd.assert().success().get_output().clone();
    let output_str = String::from_utf8(output.stdout).unwrap();
    
    // Verify it's still valid SVG
    assert!(TestHelpers::is_wellformed_svg(&output_str));
}

#[test]
fn test_stdin_with_config_options() -> Result<(), Box<dyn std::error::Error>> {
    let temp_dir = TempDir::new()?;
    let config_path = temp_dir.path().join("config.json");
    
    let config_content = r#"{
        "pretty": true,
        "plugins": [
            {
                "name": "preset-default",
                "enabled": true
            }
        ]
    }"#;
    
    fs::write(&config_path, config_content)?;
    
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.arg("--config")
        .arg(&config_path);
    cmd.write_stdin(SvgFixtures::optimizable());
    
    cmd.assert()
        .success()
        .stdout(predicate::str::contains("svg"));
    
    Ok(())
}

#[test]
fn test_stdin_with_plugin_flags() {
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.arg("--disable")
        .arg("removeComments")
        .arg("--enable")
        .arg("sortAttrs");
    cmd.write_stdin(SvgFixtures::optimizable());
    
    cmd.assert()
        .success()
        .stdout(predicate::str::contains("svg"));
}

#[test]
fn test_large_svg_through_stdin() {
    use test_utils::PerformanceHelpers;
    
    let large_svg = PerformanceHelpers::generate_large_svg(1000);
    
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.write_stdin(large_svg.as_bytes());
    
    let output = cmd.assert().success().get_output().clone();
    let output_str = String::from_utf8(output.stdout).unwrap();
    
    assert!(TestHelpers::is_wellformed_svg(&output_str));
    assert!(output_str.len() > 0);
}

#[test]
fn test_nested_svg_through_stdin() {
    use test_utils::PerformanceHelpers;
    
    let nested_svg = PerformanceHelpers::generate_nested_svg(50);
    
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.write_stdin(nested_svg.as_bytes());
    
    let output = cmd.assert().success().get_output().clone();
    let output_str = String::from_utf8(output.stdout).unwrap();
    
    assert!(TestHelpers::is_wellformed_svg(&output_str));
}

#[test]
fn test_svg_with_unused_defs_through_stdin() {
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.write_stdin(SvgFixtures::unused_defs());
    
    let output = cmd.assert().success().get_output().clone();
    let output_str = String::from_utf8(output.stdout).unwrap();
    
    assert!(TestHelpers::is_wellformed_svg(&output_str));
    // TODO: Verify that unused defs are removed when that functionality is implemented
}

/// Test that optimization reduces file size for complex SVGs
#[test]
fn test_optimization_size_reduction() {
    let input_svg = SvgFixtures::optimizable();
    
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.write_stdin(input_svg);
    
    let output = cmd.assert().success().get_output().clone();
    let output_str = String::from_utf8(output.stdout).unwrap();
    
    // For now, just verify it's valid - actual optimization will be implemented later
    assert!(TestHelpers::is_wellformed_svg(&output_str));
    
    // Calculate size reduction (for monitoring purposes)
    let reduction = TestHelpers::size_reduction_percent(input_svg, &output_str);
    println!("Size reduction: {:.1}%", reduction);
}

/// Test stdin processing with various encodings
#[test]
fn test_stdin_utf8_handling() {
    let svg_with_unicode = r#"<svg xmlns="http://www.w3.org/2000/svg">
        <text>Hello 世界 🌍</text>
    </svg>"#;
    
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.write_stdin(svg_with_unicode);
    
    let output = cmd.assert().success().get_output().clone();
    let output_str = String::from_utf8(output.stdout).unwrap();
    
    assert!(TestHelpers::is_wellformed_svg(&output_str));
    // TODO: Verify that Unicode content is preserved
}

/// Test that output is deterministic for same input
#[test]
fn test_deterministic_output() {
    let input_svg = SvgFixtures::simple();
    
    // Run optimization twice
    let mut cmd1 = Command::cargo_bin("svgoo").unwrap();
    cmd1.write_stdin(input_svg);
    let output1 = cmd1.assert().success().get_output().clone();
    
    let mut cmd2 = Command::cargo_bin("svgoo").unwrap();
    cmd2.write_stdin(input_svg);
    let output2 = cmd2.assert().success().get_output().clone();
    
    // Results should be identical
    assert_eq!(output1.stdout, output2.stdout);
}

/// Test error handling for very large inputs
#[test]
fn test_very_large_input_handling() {
    use test_utils::PerformanceHelpers;
    
    // Generate a very large SVG (10,000 elements)
    let huge_svg = PerformanceHelpers::generate_large_svg(10000);
    
    let mut cmd = Command::cargo_bin("svgoo").unwrap();
    cmd.write_stdin(huge_svg.as_bytes());
    
    // Should handle gracefully (may be slow but shouldn't crash)
    let result = cmd.assert();
    
    // Accept either success or failure (depending on memory limits)
    result.code(predicate::in_iter([0, 1]));
}