import React from 'react'
import {useAtom} from 'jotai'
import {useFrame} from 'react-three-fiber'
import {atomsAtom} from '../atoms'
import {Atom} from '../types'
import * as THREE from 'three'

export function useRender <T extends object={}>(
    group: null | React.RefObject<THREE.Group>,
    ref  : null | React.Ref<unknown>
): React.MutableRefObject<THREE.InstancedMesh>

export function useRender (group: any, ref: any) {
    const mesh = React.useRef<THREE.InstancedMesh>(null)
    const [atoms] = useAtom(atomsAtom)

    useFrame(() => {
        if (!mesh.current) return
        atoms.forEach((state: Atom, i) => {
            mesh.current?.setColorAt (i, state.color)
            mesh.current?.setMatrixAt(i, state.matrixWorld)
        })
        mesh.current.instanceMatrix.needsUpdate = true
        // mesh.current.instanceColor.needsUpdate = true //r124 is not suported
    })

    React.useImperativeHandle(ref, () => !group.current? undefined: {
        ...group.current,
        group: group.current,
        mesh: mesh.current,
    })
    return mesh
}
