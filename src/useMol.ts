import React, {useRef} from 'react'
import {useAtom} from 'jotai'
import {mol} from './Mol'
import {MolProps, Vec3} from './types'
function mergePos (
    {current:{position:left =[0,0,0]}},
    {current:{position:right={x:0,y:0,z:0}}}
) {
    return {position: [
        left[0] + right.x,
        left[1] + right.y,
        left[2] + right.z,
    ] as Vec3}
}

export function useMol <S extends object> (
    props:MolProps,
    ref: null|{current:any}
) : [MolProps, null]

export function useMol(props: MolProps, ref:any=null) {
    const [, set] = useAtom(mol)
    const state = useRef<MolProps>(props)
    React.useEffect(() => {
        console.log(state.current, ref.current)
        set(p => [...p, mergePos(state, ref)])
    }, [set, ref])
    return [state.current, null]
}

// if (bond) return null
// const bonds = Children.map(children, child => {
//     return (child as any).props.bond
// })
// if (!bonds || bonds.reduce((a,b)=>a+b) > 4) return null
// return (
//     <>{children}</>
// )
