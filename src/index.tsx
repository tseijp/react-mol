import React from 'react'
import {Props} from './types'
import {Atom} from './Atom'
//  ************************* REACT-MOL ************************* //
export {Atom as default, Atom, Hierarchy, Recursion} from './Atom'
export {Poly} from './Poly'
export {Render} from './Render'
export {useMol} from './useMol'
export * from './utils'
export * from './types'
//  ************************* EXAMPLE ************************* //
type P = Partial<Props>
export const Mol = ({children, ...props}:P) => (
    <Atom length={2} {...props}>
        <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
        <meshPhongMaterial    attach="material" color={0xffffff} />
        <cylinderBufferGeometry attach="geometry" args={[.05, .05, 1, 10]} />
        <meshPhongMaterial      attach="material" color={0xffffff} />
        {children}
    </Atom>
)
export const Hel = ({children, ...props}:P) => (
    <Atom length={0} {...props}>
        {children}
    </Atom>
)
export const H =(p:P)=> <Mol {...p} element={1} scale={[.2,.2,.2]} color="white"/>
export const C =(p:P)=> <Mol {...p} element={6} scale={[.3,.3,.3]} color="black"/>
export const O =(p:P)=> <Mol {...p} element={8} scale={[.4,.4,.4]} color="red"/>
export const OH =(p:P)=> <O {...p}><H/></O>
export const CO =(p:P)=> <C {...p}><O double/></C>
export const CH =(p:P)=> <C {...p}><H/></C>
export const CH2 =(p:P)=> <C {...p}><H/><H/></C>
export const CH3 =(p:P)=> <C {...p}><H/><H/><H/></C>
