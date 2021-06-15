import React, {useRef, useCallback, useState} from 'react'
import {useUpdateAtom} from 'jotai/utils'
import {Color, Group} from 'three'
import {GroupProps} from '@react-three/fiber'
import {atom} from 'jotai'
import {Spread} from '../utils'

export type AtomObject = Spread<Group, {
    id: number,
    group: Group,
    color: Color
}>

export const atomsAtom = atom<AtomObject[]>([])

export const addAtom = atom(null, (get, set, newAtom: AtomObject) => {
    set(atomsAtom, [...get(atomsAtom), newAtom])
})

export const delAtom = atom(null, (get, set, id: number) => {
    set(atomsAtom, get(atomsAtom).filter(value => value.id!== id))
})

export type AtomProps<T extends object={}> = Spread<Spread<{
    color: Color | number | string
    children: React.ReactNode | ((state:AtomProps<T>) => React.ReactNode),
}, GroupProps>, T>

let uuid = 0

export function useAtom <T extends object={}>(
    props:  unknown & Partial<AtomProps<T>>,
    ref:  null | React.Ref<unknown>
):  unknown & Partial<AtomProps<T>>

export function useAtom ({color, ...props}: any, forwardRef: any) {
    const [id]= useState(() => uuid++)
    const add = useUpdateAtom(addAtom)
    const del = useUpdateAtom(delAtom)
    const col = useRef<Color>(new Color(color))
    const ref = useRef<Group>(null)

    const handle = useCallback(() => ({
        id, ...ref.current,
        group: ref.current,
        color: col.current
    } as AtomObject), [id])

    React.useImperativeHandle(forwardRef, handle)

    React.useEffect(() => {
        col.current?.set(color)
        ref.current?.updateMatrixWorld()
        ref.current && add(handle())
        return () => void del(id)
    }, [color, handle, add, del, id])

    return {...props, ref}
}
