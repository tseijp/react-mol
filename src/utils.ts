import * as THREE from 'three'
import {Vec3} from './types'

const base = new THREE.Vector3(0,1,0)
const axis = new THREE.Vector3()
const vec3 = new THREE.Vector3()
const temp = new THREE.Object3D()
const color= new THREE.Color()
const euler= new THREE.Euler()
const quat1= new THREE.Quaternion()
const quat2= new THREE.Quaternion()

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
export function calcRelative (position:Vec3=[0,0,0], rotation:Vec3=[0,0,0], direction:Vec3=[0,1,0]) {
    axis.set (...direction).normalize() // TODO use group.updateMatrix()
    euler.set(...rotation)
    quat1.setFromUnitVectors(base, axis)
    quat2.setFromEuler(euler)
    return  vec3.set(...position)
                .normalize()
                .applyQuaternion(quat1.multiply(quat2))
                .setLength(1)
                .toArray() as Vec3
}
// TODO use parent: CH3OH = (H)-(O)-(CH3)
// - now  calcAtom: (H: parent)-(O: me)-(CH3: calc child): using O and CH3
// - next calcAtom: (H: parent)-(O: calc me)-(CH3: not using child): using H and O
