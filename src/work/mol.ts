// import React from 'react'
import {Vec3, Props, MolProps} from '../types'
import {eulerVec3, mergeVec3} from '../utils'

const r = Math.sqrt(2)*2/3
export const calcMol = (props: Props<MolProps>): Props<MolProps> => {
    const {index=0, } = props
    const phi = index* Math.PI* 2/3 + (props.angle || 0)
    const vec = [r*Math.cos(phi), 1/3, r*Math.sin(phi)]
    const position = (index<3? vec: [0,-1,0]) as Vec3
    const distance = mergeVec3([-1,1], props.position, position)
    const rotation = eulerVec3(distance, props.distance||[0,1,0])
    return {...props, position, rotation, distance, scale: [1,1,1]}
}

// export function calcPos (target:Props<MolProps>, parent:Props<MolProps>, key=0): Vec3 {
//     const phi = key* Math.PI* 2/3 + (parent.angle || 0)
//     const vec = [sqrt2_3*Math.cos(phi), sqrt1_3, sqrt2_3*Math.sin(phi)]
//     return mergeVec3(Array(4).fill(1),
//         calcRelative((key<3? vec: [0,-1,0]) as Vec3, target.rotation, parent.direction),
//         parent.position || [0,0,0],
//         target.position || [0,0,0],
//         target.double
//             ? calcPos({...target,double:false}, parent,key+(key?2:3))
//             : [0,0,0]
//     )
// }
// export const calcMol = ({children, ...props}:Props<MolProps>): Props<MolProps> => {
//     const {position: target=[0,0,0], state} = props
//     const position = mergeVec3([.5,.5], target, state?.position||[0,-1,0])
//     const distance = mergeVec3([ 1,-1], target, state?.position||[0,-1,0])
//     const rotation = eulerVec3(distance)
//     const clone    = React.Children.map(children, (child:any, key) => {
//         if (!child) return null
//         const phi = key* Math.PI* 2/3 + (props.angle || 0)
//         const vec = [sqrt2_3*Math.cos(phi), sqrt1_3, sqrt2_3*Math.sin(phi)]
//         const position = (key<3? vec: [0,-1,0]) as Vec3
//         return React.cloneElement(child, {position})
//     })
//     return {...props, children: clone, position, rotation, scale: [1,1,1]}
// }
