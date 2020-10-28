import React from 'react'
import {MolProps as P} from './types'
import M from './Mol'
export {M}
//  ************************* REACT-MOL ************************* //
export {Mol, Hierarchy, Recursion} from './Mol'
export {Poly} from './Poly'
export {Render} from './Render'
export {useMol} from './useMol'
export * from './utils'
export * from './types'
//  ************************* EXAMPLE ************************* //
export const H  =(p:P)=> <M {...p} element={1} scale={[.2,.2,.2]} color="white"/>
export const C  =(p:P)=> <M {...p} element={6} scale={[.3,.3,.3]} color="black"/>
export const O  =(p:P)=> <M {...p} element={8} scale={[.5,.5,.5]} color="red"/>
export const OH =(p:P)=> <O {...p}><H/></O>
export const CO =(p:P)=> <C {...p}><O double/></C>
export const CH =(p:P)=> <C {...p}><H/></C>
export const CH2 =(p:P)=> <C {...p}><H/><H/></C>
export const CH3 =(p:P)=> <C {...p}><H/><H/><H/></C>
