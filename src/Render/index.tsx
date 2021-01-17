import React, {useMemo, useRef} from 'react'
import {Props} from '../types'
import {useRender} from './hooks'
import {Provider} from 'jotai'

export * from './hooks'
export type  Group = {
    <T extends object={}>(props: Partial<Props<T>>): JSX.Element;
}
export const Group = React.forwardRef(({
    geometry=null, cut=2,
    material=null, max=1000,
    children=null, ...props
}: any, ref: any) => {
    if (geometry) cut = -1
    if (material) cut = -1
    const group = useRef(null)
    const mesh  = useRender(group, ref)
    return (
        <group ref={group} {...props}>
            <instancedMesh
                ref={mesh}
                args={useMemo<[any, any, number]>(() => [
                    typeof geometry==="function"? geometry(): geometry,
                    typeof material==="function"? material(): material,
                    max], [geometry, material, max])}>
                {children instanceof Array && children.slice(0, cut)}
            </instancedMesh>
            {children instanceof Array && children.slice(cut)}
        </group>
    )
})

export const Render = React.forwardRef((props: any, ref: any) => {
    return (
        <Provider>
            <Group ref={ref} {...props}/>
        </Provider>
    )
})
