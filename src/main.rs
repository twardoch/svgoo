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
                .help("Input SVG file (use - for stdin)")
                .value_name("INPUT")
                .index(1)
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

    // Read input
    let input_svg = match matches.get_one::<String>("input") {
        Some(path) if path == "-" => {
            let mut buffer = String::new();
            io::stdin().read_to_string(&mut buffer)?;
            buffer
        }
        Some(path) => fs::read_to_string(path)?,
        None => {
            let mut buffer = String::new();
            io::stdin().read_to_string(&mut buffer)?;
            buffer
        }
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

    // Optimize SVG
    let optimized_svg = optimize_svg(&input_svg, &config)?;

    // Write output
    match matches.get_one::<String>("output") {
        Some(path) if path == "-" => {
            io::stdout().write_all(optimized_svg.as_bytes())?;
        }
        Some(path) => {
            fs::write(path, optimized_svg)?;
        }
        None => {
            io::stdout().write_all(optimized_svg.as_bytes())?;
        }
    }

    Ok(())
}
