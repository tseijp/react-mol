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
    const atom = useRef<any>(null)
    const bone = useRef<any>(null)
    const [a] = useAtom(atoms)
    const [b] = useAtom(bones)
    const _a = useMemo(() => new THREE.Object3D(), [])
    const _b = useMemo(() => new THREE.Object3D(), [])
    const _c = useMemo(() => new THREE.Color()   , [])
    console.log(a)
    useFrame(() => {
        a.forEach(({position=[0,0,0], scale=[1,1,1], color}, i) => {
            _a.position.set(...position)
            _a.scale.set(...scale)
            _a.updateMatrix()
            atom.current.setColorAt(i, _c.setColorName(color));
            atom.current.setMatrixAt(i, _a.matrix)
        })
        b.forEach(({position=[0,0,0], rotation, scale=[1,1,1], color}, i) => {
            _b.rotation.setFromQuaternion(rotation)
            _b.position.set(...position)
            _b.scale.set(...scale)
            _b.updateMatrix()
            bone.current.setColorAt(i, _c.setColorName(color));
            bone.current.setMatrixAt(i, _b.matrix)
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
