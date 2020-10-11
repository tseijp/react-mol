import { promises as fs } from 'fs';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const input = 'src/index'
const external = Object.keys({...pkg.dependencies,...pkg.devDependencies})
const extensions = ['.js', '.jsx', '.ts', '.tsx']

function babelOption (useESModules) {
    return {
        babelrc:false,
        babelHelpers:'runtime',
        exclude:'**/node_modules/**',
        extensions,
        presets : [
            ['@babel/env', {loose:true, modules:false}],
             '@babel/preset-react','@babel/preset-typescript'
        ],
        plugins : [
            [ '@babel/proposal-class-properties'         ,    {loose:true} ],
            [ '@babel/plugin-proposal-object-rest-spread',    {loose:true} ],
            [ '@babel/transform-runtime', {regenerator:false,useESModules} ],
            [ 'transform-react-remove-prop-types',     {removeImport:true} ],
        ],
    }
}

function targetTypings(out) {
  return {
    writeBundle () {
      return fs.lstat(pkg.types).catch(() => {
        return fs.writeFile(pkg.types, `export * from "./${input}"`)
      })
    }
  }
}

export default [
    { input, output:{file:pkg.main   ,format:'cjs'}, external, plugins:[
        babel( babelOption(true) ),
        commonjs({extensions}),
        resolve ({extensions}),
        targetTypings(),
    ]},
    { input, output:{file:pkg.module ,format:'esm'}, external, plugins:[
        babel( babelOption(false) ),
        commonjs({extensions}),
        resolve ({extensions}),
        targetTypings(),
    ] },
]
