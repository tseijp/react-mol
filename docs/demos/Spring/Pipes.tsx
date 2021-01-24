import React from 'react'
import {animated, useSprings} from 'react-spring/three'
import {Render, Atom as _Atom} from '../../../src'
import {useControl as _} from 'react-three-gui'
import * as THREE from 'three'

const Atom = animated(_Atom)

export const Pipes = ({count:c=100, layer: l=10, freq:f=1}) => {
    const r = _('radius', {type: 'number', value: 1, min: 0, max: 5})
    const s = _( 'stick', {type: 'number', value: 1, min: 0, max: 5})
    const d = React.useMemo(() => 10 * Math.PI * r / c, [r, c])
    const [springs] = useSprings(c * l, (i) => ({
        from: { x: 0 },
        to: async (next) => {
            while (1) {
                await next({ x: 1 })
                await next({ x: 0 })
            }
        },
        config: {mass: 10, tension: 750, friction: 25},
        delay: Math.cos(2 * Math.PI * (i % c) / c / f) * 1000
             + Math.sin(2 * Math.PI * (i / c) / f) * 1000
    }))

    const line = React.useMemo(() => {
        const v1 = new THREE.Vector3(0, 0,  0)
        const v2 = new THREE.Vector3(0, 0, s * 10)
        return new THREE.LineCurve3(v1, v2)
    }, [s]);

    return (
        <Render>
            <tubeBufferGeometry attach="geometry" args={[line, 20, d, 12, false]}/>
            <meshPhysicalMaterial attach="material" roughness={0.2} metalness={1.0} color="darksalmon"/>
            <group
                rotation-x={Math.PI / 20}
                position-y={-d * l / 8}
                scale={[.1, .1, .1]}>
                {springs.map(({x}, i) =>
                    <Atom
                        key={`0${i}`}
                        position-y={~~(i / c) * d * 2}
                        position-x={10 * r * Math.sin(2 * Math.PI * (i % c) / c)}
                        position-z={10 * r * Math.cos(2 * Math.PI * (i % c) / c)}
                        rotation-y={2 * Math.PI * i / c}
                        scale-z={x.to(v => v + 1)}
                        />
                )}
            </group>
        </Render>
    )
}
