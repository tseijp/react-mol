import {useRef} from 'react'
import {useAtom} from 'jotai'
import {useFrame} from 'react-three-fiber'
import {atomsAtom} from '../atoms'

export function useRender <T extends object={}>(): any
export function useRender () {
    const mesh = useRef<any>(null)
    const [atoms] = useAtom(atomsAtom)
    console.log(atoms)
    useFrame(() => {
        if (!mesh.current) return
        atoms.forEach((state: any, i) => {
            mesh.current.setColorAt (i, state.color)
            mesh.current.setMatrixAt(i, state.group.matrixWorld)
        })
        mesh.current.instanceMatrix.needsUpdate = true
        mesh.current.instanceColor.needsUpdate = true
    })
    return mesh
}
