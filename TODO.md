# TODO.md

Simple checklist for svgoo MVP version 1.2.0 - a minimal but well-working SVG optimizer.

## Thread A: Fix Compilation (CRITICAL - Sequential)

- [ ] Fix AST visitor pattern lifecycle/borrowing issues
- [ ] Resolve plugin.rs import errors (SvgoRuntime -> SvgooRuntime)
- [ ] Add missing futures dependency to Cargo.toml
- [ ] Remove or fix plugin system to avoid AsyncRuntime Send/Sync issues
- [ ] Ensure npm run build && cargo build succeeds
- [ ] Verify cargo test passes all existing tests

## Thread B: Core Functionality (HIGH - Sequential) 

- [ ] Verify basic SVG optimization works correctly
- [ ] Test file I/O thoroughly (single and multiple files)
- [ ] Ensure stdin/stdout processing is reliable
- [ ] Compare output with reference svgo for basic cases
- [ ] Document any optimization differences from svgo

## Thread C: Testing & Validation (HIGH - Parallel)

- [ ] Create 10 reference SVG test cases
- [ ] Add integration tests for all CLI flags
- [ ] Test error handling (invalid files, permissions)
- [ ] Verify cross-platform builds (Linux, macOS, Windows)
- [ ] Add CI tests for all platforms

## Thread D: Documentation (MEDIUM - Parallel)

- [ ] Write clear installation instructions
- [ ] Document all CLI options with examples
- [ ] List known limitations and differences from svgo
- [ ] Create troubleshooting guide
- [ ] Add contribution guidelines

## Thread E: Release Preparation (LOW - Sequential)

- [ ] Set version to 1.2.0 in Cargo.toml
- [ ] Create release binaries for all platforms
- [ ] Write release notes highlighting features and limitations
- [ ] Tag release in git
- [ ] Update installation instructions with download links

## Deferred to Post-MVP

- Full plugin system compatibility
- Performance optimization
- Python/C++ bindings
- Package manager distribution
- Advanced CLI features