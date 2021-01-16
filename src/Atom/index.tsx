import React, {Children} from 'react'
import {Props} from '../types'
import {useHierarchy} from './hooks'
export * from './hooks'

export type Hierarchy = {
    <T extends object={}>(props: unknown & Partial<Props<T>>): null | JSX.Element
}
export const Hierarchy = React.forwardRef((props: any, ref) => (
    <group {...useHierarchy(props, ref)}/>
))
export const Recursion = (props: any) => {
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
export const Atom: Atom = React.forwardRef((props: any, ref) => {
    const {recursion: r} = props
    const Atom = React.useMemo(() => r? Recursion: Hierarchy, [r])
    return <Atom ref={ref} {...props} />
})
