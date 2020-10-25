import React from 'react'
import {Provider} from 'jotai'
import {MolProps} from './types'
import {Render} from './Render'
import {useMol} from './useMol'

const Group = (props:any) => <bone {...useMol(props)}/>
const Merge = (props:any) => <bone {...useMol(props)}/>//TODO

export function Mol <S extends object> (props: unknown & MolProps): any//JSX.Element | null // TODO
export function Mol ({renderConfig={}, depth=0, ...props}:any) {
    return depth===0
        ?   <Provider>
                <Render {...renderConfig}>
                    <Group {...props} position={props.position||[0,0,0]}/>
                </Render>
            </Provider>
        : props.element
            ? <Group {...props}/>
            : <Merge {...props}/>
}
export default Mol
