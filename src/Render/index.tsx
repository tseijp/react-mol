import React, {useRef, useMemo} from 'react'
import {Props, States} from '../types'
import {useRender} from './hooks'
export const render = React.createContext<States>(null as any)
export type  Render = {
    <T extends object={}>(props: Partial<Props<T>>) : JSX.Element;
}
export const Render = React.forwardRef(({
    geometry=null, cut=2,
    material=null, max=1000,
    children=null, ...props
}: any, forwardRef) => {
    const ref   = useRef<any>(null)
    const mesh  = useRef<any>(null)
    const value = useRender(mesh)
    const args  = useMemo(() => [
        typeof geometry==="function"? geometry(): geometry,
        typeof material==="function"? material(): material,
        max] as [any,any,number], [geometry, material, max])
    React.useImperativeHandle(forwardRef, () => ref.current)
    return (
        <render.Provider value={value}>
            <group ref={ref} {...props}>
                <instancedMesh ref={mesh} args={args}>
                    {children instanceof Array && children.slice(0, cut)}
                </instancedMesh>
                {children instanceof Array && children.slice(cut)}
            </group>
        </render.Provider>
    )
})
