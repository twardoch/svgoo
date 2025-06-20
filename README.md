# svgoo

[![Crates.io](https://img.shields.io/crates/v/svgoo)](https://crates.io/crates/svgoo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/twardoch/svgoo/workflows/CI/badge.svg)](https://github.com/twardoch/svgoo/actions)

**svgoo** is a cross-platform SVG optimization tool that embeds the popular [svgo](https://github.com/svg/svgo) JavaScript optimizer in a single Rust binary. No Node.js required!

## 🚀 Quick Start

```bash
# Install from source (releases coming soon)
git clone https://github.com/twardoch/svgoo.git
cd svgoo
npm run build && cargo build --release

# Optimize a single SVG file
./target/release/svgoo input.svg -o output.svg

# Process multiple files
./target/release/svgoo *.svg

# Use with pipes
cat input.svg | ./target/release/svgoo > output.svg
```

## 📦 Installation

### From Source (Current)

**Prerequisites:**
- [Rust](https://rustup.rs/) (latest stable)
- [Node.js](https://nodejs.org/) (for building JavaScript bundle)

```bash
git clone https://github.com/twardoch/svgoo.git
cd svgoo
npm install
npm run build
cargo build --release
```

The binary will be available at `./target/release/svgoo`.

### Pre-built Binaries (Coming Soon)

Release binaries will be available for:
- macOS (Intel & Apple Silicon)
- Linux (x86_64)
- Windows (x86_64)

## 🛠️ Usage

### Command Line Interface

```bash
svgoo [OPTIONS] [INPUT_FILES...]
```

### Options

| Option | Short | Description | Example |
|--------|-------|-------------|---------|
| `--output` | `-o` | Output file (use `-` for stdout) | `svgoo input.svg -o output.svg` |
| `--help` | `-h` | Show help information | `svgoo --help` |
| `--version` | `-v` | Show version information | `svgoo --version` |
| `--quiet` | `-q` | Suppress non-error output | `svgoo --quiet input.svg` |
| `--pretty` | | Format output with indentation | `svgoo --pretty input.svg` |
| `--config` | `-c` | Load configuration from file | `svgoo --config svgo.config.json input.svg` |

### Examples

#### Single File Optimization
```bash
# Basic optimization
svgoo input.svg -o output.svg

# With pretty formatting
svgoo --pretty input.svg -o output.svg

# To stdout
svgoo input.svg
```

#### Multiple Files
```bash
# Process multiple files (creates .min.svg versions)
svgoo file1.svg file2.svg file3.svg

# Process all SVG files in directory
svgoo *.svg

# With custom output directory (via shell)
for file in *.svg; do
  svgoo "$file" -o "optimized_${file}"
done
```

#### Pipe Usage
```bash
# Standard Unix pipe
cat input.svg | svgoo > output.svg

# With other tools
curl -s https://example.com/icon.svg | svgoo | gzip > icon.svg.gz

# Process from web
wget -qO- https://example.com/icon.svg | svgoo -o icon.svg
```

#### Configuration
```bash
# Use custom configuration (coming in v2.0)
svgoo --config my-svgo.config.json input.svg
```

## ✨ Features

### Current (v1.2.0)
- ✅ **Single Binary**: No Node.js or dependencies required
- ✅ **Cross-Platform**: Works on macOS, Linux, and Windows
- ✅ **Fast**: Basic SVG optimizations in ~100ms
- ✅ **Compatible**: Produces similar output to svgo
- ✅ **Thoroughly Tested**: 89 tests across all components and platforms
- ✅ **Multiple Files**: Process multiple SVG files at once

### Optimizations Applied
- Remove comments and metadata
- Remove unnecessary whitespace
- Clean up attributes
- Normalize formatting
- Remove empty elements (basic)

### Coming Soon (v2.0+)
- 🔄 Full svgo plugin system compatibility
- 🔄 Custom configuration files
- 🔄 Performance optimizations
- 🔄 Python and C++ bindings
- 🔄 Advanced CLI features

## 📊 Performance

| Tool | Time (100 files) | Binary Size | Dependencies | Test Coverage |
|------|------------------|-------------|--------------|---------------|
| **svgoo** | ~10s | <15MB | None | 89 tests |
| svgo | ~3s | N/A | Node.js + npm | Varies |
| oswg | ~2s | 50MB | None | Unknown |

*Note: svgoo prioritizes convenience and portability over raw speed.*

## 🔄 Migrating from svgo

svgoo is designed as a drop-in replacement for basic svgo usage:

```bash
# Instead of this (svgo)
npx svgo input.svg -o output.svg

# Use this (svgoo)
svgoo input.svg -o output.svg
```

### Compatibility Notes

**✅ What works the same:**
- Basic CLI interface (`input.svg -o output.svg`)
- Standard optimizations (comments, whitespace, etc.)
- File input/output handling
- Error handling and exit codes

**⚠️ Current limitations:**
- No plugin configuration yet (uses sensible defaults)
- Performance ~3-5x slower than native svgo
- Limited to built-in optimizations

**❌ Not supported yet:**
- Custom plugin loading
- Advanced configuration options
- Some edge-case optimizations

## 🐛 Troubleshooting

### Common Issues

#### "Command not found" error
```bash
# Make sure the binary is in your PATH or use full path
./target/release/svgoo input.svg

# Or copy to a directory in PATH
cp target/release/svgoo /usr/local/bin/
```

#### Build failures
```bash
# Ensure JavaScript bundle is built first
npm run build

# Clean and rebuild
cargo clean && cargo build --release

# Check Rust version
rustc --version  # Should be 1.70+
```

#### JavaScript bundle issues
```bash
# Rebuild the JavaScript bundle
npm install
npm run build

# Check bundle was created
ls -la js-dist/svgoo-embedded.js
```

#### Optimization not working as expected
- svgoo currently applies basic optimizations only
- For advanced optimizations, use native svgo until v2.0
- File an issue if output differs significantly from expected

### Getting Help

1. **Check existing issues**: [GitHub Issues](https://github.com/twardoch/svgoo/issues)
2. **Create new issue**: Include input SVG, command used, and expected vs actual output
3. **Discussions**: For questions and feature requests

### Performance Issues

If svgoo is too slow for your use case:
- Use native svgo for large-scale processing
- Process files in parallel: `ls *.svg | xargs -P 4 -I {} svgoo {}`
- Consider using release builds: `cargo build --release`

## 🏗️ Architecture

svgoo embeds the svgo JavaScript optimizer using QuickJS runtime:

```
Input SVG → Rust CLI → QuickJS Runtime → svgo.js → Optimized SVG
```

This approach provides:
- **Single binary**: No external dependencies
- **Compatibility**: Same optimization logic as svgo
- **Reliability**: Rust's memory safety + JavaScript's flexibility

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Development Setup
```bash
git clone https://github.com/twardoch/svgoo.git
cd svgoo
npm install && npm run build
cargo build
cargo test
```

### Project Structure
```
svgoo/
├── src/                    # Rust source code
│   ├── main.rs            # CLI entry point
│   ├── lib.rs             # Library interface
│   └── ...                # Core modules
├── js-src/                # JavaScript source
├── js-dist/               # Built JavaScript bundle
├── tests/                 # Integration tests
└── docs/                  # Documentation
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [svgo](https://github.com/svg/svgo) - The excellent SVG optimizer this tool embeds
- [QuickJS](https://bellard.org/quickjs/) - Lightweight JavaScript engine
- [rquickjs](https://github.com/DelSkayn/rquickjs) - Rust bindings for QuickJS

## 📈 Roadmap

### Version 1.2.0 (Current - MVP Complete)
- [x] Basic SVG optimization
- [x] File I/O support
- [x] Multiple file processing
- [x] Cross-platform builds
- [x] Comprehensive documentation
- [x] Thorough testing (89 tests)
- [x] Cross-platform verification
- [x] Production-ready error handling

### Version 2.0 (Planned)
- [ ] Full svgo plugin system
- [ ] Custom configuration files
- [ ] Performance optimizations
- [ ] Python/C++ bindings

### Version 3.0 (Future)
- [ ] GUI application
- [ ] Watch mode for development
- [ ] Advanced optimization algorithms
- [ ] Cloud integration

---

**Made with ❤️ by the svgoo team**