import React, {ReactNode} from 'react'
import {atom, Provider} from 'jotai'
import {Render} from './Render'
import {MolProps} from './types'
import {useMol} from './useMol'
// const rand =(mul=1,add=0)=> add+Math.random()*mul
export const mol = atom<MolProps[]>([])

export function Mol <S extends object> (props: unknown & MolProps & {
    children?: ReactNode
}) : any//JSX.Element | null // TODO

export function Mol ({children, ...props} : any) {
    const ref = React.useRef(null)
    const [{position}] = useMol(props, ref)
    return <group {...{ref, position, children}} />
}

export function MolProvider (props:any) {
    return (
        <Provider>
            <Render {...props}/>
        </Provider>
    )
}

// export function M () {
//     return "TODO"
// }
