// this_file: js-src/svgoo-standalone.js

/**
 * Standalone svgo bundle for embedding in Rust via QuickJS
 * This is a self-contained module that exposes the svgo API in a QuickJS-compatible way
 */

// Re-export everything from the svgo core
export * from '../svgo-analysis/lib/svgo.js';

// Import the main optimization function
import { optimize as svgoOptimize, VERSION, builtinPlugins } from '../svgo-analysis/lib/svgo.js';

/**
 * Enhanced optimization function with better error handling for embedded environment
 * @param {string} input - SVG input string  
 * @param {Object} config - Configuration object
 * @returns {Object} - Optimization result with data property
 */
function optimize(input, config = {}) {
  try {
    // Normalize config for embedded environment
    const normalizedConfig = {
      ...config,
      js2svg: {
        eol: 'lf', // Force Unix line endings
        ...config.js2svg,
      },
    };

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
 */
function getVersion() {
  return VERSION;
}

/**
 * Get available plugins
 */
function getPlugins() {
  return builtinPlugins.map(plugin => ({
    name: plugin.name,
    description: plugin.description || '',
  }));
}

/**
 * Validate SVG input basic check
 */
function validateSvg(input) {
  if (typeof input !== 'string') return false;
  const trimmed = input.trim();
  return trimmed.startsWith('<svg') || trimmed.startsWith('<?xml');
}

// Set up global interface for QuickJS
globalThis.svgoo = {
  optimize,
  getVersion,
  getPlugins,
  validateSvg,
  VERSION,
};

// Also export for module compatibility
export { optimize, getVersion, getPlugins, validateSvg, VERSION };