import React, {Children, ReactNode, createRef, useRef} from 'react'
import {useFrame} from 'react-three-fiber'
import {calcMatrix,calcColor} from './utils'

export const render = React.createContext(undefined)
export function Render (props: {
    length: number,
    maxLength?: number
    children: ReactNode
}) : JSX.Element
export function Render ({
    geometry,    length=1,
    material, maxLength=1000,
    children, ...props
}: any) {
    if (!(children instanceof Array)) children = Children.map(children, c=>c)
    if (!(geometry instanceof Array)) geometry = [geometry]
    if (!(material instanceof Array)) material = [material]
    const group  = useRef<any>(null)
    const meshs  = useRef<any>([])
    const matrix = useRef<any[][]>([])
    // const colors = useRef<any[][]>([])
    Array(length).fill(0).forEach((_, i) => {
        meshs.current[i] = createRef();
    })
    useFrame(() => {
        meshs.current.forEach((mesh:any, j=0) => {
            if (!mesh.current) return
            Object.values(matrix.current).forEach((m: any, i) => {
                let {color:c, position:p, rotation:r, scale:s} = m[j]
                mesh.current.setColorAt (i, calcColor (c))
                mesh.current.setMatrixAt(i, calcMatrix(p,r,s))
            })
            mesh.current.instanceMatrix.needsUpdate = true
        })
        // const l = matrix.current.length-1
        // 0<l && group.current.position.set(...mergeVec3([-.5,-.5],
        //     matrix.current[0][0]?.position||[0,0,0],
        //     matrix.current[l][0]?.position||[0,0,0])
        // )
    })
    return (
        <render.Provider value={{matrix} as any}>
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
        </render.Provider>
    )
}
