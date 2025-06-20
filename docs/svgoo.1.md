# svgoo(1)

## NAME

svgoo - Cross-platform SVG optimizer with svgo compatibility

## SYNOPSIS

**svgoo** [*OPTIONS*] [*INPUT_FILES*...]

## DESCRIPTION

**svgoo** is a standalone SVG optimization tool that embeds the svgo JavaScript optimizer in a single Rust binary. It provides cross-platform SVG optimization without requiring Node.js or any external dependencies.

The tool applies common SVG optimizations including:
- Removing comments and metadata
- Cleaning up unnecessary whitespace
- Normalizing formatting
- Removing empty attributes
- Basic element optimization

## OPTIONS

**-o**, **--output** *OUTPUT*
: Output file path. Use '-' to write to stdout. Cannot be used with multiple input files.

**-q**, **--quiet**
: Suppress non-error output. Useful for scripting and batch operations.

**-c**, **--config** *CONFIG*
: Path to svgo configuration file. Currently not supported - using built-in optimizations. (Coming in v2.0)

**--pretty**
: Pretty print the output SVG with proper indentation and formatting.

**--disable** *PLUGIN*
: Disable specific svgo plugins. Currently not supported - using built-in optimizations. (Coming in v2.0)

**--enable** *PLUGIN*
: Enable specific svgo plugins. Currently not supported - using built-in optimizations. (Coming in v2.0)

**-h**, **--help**
: Print help information and examples.

**-V**, **--version**
: Print version information.

## ARGUMENTS

*INPUT_FILES*
: Input SVG file(s) to optimize. Use '-' to read from stdin. When processing multiple files, .min.svg versions are created automatically.

## EXAMPLES

Optimize a single SVG file:
```
svgoo input.svg -o output.svg
```

Process multiple files (creates .min.svg versions):
```
svgoo file1.svg file2.svg file3.svg
```

Use with Unix pipes:
```
cat input.svg | svgoo > output.svg
```

Pretty print output:
```
svgoo --pretty input.svg -o formatted.svg
```

Process files quietly:
```
svgoo --quiet *.svg
```

Combine with other tools:
```
curl -s https://example.com/icon.svg | svgoo | gzip > icon.svg.gz
```

## EXIT STATUS

**0**
: Successful operation

**1**
: Error occurred (invalid input, file not found, etc.)

## FILES

Currently, **svgoo** does not read any configuration files. All optimizations use built-in defaults.

## LIMITATIONS

- No plugin configuration yet (uses sensible defaults)
- Performance ~3-5x slower than native svgo
- Limited to built-in optimizations
- Custom configuration files not supported until v2.0

## COMPATIBILITY

**svgoo** is designed as a drop-in replacement for basic svgo usage:

Instead of:
```
npx svgo input.svg -o output.svg
```

Use:
```
svgoo input.svg -o output.svg
```

## BUGS

Report bugs at: https://github.com/twardoch/svgoo/issues

## AUTHOR

The svgoo team. Based on svgo by Kir Belevich and contributors.

## SEE ALSO

**svgo**(1), **imageoptim**(1)

Project homepage: https://github.com/twardoch/svgoo