import React from 'react'
import {MolProps} from './types'
import {Mol as M} from './Mol'
//  ************************* REACT-MOL ************************* //
export {Mol as default, Mol, Hierarchy, Recursion} from './Mol'
export {Poly} from './Poly'
export {Render} from './Render'
export {useMol} from './useMol'
export * from './utils'
export * from './types'
//  ************************* EXAMPLE ************************* //
type P = Partial<MolProps>
export const H  =(p:P)=> <M {...p} element={1} scale={[.2,.2,.2]} color="white"/>
export const C  =(p:P)=> <M {...p} element={6} scale={[.3,.3,.3]} color="black"/>
export const O  =(p:P)=> <M {...p} element={8} scale={[.4,.4,.4]} color="red"/>
export const OH =(p:P)=> <O {...p}><H/></O>
export const CO =(p:P)=> <C {...p}><O double/></C>
export const CH =(p:P)=> <C {...p}><H/></C>
export const CH2 =(p:P)=> <C {...p}><H/><H/></C>
export const CH3 =(p:P)=> <C {...p}><H/><H/><H/></C>
