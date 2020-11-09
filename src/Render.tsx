import React, {Children, ReactNode, createRef, useRef} from 'react'
import {useFrame} from 'react-three-fiber'
import {useAtom} from 'jotai'
import {render,calcMatrix,calcColor,mergeVec3} from './utils'

export function Render (props: {
    length: number,
    maxLength?: number
    children: ReactNode
}) : JSX.Element

export function Render ({
    length=1,
    maxLength=1000,
    geometry,
    material,
    children,
    ...props
}: any) {
    if (!(children instanceof Array)) children = Children.map(children, c=>c)
    if (!(geometry instanceof Array)) geometry = [geometry]
    if (!(material instanceof Array)) material = [material]
    const group = useRef<any>(null) // TODO set type
    const meshs = useRef<any>([])
    const [atom] = useAtom(render)
    Array(length).fill(0).forEach((_, i) => {
        meshs.current[i] = createRef();
    })
    useFrame(() => {
        atom.forEach((mols, j) => {
            meshs.current.forEach((mesh:any, i=0) => {
                const {color, position:p, rotation:r, scale:s} = mols[i]
                mesh.current.setColorAt (j, calcColor (color))
                mesh.current.setMatrixAt(j, calcMatrix(p,r,s))
            })
        })
        meshs.current.forEach((mesh:any) => {
            mesh.current.instanceMatrix.needsUpdate = true
        })
        group.current.position.set(...mergeVec3([-.5,-.5],
            atom[0][0]?.position||[0,0,0],
            atom[atom.length-1][0]?.position||[0,0,0])
        )
    })
    return (
        <group {...props}>
            <group ref={group}>
            {Array(length).fill(0).map((_,i) =>
                <instancedMesh
                    key={i} ref={meshs.current[i]}
                    args={[null,null,maxLength] as [any,any,number]}>
                    {children.slice(i*2, i*2+2)}
                </instancedMesh>
            )}
            {children.slice(length)}
            </group>
        </group>
    )
}
