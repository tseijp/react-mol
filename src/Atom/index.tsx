import React, {Children} from 'react'
import {Render} from '../Render'
import {Props} from '../types'
import {useHierarchy} from './hooks'

export type Hierarchy = {
    <T extends object={}>(props: unknown & Partial<Props<T>>): null | JSX.Element
}
export const Hierarchy = React.forwardRef((props: any, ref) => (
    <group {...useHierarchy(props, ref)}/>
))
export const Recursion = (props:any) => {
    const [child, ...children] = Children.map(props.children, c=>c)
    if (typeof child!=="object") return null
    const grand = Children.map(child.props.children, c=>c)
    return React.cloneElement(child, {
        ...props, recursion: false, children: [
            ...(grand || []),//.slice(props.length) // ???
            children.length && <Recursion key={grand.length} {...{children}}/>
        ]
    })
}
export type Atom = {
    <T extends object={}>(props: unknown & Partial<Props<T>>): null | JSX.Element;
}
export const Atom: Atom = React.forwardRef(({
    geometry=null, cut=2,
    material=null, max=1000,
    children=null, top=false,
    ...props
}: any, ref) => {
    if (typeof children==="function") children = [children]
    if (!(children instanceof Array)) children = Children.map(children, c=>c)
    if ( (geometry &&  material) || !top) cut = 0
    if ((!geometry &&  material) || (geometry && !material)) cut /= 2
    const Atom = props.recursion? Recursion : Hierarchy
    if (!top)
        return <Atom ref={ref} {...props}>{children?.slice(cut)}</Atom>
    return (
        <Render {...{geometry, material, cut, max}}>
            {[...children.slice(0, cut),
            <Atom ref={ref} {...props} key={0} top={false}
                position= {props.position || [0,0,0]}>
                {children.slice(cut)}
            </Atom>]}
        </Render>
    )
})
