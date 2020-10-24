import React from 'react'
import {Provider} from 'jotai'
import {MolProps} from './types'
import {Render} from './Render'
import {useMol} from './useMol'

const Group = (props:any) => <bone {...useMol(props)}/>

export function Mol <S extends object> (props: unknown & MolProps): any//JSX.Element | null // TODO
export function Mol ({renderConfig={}, depth=0, ...props}:any) {
    return depth > 0
        ? <Group {...props}/>
        : (
            <Provider>
                <Render {...renderConfig}>
                    <Group {...props}/>
                </Render>
            </Provider>
        )
}
export default Mol
