import React from 'react'
import {useAtom} from 'jotai'
import {useFrame} from 'react-three-fiber'
import {atomsAtom} from '../atoms'

export function useRender <T extends object={}>(
    group: any, ref: any
): any
export function useRender (group: any, ref: any) {
    const mesh = React.useRef<any>(null)
    const [atoms] = useAtom(atomsAtom)

    useFrame(() => {
        if (!mesh.current) return
        atoms.forEach((state: any, i) => {
            mesh.current.setColorAt (i, state.color)
            mesh.current.setMatrixAt(i, state.matrixWorld)
        })
        mesh.current.instanceMatrix.needsUpdate = true
        mesh.current.instanceColor.needsUpdate = true
    })

    React.useImperativeHandle(ref, () => group.current && ({
        ...group.current,
        group: group.current,
        mesh: mesh.current,
    }))
    return mesh
}
