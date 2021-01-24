import React from 'react'
import {animated, Spring} from 'react-spring/three'
import {Render, Atom as _Atom} from '../../../src'
// import {useControl as _} from 'react-three-gui'
import {useLoader} from 'react-three-fiber'
import FONTPATH from 'three/examples/fonts/helvetiker_regular.typeface.json'
import * as THREE from 'three'

const Atom = animated(_Atom)

export const Texts = ({count:c=10}) => {
    const font = useLoader(THREE.FontLoader, FONTPATH as any)
    const config = React.useMemo(() => ({
        font, size: 40, height: 30, curveSegments: 32,
        bevelEnabled: true, bevelThickness: 6,
        bevelSize: 2.5, bevelOffset: 0,
        bevelSegments: 8
    }), [font])

    console.log(font)

    return (
        <Render>
            <textBufferGeometry attach="geometry" args={["Kinectic", config]}/>
            <meshPhysicalMaterial attach="material" roughness={0.2} metalness={1.0} color="darksalmon"/>
            <group>
                {[...Array(c)].map((_, i) =>
                    <Spring
                        config={{mass: 10, tension: 700, friction: 30}}
                        delay={250 * i}
                        from={{ x: 0 }}
                        to={async (next) => {
                            while (true) {
                                await next({ x: 0 })
                                await next({ x: 1 })
                            }
                        }}>
                        {({x}) =>
                            <Atom position-x={x}/>
                        }
                    </Spring>
                )}
            </group>
        </Render>
    )
}
