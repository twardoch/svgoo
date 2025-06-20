// this_file: js-src/svgoo-standalone.js

/**
 * Simplified svgo wrapper for MVP 1.2.0
 * This provides basic SVG optimization without full plugin system
 */

// For MVP, we'll create a minimal optimization function
// that handles the most common optimizations manually

/**
 * Basic SVG optimization function
 * @param {string} svgString - Input SVG as string
 * @param {Object} config - Configuration object (placeholder)
 * @returns {Object} - Result with optimized SVG and metadata
 */
function optimize(svgString, config = {}) {
    try {
        // Basic optimizations for MVP
        let optimized = svgString;
        
        // Remove XML processing instructions
        optimized = optimized.replace(/<\?xml[^>]*\?>\s*/g, '');
        
        // Remove comments
        optimized = optimized.replace(/<!--[\s\S]*?-->/g, '');
        
        // Remove unnecessary whitespace between tags
        optimized = optimized.replace(/>\s+</g, '><');
        
        // Remove leading/trailing whitespace
        optimized = optimized.trim();
        
        // Remove empty attributes (basic version)
        optimized = optimized.replace(/\s+[a-zA-Z-]+=""\s*/g, ' ');
        
        // Clean up extra spaces in attributes
        optimized = optimized.replace(/\s+/g, ' ');
        
        return {
            data: optimized,
            info: {
                width: parseFloat(extractAttribute(optimized, 'width')) || null,
                height: parseFloat(extractAttribute(optimized, 'height')) || null,
            }
        };
    } catch (error) {
        throw new Error(`SVG optimization failed: ${error.message}`);
    }
}

/**
 * Extract attribute value from SVG string
 * @param {string} svg - SVG string
 * @param {string} attr - Attribute name
 * @returns {string|null} - Attribute value or null
 */
function extractAttribute(svg, attr) {
    const match = svg.match(new RegExp(`\\s${attr}="([^"]*)"`, 'i'));
    return match ? match[1] : null;
}

/**
 * Get plugin information (placeholder for compatibility)
 * @param {string} name - Plugin name
 * @returns {Object} - Plugin info
 */
function getPlugin(name) {
    return {
        name: name,
        enabled: true,
        description: `Built-in optimization: ${name}`
    };
}

/**
 * Execute plugin (placeholder for compatibility)
 * @param {string} name - Plugin name
 * @param {string} svg - SVG content
 * @param {Object} config - Plugin config
 * @returns {string} - Processed SVG
 */
function executePlugin(name, svg, config = {}) {
    // For MVP, just return the SVG as-is
    // Individual plugins can be implemented here later
    return svg;
}

// Global svgoo object for QuickJS
globalThis.svgoo = {
    optimize,
    getPlugin,
    executePlugin,
    version: "1.2.0-mvp"
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { optimize, getPlugin, executePlugin };
}