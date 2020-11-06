import React from 'react'
import {useAtom} from 'jotai'
import {MolProps} from './types'
import {atoms,} from './utils'
import {calcAtom} from './utils'
export function useMol <S extends object> (
    props:MolProps,
) : MolProps
// const [props] = React.useState(initProps)
export function useMol(props: any) {
    const [,set] = useAtom(atoms)
    const [_pr] = React.useState(props)
    const state = React.useMemo(()=>calcAtom(_pr), [_pr])
    React.useEffect(() => {set(p => [...p, state])}, [set, state])
    return state
}

// way 1, 2
// export function useMol(props: any) {
//     const [i,set] = useAtom(index)
//     const [nowId] = React.useState(i)// TODO DELETE
//     const [state] = useAtom(atoms(nowId))
//     React.useEffect(() => {
//         // BUG: idが重複する．例: H1~H4のnowIdが1で重複
//         // <C><H1/><H2/><H3/><H4/><C/>
//         console.log("bug", i, nowId)
//
//         props && beauty(_=>console.log(..._), {["\t"]:`useMol useEffect ${nowId} ${props.color}`, props:""}, props)
//         props && set([nowId, props])     // way1
//     //  props && set(p => [...p, props]) // way2
//     }, [set, props, nowId])
//     beauty(_=>console.log(..._), {["\t"]:`useMol render ${nowId} ${state?.color||""}`, state:""}, state)
//     return state
// }
