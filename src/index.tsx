import React from 'react'
// import * as THREE from 'three'
import {useFrame} from 'react-three-fiber'
import {Props, MolProps, HelProps, FlowProps} from './types'
import {mergedGeometry} from './utils'
import {calcMol} from './work'
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
export const OH =(p:MP)=> <O {...p}><H/></O>
export const CO =(p:MP)=> <C {...p}><O double/></C>
export const CH =(p:MP)=> <C {...p}><H/></C>
export const CH2 =(p:MP)=> <C {...p}><H/><H/></C>
export const CH3 =(p:MP)=> <C {...p}><H/><H/><H/></C>
// Flow
export const Sph =(p:FP)=> <Flow {...p} rate={(x,_,z,t) => sin((x+t)/3)+sin((z+t)/2)} />
export const Box =(p:FP)=> <Flow {...p} rate={(x,y,z,t) => sin(x/4+t) +sin(y/4+t)+sin(z/4+t)} />
//  *************************        ************************* //
//  ************************* <Poly> ************************* //
//  *************************        ************************* //
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
export function Mol (props: any) {
    return (
        <Atom<MolProps> {...props} calc={calcMol} geometry={mergedGeometry}>
            <meshPhongMaterial    attach="material" />
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
export const  Hel: Hel = React.forwardRef((props: any, ref) =>  {
    return (
        <Atom<HelProps> ref={ref} {...props}>
            <boxBufferGeometry attach="geometry" args={[1,1,1]} />
            <meshPhongMaterial attach="material" />
            {props.children}
        </Atom>
    )
})
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
        const r = props.rate(...ref.current.position.toArray(), now.current) || 0
        fun(props.position) && ref.current.position.set(...props.position(r))
        fun(props.rotation) && ref.current.rotation.set(...props.rotation(r))
        fun(props.scale) && ref.current.scale.set(...props.scale(r))
        fun(props.color) && ref.current.scale.set(...props.color(r))
    })
    return <Atom<FlowProps> {...props} ref={ref} depth={1} />
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
