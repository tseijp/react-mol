import {atom} from 'jotai'
import {MolProps,Vec3} from './types'
import * as THREE from 'three'
// ************************* 🍡 bone 🍡 ************************* //
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
    const base = new THREE.Vector3(0,1,0)
    const axis = new THREE.Vector3(...vec)
    const q = new THREE.Quaternion().setFromUnitVectors(base, axis);
    const e = new THREE.Euler().setFromQuaternion(q)
    return e.toArray().slice(0,3) as Vec3
}

// ************************* 🍡 atom 🍡 ************************* //
export function calcPosition (child:MolProps, parent:MolProps, key:number): Vec3
export function calcPosition (child:any, parent:any, key=0) {
    const dis = 1 //TODO calcDistance
    const rad = Math.sqrt(2/3)
    const phi = key* Math.PI* 2/3 + (parent.angle || 0)
    const vec = [rad*Math.cos(phi), 1/Math.sqrt(3), rad*Math.sin(phi)]
    const base = new THREE.Vector3(0,1,0)
    const axis = new THREE.Vector3(...(parent.direction||[0,1,0])).normalize()
    const temp = new THREE.Vector3(...(key<3? vec: [0,-1,0])).normalize()
    const e = new THREE.Euler(...(child.rotation||[0,0,0]))
    const q = new THREE.Quaternion().setFromUnitVectors(base, axis)
    const p = new THREE.Quaternion().setFromEuler(e)
    temp.applyQuaternion(q.multiply(p))
    temp.setLength(dis)
    return mergeVec3(Array(4).fill(1),
        temp.toArray() as Vec3,
        child.position ||[0,0,0],
        parent.position||[0,0,0],
        child.double
            ? calcPosition({...child,double:false}, parent, key+2)
            : [0,0,0]
    )
}
export function calcRotation (child:Vec3, parent:Vec3) {
    return mergeVec3([1,-1], child, parent)
}

// ************************* 👻 jotai 👻 ************************* //
export const atoms = atom<MolProps[]>([])
export const bones = atom((get) => get(atoms).map(({
    position:child=[0,0,0],
    parentProps:{position:parent}={},
    color
}) => {
    const position = mergeVec3([.5,.5], child, parent||child)
    const distance = mergeVec3([ 1,-1], child, parent||child)
    return {
        position, color,
        rotation: eulerVec3(distance),
        scale   : scaleVec3(distance),
    }
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
