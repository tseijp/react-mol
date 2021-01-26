// ref:
//     - r3f-ARC-demo - CodeSandbox
//     - https://codesandbox.io/s/r3f-arc-demo-utyio
// const Atom = React.forwardRef((props: any, ref) => {
//     return <animated.group {...useAtom(props, ref)}/>
// })
import React from 'react'
import {animated, useSprings} from 'react-spring/three'
import {Render, Atom as _Atom} from '../../../src'

const Atom = animated(_Atom)

const delay = (time=0) => new Promise(resolve => {
    setTimeout(() => {
        resolve()
    }, time)
})

export const Rings = ({count=100}) => {
    const [springs] = useSprings(count, i => ({
        from: { x: 0 },
        to: async (next) => {
            while (1) {
                await next({ x: 1 })
                await next({ x: 0 })
                await delay(50 * count)
            }
        },
        config: {
            mass: 2.2,
            tension: 138,
            friction: 79
        },
        delay: 50 * i
    }));

    return (
        <Render>
            <torusBufferGeometry attach="geometry" args={[10, .5, 5, 50]}/>
            <meshPhysicalMaterial attach="material" roughness={0.2} metalness={1.0} color="darksalmon"/>
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
