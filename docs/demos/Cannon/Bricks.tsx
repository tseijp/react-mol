import React from 'react'
import {Atom, Poly, Render} from '../../../src'
// import * as THREE from 'three'
// import {useLoader} from 'react-three-fiber'
import { useControl as _ } from 'react-three-gui'
import { Physics, usePlane,  } from 'use-cannon'
const { PI, sin, cos } = Math

const Plane = (props: any) =>  (
    <mesh {...props} ref={usePlane(() => ({ mass: 0, ...props }))[0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[5, 5]} />
        <shadowMaterial attach="material" color="#171717" opacity={0.5} />
    </mesh>
)

// const Brick = (props: any) => <Atom {...props} ref={useBox(() => ({mass: 1, args: props.scale}))[0]}/>

export const Bricks = ({
    count:c=50,
    element: e=4,
    width: w=_('width', {type: 'number', value: 2.1, min: 0, max: 4}),
    depth: d=_('depth', {type: 'number', value: 1, min: 0, max: 2}),
    height: h=_('height', {type: 'number', value: .6, min: 0, max: 1}),
    lap=_('lap', {type: 'number', value: .5, min: 0, max: 1}),
    dist=_('dist', {type: 'number', value: 1, min: 0, max: 2})
}) => (
    <Physics>
        <Plane scale={[10, 10, 10]} rotation={[-PI / 2, 0, 0]}/>
        <Render position-y={-c * h / 4}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
            <meshPhongMaterial attach="material" color="firebrick" shininess={0}/>
            <axesHelper scale={[2, 2, 2]}/>
            {[...Array(e).keys()].map(j => 2 * PI * j / e).map((ry, j) =>
                <group key={`${j}`}
                    rotation-y={ry}
                    position-x={(w * 3 + dist) / 2 * cos(ry)}
                    position-z={-(w * 3 + dist) / 2 * sin(ry)}>
                    <Poly n={c-1}>
                        {(children, i) =>
                            <React.Fragment key={`${j}+${i}`}>
                                <Atom scale={[w, h, d]}/>
                                <Atom scale={[w, h, d]} position-x={-w - .1}/>
                                <Atom scale={[w, h, d]} position-x={w + .1} />
                                <group
                                    position-x={(i%2)? -dist: dist}
                                    position-y={h}
                                    rotation-y={2 * Math.PI * lap / c}
                                    children={children}/>
                            </React.Fragment>
                        }
                    </Poly>
                </group>
            )}
        </Render>
    </Physics>
)
export default Bricks
