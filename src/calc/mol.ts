import React from 'react'
import {Vec3, Props} from '../types'
import {eulerVec3, scaleVec3, mergeVec3, calcRelative} from '../utils'

const sqrt2_3 = Math.sqrt(2/3)
const sqrt1_3 = Math.sqrt(1/3)

export function calcPos (target:Props, parent:Props, key=0): Vec3 {
    const phi = key* Math.PI* 2/3 + (parent.angle || 0)
    const vec = [sqrt2_3*Math.cos(phi), sqrt1_3, sqrt2_3*Math.sin(phi)]
    return mergeVec3(Array(4).fill(1),
        calcRelative((key<3? vec: [0,-1,0]) as Vec3, target.rotation, parent.direction),
        parent.position || [0,0,0], // TODO use group.updateMatrix()
        target.position || [0,0,0],
        target.double
            ? calcPos({...target,double:false}, parent,key+(key?2:3))
            : [0,0,0]
    )
}
export const calcMol = ({children, ...props}:Props): Props[] => {
    const {position: target=[0,0,0], parentProps} = props
    const position = mergeVec3([.5,.5], target, parentProps?.position||target)
    const distance = mergeVec3([ 1,-1], target, parentProps?.position||target)
    const rotation = eulerVec3(distance)
    const scale    = scaleVec3(distance)
    const clone    = React.Children.map(children, (child:any, key) => {
        if (!child) return null
        const position  = props.calcPos(child.props, props as any, key)
        const direction = mergeVec3([1,-1], position, props.position)
        return React.cloneElement(child, {
            ...props, parentProps: props, position, direction,
            ...child.props, depth:(props.depth||0) + 1, 
        })
    })
    return [
        {...props, children: clone},
        {...props, position, rotation, scale} as any,
    ]
}
