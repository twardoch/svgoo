# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Guidelines

- Only modify code directly relevant to the specific request. Avoid changing unrelated functionality.
- Never replace code with placeholders like `# ... rest of the processing ...`. Always include complete code.
- Break problems into smaller steps. Think through each step separately before implementing.
- Always provide a complete PLAN with REASONING based on evidence from code and logs before making changes.
- Explain your OBSERVATIONS clearly, then provide REASONING to identify the exact issue. Add console logs when needed to gather more information.


svgoo is a cross-platform SVG optimization system that bridges Rust and JavaScript implementations while maintaining strict compatibility requirements.

Core Business Components:

1. SVG Processing Bridge (Importance: 95)
- Integrates svgo JavaScript optimization engine via QuickJS
- Ensures byte-for-byte output matching with original svgo
- Maintains full API compatibility across language bindings

2. Platform Deployment System (Importance: 85)
- Packages optimized SVG processing into single-file binaries
- Handles cross-platform deployment for macOS/Linux/Windows
- Manages FFI bindings for Python and C++ integrations

3. Compatibility Layer (Importance: 90)
- Validates optimization output matches svgo exactly
- Maintains command-line interface parity
- Ensures consistent behavior across platforms

Business Integration Points:
- svgo JavaScript engine integration
- QuickJS embedding and isolation
- FFI binding generation
- Platform-specific packaging

Critical Business Rules:
1. Must maintain exact svgo API compatibility
2. Output must match svgo byte-for-byte
3. Single deployable binary requirement
4. Cross-language binding consistency

The system architecture focuses on bridging existing SVG optimization capabilities into a unified cross-platform solution while maintaining strict compatibility requirements with established tools.

$END$

# svgoo

## Project Overview

**svgoo** is a planned Rust library and CLI that will expose the same API as svgo (JavaScript SVG optimizer) while bundling svgo code with QuickJS. The goal is single-file deployment across macOS, Linux, and Windows, with bindings for Python and C++ applications.

**Current Status**: Pre-implementation planning phase. No source code exists yet.

## Key References

- [svgo](https://github.com/svg/svgo) - Target API compatibility
- [libsvgo](https://github.com/dr-js/libsvgo) - Bundling reference
- [svgop](https://github.com/twardoch/svgop) - Previous wrapper attempt
- [osvg](https://github.com/ahaoboy/osvg) - Alternative implementation

## Architecture Strategy

The project will integrate:

- Rust core library for performance and cross-platform deployment
- svgo JavaScript code via QuickJS embedding
- CLI interface matching svgo's command-line API
- FFI bindings for Python and C++ integration
- Single-file deployment capability

## Development Commands

**Current**: None (no build system implemented yet) **Planned**: Standard Rust workflow with Cargo

## Documentation System

Maintain these files per the working principles:

- `README.md` - Purpose and functionality
- `CHANGELOG.md` - Past changes
- `TODO.md` - Flat itemized checklist of immediate tasks
- `PLAN.md` - Detailed project plan with checkable items
- `CLAUDE.md` - This file

## Working Principles

### Development Approach

- Iterate gradually, avoid major changes
- Preserve existing code/structure unless necessary
- Check codebase coherence frequently
- Focus on minimal viable increments
- Handle failures gracefully with retries and fallbacks

### Code Organization

- Use constants over magic numbers
- Modularize repeated logic into single-purpose functions
- Favor flat over nested structures
- Maintain `this_file` path records in source files

### Milestone Process

1. Analyze documentation and recent git changes
2. Update CHANGELOG.md and README.md
3. Use code checking and linting tools
4. Restructure PLAN.md and TODO.md into sequential "threads"
5. Update CLAUDE.md with current state and strategies

## MCP Tools Usage

## Use MCP tools if you can

Before and during coding (if have access to tools), you should: 

- consult the `context7` tool for most up-to-date software package documentation;
- ask intelligent questions to the `openai/o3` model via the `chat_completion` tool for additional reasoning and help with the task;
- use the `sequentialthinking` tool to think about the best way to solve the task; 
- use the `perplexity_ask` and `duckduckgo_web_search` tools to gather up-to-date information or context;


## Current Status (Completed Foundation)

✅ **Research Phase Complete**: Comprehensive analysis of svgo, libsvgo, svgop, and osvg
✅ **Project Structure**: Rust library with modular architecture implemented
✅ **Build System**: Cargo.toml with cross-compilation support configured
✅ **CI/CD**: GitHub Actions for testing, linting, and multi-platform releases
✅ **Core Architecture**: rquickjs integration with async runtime management
✅ **CLI Interface**: Argument parsing with clap, stdin/stdout support
✅ **Configuration**: svgo-compatible config system with JSON support
✅ **Error Handling**: Comprehensive error types with proper propagation
✅ **FFI Bindings**: C-compatible interface for Python/C++ integration
✅ **Testing**: Comprehensive test suite with 13 passing tests
✅ **Documentation**: PLAN.md, TODO.md, CHANGELOG.md, and code documentation

## Next Steps Required

1. **JavaScript Integration**: Embed actual svgo code (currently placeholder)
2. **Plugin System**: Implement svgo plugin architecture bridge  
3. **Performance**: Optimize runtime creation and caching
4. **Validation**: Add comprehensive SVG parsing and validation
5. **Cross-platform Testing**: Verify builds on all target platforms

## Development Commands

- `cargo test` - Run test suite (all tests passing)
- `cargo clippy` - Linting (clean)
- `cargo fmt` - Code formatting
- `cargo build --release` - Optimized build
- `cargo build --target <TARGET>` - Cross-compilation 

## Work guidance

I want you to figure everything out yourself: 

- [ ] Resiliently research the information about these codebases
- [ ] Discover and use tools that will help you in the process
- [ ] Research, plan and implement the perfect structure for the project
- [ ] Research, plan and implement the perfect build system and toolkit for the project
- [ ] Research, plan and implement the perfect packaging system for the project
- [ ] Research, plan and implement the perfect deployment system for the project
- [ ] Research, plan and implement the perfect testing system for the project
- [ ] Research, plan and implement the perfect documentation system for the project

And then finally start the project and implement it. 

# Working principles for software development

## When you write code (in any language)

- Iterate gradually, avoiding major changes 
- Minimize confirmations and checks
- Preserve existing code/structure unless necessary
- Use constants over magic numbers
- Check for existing solutions in the codebase before starting
- Check often the coherence of the code you’re writing with the rest of the code. 
- Focus on minimal viable increments and ship early
- Write explanatory docstrings/comments that explain what and WHY this does, explain where and how the code is used/referred to elsewhere in the code
- Analyze code line-by-line 
- Handle failures gracefully with retries, fallbacks, user guidance
- Address edge cases, validate assumptions, catch errors early
- Let the computer do the work, minimize user decisions 
- Reduce cognitive load, beautify code
- Modularize repeated logic into concise, single-purpose functions
- Favor flat over nested structures
- Consistently keep, document, update and consult the holistic overview mental image of the codebase:
  - README.md (purpose and functionality) 
  - CHANGELOG.md (past changes)
  - TODO.md (flat itemized list of checkable (`[ ]`) tasks, focusing on the immediate future)
  - PLAN.md (detailed plan for the entire project, checkable `[ ]`)

## Once you complete a milestone

- Analyze CHANGELOG.md, README.md, TODO.md, PLAN.md, CLAUDE.md and check the recent git changes. 

- Then update CHANGELOG.md with recent changes, and update README.md to reflect that. 

- Use code checking and linting to analyze the current code. 

- Adjust PLAN.md and TODO.md so that PLAN.md contains a detailed description of all the next steps, and TODO.md is a simple itemized checkable list. 

- Restructure PLAN.md and TODO.md into "threads": reorganize them so that the tasks that need to happen sequentially are together in one thread, but tasks that are independent of each other are in separate thread. 

- Work hard, think hard. When you're done, update CLAUDE.md to reflect the current state of the project and then recommended development strategies.

## Keep track of paths

In each source file, maintain the up-to-date `this_file` record that shows the path of the current file relative to project root. Place the `this_file` record near the top of the file, as a comment after the shebangs, or in the YAML Markdown frontmatter. 

## Additional guidelines

Ask before extending/refactoring existing code in a way that may add complexity or break things. 

When you’re finished, print "Wait, but" to go back, think & reflect, revise & improvement what you’ve done (but don’t invent functionality freely). Repeat this. But stick to the goal of "minimal viable next version". 

## Virtual team work

Be creative, diligent, critical, relentless & funny! Lead two experts: "Ideot" for creative, unorthodox ideas, and "Critin" to critique flawed thinking and moderate for balanced discussions. The three of you shall illuminate knowledge with concise, beautiful responses, process methodically for clear answers, collaborate step-by-step, sharing thoughts and adapting. If errors are found, step back and focus on accuracy and progress.


