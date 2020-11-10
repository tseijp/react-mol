import React from 'react'
import {Props} from '../types'
export function calcHel ({children, ...props}:Props): Props[] {
    const clone = React.Children.map(children, (child:any) => {
        if (!child) return null
        return React.cloneElement(child, {
            ...props, ...child.props,
            position: [1,1,1],
            depth: (props.depth||0) + 1,
        })
    })
    return [{...props, children: clone}]
}
