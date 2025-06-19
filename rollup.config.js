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

export default [
  {
    // Bundle the core svgo library for embedding
    input: './svgo-analysis/lib/svgo.js',
    output: {
      file: './js-dist/svgo-core.js',
      format: 'esm',
      exports: 'named',
    },
    external: [
      // Don't bundle Node.js built-ins
      'os',
      'fs/promises',
      'url',
      'path',
    ],
    plugins: [
      nodeResolve({ 
        browser: false,
        preferBuiltins: true,
        exportConditions: ['node']
      }),
      commonjs(),
      terser(terserOptions),
    ],
    onwarn(warning) {
      // Only fail on errors, not warnings
      if (warning.code === 'UNRESOLVED_IMPORT') {
        console.warn(`Warning: ${warning.message}`);
      }
    },
  },
  {
    // Bundle the Node.js version with config loading
    input: './svgo-analysis/lib/svgo-node.js',
    output: {
      file: './js-dist/svgo-node.js',
      format: 'esm',
      exports: 'named',
    },
    external: [
      // Don't bundle Node.js built-ins - these will be polyfilled or mocked
      'os',
      'fs/promises',
      'url',
      'path',
    ],
    plugins: [
      nodeResolve({ 
        browser: false,
        preferBuiltins: true,
        exportConditions: ['node']
      }),
      commonjs(),
      terser(terserOptions),
    ],
    onwarn(warning) {
      if (warning.code === 'UNRESOLVED_IMPORT') {
        console.warn(`Warning: ${warning.message}`);
      }
    },
  },
  {
    // Bundle standalone svgo for embedding
    input: './js-src/svgoo-standalone.js',
    output: {
      file: './js-dist/svgoo-embedded.js',
      format: 'esm',
      exports: 'named',
    },
    external: [
      // Don't bundle Node.js built-ins - QuickJS doesn't have them
      'os',
      'fs/promises', 
      'url',
      'path',
    ],
    plugins: [
      nodeResolve({ 
        browser: true,
        preferBuiltins: false,
      }),
      commonjs(),
      terser(terserOptions),
    ],
    onwarn(warning) {
      if (warning.code === 'UNRESOLVED_IMPORT') {
        console.warn(`Warning: ${warning.message}`);
      }
    },
  },
];