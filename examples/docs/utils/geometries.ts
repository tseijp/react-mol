import * as THREE from 'three';
import {BufferGeometryUtils} from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export function molGeometry () {
    const arr = new THREE.Matrix4().makeTranslation(0,-1/2,0)
    const sph = new THREE.SphereBufferGeometry(.3, 32, 32)
    const cyl = new THREE.CylinderBufferGeometry(.1,.1,1,10)
    cyl.applyMatrix4(arr);
    return BufferGeometryUtils.mergeBufferGeometries([cyl, sph])
}
