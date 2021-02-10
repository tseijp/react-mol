import React, {Fragment} from 'react'
import { Physics, usePlane } from 'use-cannon'
import { useControl as _ } from 'react-three-gui'
import {Render, Atom, Poly} from '../../../src'
const {PI, } = Math

function Plane (props: any) {
    const [ref] = usePlane(() => ({ mass: 0, ...props }))
    return (
        <mesh ref={ref} receiveShadow>
          <planeBufferGeometry attach="geometry" args={[5, 5]} />
          <shadowMaterial attach="material" color="#171717" opacity={0.5} />
        </mesh>
    )
}

export function Jenga ({
    count:c=20,
    element: e=3,
    width: w=_('width', {type: 'number', value: 2.1, min: 0, max: 4}),
    depth: d=_('depth', {type: 'number', value: 1, min: 0, max: 2}),
    height: h=_('height', {type: 'number', value: .6, min: 0, max: 1}),
    dist=_('dist', {type: 'number', value: .1, min: 0, max: 1})
}: any) {
    return (
        <Physics>
            <Plane rotation={[-PI / 2, 0, 0]} />
            <Render scale={Array(3).fill(10 / c / h)} position-y={-1}>
                <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
                <meshPhongMaterial attach="material" color="firebrick" shininess={0}/>
                <Poly n={c}>
                    {(children, j) =>
                    <Fragment key={`${j}`}>
                        <Poly n={e}>
                            {(child, i) =>
                            <Fragment key={`${i}`}>
                                <Atom position-z={- (d + dist) * (e - 1) / 2} scale={[w, h, d]}/>
                                <group position-z={d + dist}>
                                    {child}
                                </group>
                            </Fragment>
                            }
                        </Poly>
                        <group
                            position-y={h}
                            rotation-y={PI / 2}
                            children={children}/>
                    </Fragment>
                    }
                </Poly>
            </Render>
        </Physics>
    )
}
