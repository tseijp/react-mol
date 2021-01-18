import React from 'react'
import {AtomProps} from '../types'
import {useHierarchy} from './hooks'

export * from './hooks'

export type Atom = {
    <T extends object={}>(props: unknown & Partial<AtomProps<T>>): null | JSX.Element
}

export const Atom = React.forwardRef((props: any, ref) => (
    <group {...useHierarchy(props, ref)}/>
))
