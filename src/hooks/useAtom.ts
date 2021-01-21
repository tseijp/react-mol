import React, {useRef, useState} from 'react'
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

    // change color //
    React.useEffect(() => {
        if (color)
            col.current?.set(color)
    }, [color])

    // change matrix //
    React.useEffect(() => {
        if (!ref.current) return
        ref.current.updateMatrixWorld()
        add({
            id, ...ref.current,
            group: ref.current,
            color: col.current
        } as AtomObject)
        return () => void del(id)
    }, [color, add, del, id])

    React.useImperativeHandle(forwardRef, () => ref.current && ({
        id, ...ref.current,
        group: ref.current,
        color: col.current
    }))

    return {...props, ref}
}
