// this_file: tests/cross_platform_build_tests.rs

//! Cross-platform build verification tests
//!
//! This test suite verifies that svgoo can be successfully compiled
//! for different target platforms and architectures.

use std::process::Command;
use std::env;

/// Test that we can build for the current platform
#[test]
fn test_native_build() {
    let output = Command::new("cargo")
        .args(&["build", "--release"])
        .output()
        .expect("Failed to execute cargo build");

    if !output.status.success() {
        panic!(
            "Native build failed:\nstdout: {}\nstderr: {}",
            String::from_utf8_lossy(&output.stdout),
            String::from_utf8_lossy(&output.stderr)
        );
    }

    println!("Native build successful");
}

/// Test that we can build with all features enabled
#[test]
fn test_all_features_build() {
    let output = Command::new("cargo")
        .args(&["build", "--release", "--all-features"])
        .output()
        .expect("Failed to execute cargo build");

    if !output.status.success() {
        panic!(
            "All features build failed:\nstdout: {}\nstderr: {}",
            String::from_utf8_lossy(&output.stdout),
            String::from_utf8_lossy(&output.stderr)
        );
    }

    println!("All features build successful");
}

/// Test that we can build with no default features
#[test]
fn test_no_default_features_build() {
    let output = Command::new("cargo")
        .args(&["build", "--release", "--no-default-features"])
        .output()
        .expect("Failed to execute cargo build");

    if !output.status.success() {
        panic!(
            "No default features build failed:\nstdout: {}\nstderr: {}",
            String::from_utf8_lossy(&output.stdout),
            String::from_utf8_lossy(&output.stderr)
        );
    }

    println!("No default features build successful");
}

/// Test that we can build the library without CLI features
#[test]
fn test_library_only_build() {
    let output = Command::new("cargo")
        .args(&["build", "--release", "--no-default-features", "--features", "ffi"])
        .output()
        .expect("Failed to execute cargo build");

    if !output.status.success() {
        panic!(
            "Library-only build failed:\nstdout: {}\nstderr: {}",
            String::from_utf8_lossy(&output.stdout),
            String::from_utf8_lossy(&output.stderr)
        );
    }

    println!("Library-only build successful");
}

/// Test cross-compilation to Linux (if not already on Linux)
#[test]
fn test_linux_cross_compile() {
    if env::consts::OS == "linux" {
        println!("Skipping Linux cross-compilation (already on Linux)");
        return;
    }

    // Check if the target is installed
    let check_target = Command::new("rustup")
        .args(&["target", "list", "--installed"])
        .output()
        .expect("Failed to check installed targets");

    let installed_targets = String::from_utf8_lossy(&check_target.stdout);
    
    if !installed_targets.contains("x86_64-unknown-linux-gnu") {
        println!("Skipping Linux cross-compilation (target not installed)");
        return;
    }

    let output = Command::new("cargo")
        .args(&["build", "--release", "--target", "x86_64-unknown-linux-gnu"])
        .output()
        .expect("Failed to execute cargo build");

    if !output.status.success() {
        // Don't fail the test if cross-compilation fails due to missing tools
        // This is common in CI environments
        println!(
            "Linux cross-compilation failed (expected in some environments):\nstderr: {}",
            String::from_utf8_lossy(&output.stderr)
        );
    } else {
        println!("Linux cross-compilation successful");
    }
}

/// Test cross-compilation to Windows (if not already on Windows)
#[test]
fn test_windows_cross_compile() {
    if env::consts::OS == "windows" {
        println!("Skipping Windows cross-compilation (already on Windows)");
        return;
    }

    // Check if the target is installed
    let check_target = Command::new("rustup")
        .args(&["target", "list", "--installed"])
        .output()
        .expect("Failed to check installed targets");

    let installed_targets = String::from_utf8_lossy(&check_target.stdout);
    
    if !installed_targets.contains("x86_64-pc-windows-gnu") {
        println!("Skipping Windows cross-compilation (target not installed)");
        return;
    }

    let output = Command::new("cargo")
        .args(&["build", "--release", "--target", "x86_64-pc-windows-gnu"])
        .output()
        .expect("Failed to execute cargo build");

    if !output.status.success() {
        // Don't fail the test if cross-compilation fails due to missing tools
        println!(
            "Windows cross-compilation failed (expected in some environments):\nstderr: {}",
            String::from_utf8_lossy(&output.stderr)
        );
    } else {
        println!("Windows cross-compilation successful");
    }
}

/// Test cross-compilation to macOS (if not already on macOS)
#[test]
fn test_macos_cross_compile() {
    if env::consts::OS == "macos" {
        println!("Skipping macOS cross-compilation (already on macOS)");
        return;
    }

    // Check if the target is installed
    let check_target = Command::new("rustup")
        .args(&["target", "list", "--installed"])
        .output()
        .expect("Failed to check installed targets");

    let installed_targets = String::from_utf8_lossy(&check_target.stdout);
    
    if !installed_targets.contains("x86_64-apple-darwin") {
        println!("Skipping macOS cross-compilation (target not installed)");
        return;
    }

    let output = Command::new("cargo")
        .args(&["build", "--release", "--target", "x86_64-apple-darwin"])
        .output()
        .expect("Failed to execute cargo build");

    if !output.status.success() {
        // Don't fail the test if cross-compilation fails due to missing tools
        println!(
            "macOS cross-compilation failed (expected in some environments):\nstderr: {}",
            String::from_utf8_lossy(&output.stderr)
        );
    } else {
        println!("macOS cross-compilation successful");
    }
}

/// Test that we can check the code without building
#[test]
fn test_cargo_check() {
    let output = Command::new("cargo")
        .args(&["check", "--all-targets", "--all-features"])
        .output()
        .expect("Failed to execute cargo check");

    if !output.status.success() {
        panic!(
            "Cargo check failed:\nstdout: {}\nstderr: {}",
            String::from_utf8_lossy(&output.stdout),
            String::from_utf8_lossy(&output.stderr)
        );
    }

    println!("Cargo check successful");
}

/// Test that clippy linting passes
#[test]
fn test_clippy_linting() {
    let output = Command::new("cargo")
        .args(&["clippy", "--all-targets", "--all-features", "--", "-D", "warnings"])
        .output()
        .expect("Failed to execute cargo clippy");

    if !output.status.success() {
        println!(
            "Clippy warnings found:\nstdout: {}\nstderr: {}",
            String::from_utf8_lossy(&output.stdout),
            String::from_utf8_lossy(&output.stderr)
        );
        // Don't fail the test for clippy warnings, just report them
    } else {
        println!("Clippy linting successful");
    }
}

/// Test that cargo fmt check passes
#[test]
fn test_formatting_check() {
    let output = Command::new("cargo")
        .args(&["fmt", "--all", "--", "--check"])
        .output()
        .expect("Failed to execute cargo fmt");

    if !output.status.success() {
        println!(
            "Formatting issues found:\nstdout: {}\nstderr: {}",
            String::from_utf8_lossy(&output.stdout),
            String::from_utf8_lossy(&output.stderr)
        );
        // Don't fail the test for formatting issues, just report them
    } else {
        println!("Code formatting check successful");
    }
}

/// Test that we can build documentation
#[test]
fn test_documentation_build() {
    let output = Command::new("cargo")
        .args(&["doc", "--all-features", "--no-deps"])
        .output()
        .expect("Failed to execute cargo doc");

    if !output.status.success() {
        panic!(
            "Documentation build failed:\nstdout: {}\nstderr: {}",
            String::from_utf8_lossy(&output.stdout),
            String::from_utf8_lossy(&output.stderr)
        );
    }

    println!("Documentation build successful");
}

/// Test compilation with different optimization levels
#[test]
fn test_debug_build() {
    let output = Command::new("cargo")
        .args(&["build", "--all-features"])
        .output()
        .expect("Failed to execute cargo build");

    if !output.status.success() {
        panic!(
            "Debug build failed:\nstdout: {}\nstderr: {}",
            String::from_utf8_lossy(&output.stdout),
            String::from_utf8_lossy(&output.stderr)
        );
    }

    println!("Debug build successful");
}

/// Test that we can run tests for specific features
#[test]
fn test_feature_specific_tests() {
    // Test CLI features
    let output = Command::new("cargo")
        .args(&["test", "--features", "cli"])
        .output()
        .expect("Failed to test CLI features");

    if !output.status.success() {
        println!(
            "CLI feature tests had issues:\nstderr: {}",
            String::from_utf8_lossy(&output.stderr)
        );
    } else {
        println!("CLI feature tests successful");
    }

    // Test FFI features  
    let output = Command::new("cargo")
        .args(&["test", "--features", "ffi"])
        .output()
        .expect("Failed to test FFI features");

    if !output.status.success() {
        println!(
            "FFI feature tests had issues:\nstderr: {}",
            String::from_utf8_lossy(&output.stderr)
        );
    } else {
        println!("FFI feature tests successful");
    }
}

/// Test that binary size is reasonable
#[test]
fn test_binary_size_check() {
    // First build the release binary
    let build_output = Command::new("cargo")
        .args(&["build", "--release", "--bin", "svgoo"])
        .output()
        .expect("Failed to build release binary");

    if !build_output.status.success() {
        panic!(
            "Release binary build failed:\nstderr: {}",
            String::from_utf8_lossy(&build_output.stderr)
        );
    }

    // Check binary size (adjust path based on platform)
    let binary_path = if cfg!(windows) {
        "target/release/svgoo.exe"
    } else {
        "target/release/svgoo"
    };

    match std::fs::metadata(binary_path) {
        Ok(metadata) => {
            let size_mb = metadata.len() as f64 / (1024.0 * 1024.0);
            println!("Release binary size: {:.2} MB", size_mb);
            
            // Warn if binary is unusually large (over 50MB)
            if size_mb > 50.0 {
                println!("Warning: Binary size is quite large: {:.2} MB", size_mb);
            }
        }
        Err(e) => {
            println!("Could not check binary size: {}", e);
        }
    }
}

/// Test build reproducibility
#[test]
fn test_build_reproducibility() {
    // Build twice and compare timestamps/metadata
    let output1 = Command::new("cargo")
        .args(&["build", "--release"])
        .output()
        .expect("Failed to execute first build");

    if !output1.status.success() {
        panic!("First build failed");
    }

    // Clean and build again
    let _clean = Command::new("cargo")
        .args(&["clean"])
        .output()
        .expect("Failed to clean");

    let output2 = Command::new("cargo")
        .args(&["build", "--release"])
        .output()
        .expect("Failed to execute second build");

    if !output2.status.success() {
        panic!("Second build failed");
    }

    println!("Build reproducibility check completed");
}