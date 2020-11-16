import React from 'react'
import {Props} from '../types'

export function calcFlow (props: Props): Props[] {
    const clone = React.Children.map(props.children, (child:any) => {
        if (!child) return null
        const position= [Math.random()*100-50,Math.random()*100-50,Math.random()*100-50]
        return React.cloneElement(child, {
            ...props,
            ...child.props,
            parentProps: props,
            depth: (props.depth||0) + 1,
            position,
        })
    })
    return [
        {...props, children: clone, }
    ]
}
