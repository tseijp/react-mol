import React from 'react'
// import {Atom, Poly, Render} from '../../../src'
import {useLoader} from 'react-three-fiber'
import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader.js'
import THUMBNAILS from 'three/examples/files/thumbnails.svg'
import * as THREE from 'three'

export const Tubes = () => {
    const {paths} = useLoader(SVGLoader, THUMBNAILS)
    return paths.map(path =>
        path.toShapes(true).map(shape =>
            shape.curves.map(curve =>
                <mesh key={Math.random()}>
                    <tubeBufferGeometry args={[
                        new THREE.CatmullRomCurve3(
                            curve.getPoints(shape.getLength())
                            .map(v2 => new THREE.Vector3(...v2.toArray(), 0))
                        )
                        , 20, 2, 12, false]}/>
                    <meshPhysicalMaterial />
                    {console.log(
                        new THREE.CatmullRomCurve3(
                            curve.getPoints(shape.getLength())
                            .map(v2 => new THREE.Vector3(...v2.toArray(), 0))
                        )
                    )}
                </mesh>
            )
        )
    )
}
