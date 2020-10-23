import React from 'react'
import {Provider} from 'jotai'
import {MolProps} from './types'
import {Render} from './Render'
import {useMol} from './useMol'

export function Mol <S extends object> (props: unknown & Partial<MolProps>): any//JSX.Element | null // TODO

export function Mol (props: any) {
    return <group {...useMol(props)}/>
}
export function MolProvider (props:any) {
    return (
        <Provider>
            <Render {...props}/>
        </Provider>
    )
}
export default Mol
