# svgoo

## Project Overview

**svgoo** is a Rust library and CLI that exposes the same API as svgo (JavaScript SVG optimizer) while bundling svgo code with QuickJS. The goal is single-file deployment across macOS, Linux, and Windows, with bindings for Python and C++ applications.

**Current Status**: JavaScript integration complete! The project now successfully embeds and runs real svgo code via QuickJS. Foundation includes: core architecture, CLI interface, configuration system, FFI bindings foundation, testing framework, and working SVG optimization.

## Key References

- [svgo](https://github.com/svg/svgo) - Target API compatibility
- [libsvgo](https://github.com/dr-js/libsvgo) - Bundling reference
- [svgop](https://github.com/twardoch/svgop) - Previous wrapper attempt
- [osvg](https://github.com/ahaoboy/osvg) - Alternative implementation

## Architecture Strategy

The project integrates:

- Rust core library for performance and cross-platform deployment
- svgo JavaScript code via QuickJS embedding
- CLI interface matching svgo's command-line API
- FFI bindings for Python and C++ integration
- Single-file deployment capability

## Development Commands

- `cargo build` - Build the project
- `cargo test` - Run test suite (13 tests passing)
- `cargo run` - Run the CLI
- `npm run build` - Build JavaScript bundles with Rollup
- `cargo build --release` - Create optimized release build
- `cargo clippy` - Run linting

## Usage

**CLI Usage**:
```bash
# Optimize SVG from stdin to stdout
cat input.svg | svgoo > output.svg

# Optimize SVG file (coming soon)
svgoo input.svg -o output.svg

# With custom config (coming soon)
svgoo input.svg --config svgo.config.json
```

**Current Limitations**:
- File input/output not yet implemented (use stdin/stdout)
- Plugin configuration partially supported
- Some optimizations less aggressive than reference svgo

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


## Implementation Status

✅ **Completed**:
- JavaScript Integration: Successfully embedded actual svgo code via rquickjs
- Core SVG optimization functionality working
- CLI with stdin/stdout support
- Test infrastructure with reference comparisons

🚧 **In Progress**:
- Plugin System: Implementing svgo plugin architecture bridge
- Configuration compatibility improvements

📋 **Next Steps**:
- Performance: Optimize runtime creation and caching
- Validation: Add comprehensive SVG parsing and validation
- Cross-platform Testing: Verify builds on all target platforms
- Python/C++ bindings implementation

## Work guidance

I want you to figure everything out yourself: 

- [x] Resiliently research the information about these codebases
- [x] Discover and use tools that will help you in the process
- [x] Research, plan and implement the perfect structure for the project
- [x] Research, plan and implement the perfect build system and toolkit for the project
- [ ] Research, plan and implement the perfect packaging system for the project
- [ ] Research, plan and implement the perfect deployment system for the project
- [x] Research, plan and implement the perfect testing system for the project
- [x] Research, plan and implement the perfect documentation system for the project

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

