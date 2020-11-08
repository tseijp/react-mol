import React, {ReactNode, createRef, useRef} from 'react'
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
    if (!(geometry instanceof Array)) geometry = [geometry]
    if (!(material instanceof Array)) material = [material]
    const group = useRef<any>(null) // TODO set type
    const meshs = useRef<any>([])
    const [state] = useAtom(render)
    Array(length).fill(0).forEach((_, i) => {
        meshs.current[i] = createRef();
    })
    useFrame(() => {
        state.forEach((mols, j) => {
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
            state[0][0]?.position||[0,0,0],
            state[state.length-1][0]?.position||[0,0,0])
        )
    })
    return (
        <group {...props}>
            <group ref={group}>
            {Array(length).fill(0).map((_,i) =>
                <instancedMesh ref={meshs.current[i]} key={i}
                    args={[geometry[i],material[i],maxLength] as [any,any,number]}/>
            )}
            {children}
            </group>
        </group>
    )
}
