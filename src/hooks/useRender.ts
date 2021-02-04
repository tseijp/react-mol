import React from 'react'
import {useAtom} from 'jotai'
import {useUpdateAtom} from 'jotai/utils'
import {useFrame} from 'react-three-fiber'
import {atomsAtom, addAtom, delAtom} from '../atoms'
import {RenderProps} from '../types'
import * as THREE from 'three'

var uuid = 0

export function useRender <T extends object={}>(
    props: unknown & Partial<RenderProps<T>>,
    ref?: null | React.Ref<unknown>
):  unknown & Partial<RenderProps<T>>

export function useRender <T extends object={}>(
    props: () => unknown & Partial<RenderProps<T>>,
    ref?: null | React.Ref<unknown>
): [unknown & Partial<RenderProps<T>>, any, any]

// export function useRender ({
//     geometry:g=null, count:c=1000,
//     material:m=null, ...props
// }: any, ref: any) {
export function useRender (props: any, ref: any) {
    const [atoms] = useAtom(atomsAtom)
    const add = useUpdateAtom(addAtom)
    const del = useUpdateAtom(delAtom)
    const [id] = React.useState(() => uuid++)
    const mesh = React.useRef<THREE.InstancedMesh>(null)
    // const args = React.useMemo(() => [g, m, c], [g, m, c])

    useFrame(() => {
        if (!mesh.current) return
        atoms.forEach(({color: c, group: {matrixWorld: m}}, i) => {
            if (c) mesh.current?.setColorAt (i, c)
            if (m) mesh.current?.setMatrixAt(i, m)
        })
        mesh.current.instanceMatrix.needsUpdate = true
        // mesh.current.instanceColor.needsUpdate = true //r124 is not suported
    })

    React.useImperativeHandle(ref, () => ({
        id, atoms, ...mesh.current,
        mesh: mesh.current,
    }))
    return typeof props ==="function"
        ? [{...props(), ref: mesh}, add, del]
        : {...props, ref: mesh}
}
