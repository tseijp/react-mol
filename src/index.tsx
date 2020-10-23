import React, {FC} from 'react'
import M from './Mol'
export * from './utils'
export * from './types'
//  ************************* REACT-MOL ************************* //
export * from './Mol' //or 'react-mol/three'
export * from './Render'
export * from './useMol'
export * from './useMols'
//  ************************* EXAMPLE ************************* //
export const H: FC =(props:any)=> <M {...props} scale={[.1,.1,.1]} color="white"/>
export const C: FC =(props:any)=> <M {...props} scale={[.3,.3,.3]} color="black"/>
export const O: FC =(props:any)=> <M {...props} scale={[.5,.5,.5]} color="red"/>
export const OH:FC =(props:any)=> <M {...props}><O/><H/></M>
export {M}
