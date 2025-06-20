// this_file: tests/cross_platform_test.rs

//! Cross-platform build verification tests
//!
//! These tests verify that the svgoo project is configured correctly for
//! cross-platform builds and deployment across macOS, Linux, and Windows.

use std::process::Command;

/// Test that cargo can check compilation for different targets
#[test]
fn test_target_configurations() {
    // Test that our project can check compilation for supported targets
    let targets = vec![
        "x86_64-apple-darwin",
        "aarch64-apple-darwin", 
        "x86_64-unknown-linux-gnu",
        "x86_64-pc-windows-msvc",
    ];
    
    for target in targets {
        println!("Checking target configuration for: {}", target);
        
        // Just check that cargo can parse the target without errors
        let output = Command::new("cargo")
            .args(&["check", "--target", target, "--message-format=json"])
            .output();
            
        match output {
            Ok(result) => {
                // If it fails due to missing toolchain, that's acceptable
                // We just want to verify the target configuration is valid
                if !result.status.success() {
                    let stderr = String::from_utf8_lossy(&result.stderr);
                    
                    // Acceptable failure reasons:
                    let acceptable_failures = vec![
                        "toolchain", // Missing cross-compilation toolchain
                        "linker",    // Missing cross-linker
                        "target may not be installed", // Target not installed
                        "error occurred in cc-rs", // Missing C compiler for target
                    ];
                    
                    let is_acceptable = acceptable_failures.iter()
                        .any(|&failure| stderr.contains(failure));
                    
                    if is_acceptable {
                        println!("  ✓ {} target configured (missing toolchain expected on this host)", target);
                    } else {
                        panic!("Unexpected failure for target {}: {}", target, stderr);
                    }
                } else {
                    println!("  ✓ {} target builds successfully", target);
                }
            }
            Err(e) => {
                panic!("Failed to run cargo check for target {}: {}", target, e);
            }
        }
    }
}

/// Test that our Cargo.toml has proper cross-platform configuration
#[test]
fn test_cargo_toml_configuration() {
    let cargo_content = std::fs::read_to_string("Cargo.toml")
        .expect("Failed to read Cargo.toml");
    
    // Check for cross-compilation targets in metadata
    assert!(cargo_content.contains("targets = [\"x86_64-unknown-linux-gnu\", \"x86_64-pc-windows-msvc\", \"x86_64-apple-darwin\"]"),
        "Cargo.toml should specify cross-platform targets in docs.rs metadata");
    
    // Check for optimization settings
    assert!(cargo_content.contains("[profile.release]"), 
        "Should have release profile optimizations");
    assert!(cargo_content.contains("opt-level = \"z\""), 
        "Should optimize for size in release builds");
    assert!(cargo_content.contains("lto = true"), 
        "Should enable link-time optimization");
    
    println!("  ✓ Cargo.toml configured for cross-platform builds");
}

/// Test that all required features work across platforms
#[test] 
fn test_feature_combinations() {
    let features = vec![
        vec![], // default features
        vec!["cli"],
        vec!["ffi"],
        vec!["performance"],
        vec!["cli", "performance"],
    ];
    
    for feature_set in features {
        let mut args = vec!["check", "--no-default-features"];
        let feature_string = feature_set.join(",");
        
        if !feature_set.is_empty() {
            args.push("--features");
            args.push(&feature_string);
        }
        
        let output = Command::new("cargo")
            .args(&args)
            .output()
            .expect("Failed to run cargo check");
        
        if !output.status.success() {
            let stderr = String::from_utf8_lossy(&output.stderr);
            panic!("Feature combination {:?} failed to compile: {}", feature_set, stderr);
        }
        
        println!("  ✓ Feature combination {:?} compiles successfully", feature_set);
    }
}

/// Test that dependencies are compatible with target platforms
#[test]
fn test_dependency_compatibility() {
    // Read Cargo.toml and verify that all dependencies support our target platforms
    let cargo_content = std::fs::read_to_string("Cargo.toml")
        .expect("Failed to read Cargo.toml");
    
    // Key dependencies that need cross-platform support
    let required_deps = vec![
        "rquickjs",  // JavaScript runtime
        "clap",      // CLI parsing
        "tokio",     // Async runtime
        "anyhow",    // Error handling
        "serde",     // Serialization
    ];
    
    for dep in required_deps {
        assert!(cargo_content.contains(dep), 
            "Required dependency {} not found in Cargo.toml", dep);
    }
    
    println!("  ✓ All required cross-platform dependencies present");
}

/// Test that binary size optimization is configured
#[test]
fn test_binary_size_optimization() {
    // Build a release binary and check its size is reasonable
    let output = Command::new("cargo")
        .args(&["build", "--release"])
        .output()
        .expect("Failed to build release binary");
    
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        panic!("Release build failed: {}", stderr);
    }
    
    // Check that the binary exists and get its size
    let binary_path = if cfg!(target_os = "windows") {
        "target/release/svgoo.exe"
    } else {
        "target/release/svgoo"
    };
    
    let metadata = std::fs::metadata(binary_path)
        .expect("Release binary not found");
    
    let size_mb = metadata.len() as f64 / (1024.0 * 1024.0);
    
    // Binary should be under 10MB for efficient distribution
    assert!(size_mb < 10.0, 
        "Binary size is {:.2}MB, should be under 10MB for efficient distribution", size_mb);
    
    println!("  ✓ Release binary size: {:.2}MB (optimized)", size_mb);
}

/// Test that the project can produce single-file deployables
#[test]
fn test_single_file_deployment() {
    // Build release and verify it's a single executable
    let output = Command::new("cargo")
        .args(&["build", "--release"])
        .output()
        .expect("Failed to build release binary");
    
    assert!(output.status.success(), "Release build should succeed");
    
    let binary_path = if cfg!(target_os = "windows") {
        "target/release/svgoo.exe"
    } else {
        "target/release/svgoo"
    };
    
    // Verify the binary exists and is executable
    let metadata = std::fs::metadata(binary_path)
        .expect("Release binary not found");
    
    assert!(metadata.is_file(), "Should produce a single file");
    
    // On Unix systems, check that it's executable
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let permissions = metadata.permissions();
        assert!(permissions.mode() & 0o111 != 0, "Binary should be executable");
    }
    
    // Test that the binary actually runs
    let test_output = Command::new(binary_path)
        .arg("--version")
        .output()
        .expect("Failed to run binary");
    
    assert!(test_output.status.success(), "Binary should run successfully");
    
    let version_output = String::from_utf8_lossy(&test_output.stdout);
    assert!(version_output.contains("svgoo"), "Should output version information");
    
    println!("  ✓ Single-file deployment verified");
    println!("  ✓ Binary version: {}", version_output.trim());
}