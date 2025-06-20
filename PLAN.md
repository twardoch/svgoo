# PLAN.md - svgoo Version 1.2.0 MVP

This document outlines the focused plan for svgoo version 1.2.0 - a minimal viable product that provides a stable, well-documented SVG optimization tool compatible with basic svgo usage.

## MVP Scope Definition

### What Version 1.2.0 Will Be
- A stable, single-binary SVG optimizer that works on all major platforms
- Compatible with basic svgo usage patterns (file input/output, stdin/stdout)
- Well-documented with clear installation and usage instructions
- Properly tested with >80% code coverage
- Performance within 3-5x of native svgo (acceptable for most use cases)

### What Version 1.2.0 Will NOT Be
- Full plugin system compatibility (deferred to 2.0)
- Python/C++ bindings (deferred to 2.0)
- Advanced CLI features like watch mode or GUI (future versions)
- 100% feature parity with svgo (focus on 80% most-used features)

## Current State Assessment

### Working Components
- ✅ Basic SVG optimization via embedded svgo JavaScript
- ✅ QuickJS runtime integration functioning
- ✅ CLI with stdin/stdout support
- ✅ Project builds and runs on macOS
- ✅ Test infrastructure in place

### Broken/Incomplete Components
- ❌ Plugin system (threading issues with AsyncRuntime)
- ❌ File I/O in CLI
- ❌ Cross-platform testing
- ❌ Performance optimization
- ❌ Comprehensive documentation

## Implementation Threads for MVP

### Thread A: Core Stability (CRITICAL - Sequential)
**Goal**: Fix critical issues and ensure reliable operation

#### A1. Simplify Plugin Architecture (1 week)
- [ ] Remove complex plugin bridge code
- [ ] Implement simple hardcoded plugin pipeline matching svgo defaults
- [ ] Ensure all default svgo optimizations work correctly
- [ ] Add configuration to enable/disable specific optimizations
- [ ] Test against svgo reference outputs

#### A2. Fix JavaScript Integration Issues (3 days)
- [ ] Resolve QuickJS compilation warnings
- [ ] Ensure proper error handling from JavaScript runtime
- [ ] Add timeout protection for long-running optimizations
- [ ] Improve error messages for invalid SVG input

#### A3. Memory and Resource Management (3 days)
- [ ] Profile memory usage with large SVG files
- [ ] Implement proper cleanup of JavaScript contexts
- [ ] Add resource limits to prevent runaway processes
- [ ] Test with stress scenarios (large files, many files)

### Thread B: Essential CLI Features (HIGH PRIORITY - Parallel)
**Goal**: Implement must-have CLI functionality for real-world usage

#### B1. File Input/Output (3 days)
- [ ] Implement basic file reading with error handling
- [ ] Add `-o/--output` flag for file output
- [ ] Support reading from file and writing to stdout
- [ ] Support reading from stdin and writing to file
- [ ] Handle file permissions and overwrite scenarios

#### B2. Multiple File Processing (2 days)
- [ ] Support multiple input files on command line
- [ ] Generate output filenames (input.svg → input.min.svg)
- [ ] Add `--suffix` flag to customize output suffix
- [ ] Show simple progress for batch operations
- [ ] Handle errors gracefully (continue on failure)

#### B3. Essential CLI Flags (2 days)
- [ ] `--help/-h`: Comprehensive help text
- [ ] `--version/-v`: Show version information
- [ ] `--quiet/-q`: Suppress non-error output
- [ ] `--pretty`: Format output with indentation
- [ ] `--config`: Load configuration from JSON file

### Thread C: Quality Assurance (MEDIUM PRIORITY - Parallel)
**Goal**: Ensure reliability and compatibility

#### C1. Comprehensive Testing (1 week)
- [ ] Create test suite with 50+ real-world SVG files
- [ ] Compare outputs with svgo for compatibility
- [ ] Add integration tests for all CLI features
- [ ] Test error scenarios (invalid files, permissions)
- [ ] Achieve >80% code coverage

#### C2. Cross-Platform Verification (3 days)
- [ ] Test on Ubuntu 20.04 and 22.04
- [ ] Test on Windows 10 and 11
- [ ] Test on macOS 12+ (Intel and ARM)
- [ ] Verify single-binary deployment works
- [ ] Document platform-specific issues

#### C3. Performance Baseline (2 days)
- [ ] Benchmark against svgo with various file sizes
- [ ] Document performance characteristics
- [ ] Identify bottlenecks for future optimization
- [ ] Set realistic performance expectations

### Thread D: Documentation (HIGH PRIORITY - Parallel)
**Goal**: Make svgoo easy to adopt and use

#### D1. User Documentation (3 days)
- [ ] Write comprehensive README with examples
- [ ] Create installation guide for each platform
- [ ] Document all CLI options with examples
- [ ] Add migration guide from svgo
- [ ] Include troubleshooting section

#### D2. Developer Documentation (2 days)
- [ ] Document project architecture
- [ ] Explain JavaScript integration approach
- [ ] Create contributor guidelines
- [ ] Document build process for all platforms
- [ ] Add debugging tips

#### D3. Release Documentation (1 day)
- [ ] Create CHANGELOG for 1.2.0
- [ ] Write release notes highlighting features
- [ ] Prepare announcement blog post
- [ ] Update all version numbers
- [ ] Tag release in git

## Success Criteria for Version 1.2.0

### Functional Requirements
- [x] Optimizes SVG files via CLI (stdin/stdout)
- [ ] Reads SVG files from disk
- [ ] Writes optimized SVG files to disk
- [ ] Processes multiple files in one command
- [ ] Provides helpful error messages
- [ ] Works on macOS, Linux, and Windows

### Quality Requirements
- [ ] Zero panics in normal usage
- [ ] >80% test coverage
- [ ] All tests pass on all platforms
- [ ] Performance within 5x of svgo
- [ ] Binary size under 15MB
- [ ] Memory usage under 100MB for typical files

### Documentation Requirements
- [ ] README explains installation and usage
- [ ] All CLI flags documented
- [ ] Common use cases covered with examples
- [ ] Troubleshooting guide available
- [ ] Architecture documented for contributors

## Development Timeline

### Week 1 (Current)
- Fix critical issues (Thread A1-A2)
- Implement file I/O (Thread B1)
- Start documentation (Thread D1)

### Week 2
- Complete essential CLI features (Thread B2-B3)
- Begin comprehensive testing (Thread C1)
- Continue documentation (Thread D2)

### Week 3
- Cross-platform testing (Thread C2)
- Performance baseline (Thread C3)
- Finalize documentation (Thread D3)
- Prepare for release

### Week 4
- Bug fixes from testing
- Final documentation review
- Release version 1.2.0

## Risk Mitigation

### Technical Risks
1. **Plugin System Complexity**
   - Mitigation: Hardcode default optimizations for MVP
   - Future: Redesign for version 2.0

2. **Performance Issues**
   - Mitigation: Document current limitations
   - Future: Optimize in subsequent versions

3. **Platform Compatibility**
   - Mitigation: Test early and often
   - Future: Use CI/CD for automated testing

### Schedule Risks
1. **Scope Creep**
   - Mitigation: Strictly adhere to MVP definition
   - Future: Maintain backlog for post-1.2.0

2. **Unknown Issues**
   - Mitigation: Time buffer in week 4
   - Future: Regular releases for quick fixes

## Post-MVP Roadmap (Version 2.0+)

- Redesigned plugin system with proper threading
- Python and C++ bindings
- Performance optimizations
- Advanced CLI features (watch mode, parallel processing)
- Package manager distribution
- Web assembly version

## Next Immediate Actions

1. Comment out plugin module to get clean build ✅
2. Implement file I/O in CLI (Thread B1)
3. Create test SVG collection (Thread C1)
4. Write initial README (Thread D1)
5. Set up cross-platform CI (Thread C2)