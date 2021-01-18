import React from 'react'
import {useAtom} from 'jotai'
import {useFrame} from 'react-three-fiber'
import {atomsAtom} from '../atoms'
import {Atom} from '../types'
import * as THREE from 'three'

export function useRender <T extends object={}>(
    props: any,
    ref  : null | React.Ref<unknown>
): any//React.MutableRefObject<THREE.InstancedMesh>

export function useRender ({
    geometry=null,
    material=null, max=1000, ...props
}: any, ref: any) {
    const [atoms] = useAtom(atomsAtom)
    const mesh = React.useRef<THREE.InstancedMesh>(null)
    const args = React.useMemo<[THREE.Geometry, THREE.Material, number]>(() => [
        typeof geometry==="function"? geometry(): geometry,
        typeof material==="function"? material(): material,
    max], [geometry, material, max])

    useFrame(() => {
        if (!mesh.current) return
        atoms.forEach((state: Atom, i) => {
            mesh.current?.setColorAt (i, state.color)
            mesh.current?.setMatrixAt(i, state.matrixWorld)
        })
        mesh.current.instanceMatrix.needsUpdate = true
        // mesh.current.instanceColor.needsUpdate = true //r124 is not suported
    })

    React.useImperativeHandle(ref, () => mesh.current)
    return {ref: mesh, args, ...props}
}
