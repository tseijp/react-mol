import React from 'react'
import {Props, HelProps} from '../types'
import {mergeVec3, eulerVec3, scaleVec3} from '../utils'
export function calcHel ({children, ...props}:Props<HelProps>): Props<HelProps>[] {
    const clone = React.Children.map(children, (child:any) => {
        if (!child) return null
        const position = mergeVec3([.99,.01], props.position||[0,0,0], [10,10,10])
        const rotation = mergeVec3([.99,.01], props.rotation||[0,0,0], [10,10,10])
        return React.cloneElement(child, {
            ...props,
            ...child.props,
            parentProps: props,
            depth: (props.depth||0) + 1,
            position, rotation
        })
    })
    const {position: target=[0,0,0], parentProps} = props
    const position = mergeVec3([.5,.5], target, parentProps?.position||target)
    const distance = mergeVec3([ 1,-1], target, parentProps?.position||target)
    const rotation = eulerVec3(distance)
    const scale    = scaleVec3(distance)
    return [
        {...props, children: clone},
        {...props, position, rotation, scale} as any,
    ]
}
