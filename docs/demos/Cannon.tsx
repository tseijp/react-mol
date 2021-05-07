import * as THREE from 'three'
import React, {useMemo} from 'react'
import {useLoader} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import { useControls as _ } from 'leva'
import { Physics, usePlane, useBox } from '@react-three/cannon'

import {Tile, Atom as AtomTpl, Instanced} from '../../src'
const {PI, random, cos, sin, } = Math
const bookURL = "http://images-jp.amazon.com/images/P/4041315220.09.MZZZZZZZ"

const Atom = (props: any) => <AtomTpl {...props} ref={useBox(() => ({mass: 1, args: props.scale}))}/>

const Plane = (props: any) => (
    <mesh {...props} ref={usePlane(() => ({ mass: 0, ...props }))[0]} receiveShadow>
        <planeGeometry attach="geometry" args={[5, 5]} />
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
            <OrbitControls {...({} as any)}/>
            <Instanced>
                <boxGeometry attach="geometry" args={[1, 1, 1]}/>
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
    depth: d=1,//_({depth: {value: 1, min: 0, max: 2}}).depth,
    height: h=.6,//_({height: {value: .6, min: 0, max: 1}}).height,
    dist=.1,//_({dist: {value: .1, min: 0, max: 1}}).dist
}) => (
    <Physics>
        <Plane rotation={[-PI / 2, 0, 0]} />
        <OrbitControls {...({} as any)}/>
        <Instanced scale={Array(3).fill(10 / c / h) as any} position-y={-2}>
            <boxGeometry attach="geometry" args={[1, 1, 1]}/>
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
    width: w=_({width: {value: 2.1, min: 0, max: 4}}).width,
    depth: d=_({depth: {value:   1, min: 0, max: 2}}).depth,
    height: h=_({height: {value: .6, min: 0, max: 1}}).height,
    lap=_({lap: {value: 1, min: 0, max: 2}}).lap,
    gap=_({gap: {value: .5, min: 0, max: 2}}).gap,
    dist=_({dist: {value: .1, min: 0, max: 2}}).dist,
}) => (
    <Physics>
        <Plane scale={[10, 10, 10]} rotation={[-PI / 2, 0, 0]}/>
        <OrbitControls {...({} as any)}/>
        <Instanced scale={Array(3).fill(10 / l / h) as any} position-y={-1}>
            <boxGeometry attach="geometry" args={[1, 1, 1]}/>
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
    width: w=_({width: {value: 2.1, min: 0, max: 4}}).width,
    depth: d=_({depth: {value: 1, min: 0, max: 2}}).depth,
    height: h=_({height: {value: .6, min: 0, max: 1}}).height,
    dist=_({dist: {value: .1, min: 0, max: 1}}).dist,
}) => (
    <Physics>
        <Plane rotation={[-PI / 2, 0, 0]} />
        <OrbitControls {...({} as any)}/>
        <Instanced scale={Array(3).fill(10 / c / h) as any} position-y={-2}>
            <boxGeometry attach="geometry" args={[1, 1, 1]}/>
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
