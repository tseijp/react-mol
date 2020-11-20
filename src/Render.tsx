import React, {Children, useRef, useMemo} from 'react'
import {Props, State, States} from './types'
import {useFrame} from 'react-three-fiber'
export const render = React.createContext<States>(null as any)
export type  Render = {
    <T extends object={}>(props: Partial<Props<T>>) : JSX.Element;
}
export const Render = React.forwardRef(({
    geometry, cutLength,
    material, maxLength,
    children, ...props
}: any, forwardRef) => {
    if (!(children instanceof Array)) children = Children.map(children, c=>c)
    if (typeof geometry==="function") geometry = geometry()
    if (typeof material==="function") material = material()
    const mesh  = useRef<any>(null)
    const group = useRef<any>(null)
    const states= useRef<State[]>([])
    const value = useMemo<States>(() => ({states}), [])
    useFrame(() => {
        if (!mesh.current) return
        Object.values(states.current).forEach((state: any, i) => {
            const {color, group} = state
            mesh.current.setColorAt (i, color)
            mesh.current.setMatrixAt(i, group.matrixWorld)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })
    React.useImperativeHandle(forwardRef, () => group.current)
    return (
        <render.Provider value={value}>
            <group ref={group} {...props}>
                <instancedMesh ref={mesh} args={[geometry,material,maxLength] as [any,any,number]}>
                    {children?.slice(0, cutLength)}
                </instancedMesh>
                {children?.slice(cutLength)}
            </group>
        </render.Provider>
    )
}
)
