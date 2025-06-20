# CHANGELOG.md

All notable changes to svgoo will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

### In Progress
- Threading compatibility issues with AsyncRuntime (not Send/Sync)
- Plugin loading and execution validation
- AST conversion between Rust and JavaScript

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