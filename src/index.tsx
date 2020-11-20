import React from 'react'
// import * as THREE from 'three'
import * as THREE from 'three'
import {BufferGeometryUtils} from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import {Props, MolProps, HelProps, FlowProps} from './types'
import {calcFlow, calcMol} from './work'
import {Atom} from './Atom'
//  ************************* REACT-MOL ************************* //
type MP = Partial<Props<MolProps>>
export {Atom as default, Atom, Hierarchy, Recursion} from './Atom'
export {Render} from './Render'
export * from './utils'
export * from './types'
// export function Poly <T extends object={}>(
//     props: Partial<Props<T> & {
//         n: number,
//     children: null | ((
//         next: ((nextProps?:Partial<Props<T>>) => JSX.Element),
//         key : number
//     ) => JSX.Element),
//     }>
// ): null|JSX.Element
// export function Poly ({children,n=0,...props}: any) {
//     if (n<0) return null
//     const child = children(n>0 && ((nextProps: any={}) => {
//         return <Poly n={n-1} {...nextProps} children={children}/>
//     }), n)
//     return React.cloneElement(child, {...props, children: null,...child.props})
// }
export function Poly <T extends object={}>(
    props: Partial<Props<T>> & Partial<{
        n: number, children: null|((child:JSX.Element, key:number) => JSX.Element),
    }>
): null|JSX.Element
export function Poly ({children,n=0,...props}: any) {
    if (n<0) return null
    const child = children(n>0 && <Poly n={n-1} children={children}/>, n)
    return React.cloneElement(child, {...props, children:null, ...child.props})
}
export const mergedGeometry =()=> {
    const arr = new THREE.Matrix4().makeTranslation(0,-1/2,0)
    const sph = new THREE.SphereBufferGeometry(.3, 32, 32)
    const cyl = new THREE.CylinderBufferGeometry(.1,.1,1,10)
    cyl.applyMatrix4(arr);
    return BufferGeometryUtils.mergeBufferGeometries([cyl, sph])
}
export function Mol (props: MP): null | JSX.Element
export function Mol (props: any) {
    return (
        <Atom<MolProps> {...props} calc={calcMol} geometry={mergedGeometry}>
            <meshPhongMaterial    attach="material" />
            {props.children}
        </Atom>
    )
}
export type Hel = {
    (props: Partial<Props<HelProps>>): null | JSX.Element;
}
export const  Hel: Hel = React.forwardRef((props: any, ref) =>  {
    return (
        <Atom<HelProps> ref={ref} {...props}>
            <boxBufferGeometry attach="geometry" args={[1,1,1]} />
            <meshPhongMaterial attach="material" />
            {props.children}
        </Atom>
    )
})
export function Flow (props: Partial<Props<FlowProps>>): null | JSX.Element
export function Flow (props: any) {
    return (
        <Atom<FlowProps> {...props} calc={calcFlow} color="black">
            <sphereBufferGeometry attach="geometry" args={[1,32,32]}/>
            <meshPhongMaterial    attach="material" />
            {props.children}
        </Atom>
    )
}
//  ************************* MOL ************************* //
export const H =(p:MP)=> <Mol {...p} element={1} color="white"/>
export const C =(p:MP)=> <Mol {...p} element={6} color="black"/>
export const O =(p:MP)=> <Mol {...p} element={8} color="red"/>
export const OH =(p:MP)=> <O {...p}><H/></O>
export const CO =(p:MP)=> <C {...p}><O double/></C>
export const CH =(p:MP)=> <C {...p}><H/></C>
export const CH2 =(p:MP)=> <C {...p}><H/><H/></C>
export const CH3 =(p:MP)=> <C {...p}><H/><H/><H/></C>
//  ************************* HEL ************************* //
