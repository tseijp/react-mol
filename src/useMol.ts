import React from 'react'
import {useMols} from './useMols'
export type MolValue<S extends object> = {
    bond: number
}

export type UseMolProps = {
    bond: number,
}
export function useMol <S extends object> (
    props:UseMolProps
) : MolValue<S>
export function useMol(props: any) {
    const isFn = typeof props == "function"
    const state = useMols(1, {bond:1})
    return {}
}

// if (bond) return null
// const bonds = Children.map(children, child => {
//     return (child as any).props.bond
// })
// if (!bonds || bonds.reduce((a,b)=>a+b) > 4) return null
// return (
//     <>{children}</>
// )
