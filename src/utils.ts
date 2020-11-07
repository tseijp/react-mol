import React, {Children} from 'react'
import {atom} from 'jotai'
import * as THREE from 'three'
import {MolProps as MP,Vec3} from './types'

// ************************* 🍡 bone 🍡 ************************* //
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
    return [0,1,2].map(j=>
        rate.map((r,i) => r*vec[i][j]).reduce((a,b) => a+b)
    ) as Vec3
}
export function scaleVec3(vec:Vec3=[0,0,0]): Vec3 {
    const vector = new THREE.Vector3(...vec)
    return [1, vector.length(), 1] as Vec3
}
export function eulerVec3(vec:Vec3=[0,0,0]): Vec3 {
    axis.set(...vec)
    quat1.setFromUnitVectors(base, axis);
    euler.setFromQuaternion(quat1)
    return euler.toArray().slice(0,3) as Vec3
}
// ************************* 🍡 atom 🍡 ************************* //
export function calcPos (child:MP, parent:MP, key=0): Vec3 {
    const dis = 1 //TODO calcDistance
    const phi = key* Math.PI* 2/3 + (parent.angle || 0)
    const vec = [sqrt2_3*Math.cos(phi), sqrt1_3, sqrt2_3*Math.sin(phi)]
    axis.set(...(parent.direction||[0,1,0])).normalize()
    euler.set(...(child.rotation||[0,0,0]))
    quat1.setFromUnitVectors(base, axis)
    quat2.setFromEuler(euler)
    vec3.set(...((key<3? vec: [0,-1,0]) as Vec3)).normalize()
    vec3.applyQuaternion(quat1.multiply(quat2))
    vec3.setLength(dis)
    return mergeVec3(Array(4).fill(1),
        vec3.toArray() as Vec3,
        parent.position||[0,0,0],
        child.position ||[0,0,0],
        child.double
            ? calcPos({...child,double:false}, parent,key+(key?2:3))
            : [0,0,0]
    )
}
export function calcDir (child:Vec3, parent:Vec3) {
    return mergeVec3([1,-1], child, parent)
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
// ************************* 👻 jotai 👻 ************************* //
export const calcAtom = (props:MP): MP => {
    const children = Children.map(props.children, (child:any, key) => {
        const position  = calcPos(child.props, props, key)
        const direction = calcDir(position, props.position)
        return child && React.cloneElement(child, {
            parentProps: props,
            position, direction,
            scale: child.props.scale || props.scale,
            color: child.props.color || props.color,
            depth: (props.depth||0) + 1
        })
    })
    return {...props, children}
}
export const calcBone = (props: MP): MP => {
    const {position: child=[0,0,0], color,
        parentProps: {position: parent}={position: [0,0,0]}} = props
    const position = mergeVec3([.5,.5], child, parent||child)
    const distance = mergeVec3([ 1,-1], child, parent||child)
    const rotation = eulerVec3(distance)
    const scale    = scaleVec3(distance)
    return {...props, position, rotation, scale, color}
}
export const render = atom<[Partial<MP>, Partial<MP>][]>([])
