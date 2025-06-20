# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Summary

**svgoo** is a Rust library and CLI that embeds the real svgo JavaScript optimizer via QuickJS, providing single-file deployment across platforms with planned Python/C++ bindings.

## Current Status (December 2024)

### ✅ Completed
- **Foundation**: Full Rust architecture, CLI, testing framework (13 tests passing)
- **JavaScript Integration**: Successfully embedded real svgo code via rquickjs
- **Basic Functionality**: SVG optimization working via stdin/stdout
- **Build System**: Rollup bundling pipeline producing 537KB JS bundle
- **CI/CD**: GitHub Actions for cross-platform builds

### 🚧 In Progress
- **Plugin Architecture**: Implementing svgo's plugin system bridge
- **File I/O**: Adding file input/output to CLI (currently stdin/stdout only)

### 📋 Next Priority
1. Complete plugin architecture bridge for full svgo compatibility
2. Implement production CLI features (file I/O, batch processing)
3. Performance optimization (target: within 2x of native svgo)
4. Comprehensive test suite with reference comparisons

## Architecture Overview

```
svgoo/
├── src/                    # Rust source code
│   ├── main.rs            # CLI entry point
│   ├── lib.rs             # Library interface
│   ├── core.rs            # Core optimization logic
│   ├── embedded_js.rs     # QuickJS integration (KEY FILE)
│   ├── optimize.rs        # Optimization API
│   ├── config.rs          # Configuration handling
│   ├── error.rs           # Error types
│   └── ffi.rs             # FFI bindings (foundation only)
├── js-src/                # JavaScript source
│   └── svgoo-standalone.js # svgo wrapper for QuickJS
├── js-dist/               # Bundled JavaScript
│   └── svgoo-embedded.js  # Rollup output (537KB)
├── svgo-analysis/         # Full svgo source code
└── rollup.config.js       # JavaScript bundling config
```

## Key Technical Details

1. **JavaScript Integration**
   - Uses rquickjs embed macro to bundle svgo at compile time
   - QuickJS runtime initialized on demand
   - JavaScript bytecode embedded in binary

2. **Current Limitations**
   - Some svgo optimizations less aggressive (plugin system incomplete)
   - No file I/O yet (stdin/stdout only)
   - Performance ~3-4x slower than native svgo (optimization needed)

3. **Testing**
   - Compare outputs with reference svgo implementation
   - All core Rust tests passing
   - Need comprehensive SVG test suite

## Development Guidelines

### Code Quality Standards
- Only modify code directly relevant to the specific request
- Never use placeholders - always include complete code
- Break problems into smaller steps before implementing
- Provide complete PLAN with REASONING before changes
- Add logging when debugging issues

### Working with JavaScript Integration
- The embed macro in `embedded_js.rs` requires js-dist/svgoo-embedded.js to exist
- Run `npm run build` to regenerate JavaScript bundle after changes
- Test with both simple and complex SVGs to verify compatibility

### Testing Strategy
1. Unit tests for Rust components
2. Integration tests comparing with svgo output
3. CLI tests using assert_cmd
4. Cross-platform verification in CI

### Performance Considerations
- QuickJS initialization is expensive - consider caching
- String transfer between Rust/JS can be optimized
- Bundle size affects startup time

## Recommended Development Strategies

### Immediate Focus (Week 1-2)
1. **Plugin Architecture** (Thread A)
   - Study svgo's plugin loading in detail
   - Create Rust<->JS bridge for plugin configs
   - Test each built-in plugin individually

2. **File I/O Implementation** (Thread B)
   - Add --output/-o flag support
   - Handle file permissions correctly
   - Support multiple input files

3. **Test Suite** (Thread D)
   - Create reference SVG test set
   - Automate comparison with svgo
   - Add regression tests

### Medium Term (Week 3-4)
1. **Performance Optimization**
   - Profile QuickJS overhead
   - Implement runtime pooling
   - Optimize JS bundle size

2. **Production Features**
   - Batch processing with --folder
   - Progress indicators
   - All svgo CLI flags

### Long Term
1. **Language Bindings**
   - PyO3 for Python
   - Modern C++ headers

2. **Distribution**
   - Package managers
   - Auto-updates

## Common Issues & Solutions

1. **Bundle not found**: Run `npm run build` first
2. **Test failures**: Compare with svgo output, check plugin configs
3. **Performance**: Use release builds, profile with flamegraph
4. **Cross-platform**: Test in Docker containers for Linux variants

## MCP Tools Usage

When available, use:
- `context7` for package documentation
- `sequentialthinking` for complex problem solving
- `perplexity_ask` for research
- Web search for latest svgo changes

## Critical Business Rules

1. **Must maintain exact svgo API compatibility**
2. **Output should match svgo as closely as possible**
3. **Single deployable binary requirement**
4. **Cross-language binding consistency**

## Common Issues & Solutions

### Threading with QuickJS
- **Issue**: AsyncRuntime is not Send/Sync, preventing use in trait objects
- **Solution**: Consider using channels to communicate with runtime on dedicated thread
- **Alternative**: Redesign plugin system to use synchronous execution within context

### JavaScript Bundle Size
- **Issue**: 537KB bundle size even after optimization
- **Solution**: Investigate dead code elimination for unused plugins
- **Consider**: Lazy loading plugins on demand

### Plugin System Design
- **Current**: AST and plugin traits implemented but blocked by threading
- **Next**: Either refactor to avoid Send/Sync requirement or use message passing

## Development Tips

1. **Building**: Always run `npm run build` before `cargo build` after JS changes
2. **Testing**: Use `cargo test -- --nocapture` to see println! output
3. **Debugging JS**: Add console.log in JS, visible in QuickJS runtime
4. **Rollup Issues**: Check external dependencies list if build hangs

## Next Actions for Contributors

1. Fix threading issues with plugin system
2. Complete plugin loading and validation
3. Add file I/O support to CLI
4. Create accuracy test suite comparing with svgo
5. Optimize bundle size and startup time

Remember: The goal is a drop-in replacement for svgo with the benefits of Rust's deployment story. Every decision should support this goal.