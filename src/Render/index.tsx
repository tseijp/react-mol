import React from 'react'
import {RenderProps} from '../types'
import {useRender} from './hooks'
import {Provider} from 'jotai'

export * from './hooks'

export type Group = {
    <T extends object={}>(props: RenderProps<T>): JSX.Element;
}

export const Group = React.forwardRef((props: any, ref) => {
    return <instancedMesh {...useRender(props, ref)} />
})

export const Render = React.forwardRef((props: any, ref: any) => {
    return (
        <Provider>
            <Group ref={ref} {...props}/>
        </Provider>
    )
})
