# CHANGELOG.md

All notable changes to svgoo will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Comprehensive Documentation**: Complete README.md with installation, usage, examples, and troubleshooting
- **Contribution Guidelines**: Detailed CONTRIBUTING.md with development setup and guidelines
- **Enhanced CLI Help**: Improved help text with examples and detailed option descriptions
- **Quiet Mode**: Added --quiet/-q flag to suppress non-error output
- **Man Page**: Created manual page documentation in docs/svgoo.1.md

### Fixed
- **Compilation Issues**: Resolved all compilation errors in Thread A (AST patterns, plugin system, dependencies)
- **AST Visitor Pattern**: Simplified to avoid complex borrowing issues (MVP approach)
- **Plugin System**: Temporarily disabled to resolve AsyncRuntime threading constraints
- **JavaScript Integration**: Fixed bundle loading and simplified for MVP stability

### Implemented
- **Thread A (Fix Compilation)**: ✅ All compilation errors resolved, project builds successfully
- **Thread B (Core Functionality)**: ✅ Basic SVG optimization and file I/O working
- **Thread D (Documentation)**: ✅ Comprehensive documentation suite completed

### Tested
- ✅ 15 library unit tests passing
- ✅ 24 CLI integration tests passing  
- ✅ File I/O working (single and multiple files)
- ✅ Basic SVG optimization functional (removes comments, whitespace, normalizes)
- ✅ Multiple file processing with .min.svg output
- ✅ CLI flags (--help, --version, --quiet, --pretty) working

## [1.1.0] - 2025-06-20

### Fixed  
- AST visitor pattern borrowing issues resolved with unsafe pointer usage
- Build now succeeds with plugin module temporarily disabled

### Changed
- Refocused project scope to MVP 1.2.0 with realistic goals
- Updated all documentation (PLAN.md, TODO.md, README.md, CLAUDE.md) for MVP scope
- Restructured tasks into parallel and sequential threads
- Simplified goals to focus on stable, working tool over feature completeness

### Documentation
- PLAN.md rewritten with detailed MVP 1.2.0 implementation plan
- TODO.md simplified to focused checklist format
- README.md updated to reflect current working state
- CLAUDE.md updated with current project state and development strategies

### Known Issues
- Plugin system disabled due to AsyncRuntime not being Send/Sync
- Need to redesign plugin architecture for QuickJS constraints
- File I/O not yet implemented in CLI (priority for MVP)

## [0.2.0] - 2025-06-20

### Added
- **JavaScript Integration**: Successfully embedded real svgo code using rquickjs
- **Plugin Architecture**: Implemented AST representation and plugin system foundation
- Rollup bundling pipeline for optimizing svgo JavaScript (537KB bundle)
- Working SVG optimization via QuickJS runtime
- Functional stdin/stdout processing in CLI
- Test infrastructure comparing svgoo output with reference svgo
- AST module with visitor pattern matching svgo's structure
- Plugin trait system for bridging Rust and JavaScript plugins
- Plugin registry and execution framework
- JavaScript bridge functions for plugin integration

### Changed
- Refactored svgoo-embedded.js for QuickJS compatibility
- Updated rollup.config.js to handle Node.js built-ins as externals
- Switched from placeholder to real svgo optimization engine
- Improved embedded_js.rs with proper bundle loading
- Enhanced JavaScript bundle to expose plugin functions
- Rollup now outputs IIFE format for better QuickJS compatibility

### Fixed
- JavaScript module resolution in QuickJS environment
- Bundle embedding with rquickjs embed macro
- Test suite now properly validates SVG processing
- Rollup warnings about Node.js built-ins

## [0.1.0] - 2025-06-20

### Added
- Initial project structure and architecture
- Rust library foundation with rquickjs integration
- CLI interface with clap argument parsing
- Configuration system compatible with svgo format
- Error handling with comprehensive error types
- Basic SVG optimization framework (placeholder implementation)
- Cross-platform build system with Cargo
- GitHub Actions CI/CD pipeline for testing and releases
- Comprehensive test suite with async support
- Documentation structure (README, PLAN, TODO, CLAUDE.md)

### Development
- Project planning and architecture research completed
- Core module structure implemented
- Build system configured for cross-compilation
- Testing framework established
- CI/CD pipeline configured

### Technical Debt
- JavaScript svgo integration needs actual implementation
- Plugin system bridge to be developed
- FFI bindings for Python/C++ pending
- Performance optimization needed
- Comprehensive documentation required