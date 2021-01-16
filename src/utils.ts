import * as THREE from 'three'
import {Vec3} from './types'
import {BufferGeometryUtils} from 'three/examples/jsm/utils/BufferGeometryUtils.js';
const rad = Math.sqrt(2)*2/3
const base = new THREE.Vector3(0,1,0)
const axis = new THREE.Vector3()
const vec3 = new THREE.Vector3()
const euler= new THREE.Euler()
const quat1= new THREE.Quaternion()
// const quat2= new THREE.Quaternion()

export function mergeVec3(rate:number[], ...vec:Vec3[]): Vec3 {
    return [0,1,2].map(j => rate.map((r,i) => r*vec[i][j]).reduce((a,b) => a+b)) as Vec3
}
export function scaleVec3(vec:Vec3=[0,0,0]): Vec3 {
    return [1, vec3.set(...vec).length(), 1] as Vec3
}
export function eulerVec3(_axis:Vec3=[1,0,0],_base:Vec3=[0,1,0]): Vec3 {
    axis.set(..._axis).normalize()
    base.set(..._base).normalize()
    quat1.setFromUnitVectors(base, axis);
    euler.setFromQuaternion(quat1)
    return euler.toArray().slice(0,3) as Vec3
}
export function calcMolPos (index:number=0, angle=Math.PI/2, double=false): Vec3 {
    // if (typeof index !== "number") return [0,0,0]
    const phi = index * Math.PI* 2/3 + (angle || 0)
    const vec = [rad*Math.cos(phi), 1/3, rad*Math.sin(phi)]
    return double
        ? mergeVec3([1,1],
            calcMolPos(0, angle),
            index<4? vec as Vec3: [0,-1,0])
        :   index<4? vec as Vec3: [0,-1,0]
}
export function mergedGeometry () {
    const arr = new THREE.Matrix4().makeTranslation(0,-1/2,0)
    const sph = new THREE.SphereBufferGeometry(.3, 32, 32)
    const cyl = new THREE.CylinderBufferGeometry(.1,.1,1,10)
    cyl.applyMatrix4(arr);
    return BufferGeometryUtils.mergeBufferGeometries([cyl, sph])
}
