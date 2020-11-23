import React, {useMemo} from 'react'
// import * as THREE from 'three'
import {useFrame} from 'react-three-fiber'
import {Vec3, Props, MolProps, HelProps, FlowProps} from './types'
import {mergedGeometry} from './utils'
import {Atom} from './Atom'
import {eulerVec3, mergeVec3} from './utils'
type MP = Partial<Props<MolProps>>
type FP = Partial<Props<FlowProps>>
const sin = Math.sin
const rad = Math.sqrt(2)*2/3
//  ************************* REACT-MOL ************************* //
export {Atom as default, Atom, Hierarchy, Recursion} from './Atom'
export {Render} from './Render'
export * from './utils'
export * from './types'
// Mol
export const H =(p:MP)=> <Mol {...p} element={1} color="white"/>
export const C =(p:MP)=> <Mol {...p} element={6} color="black"/>
export const O =(p:MP)=> <Mol {...p} element={8} color="red"/>
export const OH =(p:MP)=> <O {...p}><H/></O>
export const CO =(p:MP)=> <C {...p}><O double/></C>
export const CH =(p:MP)=> <C {...p}><H/></C>
export const CH2 =(p:MP)=> <C {...p}><H/><H/></C>
export const CH3 =(p:MP)=> <C {...p}><H/><H/><H/></C>
// Flow
export const Sin =(p:FP)=> <Flow {...p} args={(x,_,z,t) => [sin((x+t)/3)+sin((z+t)/2)]} />
export const Box =(p:FP)=> <Flow {...p} args={(x,y,z,t) => [sin(x/4+t) +sin(y/4+t)+sin(z/4+t)]} />

//  *************************          ************************* //
//  ************************* <Poly /> ************************* //
//  *************************          ************************* //
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
//  *************************         ************************* //
//  ************************* <Mol /> ************************* //
//  *************************         ************************* //
export function Mol (props: MP): null | JSX.Element
export function Mol ({position, rotation, distance, ...props}: any) {
    const pos = useMemo<Vec3>(() => {
        const phi = props.index* Math.PI* 2/3 + (props.angle || 0)
        const vec = [rad*Math.cos(phi), 1/3, rad*Math.sin(phi)] as Vec3
        return props.index<3? vec: [0,-1,0]
    }, [props.index, props.angle])
    console.log(props.index)
    const dis = useMemo(() => mergeVec3([-1,1], position||[rad,1/3,0], pos), [position, pos])
    const rot = useMemo(() => eulerVec3(dis, distance||[0,1,0]), [distance, dis])
    return (
        <Atom<MolProps>
            {...props} geometry={mergedGeometry}
            {...{position: pos, rotation: rot, distance: dis}}>
            <meshPhongMaterial attach="material"/>
            {props.children}
        </Atom>
    )
}
//  *************************         ************************* //
//  ************************* <Hel /> ************************* //
//  *************************         ************************* //
export type Hel = {
    (props: Partial<Props<HelProps>>): null | JSX.Element;
}
export const  Hel: Hel = (props: any) =>  {
    return (
        <Atom<HelProps> {...props}>
            <boxBufferGeometry attach="geometry" args={[1,1,1]} />
            <meshPhongMaterial attach="material" />
            {props.children}
        </Atom>
    )
}
//  *************************         ************************* //
//  ************************* <Flow /> ************************* //
//  *************************         ************************* //
export function Flow (props: Partial<Props<FlowProps>>): null | JSX.Element
export function Flow (props: any) {
    const ref = React.useRef<any>(null)
    const now = React.useRef<number>(0)
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
    return <Atom<FlowProps> {...props} ref={ref} depth={1}/>
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
// TODO CalcPos for Mol
// export function calcPos (target:Props<MolProps>, parent:Props<MolProps>, key=0): Vec3 {
//     const phi = key* Math.PI* 2/3 + (parent.angle || 0)
//     const vec = [sqrt2_3*Math.cos(phi), sqrt1_3, sqrt2_3*Math.sin(phi)]
//     return mergeVec3(Array(4).fill(1),
//         calcRelative((key<3? vec: [0,-1,0]) as Vec3, target.rotation, parent.direction),
//         parent.position || [0,0,0],
//         target.position || [0,0,0],
//         target.double
//             ? calcPos({...target,double:false}, parent,key+(key?2:3))
//             : [0,0,0]
//     )
// }
// export const calcMol = ({children, ...props}:Props<MolProps>): Props<MolProps> => {
//     const {position: target=[0,0,0], state} = props
//     const position = mergeVec3([.5,.5], target, state?.position||[0,-1,0])
//     const distance = mergeVec3([ 1,-1], target, state?.position||[0,-1,0])
//     const rotation = eulerVec3(distance)
//     const clone    = React.Children.map(children, (child:any, key) => {
//         if (!child) return null
//         const phi = key* Math.PI* 2/3 + (props.angle || 0)
//         const vec = [sqrt2_3*Math.cos(phi), sqrt1_3, sqrt2_3*Math.sin(phi)]
//         const position = (key<3? vec: [0,-1,0]) as Vec3
//         return React.cloneElement(child, {position})
//     })
//     return {...props, children: clone, position, rotation, scale: [1,1,1]}
// }
