import React, {
    ReactNode, useMemo, useRef
} from 'react'
import {useFrame} from 'react-three-fiber'
import * as THREE from 'three'
import {useAtom} from 'jotai'
import {mol} from './Mol'
const MAX_LENGTH = 1000
export function Render (props: Partial<{
    size: number,
    count: number,
    children: ReactNode
}>) : JSX.Element

export function Render ({children, size=1}:any) {
    const mesh = useRef<any>(null)
    const temp = useMemo(() => new THREE.Object3D(), [])
    const [atom] = useAtom(mol)
    console.log(atom)
    useFrame(() => {
        atom.forEach(({position}, i) => {
            temp.position.set(...position)
            temp.scale.set(size, size, size)
            temp.updateMatrix()
            mesh.current.setMatrixAt(i, temp.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })
    return (
        <>
            <instancedMesh ref={mesh} args={[null,null,MAX_LENGTH] as [any,any,number]}>
                <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
                <meshPhongMaterial attach="material" color={0xffffff} />
            </instancedMesh>
            {children}
        </>
    )
}
