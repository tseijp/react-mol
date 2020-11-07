import React, {ReactNode, useRef} from 'react'
import {useFrame} from 'react-three-fiber'
import {useAtom} from 'jotai'
import {render,mergeVec3,calcMatrix,calcColor} from './utils'
const MAX_LENGTH = 1000

export function Render (props: Partial<{
    children: ReactNode
}>) : JSX.Element
export function Render ({children, ...props}:any) {
    const group= useRef<any>(null)
    const atom = useRef<any>(null)
    const bone = useRef<any>(null)
    const [ab] = useAtom(render)
    useFrame(() => {
        ab.forEach(([a, b], i) => {
            atom.current.setColorAt (i, calcColor (a.color));
            bone.current.setColorAt (i, calcColor (b.color));
            atom.current.setMatrixAt(i, calcMatrix(a.position,a.rotation,a.scale))
            bone.current.setMatrixAt(i, calcMatrix(b.position,b.rotation,b.scale))
        })
        group.current.position.set(...mergeVec3([-.5,-.5],
            ab[0][0]?.position||[0,0,0],
            ab[ab.length-1][0]?.position||[0,0,0])
        )
        atom.current.instanceMatrix.needsUpdate = true
        bone.current.instanceMatrix.needsUpdate = true
    })
    return (
        <group {...props}>
            <group ref={group}>
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
        </group>
    )
}
