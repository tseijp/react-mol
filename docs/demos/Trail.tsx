import React, {useMemo} from 'react'
import {useControl as _} from 'react-three-gui'
import {animated, useTrail} from 'react-spring/three'
import {Instanced, Atom as _Atom} from '../../src'
// import {Vector3, LineCurve3} from 'three'
import * as THREE from 'three'

const Atom = animated(_Atom);
const {PI, cos, sin} = Math;
const type = "number"
const from = { x: 0 };
const to = async (next: any) => {
    while (1) {
        await next({ x: 1 })
        await next({ x: 0 })
    }
};



export const Trans = ({
    count: c=5,
    length: l=100,
    scale: s=_('scale', {type, value: 10, min: 0, max: 50}),
    height: h=_('height', {type, value: 10, min: 0, max: 50}),
    radius: r=_('radius', {type, value: 5, min: 0, max: 10}),
    lap=_('lap', {type, value: 2, min: 0, max: 5}),
    config={mass: 10, tension: 700, friction: 30},
}) => (
    <Instanced position={[-c * s / 2, -h / 2, -c * s / 2]}>
        <tubeBufferGeometry attach="geometry" args={useMemo(() => {
            const points = [...Array(l||0).keys()].map(i => {
                const x = r * cos(2 * PI * lap * i / l)
                const z = r * sin(2 * PI * lap * i / l)
                return new THREE.Vector3(x, h * i / l, z)
            })
            const curve = new THREE.CatmullRomCurve3(points)
            return [curve, 20, 2, 12, false]
        }, [h, l, lap, r])}/>
        <meshPhongMaterial attach="material" color="red"/>
        {useTrail(c**2, {from, to, config}).map(({x}, i) =>
            <Atom
                position-x={~~(i % c) * s}
                position-z={~~(i / c) * s}
                rotation-y={x}/>
        )}
    </Instanced>
)
