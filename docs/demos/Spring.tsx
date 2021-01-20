// ref:
//     - r3f-ARC-demo - CodeSandbox
//     - https://codesandbox.io/s/r3f-arc-demo-utyio
// const Atom = React.forwardRef((props: any, ref) => {
//     return <animated.group {...useAtom(props, ref)}/>
// })

import React from 'react'
import {animated, useSprings} from 'react-spring/three'
import {Render, Atom as _Atom} from '../../src'
import * as THREE from 'three'

const Atom = animated(_Atom)

const switch0To1 = async (next: (args: any) => any) => {
    while (1) {
        await next({ x: 1 })
        await next({ x: 0 })
    }
}

export const Bounds = ({count:c=4, width:w=5}) => {
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

    // React.useEffect(() => void (ref.current.start()));
    return (
        <Render>
            <cylinderBufferGeometry attach="geometry" args={[w, w, 10, 6]}/>
            <meshPhysicalMaterial
                roughness={0.2}
                metalness={1.0}
                attach="material"
                color="darksalmon"
                side={THREE.DoubleSide}/>
            <group scale={Array(3).fill(1/c) as any}
                rotation-x={Math.PI/6}>
                {springs.map(({ x }, i) => (
                    <Atom
                        key={`0${i}`}
                        position-x={(i % c) * w * 2 - (c * w)}
                        position-z={(i / c) * w * 2 - (c * w)}
                        scale-y={x.to(
                            [0, 0.1, 0.9, 1],
                            [1, 5, 2, 1]
                        )}/>
                ))}
            </group>
        </Render>
    )
}

export const Rings = ({count=100}) => {
    const ref = React.useRef<any>();
    const [springs] = useSprings(count, i => ({
        ref,
        from: { x: 0 },
        to: switch0To1,
        config: {
            mass: 2.2,
            tension: 138,
            friction: 79
        },
        delay: 100 * i
    }));

    React.useEffect(() => void (ref.current.start()));

    return (
        <Render>
            <torusBufferGeometry attach="geometry" args={[10, .5, 5, 50]}/>
            <meshPhysicalMaterial
                roughness={0.2}
                metalness={1}
                attach="material"
                color="darksalmon"
                side={THREE.DoubleSide}/>
            <group scale={Array(3).fill(1 / Math.exp(count / 12)) as any}
                rotation={[Math.PI / 2, 0, 0]}>
                {springs.map(({ x }, i) => (
                    <Atom
                        key={`0${i}`}
                        rotation-x={x.to(
                            [0, 0.1, 0.9, 1],
                            [0, -Math.PI * 0.1, Math.PI * 1.1, Math.PI]
                        )}
                        scale={[Math.exp(i/12), Math.exp(i/12), 1]}/>
                ))}
            </group>
        </Render>
    )
}
export default Rings
