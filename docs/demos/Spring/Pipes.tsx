// ref:
//     - r3f-ARC-demo - CodeSandbox
//     - https://codesandbox.io/s/r3f-arc-demo-utyio
// const Atom = React.forwardRef((props: any, ref) => {
//     return <animated.group {...useAtom(props, ref)}/>
// })

import React from 'react'
import {animated, useSprings} from 'react-spring/three'
import {Render, Atom as _Atom} from '../../../src'
import * as THREE from 'three'
import { GeometryUtils } from 'three/examples/jsm/utils/GeometryUtils.js';

const Atom = animated(_Atom)

const switch0To1 = async (next: (args: any) => any) => {
    while (1) {
        await next({ x: 1 })
        await next({ x: 0 })
    }
}

export const Pipes = ({count:c=10, width:w=10}) => {
    const ref = React.useRef<any>()
    const [springs] = useSprings(c**2, i => ({
        ref,
        from: { x: 0 },
        to: switch0To1,
        config: {
            mass: 2.2,
            tension: 138,
            friction: 20
        },
        delay: ( (i / c - c / 2) ** 2 + (i % c - c / 2) ** 2) * 10
    }))

    const hilbertPoints = GeometryUtils.hilbert3D(
        new THREE.Vector3( 0, 0, 0 ),
        200.0, 1, 0, 1, 2, 3, 4, 5, 6, 7
    );
    const spline = new THREE.CatmullRomCurve3( hilbertPoints );

    return (
        <Render>
            <tubeBufferGeometry   attach="geometry" args={[spline, 20, 1, 12, false]}/>
            <meshPhysicalMaterial attach="material" roughness={0.2} metalness={1.0} color="darksalmon"/>
            {springs.map(({x}, i) =>
                <Atom
                    key={`0${i}`}
                    position-x={(i % c) * w * 2 - (c * w)}
                    position-z={(i / c) * w * 2 - (c * w)}
                    scale-y={x.to(
                        [0, 0.1, 0.9, 1],
                        [1, 5, 2, 1]
                    )}/>
            )}
        </Render>
    )
}
