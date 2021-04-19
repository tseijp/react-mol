import React, {useMemo} from 'react'
import {Tile, Atom as AtomTpl, Instanced} from '../../src'
import {useLoader} from 'react-three-fiber'
import { useControl as _ } from 'react-three-gui'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import * as THREE from 'three'

const {PI, random, cos, sin, } = Math
const bookURL = "http://images-jp.amazon.com/images/P/4041315220.09.MZZZZZZZ"

const Atom = (props: any) => <AtomTpl {...props} ref={useBox(() => ({mass: 1, args: props.scale}))}/>

const Plane = (props: any) => (
    <mesh {...props} ref={usePlane(() => ({ mass: 0, ...props }))[0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[5, 5]} />
        <shadowMaterial attach="material" color="#171717" opacity={0.5} />
    </mesh>
)

// attach array material for Box Geometry
// [x, -x, y, -y, z, -z]
//     _______(6)
//    /  3   /|
// 2 /______/ |  1
//   |  5   | /
//   |______|/
//      4

export const Books = ({count:c=10}) => {
    const ws = useMemo(() => [...Array(c)].map(() => 2 - random()), [c])
    const hs = useMemo(() => [...Array(c)].map(() => random() / c + 1 / c), [c])
    const texture = useLoader(THREE.TextureLoader, bookURL)
    const aspect = useMemo(() => texture.image.height / texture.image.width, [texture])
    return (
        <Physics>
            <Plane rotation={[-PI / 2, 0, 0]}/>
            <Instanced>
                <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
                <meshPhongMaterial attachArray="material" color="white"/>
                <meshPhongMaterial attachArray="material" map={texture}/>
                <meshPhongMaterial attachArray="material" map={texture}/>
                <meshPhongMaterial attachArray="material" map={texture}/>
                <meshPhongMaterial attachArray="material" color="white"/>
                <meshPhongMaterial attachArray="material" color="white"/>
                <Tile position-y={(i=0) => hs[i]} items={[...Array(c).keys()]}>
                    {(i=0) => <Atom scale={[1*ws[i], hs[i], aspect*ws[i]]}/>}
                </Tile>
            </Instanced>
        </Physics>
    )
}

export const Jenga = ({
    count: c=20,
    element: e=3,
    depth: d=_('depth', {type: 'number', value: 1, min: 0, max: 2}),
    height: h=_('height', {type: 'number', value: .6, min: 0, max: 1}),
    dist=_('dist', {type: 'number', value: .1, min: 0, max: 1})
}) => (
    <Physics>
        <Plane rotation={[-PI / 2, 0, 0]} />
        <Instanced scale={Array(3).fill(10 / c / h) as any} position-y={-2}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
            <meshPhongMaterial attach="material" color="firebrick" shininess={0}/>
            <Tile items={[...Array(c).keys()]} position-y={h} rotation-y={PI / 2}>
                <Tile items={[...Array(e).keys()]} position-z={d + dist}>
                    <Atom
                        position-z={- (d + dist) * (e - 1) / 2}
                        scale={[d * e + dist * (e - 1), h, d]}/>
                </Tile>
            </Tile>
        </Instanced>
    </Physics>
)

export const Brick = ({
    layer: l=50,
    count: c=4,
    element: e=2,
    width: w=_('width', {type: 'number', value: 2.1, min: 0, max: 4}),
    depth: d=_('depth', {type: 'number', value: 1, min: 0, max: 2}),
    height: h=_('height', {type: 'number', value: .6, min: 0, max: 1}),
    lap=_('lap', {type: 'number', value: 1, min: 0, max: 2}),
    gap=_('gap', {type: 'number', value: .5, min: 0, max: 2}),
    dist=_('dist', {type: 'number', value: .1, min: 0, max: 2}),
}) => (
    <Physics>
        <Plane scale={[10, 10, 10]} rotation={[-PI / 2, 0, 0]}/>
        <Instanced scale={Array(3).fill(10 / l / h) as any} position-y={-1}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
            <meshPhongMaterial attach="material" color="firebrick" shininess={0}/>
            <axesHelper scale={[2, 2, 2]}/>
            {[...Array(c).keys()].map(j => 2 * PI * j / c).map((ry, j) =>
            <group key={`${j}`} rotation-y={ry}
                position-x={ ((w + dist) * e + d + gap) / 2 * cos(ry)}
                position-z={-((w + dist) * e + d + gap) / 2 * sin(ry)}>
                <Tile
                    items={[...Array(l).keys()]}
                    position-y={h}
                    rotation-y={(j % 2 * 2 - 1) * 2 * Math.PI * lap / l}>
                    {(i=0) =>
                    <Tile items={[...Array(e).keys()]} position-x={w + dist}>
                        <Atom scale={[w, h, d]}
                            position-x={((i - j) % 2 * 2 - 1) * gap
                                    - (w + dist) * (e - 1) / 2} />
                    </Tile>
                    }
                </Tile>
            </group>
            )}
        </Instanced>
    </Physics>
)

export const Hall = ({
    count: c=30,
    layer: l=30,
    width: w=_('width', {type: 'number', value: 2.1, min: 0, max: 4}),
    depth: d=_('depth', {type: 'number', value: 1, min: 0, max: 2}),
    height: h=_('height', {type: 'number', value: .6, min: 0, max: 1}),
    dist=_('dist', {type: 'number', value: .1, min: 0, max: 1}),
}) => (
    <Physics>
        <Plane rotation={[-PI / 2, 0, 0]} />
        <Instanced scale={Array(3).fill(10 / c / h) as any} position-y={-2}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
            <meshPhongMaterial attach="material" color="firebrick" shininess={0}/>
            <group position-x={-(w + dist) * c / 2}>
                <Tile items={[...Array(l).keys()]}
                    position-x={(j=0) => (j % 2 - .5) * w}
                    position-y={h}>
                    {(j=0) =>
                        <Tile items={[...Array(c).keys()]} position-x={w + dist}>
                            {(i=0) =>
                                <Atom
                                    position-z={2 * PI * sin(2 * PI * (w * i / c + h * j / l))}
                                    rotation-y={2 * PI * sin(2 * PI * (w * i / c + h * j / l))}
                                    scale={[w, h, d]}/>
                            }
                        </Tile>
                    }
            </Tile>
            </group>
        </Instanced>
    </Physics>
)
