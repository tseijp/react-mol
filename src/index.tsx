import React, {forwardRef, useRef, useMemo} from 'react'
import {useFrame} from 'react-three-fiber'
import * as THREE from 'three'
import {Vec3, AtomProps, MolProps, HelProps, FlowProps, SwarmProps} from './types'
import {eulerVec3, calcMolPos} from './utils'
import {Atom} from './components'
type MP = Partial<AtomProps<MolProps>>
type FP = Partial<AtomProps<FlowProps>>
const sin = Math.sin
//  ************************* REACT-MOL ************************* //
export {Atom as default} from './components'
export * from './components'
export * from './hooks'
export * from './utils'
export * from './types'
// Mol
export const H = forwardRef((p:MP, ref) => <Mol {...p} ref={ref} element={1} color="white"/>)
export const C = forwardRef((p:MP, ref) => <Mol {...p} ref={ref} element={6} color="black"/>)
export const O = forwardRef((p:MP, ref) => <Mol {...p} ref={ref} element={8} color="red"/>)
export const N = forwardRef((p:MP, ref) => <Mol {...p} ref={ref} element={7} color="blue"/>)
export const OH = (p:MP) => <O {...p}><H/></O>
export const CO = (p:MP) => <C {...p}><O double/></C>
export const CH = (p:MP) => <C {...p}><H/></C>
export const CH2 = (p:MP) => <C {...p}><H/><H/></C>
export const CH3 = (p:MP) => <C {...p}><H/><H/><H/></C>
// Flow
export const Sin =(p:FP)=> <Flow {...p} args={(x,_,z,t) => [sin((x+t)/3)+sin((z+t)/2)]} />
export const Box =(p:FP)=> <Flow {...p} args={(x,y,z,t) => [sin(x/4+t) +sin(y/4+t)+sin(z/4+t)]} />

//  *************************         ************************* //
//  ************************* <Mol /> ************************* //
//  *************************         ************************* //
export type Mol = {(props: MP): null | JSX.Element}
export const Mol = forwardRef((props: any, ref) => {
  const {index: i, angle: a, double:d} = props
  const state = useMemo(() => {
    const position = calcMolPos(i, a, d)
    const rotation = eulerVec3(position, [0,1,0])
    return {position, rotation}
  }, [i, a, d])

  const children = useMemo(() =>
    React.Children.map(props.children, (child :any, index) =>
      React.cloneElement(child, {index})
  ), [props.children])

  return <Atom {...props} {...state} ref={ref} children={children}></Atom>
})
//  *************************         ************************* //
//  ************************* <Hel /> ************************* //
//  *************************         ************************* //
export function Hel (props: Partial<AtomProps<HelProps>>): null | JSX.Element
export function Hel (props: any) {
    return  <Atom {...props}></Atom>
}
//  *************************          ************************* //
//  ************************* <Flow /> ************************* //
//  *************************          ************************* //
export function Flow (props: Partial<AtomProps<FlowProps>>): null | JSX.Element
export function Flow (props: any) {
  const ref = useRef<any>(null)
  const now = useRef<number>(0)
  const fun = (value: any): value is Function => typeof value==="function"
  useFrame((_, delta) => {
    if (!ref.current) return
    now.current += delta
    const { position: p, scale: s, args: a,
            rotation: r, color: c } = props
    const args = fun(a)
        ? a(now.current, ...ref.current.position.toArray())
        : [ now.current, ...(a || []) ]
    p && ref.current.position.set(...(fun(p)? p(...args): p))
    r && ref.current.rotation.set(...(fun(r)? r(...args): r))
    s && ref.current.scale.set(...(fun(s)? s(...args): s))
    c && ref.current.color.set(fun(c)? c(...args): c)
  })
  return <Atom ref={ref}></Atom>
}
//  *************************           ************************* //
//  ************************* <Swarm /> ************************* //
//  *************************           ************************* //
export function Swarm (props: Partial<AtomProps<SwarmProps>>): null | JSX.Element
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
        fun(c) && ref.current.color.set(...c(...args))
    })
    return (
        <Atom ref={ref}></Atom>
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
        <Atom top {...props} {...{position, rotation}}>
            <cylinderBufferGeometry args={[.1]}/>
            <meshPhongMaterial attach="material"/>
            {props.children}
        </Atom>
    )
}
