import React, {useMemo} from 'react'
import {useControl as _} from 'react-three-gui'
import {animated, useSprings} from 'react-spring/three'
import {Render, Atom as _Atom} from '../../src'
import {Vector3, LineCurve3} from 'three'

const Atom = animated(_Atom);
const {PI, exp, cos, sin, sqrt} = Math;
const type = "number"
const from = { x: 0 };
const to = async (next: any) => {
    while (1) {
        await next({ x: 1 })
        await next({ x: 0 })
    }
};

export const Bounds = ({
    count: c=30,
    delay: d=75,
    amp: a=_("amp", {type, value: 1, min: 0, max: 5}),
    space: s=_("space", {type, value: 1, min: 0, max: 5}),
    width: w=_("width", {type, value: 10, min: 0, max: 50}),
    hieght: h=_("height", {type, value: 10, min: 0, max: 50}),
    config={mass: 10, tension: 750, friction: 25},
}) => (
    <Render count={c**2}>
        <cylinderBufferGeometry attach="geometry" args={[1, 1, 10, 6]}/>
        <meshPhysicalMaterial
            attach="material"
            color="darksalmon"
            roughness={0.2}
            metalness={1.0}/>
        <group scale={[w/c, h / 10, w/c]}
            rotation-x={PI * 2 / 30}
            position-x={ -w * s / 2 }
            position-z={ -w * s / 4 / sqrt(3) * 3 }>
            {useSprings(c**2, (i) => ({
                from, to, config,
                delay: sqrt((i / c * 2 - c)**2 + (i % c * 2 - c)**2) * d
            }))[0].map(({ x }, i) => (
                <Atom
                    key={`0${i}`}
                    position-x={~~(i % c) * s + (~~(i/c)%2? 1: 0) * s / 2}
                    position-z={~~(i / c) * s * 3 / 2 / sqrt(3)}
                    scale-x={1/sqrt(3)}
                    scale-z={1/sqrt(3)}
                    scale-y={x.to(v => (v + .5) * a / 8)}/>
            ))}
        </group>
    </Render>
)

export const Pieces = ({
    layer: l=24,
    radius: r=_('radius', {type, value: 2.5, min: 0, max: 5}),
    config={mass: 10, tension: 700, friction: 30},
}) => {
    const line = useMemo(() => {
        const v1 = new Vector3(0, 0, -r)
        const v2 = new Vector3(0, 0,  r)
        return new LineCurve3(v1, v2)
    }, [r])
    const counts = useMemo(() =>
        [...Array(2 * l)]
            .map((_, i) => i - l)
            .map((i) => ~~sqrt(l**2 - i**2))
    , [l])

    return (
        <Render>
            <tubeBufferGeometry attach="geometry" args={[line, 20, r / l / 2, 12, false]}/>
            <meshPhysicalMaterial attach="material" roughness={0.2} metalness={1.0} color="darksalmon"/>
            <group rotation-z={PI}>
                {useSprings(2 * l, (i) => ({from, to, config, delay: 250 * (i / l)}))[0]
                .map(({x}, i) =>
                    [...Array(counts[i])].map((_, j) =>
                        <Atom
                            scale-z={sqrt(1 - ((i - l)**2 + j**2) / l**2)}
                            position-x={(i - l) * r / l}
                            position-y={j * r / l}
                            rotation-x={x.to(v => v * PI / 2 * (i - l) / l)}
                            >
                        </Atom>
                    )
                )}
            </group>
        </Render>
    )
}

export const Pipes = ({
    freq: f=1,
    count: c=100,
    layer: l=10,
    stick: s=_('stick', {type, value: 1, min: 0, max: 5}),
    radius: r=_('radius', {type, value: 1, min: 0, max: 5}),
    config={mass: 10, tension: 750, friction: 25},
}) => (
    <Render>
        <tubeBufferGeometry attach="geometry" args={useMemo(() => {
            const v1 = new Vector3(0, 0,  0)
            const v2 = new Vector3(0, 0, s * 10)
            return [new LineCurve3(v1, v2), 20, 10 * PI * r / c, 12, false]
        }, [s, r, c])}/>
        <meshPhysicalMaterial
            attach="material"
            color="darksalmon"
            roughness={0.2}
            metalness={1.0}/>
        <group
            rotation-x={PI / 20}
            position-y={-10 * PI * r / c * l / 8}
            scale={[.1, .1, .1]}>
            {useSprings(c * l, (i) => ({
                from, to, config,
                delay: cos(2 * PI * (i % c) / c / f) * 1000
                     + sin(2 * PI * (i / c) / f) * 1000
            }))[0].map(({x}, i) =>
                <Atom
                    key={`0${i}`}
                    position-y={~~(i / c) * 10 * PI * r / c * 2}
                    position-x={10 * r * sin(2 * PI * (i % c) / c)}
                    position-z={10 * r * cos(2 * PI * (i % c) / c)}
                    rotation-y={2 * PI * i / c}
                    scale-z={x.to(v => v + 1)}/>
            )}
        </group>
    </Render>
)

export const Rings = ({
    count: c=100,
    config={mass: 2.2, tension: 138, friction: 79}
}) => (
    <Render>
        <torusBufferGeometry attach="geometry" args={[10, .5, 5, 50]}/>
        <meshPhysicalMaterial attach="material" roughness={0.2} metalness={1.0} color="darksalmon"/>
        <group scale={Array(3).fill(1 / exp(c / 12)) as any}
            rotation={[PI / 2, 0, 0]}>
            {useSprings(c, i => ({from, to, config, delay: 50 * i}))[0]
            .map(({ x }, i) => (
                <Atom
                    key={`0${i}`}
                    scale={[exp(i/12), exp(i/12), 1]}
                    rotation-x={x.to(
                        [0, 0.1, 0.9, 1],
                        [0, -PI * 0.1, PI * 1.1, PI]
                    )}/>
            ))}
        </group>
    </Render>
)
