import { promises as fs } from 'fs'
import { resolve } from 'path'
import pkg from './package.json'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import { terser } from 'rollup-plugin-terser'

const input = 'src/index'
const external = Object.keys({...pkg.dependencies, ...pkg.devDependencies})
const extensions = ['.js', '.jsx', '.ts', '.tsx']

const getBabelOptions = ({ useESModules }) => ({
    babelrc: false,
    babelHelpers: 'runtime',
    extensions,
    exclude: '**/node_modules/**',
    plugins: [
        ['@babel/transform-runtime', {regenerator:false, useESModules}],
        ['@babel/proposal-class-properties'         , {loose:true}],
        ['@babel/plugin-proposal-object-rest-spread', {loose:true}],
        ['transform-react-remove-prop-types', {removeImport:true}],
    ],
    presets: [
        ['@babel/env', {loose:true, modules:false}],
        '@babel/preset-react',
        '@babel/preset-typescript'
    ],
})

const targetTypings = () => ({
    writeBundle () {
        const text = `export * from "./${input}";\nexport {default as default} from "./${input}"`
        return fs.lstat(pkg.types).catch(() => {
            return fs.writeFile(pkg.types, text)
        })
    }
})

const copyReadme = () => ({
    writeBundle () {
        fs.copyFile(resolve('../../README.md'), 'README.md', err => void console.log(err));
    }
})

export default [
    { input, output: {file: pkg.main, format: 'cjs'}, external, plugins: [
        babel( getBabelOptions({useESModules: false}) ),
        commonjs({extensions}),
        nodeResolve({extensions}),
        nodePolyfills({crypto: true}),
        terser(),
    ]},
    { input, output: {file: pkg.module, format: 'esm'}, external, plugins: [
        babel( getBabelOptions({useESModules: true}) ),
        commonjs({extensions}),
        nodeResolve({extensions}),
        nodePolyfills({crypto: true}),
        targetTypings(),
        copyReadme(),
        terser(),
    ] },
]
