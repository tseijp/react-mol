import React from 'react'
import {AtomProps, MolProps, FlowProps} from './types'
import {Mol, Flow} from './components'
type MP = Partial<AtomProps<MolProps>>
type FP = Partial<AtomProps<FlowProps>>
const sin = Math.sin
//  ************************* REACT-MOL ************************* //
export * from './components'
export * from './hooks'
export * from './utils'
export * from './types'
// Mol
export const H = React.forwardRef((p:MP, ref) => <Mol {...p} ref={ref} element={1} color="white"/>)
export const C = React.forwardRef((p:MP, ref) => <Mol {...p} ref={ref} element={6} color="black"/>)
export const O = React.forwardRef((p:MP, ref) => <Mol {...p} ref={ref} element={8} color="red"/>)
export const N = React.forwardRef((p:MP, ref) => <Mol {...p} ref={ref} element={7} color="blue"/>)
export const OH = (p:MP) => <O {...p}><H/></O>
export const CO = (p:MP) => <C {...p}><O double/></C>
export const CH = (p:MP) => <C {...p}><H/></C>
export const CH2 = (p:MP) => <C {...p}><H/><H/></C>
export const CH3 = (p:MP) => <C {...p}><H/><H/><H/></C>
// Flow
export const Sin =(p:FP)=> <Flow {...p} args={(x,_,z,t) => [sin((x+t)/3)+sin((z+t)/2)]} />
export const Box =(p:FP)=> <Flow {...p} args={(x,y,z,t) => [sin(x/4+t) +sin(y/4+t)+sin(z/4+t)]} />
