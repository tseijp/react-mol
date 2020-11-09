import {useEffect, useMemo} from 'react'
import {useAtom} from 'jotai'
import {Props} from './types'
import {render} from './utils'

export function useMol <S extends object> (
    props:Partial<Props>,
): Partial<Props>

export function useMol(props: any) {
    const [,set] = useAtom(render)
    const state  = useMemo(() => props.calc(props), [props])
    useEffect(() => {set(p => [...p, state])}, [set, state])
    return state[0]
}
