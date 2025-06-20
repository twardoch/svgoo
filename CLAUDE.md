# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Summary

**svgoo** is a Rust library and CLI that embeds the real svgo JavaScript optimizer via QuickJS, providing single-file deployment across platforms.

## Current State (June 2025)

### ✅ What's Working
- **JavaScript Integration**: svgo successfully embedded via rquickjs and QuickJS
- **Basic Optimization**: SVG optimization working via stdin/stdout
- **CLI Structure**: File I/O and multiple file support implemented
- **Build Pipeline**: Rollup creates 537KB JavaScript bundle

### ❌ What's Broken
- **Compilation Errors**: Plugin system has threading issues (AsyncRuntime not Send/Sync)
- **AST Visitor**: Borrowing/lifetime issues in visitor pattern implementation
- **Import Errors**: SvgoRuntime vs SvgooRuntime naming mismatch
- **Missing Dependencies**: futures crate not in Cargo.toml

### 🎯 MVP 1.2.0 Focus
The goal is a minimal but well-working SVG optimizer. NOT trying to achieve full svgo parity yet.

## Architecture Overview

```
svgoo/
├── src/
│   ├── main.rs            # CLI with file I/O support ✅
│   ├── lib.rs             # Library interface ✅
│   ├── core.rs            # Core optimization logic ✅
│   ├── embedded_js.rs     # QuickJS integration ✅
│   ├── optimize.rs        # Optimization API ✅
│   ├── config.rs          # Configuration ✅
│   ├── error.rs           # Error types ✅
│   ├── ast.rs             # AST representation ❌ (borrowing issues)
│   ├── plugin.rs          # Plugin system ❌ (threading issues)
│   └── ffi.rs             # FFI bindings (unused)
├── js-src/                # JavaScript source
│   └── svgoo-standalone.js # svgo wrapper ✅
├── js-dist/               # Bundled JavaScript
│   └── svgoo-embedded.js  # Rollup output ✅
└── tests/                 # Test suite ⚠️ (can't run due to compilation)
```

## Development Strategy for MVP

### Immediate Priority: Get It Compiling

1. **Fix AST Module**
   ```rust
   // Current issue: Closures trying to borrow mutable references
   // Solution: Either use Rc<RefCell<>> or redesign without closures
   ```

2. **Fix Plugin Module**  
   ```rust
   // Current issue: AsyncRuntime is not Send/Sync
   // Solution for MVP: Remove plugin system entirely, hardcode optimizations
   ```

3. **Add Missing Dependencies**
   ```toml
   # In Cargo.toml
   futures = "0.3"
   ```

### Recommended Approach

1. **Comment out broken modules** to get a clean build
2. **Focus on basic optimization** without plugin system
3. **Test thoroughly** with reference SVGs
4. **Document limitations** clearly

### Code Quality Standards

When fixing issues:
- Don't over-engineer the MVP solution
- Prefer simple over clever
- Comment WHY not just WHAT
- Test each fix incrementally

## Common Commands

```bash
# Always rebuild JS before Rust
npm run build && cargo build

# Test with simple SVG
echo '<svg><rect width="100" height="100"/></svg>' | cargo run

# Run specific test
cargo test test_file_input_to_stdout

# Check what's broken
cargo check 2>&1 | head -20
```

## Known Issues & Solutions

### Issue: "AsyncRuntime is not Send"
**Context**: Plugin system tries to store runtime in trait object
**MVP Solution**: Remove plugin system, hardcode default optimizations
**Future Solution**: Message passing architecture or synchronous execution

### Issue: "cannot assign to captured variable in Fn closure"  
**Context**: AST visitor pattern using closures
**MVP Solution**: Use function pointers or remove visitor pattern
**Future Solution**: Proper visitor trait with lifetime management

### Issue: QuickJS Compilation Errors
**Context**: JavaScript bundle sometimes fails to compile
**Solution**: Check for syntax errors, ensure IIFE format, verify no ES6 modules

## Testing Strategy

For MVP, focus on:
1. **Basic optimization works** (removes comments, whitespace)
2. **File I/O works** (single and multiple files)
3. **Error handling works** (invalid files, permissions)
4. **Cross-platform builds** work

## What NOT to Do for MVP

- Don't implement full plugin system
- Don't optimize for performance  
- Don't add Python/C++ bindings
- Don't implement advanced CLI features
- Don't aim for 100% svgo compatibility

## Recommended Next Steps

1. **Get it compiling** by removing/fixing broken parts
2. **Verify basic SVG optimization** works
3. **Test file I/O thoroughly**
4. **Document what works and what doesn't**
5. **Ship MVP 1.2.0**

## Critical Business Rules

1. **Single binary deployment** is non-negotiable
2. **Basic svgo compatibility** for common use cases
3. **Clear documentation** of limitations
4. **Reliable error handling** (no panics)

## MCP Tools Usage

When available, use:
- `context7` for Rust/JavaScript package docs
- `sequentialthinking` for debugging complex issues
- Web search for QuickJS/rquickjs specific problems

## Success Metrics for MVP

- [ ] Project compiles without errors
- [ ] Basic SVG optimization works
- [ ] Can process files from CLI
- [ ] Tests pass on macOS/Linux/Windows
- [ ] README clearly explains usage and limitations

Remember: **Done is better than perfect**. Ship a working MVP, then iterate.