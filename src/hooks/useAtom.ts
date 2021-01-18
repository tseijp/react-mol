import React, {useRef, useState} from 'react'
import {Color, Group} from 'three'
import {useAtom as useJotai} from 'jotai'
import {addAtom, delAtom} from '../atoms'
import {AtomProps, Atom} from '../types'

let uuid = 0
export function useAtom <T extends object={}>(
    props:  unknown & Partial<AtomProps<T>>,
    ref:  null | React.Ref<unknown>
):  unknown & Partial<AtomProps<T>>

export function useAtom (props: any, ref: any) {
    const [id] = useState(() => uuid++)
    const [, add] = useJotai(addAtom)
    const [, del] = useJotai(delAtom)
    const color = useRef<Color>(new Color().set(props.color||"black"))
    const group = useRef<Group>(null)

    // change color //
    React.useEffect(() => {
        if (!props.color) return
        color.current?.set(props.color||"black")
    }, [props.color])

    // change matrix //
    React.useEffect(() => {
        if (!group.current) return
        group.current.updateMatrixWorld()
        add({
            id, ...group.current,
            group: group.current,
            color: color.current
        } as Atom)
        return () => void del(id)
    }, [add, del, id])

    React.useImperativeHandle(ref, () => group.current && ({
        id, ...group.current,
        group: group.current,
        color: color.current
    }))

    return {...props, ref: group}
}
