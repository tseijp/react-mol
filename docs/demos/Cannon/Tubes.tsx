import React from 'react'
// import {Atom, Poly, Render} from '../../../src'
import {useLoader} from 'react-three-fiber'
import {useControl as _} from 'react-three-gui'
import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader.js'
import THUMBNAILS from 'three/examples/files/thumbnails.svg'
import * as THREE from 'three'

function curve2To3 (curve: THREE.Curve<THREE.Vector2>): THREE.Curve<THREE.Vector3>
function curve2To3 (curve: any) {
    return new THREE.CatmullRomCurve3(
        curve.getPoints(curve.getLength())
        .map((v: THREE.Vector2) => new THREE.Vector3(v.x, v.y, 0))
    )
}

export const Tubes = () => {
    const p = _('position', {type: 'number', value: .5, min: 0, max: 1})
    const s = _('scale'   , {type: 'number', value: .25, min: 0, max: 1})
    const svg = useLoader(SVGLoader, THUMBNAILS)
    const curves = React.useMemo(() => {
        const curves: THREE.Curve<THREE.Vector3>[] = []
        svg.paths.forEach(shapePath =>
            shapePath.toShapes(false, false).forEach(shape =>
                shape.curves.forEach(curve => curves.push(curve2To3(curve)))
            )
        )
        return curves
    }, [svg.paths])
    console.log(new THREE.InstancedMesh(
        new THREE.TubeBufferGeometry(curves[0]),
        new THREE.MeshPhongMaterial(),
        1
    ))
    return (
        <group position={[-p, -p, 0]} scale={[s/100, s/100, s/100]}>
            {curves.map(curve =>
                <mesh>
                    <tubeBufferGeometry attach="geometry" args={[curve, 20, 2, 12, false]}/>
                    <meshPhongMaterial attach="material" color="black"/>
                </mesh>
            )}
        </group>
    )
}
