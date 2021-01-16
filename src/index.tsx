import React, {useRef, useMemo} from 'react'
import {useFrame} from 'react-three-fiber'
import * as THREE from 'three'
import {Vec3, Props, MolProps, HelProps, FlowProps, SwarmProps} from './types'
import {mergedGeometry, eulerVec3, calcMolPos} from './utils'
import {Atom} from './Atom'
type MP = Partial<Props<MolProps>>
type FP = Partial<Props<FlowProps>>
const sin = Math.sin
//  ************************* REACT-MOL ************************* //
export {Atom as default, Atom, Hierarchy, Recursion} from './Atom'
export {Render} from './Render'
export * from './utils'
export * from './types'
// Mol
export const H =(p:MP)=> <Mol {...p} element={1} color="white"/>
export const C =(p:MP)=> <Mol {...p} element={6} color="black"/>
export const O =(p:MP)=> <Mol {...p} element={8} color="red"/>
export const N =(p:MP)=> <Mol {...p} element={7} color="blue"/>
export const OH =(p:MP)=> <O {...p}><H/></O>
export const CO =(p:MP)=> <C {...p}><O double/></C>
export const CH =(p:MP)=> <C {...p}><H/></C>
export const CH2 =(p:MP)=> <C {...p}><H/><H/></C>
export const CH3 =(p:MP)=> <C {...p}><H/><H/><H/></C>
// Flow
export const Sin =(p:FP)=> <Flow {...p} args={(x,_,z,t) => [sin((x+t)/3)+sin((z+t)/2)]} />
export const Box =(p:FP)=> <Flow {...p} args={(x,y,z,t) => [sin(x/4+t) +sin(y/4+t)+sin(z/4+t)]} />
//  *************************         ************************* //
//  ************************* <Mol /> ************************* //
//  *************************         ************************* //
export function Mol (props: MP): null | JSX.Element
export function Mol (props: any) {
    const {index: i, angle: a, double:d} = props
    const position = useMemo<Vec3>(() => calcMolPos(i, a, d), [i, a, d])
    const rotation = useMemo<Vec3>(() => eulerVec3(position, [0,1,0]), [position])
    return (
        <Atom<MolProps>
            {...props} top geometry={mergedGeometry}
            {...{position, rotation}}>
            {useMemo(() => React.Children.map(props.children, (child :any, index) =>
                React.cloneElement(child, {index})
            ), [props.children])}
        </Atom>
    )
}
//  *************************         ************************* //
//  ************************* <Hel /> ************************* //
//  *************************         ************************* //
export function Hel (props: Partial<Props<HelProps>>): null | JSX.Element
export function Hel (props: any) {
    return  <Atom<HelProps> top {...props}></Atom>
}
//  *************************          ************************* //
//  ************************* <Flow /> ************************* //
//  *************************          ************************* //
export function Flow (props: Partial<Props<FlowProps>>): null | JSX.Element
export function Flow (props: any) {
    const ref = useRef<any>(null)
    const now = useRef<number>(0)
    const fun = (value: any): value is Function => typeof value==="function"
    useFrame((_, delta) => {
        now.current += delta
        const {args:a, position:p, rotation:r, scale:s, color:c} = props
        const args = fun(a)
            ? a(now.current, ...ref.current.position.toArray())
            : [ now.current, ...(a || []) ]
        fun(p) && ref.current.position.set(...p(...args))
        fun(r) && ref.current.rotation.set(...r(...args))
        fun(s) && ref.current.scale.set(...s(...args))
        fun(c) && ref.current.scale.set(...c(...args))
    })
    return (
        <Atom<FlowProps> {...props} ref={ref}></Atom>
    )
}
//  *************************           ************************* //
//  ************************* <Swarm /> ************************* //
//  *************************           ************************* //
export function Swarm (props: Partial<Props<SwarmProps>>): null | JSX.Element
export function Swarm (props: any) {
    const ref = useRef<any>(null)
    const now = useRef<number>(0)
    const acc = useRef<THREE.Vector3>(new THREE.Vector3(0,0,0))
    const vec = useRef<THREE.Vector3>(new THREE.Vector3(0,0,0))
    const fun = (value: any): value is Function => typeof value==="function"
    useFrame((_, delta) => {
        now.current += delta
        const { args:a, position:p, rotation:r,
                force:f, scale:s, color:c} = props
        const args = fun(a)
            ? a(now.current, ...ref.current.position.toArray())
            : [ now.current, ...ref.current.position.toArray() ]
        fun(f) && acc.current.set(...(f(...args) as Vec3))
        vec.current.add(acc.current)
        fun(p) && ref.current.position.set(...p(...args))
        fun(r) && ref.current.rotation.set(...r(...args))
        fun(s) && ref.current.scale.set(...s(...args))
        fun(c) && ref.current.scale.set(...c(...args))
    })
    return (
        <Atom<FlowProps> {...props} ref={ref} ></Atom>
    )
}
//  *************************           ************************* //
//  ************************* <Plant /> ************************* //
//  *************************           ************************* //
export function Plant (props: MP): null | JSX.Element
export function Plant (props: any) {
    const {index: i=0, angle: a=Math.PI/2, double:d=false} = props
    const position = useMemo<Vec3>(() => calcMolPos(i, a, d), [i, a, d])
    const rotation = useMemo<Vec3>(() => eulerVec3(position, [0,1,0]), [position])
    return (
        <Atom<MolProps> top {...props} {...{position, rotation}}>
            <cylinderBufferGeometry args={[.1]}/>
            <meshPhongMaterial attach="material"/>
            {props.children}
        </Atom>
    )
}
//  *************************          ************************* //
//  ************************* <Poly /> ************************* //
//  *************************          ************************* //
export function Poly <T extends object={}>(
    props: Partial<Props<T>> & Partial<{
        n: number,
        children: null | ((
            child: JSX.Element,
            key: number
        ) => JSX.Element),
    }>
): null|JSX.Element
export function Poly ({children,n=0,...props}: any) {
    if (n<0) return null
    const child = children(n>0 && <Poly n={n-1} children={children}/>, n)
    return React.cloneElement(child, {...props, children:null, ...child.props})
}
// TODO functional Props for Poly
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
