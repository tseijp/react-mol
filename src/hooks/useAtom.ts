import React, {useRef, useCallback, useState} from 'react'
import {Color, Group} from 'three'
import {useUpdateAtom} from 'jotai/utils'
import {addAtom, delAtom, AtomObject} from '../atoms'
import {Spread, GroupProps} from '../utils'

let uuid = 0

export type AtomProps<T extends object={}> = Spread<Spread<{
    color: Color | number | string
    children: React.ReactNode | ((state:AtomProps<T>) => React.ReactNode),
}, GroupProps>, T>

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
