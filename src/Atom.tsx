import React, {Children, useMemo, useRef, useState} from 'react'
import {Render, context} from './Render'
import {Props} from './types'
let uuid = 0
export const Hierarchy = React.forwardRef((props:any, ref) => {
    const [index] = useState(() => uuid++)
    const group   = useRef<any>(null)
    const state   = useMemo(() => props.calc(props), [props])
    const { instances } = React.useContext(context) as any

    React.useEffect(() => {
        group.current.updateMatrixWorld()
        instances.current[index] = state
    }, [index, state, instances])

    React.useImperativeHandle(ref, () => ({
        position: group.current.position,
        rotation: group.current.rotation,
        scale   : group.current.scale,
    }))
    return (
        <group ref={group} {...state[0]}>
            {state[0].children}
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
    geometry, length=1,
    material,  depth=0,
    children, ...props
}: any, ref) => {
    if (!(children instanceof Array)) children = Children.map(children, c=>c)
    const Atom = props.recursion? Recursion : Hierarchy
    if (typeof depth==="number" && depth > 0)
        return <Atom ref={ref} {...props}>{children.slice(length*2)}</Atom>
    return (
        <Render length={length}>
            {[...children.slice(0,length*2),
            <Atom ref={ref} {...props} key={0}
                position= {props.position|| [0,0,0]}
                calc    = {props.calc       }
                calcPos = {props.calcPos}>
                {children.slice(length*2)}
            </Atom>]}
        </Render>
    )
})
