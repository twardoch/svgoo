# PLAN.md

This file provides a detailed plan for the entire svgoo project with checkable tasks.

## Project Overview

svgoo is a Rust library and CLI that exposes the same API as svgo (JavaScript SVG optimizer) while bundling svgo code with QuickJS. The project enables single-file deployment across macOS, Linux, and Windows, with bindings for Python and C++ applications.

## Current Status Summary

### ✅ Completed Phases

1. **Foundation Phase** (100% Complete)
   - Core Rust architecture with modular design
   - CLI interface with clap argument parsing
   - Configuration system compatible with svgo
   - FFI bindings foundation
   - Comprehensive error handling
   - Testing framework (13 tests passing)
   - CI/CD pipeline with GitHub Actions

2. **JavaScript Integration Phase** (85% Complete)
   - Successfully embedded real svgo code via rquickjs
   - Rollup bundling pipeline configured (537KB bundle)
   - Working SVG optimization via QuickJS runtime
   - Basic stdin/stdout processing functional
   - Test comparison with reference svgo output

### 🚧 In Progress

- **Plugin Architecture Bridge** - Implementing svgo's plugin system in Rust/JS bridge
- **Configuration Compatibility** - Ensuring all svgo config options work correctly

### 📋 Upcoming Phases

1. **Production Features** - File I/O, batch processing, CLI flags
2. **Performance Optimization** - Runtime caching, concurrent processing
3. **Testing & Validation** - Comprehensive test suite, cross-platform verification
4. **Advanced Features** - Python/C++ bindings, package manager distribution

## Detailed Implementation Plan

### Thread A: JavaScript Plugin Architecture (HIGH PRIORITY - Sequential)

**Objective**: Complete the svgo plugin system integration to achieve full compatibility.

**Detailed Steps**:

1. **Plugin Bridge Implementation** (Current Focus)
   - Analyze svgo's plugin loading mechanism in detail
   - Create Rust structures to represent plugin configurations
   - Implement JavaScript<->Rust communication for plugin parameters
   - Handle plugin ordering and dependencies correctly
   - Support both built-in and custom plugins

2. **Configuration Validation**
   - Parse svgo.config.js/mjs files correctly
   - Validate plugin configurations against svgo schema
   - Provide helpful error messages for invalid configs
   - Support all svgo configuration formats (JSON, JS, MJS)

3. **Accuracy Test Suite**
   - Create comprehensive test SVGs covering all optimization scenarios
   - Compare byte-for-byte with svgo reference outputs
   - Test all built-in plugins individually
   - Verify plugin combinations work correctly
   - Add regression tests for known svgo bugs

### Thread B: Production CLI Features (HIGH PRIORITY - Parallel)

**Objective**: Implement all standard svgo CLI features for drop-in replacement.

**Detailed Steps**:

1. **File Input/Output**
   - Implement file reading with proper error handling
   - Support --output/-o flag for file output
   - Handle file permissions and overwrite scenarios
   - Support multiple input files
   - Preserve file timestamps if requested

2. **Batch Processing**
   - Implement --folder flag for directory processing
   - Support recursive directory traversal
   - Add glob pattern support (*.svg, **/*.svg)
   - Implement parallel processing for multiple files
   - Show progress bars for large batches

3. **CLI Flags Implementation**
   - --config: Load custom configuration files
   - --quiet/-q: Suppress non-error output
   - --verbose/-v: Show detailed processing information
   - --pretty: Format output SVG with indentation
   - --multipass: Run optimization multiple times
   - --precision: Set number precision
   - --indent: Set indentation (tabs/spaces)

### Thread C: Performance Optimization (MEDIUM PRIORITY - Sequential)

**Objective**: Achieve performance within 2x of native svgo (currently ~3-4x slower).

**Detailed Steps**:

1. **Runtime Optimization**
   - Profile QuickJS initialization overhead
   - Implement runtime pooling for concurrent requests
   - Cache compiled JavaScript bytecode
   - Optimize memory allocation patterns
   - Reduce startup time to <50ms

2. **Data Transfer Optimization**
   - Minimize string copying between Rust and JS
   - Use zero-copy techniques where possible
   - Optimize large SVG handling
   - Implement streaming for huge files
   - Profile and eliminate bottlenecks

3. **Bundle Optimization**
   - Analyze bundle with webpack-bundle-analyzer
   - Remove unused svgo code paths
   - Implement lazy loading for plugins
   - Optimize for common use cases
   - Reduce bundle size to <400KB

### Thread D: Testing & Validation (MEDIUM PRIORITY - Parallel)

**Objective**: Ensure reliability and compatibility across all platforms.

**Detailed Steps**:

1. **Integration Testing**
   - End-to-end CLI tests with assert_cmd
   - Test all CLI flag combinations
   - Verify error handling and messages
   - Test edge cases (empty files, invalid SVGs)
   - Add fuzzing for robustness

2. **Cross-Platform Testing**
   - Set up testing matrix for macOS/Linux/Windows
   - Test different architectures (x64, ARM64)
   - Verify single-binary deployment
   - Test in minimal environments
   - Check glibc/musl compatibility

3. **Performance Benchmarking**
   - Create benchmark suite with various SVG sizes
   - Compare with svgo, osvg, and other tools
   - Track performance over time
   - Identify optimization opportunities
   - Publish benchmark results

### Thread E: Advanced Features (LOW PRIORITY - Future)

**Objective**: Extend svgoo beyond basic svgo compatibility.

**Detailed Steps**:

1. **Language Bindings**
   - Research PyO3 for Python integration
   - Design pythonic API matching svgo-py patterns
   - Create C++ header with modern C++ features
   - Add examples for each language
   - Publish to PyPI and other registries

2. **Distribution Channels**
   - Create Homebrew formula
   - Submit to winget and chocolatey
   - Create snap and flatpak packages
   - Set up auto-update mechanisms
   - Add installation documentation

3. **Enhanced Features**
   - Add GUI viewer for before/after comparison
   - Implement watch mode for development
   - Add SVG validation beyond optimization
   - Create plugin development kit
   - Add telemetry (opt-in) for usage stats

## Implementation Timeline

### Week 1-2 (Current)
- ✅ Complete JavaScript integration foundation
- 🚧 Implement plugin architecture bridge
- 🚧 Add file I/O to CLI

### Week 3-4
- Complete all production CLI features
- Comprehensive testing suite
- Performance optimization phase 1

### Week 5-6
- Cross-platform verification
- Performance optimization phase 2
- Documentation and examples

### Future (As Needed)
- Python/C++ bindings
- Package manager distribution
- Enhanced features

## Success Metrics

1. **Compatibility**
   - [ ] 100% of svgo test suite passes
   - [ ] Byte-for-byte output match on reference SVGs
   - [ ] All CLI flags work identically to svgo

2. **Performance**
   - [ ] Startup time <100ms
   - [ ] Processing speed within 2x of svgo
   - [ ] Memory usage comparable to svgo

3. **Quality**
   - [ ] Test coverage >90%
   - [ ] Zero panics in production
   - [ ] Clear error messages

4. **Deployment**
   - [ ] Single binary <10MB
   - [ ] Works on all major platforms
   - [ ] No runtime dependencies

## Risk Mitigation

1. **QuickJS Limitations**
   - Fallback: Use V8 or SpiderMonkey if needed
   - Current assessment: QuickJS meeting all needs

2. **Performance Gap**
   - Fallback: Optimize critical paths in Rust
   - Current assessment: Acceptable performance achieved

3. **Compatibility Issues**
   - Fallback: Contribute fixes upstream to svgo
   - Current assessment: Good compatibility so far

## Next Immediate Actions

1. Complete plugin architecture bridge (Thread A.1)
2. Implement file I/O in CLI (Thread B.1)
3. Set up comprehensive test suite (Thread D.1)
4. Begin performance profiling (Thread C.1)