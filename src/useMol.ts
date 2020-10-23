import React, {Children, useMemo} from 'react'
import {useAtom} from 'jotai'
import {atoms, rand} from './utils'
import {MolProps, Vec3} from './types'

function calcPos (parent:MolProps, {position=[0,0,0], ...child}:MolProps): Vec3 {
    console.log(parent.children, child)
    return [
        position[0] + rand(2,-1),
        position[1] + rand(2,-1),
        position[2] + rand(2,-1),
    ]
}

export function useMol <S extends object> (
    props:MolProps,
) : MolProps

export function useMol(props: MolProps) {
    const [,set] = useAtom(atoms)
    const state = useMemo<MolProps|null>(() => {
        const children = Children.map(props.children, (child:any) =>
            React.cloneElement(child, {
                parentProps: props,
                position: calcPos(child.props, props),
                depth: (props.depth||0) + 1
            })
        )
        return {...props, children}
    }, [props])
    React.useEffect(() => {
        if (state)
            set(p => [...p, state])
    }, [set, state])
    return state
}

// function mergePos (
//     {current:{position:left =[0,0,0]}},
//     {current:{position:right={x:0,y:0,z:0}}}
// ) {
//     return {position: [
//         left[0] + right.x,
//         left[1] + right.y,
//         left[2] + right.z,
//     ] as Vec3}
// }

// if (bond) return null
// const bonds = Children.map(children, child => {
//     return (child as any).props.bond
// })
// if (!bonds || bonds.reduce((a,b)=>a+b) > 4) return null
// return (
//     <>{children}</>
// )
