import React from 'react'
// import * as THREE from 'three'
import {Props, MolProps, HelProps, FlowProps} from './types'
import {Atom} from './Atom'
import {calcFlow, calcMol, calcHel} from './work'
//  ************************* REACT-MOL ************************* //
type MP = Partial<Props<MolProps>>
export {Atom as default, Atom, Hierarchy, Recursion} from './Atom'
export {Render} from './Render'
export * from './utils'
export * from './types'

export function Poly <T extends object={}>(
    props: Partial<Props<T> & {
        n: number, children: null|((child:JSX.Element, key:number) => JSX.Element),
    }>
): null|JSX.Element
export function Poly ({children,n=0,...props}: any) {
    if (n<0) return null
    return React.cloneElement(children(n>0
        ? <Poly n={n-1} children={children}/>
        : null, n), props)
}
export function Mol (props: MP): null | JSX.Element
export function Mol (props: any) {
    return (
        <Atom<MolProps>    {...props} calc={calcMol} length={2}>
            <sphereBufferGeometry   attach="geometry"  args={[1,32,32]} />
            <meshPhongMaterial      attach="material" color={0xffffff} />
            <cylinderBufferGeometry attach="geometry"  args={[.1,.1,1,10]} />
            <meshPhongMaterial      attach="material" color={0xffffff} />
            {props.children}
        </Atom>
    )
}
export function Hel (props: Partial<Props<HelProps>>): null | JSX.Element
export function Hel (props: any) {
    return (
        <Atom<HelProps> {...props} calc={calcHel}>
            <boxBufferGeometry   attach="geometry" args={[1,1,1]} />
            <meshPhongMaterial   attach="material" />
            {props.children}
        </Atom>
    )
}
export function Flow (props: Partial<Props<FlowProps>>): null | JSX.Element
export function Flow (props: any) {
    return (
        <Atom<FlowProps> {...props} calc={calcFlow}>
            <sphereBufferGeometry attach="geometry" args={[1,32,32]}/>
            <meshPhongMaterial    attach="material" />
            {props.children}
        </Atom>
    )
}
//  ************************* MOL ************************* //
export const H =(p:MP)=> <Mol {...p} element={1} scale={[.2,.2,.2]} color="white"/>
export const C =(p:MP)=> <Mol {...p} element={6} scale={[.3,.3,.3]} color="black"/>
export const O =(p:MP)=> <Mol {...p} element={8} scale={[.4,.4,.4]} color="red"/>
export const OH =(p:MP)=> <O {...p}><H/></O>
export const CO =(p:MP)=> <C {...p}><O double/></C>
export const CH =(p:MP)=> <C {...p}><H/></C>
export const CH2 =(p:MP)=> <C {...p}><H/><H/></C>
export const CH3 =(p:MP)=> <C {...p}><H/><H/><H/></C>
//  ************************* HEL ************************* //
