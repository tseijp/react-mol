import React, {Children, useContext, useMemo, useRef, useState} from 'react'
import {Render, render} from './Render'
import {calcColor} from './utils'
import {Props} from './types'
let uuid = 0
export const Hierarchy = React.forwardRef((props:any, ref) => {
    const [index] = useState(() => uuid++)
    const group   = useRef<any>(null)
    const state   = useMemo(() => props.calc(props), [props])
    const {states} = useContext(render) as any
    React.useEffect(() => {
        group.current.updateMatrixWorld()
        states.current[index] = {
            matrix: group.current.matrixWorld,
            color : calcColor(state.color)
        }
    }, [index, state, states])
    React.useImperativeHandle(ref, () => ({
        position: group.current.position,
        rotation: group.current.rotation,
        scale   : group.current.scale,
    }))
    return (
        <group ref={group} {...state}>
            {React.Children.map(state.children, (child:any) =>
                React.cloneElement(child, {
                    ...state, children:null,// ⚠ crash if not assigned null ⚠
                    ...child.props, parentProps: state,
                    depth: (props.depth||0) + 1,
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
            ...(grandren || []).slice(props.length),
            <Recursion key={-1} {...{children}}/>
        ]
    })
}
export type Atom = {
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
    if (typeof depth==="number" && depth > 0)
        return <Atom ref={ref} {...props}>{children.slice(cutLength)}</Atom>
    return (
        <Render {...{geometry, material, cutLength, maxLength}}>
            {[...children.slice(0, cutLength),
            <Atom ref={ref} {...props} key={0}
                calc    = {props.calc}
                calcPos = {props.calcPos}
                position= {props.position || [0,0,0]}>
                {children.slice(cutLength)}
            </Atom>]}
        </Render>
    )
})
