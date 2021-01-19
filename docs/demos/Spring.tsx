// ref:
//     - r3f-ARC-demo - CodeSandbox
//     - https://codesandbox.io/s/r3f-arc-demo-utyio

import React from 'react'
import {animated, useSprings} from 'react-spring/three'
import {Render, useAtom} from '../../src'
import * as THREE from 'three'

const Atom = React.forwardRef((props: any, ref) => {
    return <animated.group {...useAtom(props, ref)}/>
})

export const Rings = ({count=100}) => {
    const ref = React.useRef<any>();
    const [springs] = useSprings(count, (i) => ({
        ref,
        reset: true,
        from: { x: 0 },
        to: async (next) => {
            while (1) {
              await next({ x: 1 });
              await next({ x: 0 });
            }
          },
        config: {
            mass: 2.2,
            tension: 138,
            friction: 129
        },
        delay: i * count
    }));

    React.useEffect(() => void (ref.current.start()));

    return (
        <Render>
            <torusBufferGeometry attach="geometry" args={[10, .5, 5, 50]}/>
            <meshPhysicalMaterial attach="material"
                metalness={1}
                color="darksalmon"
                side={THREE.DoubleSide}/>
            <group scale={[1/count, 1/count, 1/count]}>
                {springs.map(({ x }, i) => (
                    <Atom
                        key={`0${i}`}
                        rotation-x={x.to(
                            [0, 0.1, 0.9, 1],
                            [0, -Math.PI * 0.1, Math.PI * 1.1, Math.PI]
                        )}
                        scale={[Math.exp(10*i/count), Math.exp(10*i/count), 1]}/>
                ))}
            </group>
        </Render>
    )
}
export default Rings
