import React, {Children, useMemo} from 'react'
import {useAtom} from 'jotai'
import {MolProps} from './types'
import {atoms, calcPosition, calcRotation} from './utils'

export function useMol <S extends object> (
    props:MolProps,
) : MolProps

export function useMol(props: any) {
    const [,set] = useAtom(atoms)
    const state = useMemo<MolProps|null>(() => {
        const children = Children.map(props.children, (child:any, key) => {
            const position = calcPosition(child.props, props, key)
            const direction = calcRotation(position, props.position)
            return child && React.cloneElement(child, {
                parentProps: props, position, direction,
                scale: child.props.scale || props.scale,
                color: child.props.color || props.color,
                depth: (props.depth||0) + 1
            })
        })
        return {...props, children}
    }, [props])
    React.useEffect(() => {
        if (state)
            set(p => [...p, state])
    }, [set, state])
    return state
}
