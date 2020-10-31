import React, {Children} from 'react'
import {atom} from 'jotai'
import {atomFamily} from 'jotai/utils'
import * as THREE from 'three'
import {MolProps as MP,Vec3} from './types'

// ************************* 🍡 bone 🍡 ************************* //
const base = new THREE.Vector3(0,1,0)
const axis = new THREE.Vector3()
const temp = new THREE.Vector3()
const euler = new THREE.Euler()
const quat1 = new THREE.Quaternion()
const quat2 = new THREE.Quaternion()
const sqrt2_3 = Math.sqrt(2/3)
const sqrt1_3 = Math.sqrt(1/3)

export function mergeVec3(rate:number[], ...vec:Vec3[]) {
    return [0,1,2].map(j=>
        rate.map((r,i) => r*vec[i][j]).reduce((a,b) => a+b)
    ) as Vec3

}
export function scaleVec3(vec:Vec3=[0,0,0]) {
    const vector = new THREE.Vector3(...vec)
    return [1, vector.length(), 1] as Vec3
}
export function eulerVec3(vec:Vec3=[0,0,0]) {
    axis.set(...vec)
    quat1.setFromUnitVectors(base, axis);
    euler.setFromQuaternion(quat1)
    return euler.toArray().slice(0,3) as Vec3
}

// ************************* 🍡 atom 🍡 ************************* //
export function calcPosition (child:MP, parent:MP, key:number): Vec3
export function calcPosition (child:any, parent:any, key=0) {
    const dis = 1 //TODO calcDistance
    const phi = key* Math.PI* 2/3 + (parent.angle || 0)
    const vec = [sqrt2_3*Math.cos(phi), sqrt1_3, sqrt2_3*Math.sin(phi)]
    axis.set(...(parent.direction as Vec3||[0,1,0])).normalize()
    temp.set(...(key<3? vec as Vec3: [0,-1,0] as Vec3)).normalize()
    euler.set(...(child.rotation as Vec3||[0,0,0]))
    quat1.setFromUnitVectors(base, axis)
    quat2.setFromEuler(euler)
    temp.applyQuaternion(quat1.multiply(quat2))
    temp.setLength(dis)
    return mergeVec3(Array(4).fill(1),
        temp.toArray() as Vec3,
        child.position ||[0,0,0],
        parent.position||[0,0,0],
        child.double
            ? calcPosition({...child,double:false}, parent,key+(key?2:3))
            : [0,0,0]
    )
}
export function calcRotation (child:Vec3, parent:Vec3) {
    return mergeVec3([1,-1], child, parent)
}

// ************************* 👻 jotai 👻 ************************* //
const calcAtom = (props:MP): MP => {
    if (!props) return {}
    beauty(_=>console.log(..._), {[`\t\t\t`]:"calcAtom"}, props)
    const children = Children.map(props.children ,(child:any, key) => {
        const position  = calcPosition(child.props, props, key)
        const direction = calcRotation(position, props.position as Vec3)
        return child && React.cloneElement(child, {
            parentProps: props, position, direction,
            scale: child.props.scale || props.scale,
            color: child.props.color || props.color,
            depth: (props.depth||0) + 1
        })
    })
    return {...props, children} as MP
}
const calcBone = (props: MP): MP => {
    if (!props) return {}
    const {position: child=[0,0,0], color,
        parentProps: {position: parent}={position: [0,0,0]}} = props
    const position = mergeVec3([.5,.5], child, parent||child)
    const distance = mergeVec3([ 1,-1], child, parent||child)
    const rotation = eulerVec3(distance)
    const scale    = scaleVec3(distance)
    return {position, rotation, scale, color}
}
// way 1: calc  in set
export const atoms = atomFamily(() => ({} as MP))
export const bones = atomFamily(() => ({} as MP))
export const index = atom(0, (_, set, [i, props]:[number, any]) => {
    beauty(_=>console.log(..._), {["\t\t"]:`set index ${i}`})
    const atom = calcAtom(props)
    const bone = calcBone(atom)
    set(atoms(i), atom)
    set(bones(i), bone)
    set(index, i+1 as any)
})
export const render = atom<[MP, MP][]>(get => {
    console.log(`\t\tget in render ${get(index)}`, get(atoms(0)), get(atoms(1)))
    return Array(get(index)).fill(0)
            .map((_, i) =>[ get(atoms(i)), get(bones(i)) ])
})
// way 2: calc  in get
// export const index = atom<MP[]>([])
// export const atoms = atomFamily(i => get => calcAtom(get(index)[i as number]))
// export const bones = atomFamily(i => get => calcBone(get(atoms(i))))
// export const render = atom(get => {
//     console.log(`\t\tget in render ${get(index).length}`, get(atoms(0)), get(atoms(1)))
//     return Array(get(index).length).fill(0)
//             .map((_, i) => [ get(atoms(i)), get(bones(i)) ]
//     )
// })
// ************************* 🍭 helpers 🍭 ************************* //
// * This function is fork of react-spring
// * Code : https://github.com/pmndrs/react-spring/blob/master/src/shared/helpers.ts
// ************************* *************** ************************* //
export const is = {
    arr: Array.isArray,
    obj: (a: unknown): a is object    => Object.prototype.toString.call(a) === '[object Object]',
    fun: (a: unknown): a is Function  => typeof a === 'function',
    str: (a: unknown): a is string    => typeof a === 'string',
    num: (a: unknown): a is number    => typeof a === 'number',
    und: (a: unknown): a is undefined => a === void 0,
    nul: (a: unknown): a is null      => a === null,
    set: (a: unknown): a is Set<any>  => a instanceof Set,
    map: (a: unknown): a is Map<any, any> => a instanceof Map,
    equ(a: any, b: any) {
    if (typeof a !== typeof b) return false
        if (is.str(a) || is.num(a)) return a === b
        if (is.obj(a) &&
            is.obj(b) &&
            Object.keys(a).length + Object.keys(b).length === 0)
            return true
        let i
        for (i in a) if (!(i in b))     return false
        for (i in b) if (a[i] !== b[i]) return false
        return is.und(i) ? a === b : true
    },
}

export function merge(target: any, lowercase: boolean = true) {
  return (object: object) =>
    (is.arr(object) ? object : Object.keys(object)).reduce(
        (acc: any, element) => {
            const key = lowercase
              ? element[0].toLowerCase() + element.substring(1)
              : element
            acc[key] = target(key)
            return acc
        },
        target
    )
}

export function beauty (
    fn: (args:any[])=>void, ...props: {}[]): void {
    fn( Array.prototype.concat([], ...Object
        .entries(Object.assign({}, ...props))
        .map(([key, val], i, self) =>
            [[  i?"\n\t":"",
                self[0][0],
                key==="" || key.match("\t")? "": key
            ].join(""), val ])
    ))
}
