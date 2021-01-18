import React from 'react'
import {AtomProps, RenderProps} from './types'
import {useAtom, useRender} from './hooks'
import {Provider} from 'jotai'

export type Atom = {
    <T extends object={}>(props: unknown & Partial<AtomProps<T>>): null | JSX.Element
}

export const Atom = React.forwardRef((props: any, ref) => (
    <group {...useAtom(props, ref)}/>
))

export type Instanced = {
    <T extends object={}>(props: RenderProps<T>): JSX.Element;
}

export const Instanced = React.forwardRef((props: any, ref) => {
    return <instancedMesh {...useRender(props, ref)} />
})

export const Render = React.forwardRef((props: any, ref: any) => {
    return (
        <Provider>
            <Instanced ref={ref} {...props}/>
        </Provider>
    )
})
