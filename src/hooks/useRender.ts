import React from 'react'
import {useAtom} from 'jotai'
import {useFrame} from 'react-three-fiber'
import {atomsAtom} from '../atoms'
import {AtomObject, RenderProps} from '../types'
import * as THREE from 'three'

var uuid = 0
export function useRender <T extends object={}>(
    props: unknown & Partial<RenderProps<T>>,
    ref: null | React.Ref<unknown>
):  unknown & Partial<RenderProps<T>>

export function useRender ({
    geometry=null, material=null, count=1000, ...props
}: any, ref: any) {
    const [atoms] = useAtom(atomsAtom)
    const [id] = React.useState(() => uuid++)
    const mesh = React.useRef<THREE.InstancedMesh>(null)
    const args = React.useMemo<[THREE.Geometry, THREE.Material, number]>(() => [
        typeof geometry==="function"? geometry(): geometry,
        typeof material==="function"? material(): material,
        typeof count==="function"? count(): count,
    ], [geometry, material, count])

    useFrame(() => {
        if (!mesh.current) return
        atoms.forEach((state: AtomObject, i) => {
            mesh.current?.setColorAt (i, state.color)
            mesh.current?.setMatrixAt(i, state.matrixWorld)
        })
        mesh.current.instanceMatrix.needsUpdate = true
        // mesh.current.instanceColor.needsUpdate = true //r124 is not suported
    })

    React.useImperativeHandle(ref, () => mesh.current && {
        id, ...mesh.current,
        mesh: mesh.current,
        atoms: atoms
    })
    return {ref: mesh, args, ...props}
}
