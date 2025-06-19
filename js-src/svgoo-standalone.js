// this_file: js-src/svgoo-standalone.js

/**
 * Standalone svgo bundle for embedding in Rust via QuickJS
 * This is a self-contained module that exposes the svgo API in a QuickJS-compatible way
 */

// Import the main optimization function from svgo core
import { optimize as svgoOptimize, VERSION } from '../svgo-analysis/lib/svgo.js';

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
 * Get available plugins (simplified for embedded environment)
 */
function getPlugins() {
  // Return a basic list of core plugins for the embedded environment
  return [
    { name: 'preset-default', description: 'Default optimization preset' },
    { name: 'removeDoctype', description: 'Remove DOCTYPE declaration' },
    { name: 'removeXMLProcInst', description: 'Remove XML processing instructions' },
    { name: 'removeComments', description: 'Remove comments' },
    { name: 'removeMetadata', description: 'Remove metadata elements' },
    { name: 'removeTitle', description: 'Remove title element' },
    { name: 'removeDesc', description: 'Remove desc element' },
    { name: 'removeUselessDefs', description: 'Remove useless defs' },
    { name: 'removeEditorsNSData', description: 'Remove editor namespace data' },
    { name: 'removeEmptyAttrs', description: 'Remove empty attributes' },
    { name: 'removeHiddenElems', description: 'Remove hidden elements' },
    { name: 'removeEmptyText', description: 'Remove empty text elements' },
    { name: 'removeEmptyContainers', description: 'Remove empty container elements' },
    { name: 'cleanupAttrs', description: 'Cleanup attributes' },
    { name: 'mergeStyles', description: 'Merge styles' },
    { name: 'inlineStyles', description: 'Inline styles' },
    { name: 'minifyStyles', description: 'Minify styles' },
    { name: 'convertStyleToAttrs', description: 'Convert styles to attributes' },
    { name: 'cleanupIds', description: 'Cleanup IDs' },
    { name: 'removeRasterImages', description: 'Remove raster images' },
    { name: 'removeUselessStrokeAndFill', description: 'Remove useless stroke and fill' },
    { name: 'removeUnusedNS', description: 'Remove unused namespaces' },
    { name: 'cleanupNumericValues', description: 'Cleanup numeric values' },
    { name: 'cleanupListOfValues', description: 'Cleanup list of values' },
    { name: 'convertColors', description: 'Convert colors' },
    { name: 'removeUnknownsAndDefaults', description: 'Remove unknowns and defaults' },
    { name: 'removeNonInheritableGroupAttrs', description: 'Remove non-inheritable group attributes' },
    { name: 'removeUselessStrokeAndFill', description: 'Remove useless stroke and fill' },
    { name: 'removeViewBox', description: 'Remove viewBox when possible' },
    { name: 'cleanupEnableBackground', description: 'Cleanup enable-background' },
    { name: 'removeHiddenElems', description: 'Remove hidden elements' },
    { name: 'removeEmptyText', description: 'Remove empty text elements' },
    { name: 'convertShapeToPath', description: 'Convert shapes to paths' },
    { name: 'convertEllipseToCircle', description: 'Convert ellipse to circle' },
    { name: 'moveElemsAttrsToGroup', description: 'Move elements attributes to group' },
    { name: 'moveGroupAttrsToElems', description: 'Move group attributes to elements' },
    { name: 'collapseGroups', description: 'Collapse groups' },
    { name: 'convertPathData', description: 'Convert path data' },
    { name: 'convertTransform', description: 'Convert transforms' },
    { name: 'removeEmptyAttrs', description: 'Remove empty attributes' },
    { name: 'removeEmptyContainers', description: 'Remove empty containers' },
    { name: 'mergePaths', description: 'Merge paths' },
    { name: 'removeUnusedNS', description: 'Remove unused namespaces' },
    { name: 'sortAttrs', description: 'Sort attributes' },
    { name: 'sortDefsChildren', description: 'Sort defs children' },
  ];
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