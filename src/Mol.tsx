import React from 'react'
import {Provider} from 'jotai'
import {Render} from './Render'
import {useMol} from './useMol'
import {calcMol,calcPos} from './utils'
import {MolProps} from './types'

export const Hierarchy = (props:any) => <bone {...useMol(props)}/>
export const Recursion = (props:any) => {
    const [child, ...children] = React.Children.map(props.children, c=>c)
    if (typeof child!=="object") return null
    return React.cloneElement(child, {
        ...props, depth: 1, children: [
            ...(React.Children.toArray(child.props.children)||[]),
            <Recursion {...{children}}/>
        ]
    })
}
export function Mol <S extends object> (
    props: unknown & Partial<MolProps>
): null | JSX.Element

export function Mol ({renderConfig={}, depth=0, ...props}:any) {
    const Atom = props.element? Hierarchy : Recursion
    if (typeof depth==="number" && depth > 0) return <Atom {...props}/>
    // const calcPos
    return (
        <Provider>
            <Render {...renderConfig}>
                <Atom {...props}
                    position= {props.position|| [0,0,0]}
                    calcMol = {props.calcMol || calcMol}
                    calcPos = {props.calcPos || calcPos}/>
            </Render>
        </Provider>
    )
}
export default Mol
