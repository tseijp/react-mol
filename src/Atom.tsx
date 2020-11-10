import React from 'react'
import {Provider} from 'jotai'
import {Render} from './Render'
import {useMol} from './useMol'
import {Props} from './types'
export const Hierarchy = (props:any) => <bone {...useMol(props)}/>
export const Recursion = (props:any) => {
    const [child, ...children] = React.Children.map(props.children, c=>c)
    if (typeof child!=="object") return null
    return React.cloneElement(child, {
        ...props, depth: 1, children: [
            ...(React.Children.toArray(child.props.children) || []),
            <Recursion key={-1} {...{children}}/>
        ]
    })
}
export function Atom <S extends object> (
    props: unknown & Partial<Props>
): null | JSX.Element

export function Atom ({
    geometry,
    material,
    children,
    length=0,
    depth =0,
    ...props
}: any) {
    if (!(children instanceof Array)) children = React.Children.map(children, c=>c)
    const Atom = props.recurse? Recursion : Hierarchy
    if (typeof depth==="number" && depth > 0) return <Atom {...props}>{children.slice(length*2)}</Atom>
    return (
        <Provider>
            <Render length={length}>
                {[...children.slice(0,length*2),
                <Atom {...props} key={0}
                    position= {props.position|| [0,0,0]}
                    calc    = {props.calc       }
                    calcPos = {props.calcPos}>
                    {children.slice(length*2)}
                </Atom>]}
            </Render>
        </Provider>
    )
}
