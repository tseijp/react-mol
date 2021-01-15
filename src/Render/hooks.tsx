import React, {useRef, useMemo} from 'react'
import {State, States} from '../types'
import {useFrame} from 'react-three-fiber'
export const render = React.createContext<States>(null as any)
export function  useRender <T extends object={}>(
    ref: any
): any
export function useRender (mesh: any) {
    const states = useRef<State[]>([])
    const value = useMemo<States>(() => ({states}), [])
    useFrame(() => {
        if (!mesh.current) return
        states.current.forEach((state: any, i) => {
            mesh.current.setColorAt (i, state.color)
            mesh.current.setMatrixAt(i, state.matrixWorld)
        })
        mesh.current.instanceMatrix.needsUpdate = true
        mesh.current.instanceColor.needsUpdate = true
    })
    console.log((states.current[0] as any)?.color)
    return value
}
