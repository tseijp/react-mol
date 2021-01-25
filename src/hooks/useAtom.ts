import React, {useRef, useCallback, useState} from 'react'
import {Color, Group} from 'three'
import {useUpdateAtom} from 'jotai/utils'
import {addAtom, delAtom} from '../atoms'
import {AtomProps, AtomObject} from '../types'

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
