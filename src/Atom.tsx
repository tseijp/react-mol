import React, {Children, useContext, useMemo, useRef, useState} from 'react'
import {Render, render} from './Render'
import {Props, States} from './types'
import * as THREE from 'three'

let uuid = 0
export type Hierarchy = {
    <T extends object={}>(props: unknown & Partial<Props<T>>): null | JSX.Element
}
export const Hierarchy: Hierarchy = React.forwardRef(({
    children, calc=((p: any)=>p), ...props
}:any, ref) => {
    const {states} = useContext<States>(render)
    const [index] = useState(() => uuid++)
    const depth = useMemo(() => (props.depth||0)+1, [props.depth])
    const color = useRef<any>(new THREE.Color().set(props.color||"black"))
    const group = useRef<any>(null)
    React.useEffect(() => {
        group.current.updateMatrixWorld()
        states.current[index] = {
            group: group.current,
            color: color.current
        }// return () => void (delete states.current[index])
    }, [states, index])
    React.useImperativeHandle(ref, () => ({
        position: group.current.position,
        rotation: group.current.rotation,
        scale   : group.current.scale,
        color   : color.current
    }))
    console.log(props.cut)
    return (
        <group ref={group} {...props}>
            {children && typeof children[0]==="function"
                ? children[0]({...props, depth, state:props, children:null})
                : React.Children.map(children, (child: any, key) =>
                    child && React.cloneElement(child, {
                        //⚠ crash if children isnt assigned null ⚠
                        ...props, state:props, children:null, depth,
                        ...child.props, index: key
                })
            )}
        </group>
    )
})
export const Recursion = (props:any) => {
    const [child, ...children] = Children.map(props.children, c=>c)
    if (typeof child!=="object") return null
    const grandren = Children.map(child.props.children, c=>c)
    return React.cloneElement(child, {
        ...props, depth: 1, recursion: false, children: [
            ...(grandren || []),//.slice(props.length) // ???
            children.length && <Recursion key={-1} {...{children}}/>
        ]
    })
}
export type Atom = {
    <T extends object={}>(props: unknown & Partial<Props<T>>): null | JSX.Element;
}
export const Atom: Atom = React.forwardRef(({
    geometry=null, cut=2,
    material=null, max=1000,
    children=null, depth=0,
    ...props
}: any, ref) => {
    if (typeof children==="function") children = [children]
    if (!(children instanceof Array)) children = Children.map(children, c=>c)
    if (depth) cut = 0
    if (!geometry &&  material) cut /= 2
    if ( geometry &&  material) cut  = 0
    if ( geometry && !material) cut /= 2
    const Atom = props.recursion? Recursion : Hierarchy
    if (depth)
        return <Atom ref={ref} {...props}>{children?.slice(cut)}</Atom>
    return (
        <Render {...{geometry, material, cut, max}}>
            {[...children.slice(0, cut),
            <Atom ref={ref} {...props} key={0}
                calc    = {props.calc || ((p:any)=>p)}
                position= {props.position || [0,0,0]}>
                {children.slice(cut)}
            </Atom>]}
        </Render>
    )
})
