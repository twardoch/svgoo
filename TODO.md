# TODO.md

Flat itemized list of checkable tasks, focusing on the immediate future.

## Thread A: JavaScript Integration (HIGH PRIORITY - Sequential)

**Status: Mostly complete, plugin system remaining**

- [x] Download and analyze latest svgo source code structure
- [x] Research rquickjs embed macro for JavaScript bundling
- [x] Create svgo bundling script using webpack/rollup
- [x] Generate JavaScript bytecode from svgo bundle
- [x] Replace placeholder svgo implementation with real embedded code
- [x] Test basic SVG optimization matches svgo output
- [x] Implement plugin architecture bridge to match svgo's system
- [ ] Fix threading issues with plugin system (AsyncRuntime not Send/Sync)
- [ ] Add plugin loading and configuration validation
- [ ] Create comprehensive accuracy test suite vs reference svgo

## Thread B: Testing & Validation (MEDIUM PRIORITY - Parallel)

**Status: Can run in parallel, foundation exists**

- [ ] Create end-to-end CLI test framework using assert_cmd
- [ ] Add integration tests for file input/output
- [ ] Implement cross-platform build verification tests
- [ ] Create regression test suite against svgo reference outputs
- [ ] Add performance benchmarking vs svgo and osvg
- [ ] Test FFI bindings with example C programs
- [ ] Implement stress testing for large SVG files
- [ ] Add automated compatibility verification

## Thread C: Performance & Optimization (MEDIUM PRIORITY - Sequential)

**Status: Ready to start after plugin system**

- [ ] Optimize QuickJS runtime creation and caching
- [ ] Implement runtime pooling for concurrent operations
- [ ] Profile and optimize JavaScript<->Rust data transfer
- [ ] Reduce bundle size with better tree-shaking
- [ ] Add lazy loading for unused svgo plugins
- [ ] Optimize startup time with bytecode caching
- [ ] Implement streaming processing for large files

## Thread D: Production Features (HIGH PRIORITY - Parallel)

**Status: Ready to start**

- [ ] Implement file input/output in CLI (currently stdin/stdout only)
- [ ] Add --config flag for custom configuration files
- [ ] Implement --folder flag for batch processing
- [ ] Add progress indicators for batch operations
- [ ] Implement --quiet and --verbose flags
- [ ] Add --pretty flag for formatted output
- [ ] Support glob patterns for file selection

## Thread E: Advanced Features (LOW PRIORITY - Future)

**Status: Future work after core functionality complete**

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
- [x] JavaScript integration via rquickjs
- [x] Rollup bundling configuration
- [x] Basic SVG optimization working

## Continuous Tasks

- [x] Update CHANGELOG.md with changes (just done)
- [ ] Maintain test coverage >90%
- [x] Keep PLAN.md current with progress (updating now)
- [ ] Update CLAUDE.md with insights (will do next)