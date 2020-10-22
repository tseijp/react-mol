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
export const H: FC =(props)=> <M {...props} />
export const C: FC =(props)=> <M {...props} />
export const O: FC =(props)=> <M {...props} />
export const OH:FC =(props)=> <M {...props}><O/><H/></M>
export {M}
