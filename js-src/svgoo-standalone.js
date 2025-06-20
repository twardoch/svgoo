// this_file: js-src/svgoo-standalone.js

/**
 * Standalone svgo bundle for embedding in Rust via QuickJS
 * This is a self-contained module that exposes the svgo API in a QuickJS-compatible way
 */

// Import the main optimization function from svgo core
import { optimize as svgoOptimize, VERSION } from '../svgo-analysis/lib/svgo.js';
import * as builtinPlugins from '../svgo-analysis/plugins/preset-default.js';

// Import individual plugins
import * as removeDoctype from '../svgo-analysis/plugins/removeDoctype.js';
import * as removeXMLProcInst from '../svgo-analysis/plugins/removeXMLProcInst.js';
import * as removeComments from '../svgo-analysis/plugins/removeComments.js';
import * as removeMetadata from '../svgo-analysis/plugins/removeMetadata.js';
import * as removeTitle from '../svgo-analysis/plugins/removeTitle.js';
import * as removeDesc from '../svgo-analysis/plugins/removeDesc.js';
import * as removeUselessDefs from '../svgo-analysis/plugins/removeUselessDefs.js';
import * as removeEditorsNSData from '../svgo-analysis/plugins/removeEditorsNSData.js';
import * as removeEmptyAttrs from '../svgo-analysis/plugins/removeEmptyAttrs.js';
import * as removeHiddenElems from '../svgo-analysis/plugins/removeHiddenElems.js';
import * as removeEmptyText from '../svgo-analysis/plugins/removeEmptyText.js';
import * as removeEmptyContainers from '../svgo-analysis/plugins/removeEmptyContainers.js';
import * as cleanupAttrs from '../svgo-analysis/plugins/cleanupAttrs.js';
import * as mergeStyles from '../svgo-analysis/plugins/mergeStyles.js';
import * as inlineStyles from '../svgo-analysis/plugins/inlineStyles.js';
import * as minifyStyles from '../svgo-analysis/plugins/minifyStyles.js';
import * as cleanupIds from '../svgo-analysis/plugins/cleanupIds.js';
import * as removeUselessStrokeAndFill from '../svgo-analysis/plugins/removeUselessStrokeAndFill.js';
import * as removeUnusedNS from '../svgo-analysis/plugins/removeUnusedNS.js';
import * as cleanupNumericValues from '../svgo-analysis/plugins/cleanupNumericValues.js';
import * as convertColors from '../svgo-analysis/plugins/convertColors.js';
import * as removeUnknownsAndDefaults from '../svgo-analysis/plugins/removeUnknownsAndDefaults.js';
import * as removeNonInheritableGroupAttrs from '../svgo-analysis/plugins/removeNonInheritableGroupAttrs.js';
import * as removeViewBox from '../svgo-analysis/plugins/removeViewBox.js';
import * as cleanupEnableBackground from '../svgo-analysis/plugins/cleanupEnableBackground.js';
import * as convertShapeToPath from '../svgo-analysis/plugins/convertShapeToPath.js';
import * as convertEllipseToCircle from '../svgo-analysis/plugins/convertEllipseToCircle.js';
import * as moveElemsAttrsToGroup from '../svgo-analysis/plugins/moveElemsAttrsToGroup.js';
import * as moveGroupAttrsToElems from '../svgo-analysis/plugins/moveGroupAttrsToElems.js';
import * as collapseGroups from '../svgo-analysis/plugins/collapseGroups.js';
import * as convertPathData from '../svgo-analysis/plugins/convertPathData.js';
import * as convertTransform from '../svgo-analysis/plugins/convertTransform.js';
import * as mergePaths from '../svgo-analysis/plugins/mergePaths.js';
import * as sortAttrs from '../svgo-analysis/plugins/sortAttrs.js';
import * as sortDefsChildren from '../svgo-analysis/plugins/sortDefsChildren.js';

// Map of all available plugins
const pluginMap = {
  'preset-default': builtinPlugins,
  removeDoctype,
  removeXMLProcInst,
  removeComments,
  removeMetadata,
  removeTitle,
  removeDesc,
  removeUselessDefs,
  removeEditorsNSData,
  removeEmptyAttrs,
  removeHiddenElems,
  removeEmptyText,
  removeEmptyContainers,
  cleanupAttrs,
  mergeStyles,
  inlineStyles,
  minifyStyles,
  cleanupIds,
  removeUselessStrokeAndFill,
  removeUnusedNS,
  cleanupNumericValues,
  convertColors,
  removeUnknownsAndDefaults,
  removeNonInheritableGroupAttrs,
  removeViewBox,
  cleanupEnableBackground,
  convertShapeToPath,
  convertEllipseToCircle,
  moveElemsAttrsToGroup,
  moveGroupAttrsToElems,
  collapseGroups,
  convertPathData,
  convertTransform,
  mergePaths,
  sortAttrs,
  sortDefsChildren,
};

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
 * Get available plugins from the plugin map
 */
function getPlugins() {
  const plugins = [];
  for (const [name, plugin] of Object.entries(pluginMap)) {
    plugins.push({
      name,
      description: plugin.description || `Plugin: ${name}`,
    });
  }
  return plugins;
}

/**
 * Get plugin names
 */
function getPluginNames() {
  return Object.keys(pluginMap);
}

/**
 * Get a specific plugin by name
 */
function getPlugin(name) {
  const plugin = pluginMap[name];
  if (!plugin) {
    throw new Error(`Plugin not found: ${name}`);
  }
  return {
    name: plugin.name || name,
    description: plugin.description || `Plugin: ${name}`,
    fn: plugin.fn,
  };
}

/**
 * Execute a plugin on an AST
 * @param {string} pluginName - Name of the plugin to execute
 * @param {Object} ast - The AST to process
 * @param {Object} params - Plugin parameters
 * @param {Object} info - Plugin info object
 * @returns {Object|null} - Visitor object or null
 */
function executePlugin(pluginName, ast, params, info) {
  const plugin = pluginMap[pluginName];
  if (!plugin || !plugin.fn) {
    throw new Error(`Plugin not found or invalid: ${pluginName}`);
  }
  
  // Execute the plugin function
  const result = plugin.fn(ast, params || {}, info || { multipassCount: 0 });
  
  // Return the visitor object (or null if no visitor returned)
  return result || null;
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
  getPluginNames,
  getPlugin,
  executePlugin,
  validateSvg,
  VERSION,
};

// Also export for module compatibility
export { optimize, getVersion, getPlugins, getPluginNames, getPlugin, executePlugin, validateSvg, VERSION };