// this_file: js-src/svgoo-bridge.js

/**
 * Bridge module for embedding svgo in Rust via QuickJS
 * 
 * This module provides a clean interface between the Rust runtime and svgo,
 * handling platform differences and providing a consistent API.
 */

// Import the optimized svgo core functionality
import { optimize as svgoOptimize, VERSION, builtinPlugins } from '../js-dist/svgo-core.js';

// Mock Node.js 'os' module for cross-platform compatibility
const mockOs = {
  EOL: '\n', // Default to Unix-style line endings
};

/**
 * Main optimization function compatible with the original svgo API
 * @param {string} input - SVG input string
 * @param {Object} config - Configuration object
 * @returns {Object} - Optimization result with data property
 */
function optimize(input, config = {}) {
  try {
    // Ensure config has expected structure
    const normalizedConfig = {
      ...config,
      js2svg: {
        eol: 'lf', // Force Unix line endings in embedded environment
        ...config.js2svg,
      },
    };

    // Call the core svgo optimization
    const result = svgoOptimize(input, normalizedConfig);
    
    return {
      data: result.data,
      info: result.info || {},
    };
  } catch (error) {
    throw new Error(`SVG optimization failed: ${error.message}`);
  }
}

/**
 * Get version information
 * @returns {string} - svgo version
 */
function getVersion() {
  return VERSION;
}

/**
 * Get list of available plugins
 * @returns {Array} - Array of plugin names
 */
function getPlugins() {
  return builtinPlugins.map(plugin => plugin.name);
}

/**
 * Validate SVG input
 * @param {string} input - SVG input string
 * @returns {boolean} - Whether the input appears to be valid SVG
 */
function validateSvg(input) {
  if (typeof input !== 'string') {
    return false;
  }
  
  // Basic SVG validation - check for SVG opening tag
  const trimmed = input.trim();
  return trimmed.startsWith('<svg') || trimmed.startsWith('<?xml');
}

// Export the main interface
globalThis.svgoo = {
  optimize,
  getVersion,
  getPlugins,
  validateSvg,
  VERSION,
};

// Also expose as module exports for compatibility
export { optimize, getVersion, getPlugins, validateSvg, VERSION };