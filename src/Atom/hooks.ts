import React, {useRef, useState} from 'react'
import {Color, Group} from 'three'
import {useAtom} from 'jotai'
import {addAtom, delAtom} from '../atoms'

let uuid = 0
export function useHierarchy (props: any, ref: any): any
export function useHierarchy (props: any, ref: any) {
    const [id] = useState(() => uuid++)
    const [, add] = useAtom(addAtom)
    const [, del] = useAtom(delAtom)
    const color = useRef<Color>(new Color().set(props.color||"black"))
    const group = useRef<Group>(null)

    // change color
    React.useEffect(() => {
        if (!props.color) return
        color.current?.set(props.color||"black")
    }, [props.color])

    // change matrix
    React.useEffect(() => {
        if (!group.current) return
        group.current.updateMatrixWorld()
        add({
            id, ...group.current,
            group: group.current,
            color: color.current
        })
        return () => void del(id)
    }, [add, del, id])

    React.useImperativeHandle(ref, () => group.current && ({
        id, ...group.current,
        group: group.current,
        color: color.current
    }))

    return {...props, ref: group}
}
