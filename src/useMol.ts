import {useEffect, useMemo} from 'react'
import {useAtom} from 'jotai'
import {MolProps} from './types'
import {calcAtom, calcBone, render} from './utils'
export function useMol <S extends object> (
    props:Partial<MolProps>,
) : Partial<MolProps>

export function useMol(props: any) {
    const [,s] = useAtom(render)
    const atom = useMemo(() => calcAtom(props), [props])
    const bone = useMemo(() => calcBone(atom ), [atom])
    useEffect(() => {s(p=>[...p,[atom,bone]])}, [atom,bone,s])
    return atom
}
