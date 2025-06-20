// this_file: src/main.rs

//! SVG optimizer CLI with svgo compatibility

use anyhow::Result;
use clap::{Arg, Command};
use std::fs;
use std::io::{self, Read, Write};

use svgoo::{optimize_svg, Config};

fn main() -> Result<()> {
    let matches = Command::new("svgoo")
        .version(env!("CARGO_PKG_VERSION"))
        .about("Cross-platform SVG optimizer with svgo compatibility")
        .long_about("svgoo is a standalone SVG optimization tool that provides the same functionality as svgo \
                     but as a single binary that works across platforms without requiring Node.js.")
        .arg(
            Arg::new("input")
                .help("Input SVG file(s) (use - for stdin)")
                .value_name("INPUT")
                .index(1)
                .num_args(1..)
        )
        .arg(
            Arg::new("output")
                .short('o')
                .long("output")
                .help("Output file (use - for stdout)")
                .value_name("OUTPUT")
        )
        .arg(
            Arg::new("config")
                .short('c')
                .long("config")
                .help("Path to configuration file")
                .value_name("CONFIG")
        )
        .arg(
            Arg::new("pretty")
                .long("pretty")
                .help("Make SVG pretty printed")
                .action(clap::ArgAction::SetTrue)
        )
        .arg(
            Arg::new("disable")
                .long("disable")
                .help("Disable plugin(s)")
                .value_name("PLUGIN")
                .action(clap::ArgAction::Append)
        )
        .arg(
            Arg::new("enable")
                .long("enable")
                .help("Enable plugin(s)")
                .value_name("PLUGIN")
                .action(clap::ArgAction::Append)
        )
        .get_matches();

    // Get input files
    let input_files: Vec<String> = match matches.get_many::<String>("input") {
        Some(values) => values.cloned().collect(),
        None => vec!["-".to_string()], // Default to stdin
    };

    // Load configuration
    let mut config = Config::default();

    if let Some(config_path) = matches.get_one::<String>("config") {
        config = Config::load_from_file(config_path)?;
    }

    // Apply CLI overrides
    if matches.get_flag("pretty") {
        config.set_pretty(true);
    }

    if let Some(disabled_plugins) = matches.get_many::<String>("disable") {
        for plugin in disabled_plugins {
            config.disable_plugin(plugin);
        }
    }

    if let Some(enabled_plugins) = matches.get_many::<String>("enable") {
        for plugin in enabled_plugins {
            config.enable_plugin(plugin);
        }
    }

    // Check if we have multiple inputs and a single output file
    let output_path = matches.get_one::<String>("output");
    if input_files.len() > 1 && output_path.is_some() && output_path != Some(&"-".to_string()) {
        eprintln!("Error: Cannot specify a single output file when processing multiple input files");
        eprintln!("Use --output with a directory path or omit it to output to stdout");
        std::process::exit(1);
    }

    // Process each input file
    for (index, input_path) in input_files.iter().enumerate() {
        // Read input
        let input_svg = if input_path == "-" {
            let mut buffer = String::new();
            io::stdin().read_to_string(&mut buffer)?;
            buffer
        } else {
            fs::read_to_string(input_path)?
        };

        // Optimize SVG
        let optimized_svg = optimize_svg(&input_svg, &config)?;

        // Determine output destination
        let output_dest = if input_files.len() == 1 {
            // Single file: use specified output or stdout
            output_path.cloned()
        } else {
            // Multiple files: generate output filename
            if input_path == "-" {
                None // Output to stdout for stdin input
            } else {
                // Generate output filename based on input
                let path = std::path::Path::new(input_path);
                let stem = path.file_stem().unwrap_or_default();
                let ext = path.extension().unwrap_or_default();
                let output_name = format!("{}.min.{}", stem.to_string_lossy(), ext.to_string_lossy());
                let output_file = path.with_file_name(output_name);
                Some(output_file.to_string_lossy().to_string())
            }
        };

        // Write output
        match output_dest {
            Some(path) if path == "-" => {
                io::stdout().write_all(optimized_svg.as_bytes())?;
            }
            Some(path) => {
                fs::write(&path, &optimized_svg)?;
                if input_files.len() > 1 {
                    println!("Optimized: {} -> {}", input_path, path);
                }
            }
            None => {
                io::stdout().write_all(optimized_svg.as_bytes())?;
                if index < input_files.len() - 1 {
                    // Add newline between outputs when multiple files to stdout
                    println!();
                }
            }
        }
    }

    Ok(())
}
