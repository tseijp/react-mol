import React from 'react'
import {Props, HelProps} from '../types'
import {mergeVec3} from '../utils'
export function calcHel ({children, ...props}:Props<HelProps>): Props<HelProps>[] {
    const clone = React.Children.map(children, (child:any) => {
        if (!child) return null
        const position = mergeVec3([.99,.01], props.position||[0,0,0], [10,10,10])
        const rotation = mergeVec3([.99,.01], props.rotation||[0,0,0], [10,10,10])
        return React.cloneElement(child, {position, rotation})
    })
    return [
        {...props, children: clone},
    ]
}
