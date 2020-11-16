import {useEffect, useMemo} from 'react'
import {useAtom} from 'jotai'
import {Props} from './types'
import {render} from './Render'

export function useMol <T extends object={}> (
    props:Partial<Props<T>>,
): Partial<Props<T>>

export function useMol(props: any) {
    const [,set] = useAtom(render)
    const state  = useMemo(() => props.calc(props), [props])
    useEffect(() => {set(p => [...p, state])}, [set, state])
    return state[0]
}
