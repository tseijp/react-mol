// const rand =(mul=1,add=0)=> add+Math.random()*mul
// export function meanPosition
import {atom} from 'jotai'
import {MolProps,Vec3} from './types'
import * as THREE from 'three'
export function rand (mul=1,add=0) {return add+Math.random()*mul}
export function meanVec3 (left=[0,0,0],right=[0,0,0], rate=[.5, .5]) {
    return left.map((v,i) => v*rate[0] + right[i]*rate[1]) as Vec3
}
export function rotateVec3(left=[0,0,0], right:Vec3|null=null, rate=[1,1,1]) {
    // const q = new THREE.Quaternion()
    // const axis = new THREE.Vector3(...meanVec3(left, right||left, [1, -1]))
    // const up   = new THREE.Vector3(0, 1, 0)
    // const rad  = axis.angleTo(up)
    // const dir  = new THREE.Vector3()
    // dir.crossVectors(up, axis).normalize();
    // q.setFromAxisAngle(dir, rad/Math.PI)
    // console.log(q)
    // return q.toArray().slice(1) as Vec3

    const euler = new THREE.Euler( 0, 1, 1.57, 'XYZ' );
    euler.setFromVector3( new THREE.Vector3(...meanVec3(left, right||left, [1, -1])) )
    console.log([euler.x, euler.y, euler.z] )
    return [euler.x, euler.y, euler.z] as Vec3
}

    // const q = new THREE.Quaternion()
    // q.setFromUnitVectors( new THREE.Vector3(...right), new THREE.Vector3(...left) )
    // return q.toArray().slice(1) as Vec3
    // USING setFromAxisAngle
    // const q = new THREE.Quaternion()
    // const axis = new THREE.Vector3(...meanVec3(left, right, [1, -1]))
    // const dir = new THREE.Vector3()
    // const up = new THREE.Vector3(0, 1, 0)
    // dir.crossVectors(up, axis).normalize();
    // const rad = Math.acos( up.dot(axis) );
    // q.setFromAxisAngle(dir, rad)
    // return q.toArray().slice(1) as Vec3

export const atoms = atom<MolProps[]>([])
export const bones = atom((get) => get(atoms).map(a => {
    const rotation = rotateVec3(a.position, a.parentProps?.position)
    const position = meanVec3(a.position, a.parentProps?.position)
    return {position, rotation}
}))
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
