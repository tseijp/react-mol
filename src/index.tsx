import React from 'react'
import {MolProps as P} from './types'
import M from './Mol'
export {M}
//  ************************* REACT-MOL ************************* //
export * from './Mol'
export * from './Poly'
export * from './Render'
export * from './useMol'
export * from './utils'
export * from './types'
//  ************************* EXAMPLE ************************* //
export const H  =(p:P)=> <M {...p} scale={[.2,.2,.2]} color="white"/>
export const C  =(p:P)=> <M {...p} scale={[.3,.3,.3]} color="black"/>
export const O  =(p:P)=> <M {...p} scale={[.5,.5,.5]} color="red"/>
export const OH =(p:P)=> <O {...p}><H/></O>
