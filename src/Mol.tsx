import React from 'react'
import {Provider} from 'jotai'
import {MolProps} from './types'
import {Render} from './Render'
import {useMol} from './useMol'
// import {beauty} from './utils'
// export const Hierarchy = (props:any) => {
//     const state = useMol(props)
//     beauty(_=>console.log(..._), {[""]:`Mol render ${props.color}`}, state)
//     return <bone {...state}/>
// }

export const Hierarchy = (props:any) => <bone {...useMol(props)}/>
export const Recursion = (props:any) => {
    const [child, ...grand] = React.Children.map(props.children, c=>c)
    return typeof child!=="object"? null: React.cloneElement(child, {
        // TODO for depth
        ...props, depth:1, children: [
            ...(React.Children.toArray(child.props.children)||[]),
            <Recursion>{grand}</Recursion>
        ]
    })
}
export function Mol <S extends object> (props: unknown & MolProps): any//JSX.Element | null // TODO
export function Mol ({renderConfig={}, depth=0, ...props}:any) {
    const Atom = props.element? Hierarchy : Recursion
    return !depth || depth < 1
        ?   <Provider>
                <Render {...renderConfig}>
                    <Atom {...props} position={props.position||[0,0,0]}/>
                </Render>
            </Provider>
        : <Atom {...props}/>
}
export default Mol

// TODO :get deep children
// export function childrenToArray(props: any): any[] {
//     const children = React.Children.map(props.children, child => child)
//     return children instanceof Array && children.length > 1
//         ? children
//         : childrenToArray(children[0].props)
// }
