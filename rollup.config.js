// this_file: rollup.config.js

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('@rollup/plugin-terser').Options} */
const terserOptions = {
  compress: {
    defaults: true,
    arrows: true,
    computed_props: true,
    conditionals: true,
    dead_code: true,
    drop_debugger: true,
    drop_console: false, // Keep console for debugging
    evaluate: true,
    keep_fargs: false,
    side_effects: false,
  },
  mangle: {
    // Don't mangle exported names to maintain API compatibility
    reserved: ['optimize', 'loadConfig', 'VERSION'],
  },
  format: {
    comments: false,
    keep_numbers: true,
    semicolons: false,
    shebang: false,
  },
};

export default {
  // Bundle standalone svgo for embedding in QuickJS
  input: './js-src/svgoo-standalone.js',
  output: {
    file: './js-dist/svgoo-embedded.js',
    format: 'iife',
    name: 'svgooBundle',
    exports: 'named',
  },
  external: [
    // Mark Node.js built-ins as external - they won't be available in QuickJS
    'os',
    'fs/promises', 
    'url',
    'path',
    'fs',
    'stream',
    'util',
    'string_decoder',
    'buffer',
    'events',
  ],
  plugins: [
    nodeResolve({ 
      browser: true,
      preferBuiltins: false,
      exportConditions: ['default', 'import']
    }),
    commonjs(),
    terser(terserOptions),
  ],
  onwarn(warning) {
    if (warning.code === 'UNRESOLVED_IMPORT') {
      console.warn(`Warning: ${warning.message}`);
      return;
    }
  },
};