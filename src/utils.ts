import React, {Children} from 'react'
import {atom} from 'jotai'
import * as THREE from 'three'
import {MolProps as MP,Vec3} from './types'

const base = new THREE.Vector3(0,1,0)
const axis = new THREE.Vector3()
const vec3 = new THREE.Vector3()
const temp = new THREE.Object3D()
const color= new THREE.Color()
const euler= new THREE.Euler()
const quat1= new THREE.Quaternion()
const quat2= new THREE.Quaternion()
const sqrt2_3 = Math.sqrt(2/3)
const sqrt1_3 = Math.sqrt(1/3)

export function mergeVec3(rate:number[], ...vec:Vec3[]): Vec3 {
    return [0,1,2].map(j => rate.map((r,i) => r*vec[i][j]).reduce((a,b) => a+b)) as Vec3
}
export function scaleVec3(vec:Vec3=[0,0,0]): Vec3 {
    return [1, vec3.set(...vec).length(), 1] as Vec3
}
export function eulerVec3(vec:Vec3=[0,0,0]): Vec3 {
    axis.set(...vec)
    quat1.setFromUnitVectors(base, axis);
    euler.setFromQuaternion(quat1)
    return euler.toArray().slice(0,3) as Vec3
}
export function calcColor (_color="white") {
    return color.setColorName(_color)
}
export function calcMatrix (position:Vec3=[0,0,0], rotation:Vec3=[0,0,0], scale:Vec3=[1,1,1]) {
    temp.position.set(...position)
    temp.rotation.set(...rotation)
    temp.scale.set(...scale)
    temp.updateMatrix()
    return temp.matrix
}
// ************************* 🍡 mol 🍡 ************************* //
export function calcPos (target:MP, parent:MP, key=0): Vec3 {
    const dis = 1 //TODO calcDistance
    const phi = key* Math.PI* 2/3 + (parent.angle || 0)
    const vec = [sqrt2_3*Math.cos(phi), sqrt1_3, sqrt2_3*Math.sin(phi)]
    axis.set (...(parent.direction||[0,1,0])).normalize()
    euler.set(...(target.rotation||[0,0,0]))
    quat1.setFromUnitVectors(base, axis)
    quat2.setFromEuler(euler)
    vec3.set(...((key<3? vec: [0,-1,0]) as Vec3)).normalize()
    vec3.applyQuaternion(quat1.multiply(quat2))
    vec3.setLength(dis)
    return mergeVec3(Array(4).fill(1),
        vec3.toArray() as Vec3,
        parent.position || [0,0,0],
        target.position || [0,0,0],
        target.double
            ? calcPos({...target,double:false}, parent,key+(key?2:3))
            : [0,0,0]
    )
}
export const calcMol = (props:MP): MP[] => {
    const children = Children.map(props.children, (child:any, key) => {
        const position  = props.calcPos(child.props, props, key)
        const direction = mergeVec3([1,-1], position, props.position)
        return child && React.cloneElement(child, {
            parentProps: props, position, direction,
            calcMol : child.props.calcMol|| props.calcMol,
            calcPos : child.props.calcPos|| props.calcPos,
            scale: child.props.scale || props.scale,
            color: child.props.color || props.color,
            depth: (props.depth||0) + 1
        })
    })
    const {position: target=[0,0,0], parentProps} = props
    const position = mergeVec3([.5,.5], target, parentProps?.position||target)
    const distance = mergeVec3([ 1,-1], target, parentProps?.position||target)
    const rotation = eulerVec3(distance)
    const scale    = scaleVec3(distance)
    return [
        {...props, children},
        {...props, position, rotation, scale}
    ]
}

export const render = atom<[Partial<MP>, Partial<MP>][]>([])


/* ISSUE
CH3OH: (H)-(O)-(CH3)
- now  calcAtom: (H: parent)-(O: me)-(CH3: calc child): using O and CH3
- next calcAtom: (H: parent)-(O: calc me)-(CH3: not using child): using H and O
*/
// TODO use position as (...)=>Vec3
// const position = calcArg(props.position, ...args)
// export function calcArg <T extends any[]=Vec3>(
//     arg: T | Calc<T>, ...args: Parameters<Calc<T>>
// ): T {
//     return typeof arg === "function"
//         ? arg(...args)
//         : arg
// }
// const {depth=0, position:parent} = props.parentProps||{}
// const pos = calcPos(props, props.parentProps||{}, props.index)// ERROR: key doesnt found
// const dir = calcDir(pos, parent)
// const children = Children.map(props.children, (c:any, index)=>
//     React.cloneElement(c, {index, parentProps: props})
// )
// return {
//     ...props.parentProps,
//     ...props,
//     children,
//     position : pos,
//     direction: dir,
//     depth: depth + 1
// }
