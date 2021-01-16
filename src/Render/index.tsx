import React, {useMemo} from 'react'
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
    return (
        <group ref={ref} {...props}>
            <instancedMesh
                ref={useRender()}
                args={useMemo<[any,any,number]>(() => [
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
