# Contributing to svgoo

Thank you for your interest in contributing to svgoo! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- [Rust](https://rustup.rs/) (latest stable version)
- [Node.js](https://nodejs.org/) (for building JavaScript bundle)
- Git

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/svgoo.git
   cd svgoo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build    # Build JavaScript bundle
   cargo build      # Build Rust code
   ```

4. **Run tests**
   ```bash
   cargo test       # Run all tests
   cargo test --test cli_integration  # Run CLI tests only
   ```

5. **Try the CLI**
   ```bash
   echo '<svg><rect width="10" height="10"/></svg>' | cargo run
   ```

## 📋 Project Structure

```
svgoo/
├── src/                    # Rust source code
│   ├── main.rs            # CLI entry point
│   ├── lib.rs             # Public library interface
│   ├── core.rs            # Core optimization logic
│   ├── embedded_js.rs     # JavaScript integration
│   ├── optimize.rs        # High-level API
│   ├── config.rs          # Configuration handling
│   ├── error.rs           # Error types
│   └── ast.rs             # AST representation
├── js-src/                # JavaScript source
│   └── svgoo-standalone.js # SVG optimization wrapper
├── js-dist/               # Built JavaScript bundle
│   └── svgoo-embedded.js  # Rollup output
├── tests/                 # Integration tests
│   ├── cli_integration.rs # CLI functionality tests
│   └── ...               # Other test files
├── docs/                  # Documentation
├── CHANGELOG.md           # Project changelog
├── TODO.md               # Current tasks
├── PLAN.md               # Detailed project plan
└── CLAUDE.md             # Development guidance
```

## 🔧 Development Workflow

### Building

```bash
# Full build process
npm run build && cargo build

# Release build
cargo build --release

# Clean build
cargo clean && npm run build && cargo build
```

### Testing

```bash
# Run all tests
cargo test

# Run specific test types
cargo test --lib                    # Unit tests
cargo test --test cli_integration   # CLI tests
cargo test --test "*integration*"   # Integration tests

# Run tests with output
cargo test -- --nocapture

# Run specific test
cargo test test_file_input_to_stdout
```

### Linting and Formatting

```bash
# Format code
cargo fmt

# Check lints
cargo clippy

# Fix automatically fixable issues
cargo clippy --fix
cargo fix
```

## 📝 Code Guidelines

### Rust Code Style

- Use `cargo fmt` for formatting
- Follow Rust naming conventions (snake_case for functions, PascalCase for types)
- Write documentation for public APIs
- Add `this_file` comments at the top of each file

```rust
// this_file: src/example.rs

//! Brief module description
//! 
//! Longer description of what this module does.

/// Brief function description
/// 
/// # Arguments
/// 
/// * `param` - Description of parameter
/// 
/// # Returns
/// 
/// Description of return value
pub fn example_function(param: &str) -> Result<String, Error> {
    // Implementation
}
```

### JavaScript Code Style

- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions small and focused

```javascript
/**
 * Optimize SVG content
 * @param {string} svgString - Input SVG as string
 * @param {Object} config - Configuration options
 * @returns {Object} - Optimization result
 */
function optimize(svgString, config = {}) {
    // Implementation
}
```

### Testing Guidelines

- Write tests for new functionality
- Test both success and error cases
- Use descriptive test names
- Include integration tests for CLI changes

```rust
#[test]
fn test_specific_functionality() {
    // Arrange
    let input = "test input";
    
    // Act
    let result = function_under_test(input);
    
    // Assert
    assert!(result.is_ok());
    assert_eq!(result.unwrap(), "expected output");
}
```

## 🎯 How to Contribute

### 1. Choose an Issue

- Look at [open issues](https://github.com/twardoch/svgoo/issues)
- Check the `good first issue` label for beginner-friendly tasks
- Comment on the issue to let others know you're working on it

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

### 3. Make Changes

- Follow the code guidelines above
- Write tests for your changes
- Update documentation if needed
- Keep commits focused and atomic

### 4. Test Your Changes

```bash
# Run tests
cargo test

# Test CLI manually
echo '<svg><rect/></svg>' | cargo run

# Test with multiple files
cargo run test1.svg test2.svg

# Test edge cases
cargo run nonexistent.svg  # Should error gracefully
```

### 5. Commit Your Changes

Use conventional commit messages:

```bash
git commit -m "feat: add support for custom output directory"
git commit -m "fix: handle empty SVG files correctly"
git commit -m "docs: update CLI examples in README"
git commit -m "test: add integration test for multiple files"
```

Commit types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `test`: Adding or modifying tests
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `chore`: Maintenance tasks

### 6. Submit a Pull Request

1. Push your branch to your fork
2. Create a pull request with:
   - Clear title describing the change
   - Detailed description of what was changed and why
   - Link to related issues
   - Screenshots if UI-related

## 🐛 Reporting Issues

### Bug Reports

Please include:
- Operating system and version
- Rust version (`rustc --version`)
- svgoo version
- Input SVG file (if possible)
- Command used
- Expected vs actual behavior
- Full error output

### Feature Requests

Please include:
- Clear description of the feature
- Use case and motivation
- Proposed implementation (if you have ideas)
- Compatibility considerations

## 📚 Documentation

### Types of Documentation

1. **Code Documentation**: Inline comments and rustdoc
2. **User Documentation**: README.md, examples
3. **Developer Documentation**: This file, PLAN.md, CLAUDE.md

### Documentation Guidelines

- Keep examples up to date
- Use clear, concise language
- Include code examples where helpful
- Update documentation when changing functionality

## 🎨 Areas for Contribution

### High Priority
- Performance optimizations
- Cross-platform testing
- Bug fixes
- Documentation improvements

### Medium Priority
- Additional SVG optimizations
- CLI improvements
- Test coverage improvements
- Error message improvements

### Low Priority (Future)
- Plugin system implementation
- Language bindings
- GUI interface
- Advanced features

## 🚦 Release Process

Releases are managed by maintainers and follow semantic versioning:

- `1.x.y` - Major versions (breaking changes)
- `x.1.y` - Minor versions (new features)
- `x.x.1` - Patch versions (bug fixes)

## 📞 Getting Help

- **Questions**: Open a [GitHub Discussion](https://github.com/twardoch/svgoo/discussions)
- **Bugs**: Open a [GitHub Issue](https://github.com/twardoch/svgoo/issues)
- **Chat**: Join our community channels (links TBD)

## 📜 Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all. Please:

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow the [Rust Code of Conduct](https://www.rust-lang.org/policies/code-of-conduct)

## 🙏 Recognition

Contributors are recognized in:
- CHANGELOG.md for their contributions
- GitHub contributors page
- Special thanks in release notes

Thank you for contributing to svgoo! 🎉