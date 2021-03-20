import React from 'react'
import {useAtom} from 'jotai'
import {useFrame} from 'react-three-fiber'
import {atomsAtom, AtomObject} from '../atoms'
import {Spread, InstancedMeshProps} from '../utils'
import * as THREE from 'three'

var uuid = 0

export type InstancedProps<T extends object={}> = Spread<Spread<{
    ref: React.MutableRefObject<AtomObject>,
    geometry: null | THREE.Geometry,
    material: null | THREE.Material,
    count   : null | number,
    children: React.ReactNode | ((state: InstancedProps<T>) => React.ReactNode),
}, Partial<InstancedMeshProps>>, T>

export function useInstanced <T extends object={}>(
    props: unknown & Partial<InstancedProps<T>>,
    ref: null | React.Ref<unknown>
): any //Partial<InstancedProps<T>>

export function useInstanced ({
    geometry:g=null, count:c=1000,
    material:m=null, ...props
}: any, ref: any) {
    const [atoms] = useAtom(atomsAtom)
    const [id] = React.useState(() => uuid++)
    const mesh = React.useRef<THREE.InstancedMesh>(null)
    const args = React.useMemo(() => [g, m, c], [g, m, c])

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
    return {ref: mesh, args, ...props}
}
