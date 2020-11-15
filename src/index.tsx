import React from 'react'
// import * as THREE from 'three'
import {Props, MolProps, HelProps} from './types'
import {Atom} from './Atom'
import {calcPos, calcMol, calcHel} from './work'
//  ************************* REACT-MOL ************************* //
type MP = Partial<Props<MolProps>>
type HP = Partial<Props<HelProps>>
export {Atom as default, Atom, Hierarchy, Recursion} from './Atom'
export {Poly} from './Poly'
export {Render} from './Render'
export {useMol} from './useMol'
export * from './utils'
export * from './types'
// const mergedGeometry =()=> {
//     const base = new THREE.SphereBufferGeometry(1, 32, 32)
//     base.merge(new THREE.CylinderBufferGeometry(.1,.1,1,10))
//     return base
// }
export function Mol (props: MP): null | JSX.Element
export function Mol (props: any) {
    return (
        <Atom<MolProps> length={2} {...props} calc={calcMol} calcPos={calcPos}>
            <sphereBufferGeometry   attach="geometry"  args={[1,32,32]} />
            <meshPhongMaterial      attach="material" color={0xffffff} />
            <cylinderBufferGeometry attach="geometry"  args={[.1,.1,1,10]} />
            <meshPhongMaterial      attach="material" color={0xffffff} />
            {props.children}
        </Atom>
    )
}
export function Hel (props: HP): null | JSX.Element
export function Hel (props: any) {
    return (
        <Atom<HelProps> length={1} {...props} calc={calcHel}>
            <boxBufferGeometry attach="geometry" args={[1,1,1]} />
            <meshPhongMaterial attach="material" />
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
