# TODO.md

Flat itemized list of checkable tasks, focusing on the immediate future.

## Thread A: JavaScript Integration (HIGH PRIORITY - Sequential)

**Ready to start immediately**

- [ ] Download and analyze latest svgo source code structure
- [ ] Research rquickjs embed macro for JavaScript bundling
- [ ] Create svgo bundling script using webpack/rollup
- [ ] Generate JavaScript bytecode from svgo bundle
- [ ] Replace placeholder svgo implementation with real embedded code
- [ ] Test basic SVG optimization matches svgo output
- [ ] Implement plugin architecture bridge to match svgo's system
- [ ] Add plugin loading and configuration validation
- [ ] Create comprehensive accuracy test suite vs reference svgo

## Thread B: Testing & Validation (MEDIUM PRIORITY - Parallel)

**Can start in parallel with Thread A progress**

- [ ] Create end-to-end CLI test framework using assert_cmd
- [ ] Add integration tests for stdin/stdout processing
- [ ] Implement cross-platform build verification tests
- [ ] Create regression test suite against svgo reference outputs
- [ ] Add performance benchmarking vs svgo and osvg
- [ ] Test FFI bindings with example C programs
- [ ] Implement stress testing for large SVG files
- [ ] Add automated compatibility verification

## Thread C: Build Pipeline (MEDIUM PRIORITY - Sequential)

**Starts after Thread A completes bundling research**

- [ ] Set up Node.js build environment for svgo bundling
- [ ] Configure webpack/rollup for optimized svgo bundle
- [ ] Create automated build pipeline for JavaScript assets
- [ ] Implement build verification ensuring svgo compatibility
- [ ] Add automated svgo version update mechanism
- [ ] Create build caching system for JavaScript assets
- [ ] Optimize bundle size and startup performance

## Thread D: Advanced Features (LOW PRIORITY - Future)

**Future work after core functionality complete**

- [ ] Research PyO3 for Python bindings implementation
- [ ] Create C++ header generation system
- [ ] Implement property-based testing for edge cases
- [ ] Create homebrew formula for macOS distribution
- [ ] Research package manager integrations (winget, chocolatey)
- [ ] Add comprehensive migration guide from svgo
- [ ] Create contributor guidelines and development docs

## Foundation Tasks ✅ COMPLETED

- [x] Initialize Cargo.toml with dependencies
- [x] Set up project directory structure
- [x] Add rquickjs dependency
- [x] Create CLI structure with clap
- [x] Implement library interface
- [x] Set up comprehensive test framework
- [x] Create .gitignore for Rust project
- [x] Configure cross-compilation targets
- [x] Set up GitHub Actions CI/CD
- [x] Add optimization flags for releases
- [x] Implement FFI bindings foundation
- [x] Create comprehensive error handling
- [x] Document API with rustdoc

## Continuous Tasks

- [ ] Update CHANGELOG.md with changes
- [ ] Maintain test coverage >90%
- [ ] Keep PLAN.md current with progress
- [ ] Update CLAUDE.md with insights