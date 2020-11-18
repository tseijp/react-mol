import React, {Children, ReactNode, useRef} from 'react'
import {useFrame} from 'react-three-fiber'

export const render = React.createContext(undefined)
export function Render (props: {
    cutLength?: number,
    maxLength?: number
    children: ReactNode
}) : JSX.Element
export function Render ({
    geometry, cutLength,
    material, maxLength,
    children, ...props
}: any) {
    if (!(children instanceof Array)) children = Children.map(children, c=>c)
    if (typeof geometry==="function") geometry = geometry()
    if (typeof material==="function") material = material()
    const mesh  = useRef<any>([])
    const group = useRef<any>(null)
    const states = useRef<any[]>([])
    useFrame(() => {
        if (!mesh.current) return
        Object.values(states.current).forEach((state: any, i) => {
            const {color: c, matrix: m} = state
            mesh.current.setColorAt (i, c)
            mesh.current.setMatrixAt(i, m)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })
    return (
        <render.Provider value={{states} as any}>
            <group ref={group} {...props}>
                <instancedMesh ref={mesh}
                    args={[geometry,material,maxLength] as [any,any,number]}>
                    {children.slice(0, cutLength)}
                </instancedMesh>
                {children.slice(cutLength)}
            </group>
        </render.Provider>
    )
}

// TODO
//
// let {color:c, position:p, rotation:r, scale:s} = m
// mesh.current.setColorAt (i, calcColor (c))
// mesh.current.setMatrixAt(i, calcMatrix(p,r,s))
