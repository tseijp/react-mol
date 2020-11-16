import React, {Children, ReactNode, createRef, useRef} from 'react'
import {useFrame} from 'react-three-fiber'
import {useAtom, atom} from 'jotai'
import {calcMatrix,calcColor,mergeVec3} from './utils'
import {Props} from './types'

export const render = atom<Partial<Props>[][]>([])
export const update = atom<any>(null)
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
    const time    = useRef<number>(0)
    const group   = useRef<any>(null)
    const meshs   = useRef<any>([])
    const [state] = useAtom(render)
    Array(length).fill(0).forEach((_, i) => {
        meshs.current[i] = createRef();
    })
    useFrame(() => {
        meshs.current.forEach((mesh:any, j=0) => {
            if (!mesh.current) return
            Object.values(state).forEach((m, i) => {
                let {color:c, position:p, rotation:r, scale:s} = m[j]
                mesh.current.setColorAt (i, calcColor (c))
                mesh.current.setMatrixAt(i, calcMatrix(p,r,s))
            })
            mesh.current.instanceMatrix.needsUpdate = true
        })
        state.length && group.current.position.set(...mergeVec3([-.5,-.5],
            state[0][0]?.position||[0,0,0],
            state[atom.length-1][0]?.position||[0,0,0])
        )
        time.current += 0.0001
    })
    console.log(state)
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
// TODO functional props
//   - Atom position={[t => [t, t, t]]}
// if (typeof c==="function") c = c(time.current)
// if (typeof p==="function") c = c(time.current)
// if (typeof r==="function") c = c(time.current)
// if (typeof s==="function") c = c(time.current)
