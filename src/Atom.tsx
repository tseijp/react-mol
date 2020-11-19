import React, {Children, useContext, useMemo, useRef, useState} from 'react'
import {Render, render} from './Render'
import {Props} from './types'
import * as THREE from 'three'

let uuid = 0
export const Hierarchy = React.forwardRef((props:any, ref) => {
    const {states} = useContext(render) as any
    const [index] = useState(() => uuid++)
    // const state   = useMemo(() => props.calc(props), [props])
    const depth = useMemo(() => (props.depth||0)+1, [props.depth])
    const state = useMemo(() => props.calc({...props, depth, cutLength: 0}), [props, depth])
    const color = useRef<any>(new THREE.Color().setColorName(state.color))
    const group = useRef<any>(null)
    React.useEffect(() => {
        group.current.updateMatrixWorld()
        states.current[index] = {
            matrix: group.current.matrixWorld,
            color : color.current
        }
        // return () => void (delete states.current[index])
    }, [states, index])
    React.useImperativeHandle(ref, () => ({
        position: group.current.position,
        rotation: group.current.rotation,
        scale   : group.current.scale,
        color   : color.current
    }))
    const children = React.Children.map(state.children, (child:any, i) =>
        child && React.cloneElement(child, {
            ...state, children:null,// ⚠ crash if not assigned null ⚠
            ...child.props, parentProps: state,
            index: i,
            depth: (props.depth||0) + 1,
            cutLength: 0,
        })
    )
    return (
        <group ref={group} {...state}>
            {children}
        </group>
    )
})
export const Recursion = (props:any) => {
    const [child, ...children] = Children.map(props.children, c=>c)
    if (typeof child!=="object") return null
    const grandren = Children.map(child.props.children, c=>c)
    return React.cloneElement(child, {
        ...props, depth: 1, recursion: false, children: [
            ...(grandren || []).slice(props.length),
            <Recursion key={-1} {...{children}}/>
        ]
    })
}
export type Atom = {
    <T extends object={}>(props: unknown & Partial<Props<T>>): null | JSX.Element;
    <T extends object={}>(props: unknown & Partial<Props<T>>): null | JSX.Element;
}
export const Atom: Atom = React.forwardRef(({
    geometry=null, cutLength=2,
    material=null, maxLength=1000,
    children=null, depth=0,
    ...props
}: any, ref) => {
    if (!(children instanceof Array)) children = Children.map(children, c=>c)
    if (!geometry &&  material) cutLength /= 2
    if ( geometry &&  material) cutLength  = 0
    if ( geometry && !material) cutLength /= 2
    const Atom = props.recursion? Recursion : Hierarchy
    // if (typeof depth==="number" && depth > 0)
    if (uuid!==0)
        return <Atom ref={ref} {...props}>{children?.slice(cutLength)}</Atom>
    return (
        <Render {...{geometry, material, cutLength, maxLength}}>
            {children && [...children.slice(0, cutLength),
            <Atom ref={ref} {...props} key={0}
                calc    = {props.calc || ((p:any)=>p)}
                position= {props.position || [0,0,0]}>
                {children.slice(cutLength)}
            </Atom>]}
        </Render>
    )
})
