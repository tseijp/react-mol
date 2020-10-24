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
export const H  =(props:P)=> <M {...props} scale={[.1,.1,.1]} color="white"/>
export const C  =(props:P)=> <M {...props} scale={[.3,.3,.3]} color="black"/>
export const O  =(props:P)=> <M {...props} scale={[.5,.5,.5]} color="red"/>
export const H2 =(props:P)=> Array(2).fill(<H {...props}/>)
export const H3 =(props:P)=> Array(3).fill(<H {...props}/>)
export const H4 =(props:P)=> Array(4).fill(<H {...props}/>)
export const OH =(props:P)=> <O {...props}><H/></O>
