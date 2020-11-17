import React, {Children, useMemo, useRef, useState} from 'react'
import {Render, render} from './Render'
import {Props} from './types'

let uuid = 0
export const Hierarchy = React.forwardRef((props:any, ref) => {
    const [index] = useState(() => uuid++)
    const group   = useRef<any>(null)
    const state   = useMemo(() => props.calc(props), [props])
    const {matrix} = React.useContext(render) as any
    React.useEffect(() => {
        group.current.updateMatrixWorld()
        matrix.current[index] = state
    }, [index, state, matrix])
    React.useImperativeHandle(ref, () => ({
        position: group.current.position,
        rotation: group.current.rotation,
        scale   : group.current.scale,
    }))
    return (
        <group ref={group} {...state[0]}>
            {React.Children.map(state[0].children, (child:any) =>
                child && React.cloneElement(child, {
                    ...state[0], children:null,// ⚠ crash if not assigned null ⚠
                    ...child.props, parentProps: state[0],
                    depth:(props.depth||0) + 1,
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
    geometry, length,
    material,  depth,
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
                calc    = {props.calc}
                calcPos = {props.calcPos}
                position= {props.position || [0,0,0]}>
                {children.slice(length*2)}
            </Atom>]}
        </Render>
    )
})
