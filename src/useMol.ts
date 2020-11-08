import {useEffect, useMemo} from 'react'
import {useAtom} from 'jotai'
import {MolProps} from './types'
import {render} from './utils'

export function useMol <S extends object> (
    props:Partial<MolProps>,
): Partial<MolProps>

export function useMol(props: any) {
    const [,set] = useAtom(render)
    const state  = useMemo(() => props.calcMol(props), [props])
    useEffect(() => {set(p => [...p, state])}, [set, state])
    return state[0]
}
