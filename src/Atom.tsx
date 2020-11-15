import React, {Children} from 'react'
import {Provider} from 'jotai'
import {Render} from './Render'
import {useMol} from './useMol'
import {Props} from './types'
export const Hierarchy = (props:any) => <bone {...useMol(props)}/>
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
export function Atom <T extends object={}> (
    props: unknown & Partial<Props<T>>
): null | JSX.Element

export function Atom ({
    geometry, length=0,
    material,  depth=0,
    children, ...props
}: any) {
    if (!(children instanceof Array)) children = Children.map(children, c=>c)
    const Atom = props.recursion? Recursion : Hierarchy
    if (typeof depth==="number" && depth > 0)
        return <Atom {...props}>{children.slice(length*2)}</Atom>
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
