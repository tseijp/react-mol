// ref:
//     - r3f-ARC-demo - CodeSandbox
//     - https://codesandbox.io/s/r3f-arc-demo-utyio

import React from 'react'
import {animated, useSprings} from 'react-spring/three'
import {Render, Atom as _Atom} from '../../../src'
import {useControl as _} from 'react-three-gui'

const Atom = animated(_Atom)

const switch0To1 = async (next: (args: any) => any) => {
    while (1) {
        await next({ x: 1 })
        await next({ x: 0 })
    }
}

export const Bounds = ({count:c=30}) => {
    const w = _( "width", {type: "number", value: 10, min: 0, max: 50})
    const h = _("height", {type: "number", value: 10, min: 0, max: 50})
    const s = _( "space", {type: "number", value: 1, min: 0, max: 5})
    const a = _(   "amp", {type: "number", value: 1, min: 0, max: 5})
    const ref = React.useRef<any>()
    const [springs] = useSprings(c**2, i => ({
        ref,
        from: { x: 0 },
        to: switch0To1,
        config: {
            mass: 8.5,
            tension: 500,
            friction: 25
        },
        delay: Math.pow((i / c * 2 - c) ** 2 + (i % c * 2 - c) ** 2, .5) * 350
    }))

    React.useEffect(() => void (ref.current.start()));

    return (
        <Render count={c*c}>
            <cylinderBufferGeometry attach="geometry" args={[1, 1, 10, 6]}/>
            <meshPhysicalMaterial attach="material" roughness={0.2} metalness={1.0} color="darksalmon"/>
            <group scale={[w/c, h / 10, w/c]}
                rotation-x={Math.PI * 2 / c}
                position-x={ -w * s / 2 }
                position-z={ -w * s / 4 / Math.sqrt(3) * 3 }>
                {springs.map(({ x }, i) => (
                    <Atom
                        key={`0${i}`}
                        position-x={~~(i % c) * s + (~~(i/c)%2? 1: 0) * s / 2}
                        position-z={~~(i / c) * s * 3 / 2 / Math.sqrt(3)}
                        scale-x={1/Math.sqrt(3)}
                        scale-z={1/Math.sqrt(3)}
                        scale-y={x.to(t => 1 + Math.sin(t)).to(v => v * a / 8)}/>
                ))}
            </group>
            <axesHelper/>
        </Render>
    )
}
