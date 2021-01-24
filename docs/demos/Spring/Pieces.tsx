import React from 'react'
import {animated, useSprings} from 'react-spring/three'
import {Render, Atom as _Atom} from '../../../src'
import {useControl as _} from 'react-three-gui'
import * as THREE from 'three'

const Atom = animated(_Atom)

export const Pieces = ({layer: l=18||25}) => {
    const r = _('radius', {type: 'number', value: 2, min: 0, max: 5})

    const line = React.useMemo(() => {
        const v1 = new THREE.Vector3(0, 0, -r)
        const v2 = new THREE.Vector3(0, 0,  r)
        return new THREE.LineCurve3(v1, v2)
    }, [r]);

    const counts = React.useMemo(() =>
        [...Array(2 * l)]
            .map((_, i) => i - l)
            .map((i) => ~~Math.sqrt(l**2 - i**2) * 2)
    , [l])

    const [springs] = useSprings(2 * l, () => ({
        from: { x: 0 },
        to: async (next) => {
            while (1) {
                await next({ x: 1 })
                await next({ x: 0 })
            }
        },
        config: {mass: 7.5, tension: 750, friction: 25},
    }))

    return (
        <Render>
            <tubeBufferGeometry attach="geometry" args={[line, 20, r / l / 2, 12, false]}/>
            <meshPhysicalMaterial attach="material" roughness={0.2} metalness={1.0} color="darksalmon"/>
            <group rotation-z={Math.PI}>
                {springs.map(({x}, i) =>
                    [...Array(counts[i])].map((_, j) =>
                        <Atom
                            scale-z={Math.sqrt(1 - ((i - l)**2 + j**2) / l**2)}
                            position-x={(i - l) * r / l}
                            position-y={j * r / l}
                            rotation-x={x.to(v => v * Math.PI / 2 * (i - l) / l)}
                            >
                        </Atom>
                    )
                )}
            </group>
            <axesHelper />
        </Render>
    )
}
