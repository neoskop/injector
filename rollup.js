import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'dist/public_api.js',
    external: [ '@angular/core' ],
    output: {
        globals: {
            '@angular/core': 'ng.core'
        },
        format: 'umd',
        name: 'neoskop.injector',
        file: 'bundle/injector.bundle.js',
        sourcemap: true,
        amd: {
            id: '@neoskop/injector'
        }
    },
    plugins: [
        resolve(),
        commonjs(),
        sourcemaps()
    ],
    treeshake: true,

}
