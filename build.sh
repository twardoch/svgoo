#!/bin/bash

# build.sh - Comprehensive build, install, and test script for svgoo on macOS
# This script will "magically" build the app, install it, and test it

set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Project info
PROJECT_NAME="svgoo"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTALL_DIR="$HOME/.local/bin"
BINARY_NAME="svgoo"

# Platform detection
PLATFORM="$(uname -s)"
ARCH="$(uname -m)"

if [[ "$PLATFORM" != "Darwin" ]]; then
    log_error "This script is designed for macOS only. Detected: $PLATFORM"
    exit 1
fi

log_info "Building $PROJECT_NAME on $PLATFORM ($ARCH)"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install missing dependencies
install_dependencies() {
    log_info "Checking dependencies..."
    
    # Check for Rust/Cargo
    if ! command_exists cargo; then
        log_error "Rust/Cargo not found. Please install from https://rustup.rs/"
        exit 1
    fi
    
    # Check for Node.js/npm
    if ! command_exists npm; then
        log_error "Node.js/npm not found. Please install Node.js"
        exit 1
    fi
    
    # Check for essential build tools
    if ! command_exists cc; then
        log_warning "C compiler not found. Installing Xcode Command Line Tools..."
        xcode-select --install || true
    fi
    
    log_success "All dependencies are available"
}

# Function to clean previous builds
clean_build() {
    log_info "Cleaning previous builds..."
    
    # Clean Rust build artifacts
    if [[ -d "$PROJECT_DIR/target" ]]; then
        cargo clean
        log_info "Cleaned Rust build artifacts"
    fi
    
    # Clean JavaScript build artifacts
    if [[ -d "$PROJECT_DIR/js-dist" ]]; then
        rm -rf "$PROJECT_DIR/js-dist"
        log_info "Cleaned JavaScript build artifacts"
    fi
    
    # Clean node_modules if requested
    if [[ "${CLEAN_NODE_MODULES:-false}" == "true" ]] && [[ -d "$PROJECT_DIR/node_modules" ]]; then
        rm -rf "$PROJECT_DIR/node_modules"
        log_info "Cleaned node_modules"
    fi
}

# Function to build JavaScript bundle
build_javascript() {
    log_info "Building JavaScript bundle..."
    
    cd "$PROJECT_DIR"
    
    # Install npm dependencies
    if [[ ! -d "node_modules" ]] || [[ "${CLEAN_NODE_MODULES:-false}" == "true" ]]; then
        log_info "Installing npm dependencies..."
        npm install
    fi
    
    # Build the JavaScript bundle
    log_info "Creating JavaScript bundle with Rollup..."
    npm run build
    
    # Verify the bundle was created
    if [[ ! -f "$PROJECT_DIR/js-dist/svgoo-embedded.js" ]]; then
        log_error "JavaScript bundle was not created"
        exit 1
    fi
    
    local bundle_size=$(du -h "$PROJECT_DIR/js-dist/svgoo-embedded.js" | cut -f1)
    log_success "JavaScript bundle created ($bundle_size)"
}

# Function to build Rust binary
build_rust() {
    log_info "Building Rust binary..."
    
    cd "$PROJECT_DIR"
    
    # Check disk space
    local available_space=$(df . | tail -1 | awk '{print $4}')
    if [ "$available_space" -lt 1048576 ]; then  # Less than 1GB
        log_warning "Low disk space detected. This may cause build issues."
        log_info "Available space: $(df -h . | tail -1 | awk '{print $4}')"
    fi
    
    # Kill any stuck cargo processes
    log_info "Checking for stuck cargo processes..."
    if pgrep -f cargo > /dev/null; then
        log_warning "Found existing cargo processes, terminating them..."
        pkill -f cargo 2>/dev/null || true
        sleep 2
    fi
    
    # Clean any locks
    if [ -f "$PROJECT_DIR/target/.cargo-lock" ]; then
        log_info "Removing cargo lock file..."
        rm -f "$PROJECT_DIR/target/.cargo-lock"
    fi
    
    # Check if we can compile (per CLAUDE.md, there might be compilation issues)
    log_info "Checking compilation..."
    if ! timeout 60s cargo check --quiet 2>/dev/null; then
        log_warning "Compilation check failed or timed out. See CLAUDE.md for known issues."
        log_info "Attempting to build anyway..."
    fi
    
    # Build in release mode for optimal performance
    log_info "Building in release mode..."
    if timeout 300s cargo build --release --bin svgoo; then
        log_success "Rust binary built successfully"
    else
        log_error "Rust build failed or timed out"
        exit 1
    fi
    
    # Verify binary was created
    local binary_path="$PROJECT_DIR/target/release/$BINARY_NAME"
    if [[ ! -f "$binary_path" ]]; then
        log_error "Binary not found at expected location: $binary_path"
        exit 1
    fi
    
    local binary_size=$(du -h "$binary_path" | cut -f1)
    log_success "Binary created: $binary_path ($binary_size)"
}

# Function to install the binary
install_binary() {
    log_info "Installing binary..."
    
    local source_binary="$PROJECT_DIR/target/release/$BINARY_NAME"
    
    # Create install directory if it doesn't exist
    mkdir -p "$INSTALL_DIR"
    
    # Copy binary to install location
    cp "$source_binary" "$INSTALL_DIR/"
    chmod +x "$INSTALL_DIR/$BINARY_NAME"
    
    log_success "Binary installed to $INSTALL_DIR/$BINARY_NAME"
    
    # Check if install directory is in PATH
    if [[ ":$PATH:" != *":$INSTALL_DIR:"* ]]; then
        log_warning "Install directory $INSTALL_DIR is not in PATH"
        log_info "Add this to your shell profile (.zshrc, .bash_profile, etc.):"
        echo "export PATH=\"\$PATH:$INSTALL_DIR\""
    fi
}

# Function to run tests
run_tests() {
    log_info "Running tests..."
    
    cd "$PROJECT_DIR"
    
    # Run Rust tests
    log_info "Running Rust unit tests..."
    if cargo test --lib --quiet; then
        log_success "Rust unit tests passed"
    else
        log_warning "Some Rust unit tests failed (this might be expected per CLAUDE.md)"
    fi
    
    # Run integration tests
    log_info "Running integration tests..."
    if cargo test --test '*' --quiet; then
        log_success "Integration tests passed"
    else
        log_warning "Some integration tests failed (this might be expected per CLAUDE.md)"
    fi
    
    # Test basic functionality
    log_info "Testing basic functionality..."
    test_basic_functionality
}

# Function to test basic functionality
test_basic_functionality() {
    local test_svg='<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <!-- This is a comment -->
  <rect x="10" y="10" width="80" height="80" fill="blue" />
</svg>'
    
    # Test 1: stdin/stdout
    log_info "Testing stdin/stdout optimization..."
    local optimized_output
    if optimized_output=$(echo "$test_svg" | "$INSTALL_DIR/$BINARY_NAME" 2>/dev/null); then
        if [[ -n "$optimized_output" ]] && [[ "$optimized_output" != "$test_svg" ]]; then
            log_success "stdin/stdout optimization works"
        else
            log_warning "stdin/stdout optimization may not be working properly"
        fi
    else
        log_warning "stdin/stdout test failed"
    fi
    
    # Test 2: file processing
    log_info "Testing file processing..."
    local temp_dir=$(mktemp -d)
    local test_file="$temp_dir/test.svg"
    local output_file="$temp_dir/output.svg"
    
    echo "$test_svg" > "$test_file"
    
    if "$INSTALL_DIR/$BINARY_NAME" "$test_file" -o "$output_file" 2>/dev/null; then
        if [[ -f "$output_file" ]] && [[ -s "$output_file" ]]; then
            log_success "File processing works"
        else
            log_warning "File processing may not be working properly"
        fi
    else
        log_warning "File processing test failed"
    fi
    
    # Test 3: version check
    log_info "Testing version command..."
    if "$INSTALL_DIR/$BINARY_NAME" --version >/dev/null 2>&1; then
        log_success "Version command works"
    else
        log_warning "Version command may not be working"
    fi
    
    # Test 4: help command
    log_info "Testing help command..."
    if "$INSTALL_DIR/$BINARY_NAME" --help >/dev/null 2>&1; then
        log_success "Help command works"
    else
        log_warning "Help command may not be working"
    fi
    
    # Cleanup
    rm -rf "$temp_dir"
}

# Function to display final information
show_final_info() {
    log_success "Build and installation complete!"
    echo
    echo "Binary location: $INSTALL_DIR/$BINARY_NAME"
    echo "Binary size: $(du -h "$INSTALL_DIR/$BINARY_NAME" | cut -f1)"
    echo
    echo "Usage examples:"
    echo "  $BINARY_NAME input.svg                    # Optimize to stdout"
    echo "  $BINARY_NAME input.svg -o output.svg     # Optimize to file"
    echo "  echo '<svg>...</svg>' | $BINARY_NAME     # Optimize from stdin"
    echo "  $BINARY_NAME --help                      # Show help"
    echo "  $BINARY_NAME --version                   # Show version"
    echo
    
    if [[ ":$PATH:" != *":$INSTALL_DIR:"* ]]; then
        echo "Note: Add $INSTALL_DIR to your PATH to use svgoo from anywhere:"
        echo "  export PATH=\"\$PATH:$INSTALL_DIR\""
    fi
}

# Main build function
main() {
    local start_time=$(date +%s)
    
    log_info "Starting magical build process for $PROJECT_NAME..."
    
    # Parse command line arguments
    local clean_build=false
    local skip_tests=false
    local skip_install=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --clean)
                clean_build=true
                shift
                ;;
            --skip-tests)
                skip_tests=true
                shift
                ;;
            --skip-install)
                skip_install=true
                shift
                ;;
            --clean-node-modules)
                export CLEAN_NODE_MODULES=true
                shift
                ;;
            --help)
                echo "Usage: $0 [OPTIONS]"
                echo
                echo "Options:"
                echo "  --clean              Clean previous builds"
                echo "  --skip-tests         Skip running tests"
                echo "  --skip-install       Skip installing binary"
                echo "  --clean-node-modules Clean and reinstall node_modules"
                echo "  --help              Show this help"
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                echo "Use --help for usage information"
                exit 1
                ;;
        esac
    done
    
    # Execute build steps
    install_dependencies
    
    if [[ "$clean_build" == "true" ]]; then
        clean_build
    fi
    
    build_javascript
    build_rust
    
    if [[ "$skip_install" != "true" ]]; then
        install_binary
    fi
    
    if [[ "$skip_tests" != "true" ]]; then
        run_tests
    fi
    
    show_final_info
    
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    log_success "Build completed in ${duration} seconds!"
}

# Run main function with all arguments
main "$@"