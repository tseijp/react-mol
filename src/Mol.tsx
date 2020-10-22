import React from 'react'
import {Provider as JotaiProvider} from 'jotai'
import {Render} from './Render'
import {MolProps} from './types'
import {useMol} from './useMol'

export function Mol <S extends object> (props: unknown & Partial<MolProps>): any//JSX.Element | null // TODO

export function Mol (props: any) {
    return <group {...useMol(props)}/>
}
export function MolProvider (props:any) {
    return (
        <JotaiProvider>
            <Render {...props}/>
        </JotaiProvider>
    )
}
export default Mol
