import React, {
    ReactNode, useMemo, useRef
} from 'react'
import {useFrame} from 'react-three-fiber'
import * as THREE from 'three'
import {useAtom} from 'jotai'
import {atoms, bones} from './utils'
const MAX_LENGTH = 1000
export function Render (props: Partial<{
    children: ReactNode
}>) : JSX.Element

export function Render ({children, ...props}:any) {
    const _atom = useMemo(() => new THREE.Object3D(), [])
    const _bone = useMemo(() => new THREE.Object3D(), [])
    const _name = useMemo(() => new THREE.Color(), [])
    const atom = useRef<any>(null)
    const bone = useRef<any>(null)
    const [a] = useAtom(atoms)
    const [b] = useAtom(bones)
    useFrame(() => {
        a.forEach(({position=[0,0,0], scale=[1,1,1], color}, i) => {
            _atom.position.set(...position)
            _atom.scale.set(...scale)
            _atom.updateMatrix()
            atom.current.setColorAt(i, _name.setColorName(color));
            atom.current.setMatrixAt(i, _atom.matrix)
        })
        b.forEach(({position=[0,0,0], rotation=[0,0,0]}, i) => {
            _bone.position.set(...position)
            _bone.rotation.set(...rotation)
            _bone.updateMatrix()
            // bone.current.geometry.set
            bone.current.setColorAt(i, _name.setColorName("white"));
            bone.current.setMatrixAt(i, _bone.matrix)
        })
        atom.current.instanceMatrix.needsUpdate = true
    })
    return (
        <group {...props}>
            <instancedMesh ref={atom} args={[null,null,MAX_LENGTH] as [any,any,number]}>
                <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
                <meshPhongMaterial    attach="material" color={0xffffff} />
            </instancedMesh>
            <instancedMesh ref={bone} args={[null,null,MAX_LENGTH] as [any,any,number]}>
                <cylinderBufferGeometry attach="geometry" args={[.05, .05, 1, 10]} />
                <meshPhongMaterial      attach="material" color={0xffffff} />
            </instancedMesh>
            {children}
        </group>
    )
}
