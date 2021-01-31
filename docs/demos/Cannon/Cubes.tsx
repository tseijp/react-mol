import React from 'react'
import { Physics, usePlane, useBox } from 'use-cannon'
import {Render, Atom} from '../../../src'
import niceColors from 'nice-color-palettes'
const {PI, random} = Math

function Plane (props: any) {
    const [ref] = usePlane(() => ({ mass: 0, ...props }))
    return (
        <mesh ref={ref} receiveShadow>
          <planeBufferGeometry attach="geometry" args={[5, 5]} />
          <shadowMaterial attach="material" color="#171717" opacity={0.5} />
        </mesh>
    )
}

function Cube (props: any) {
    const [ref] = useBox(() => ({
        mass: 1,
        args: props.scale || [1, 1, 1]
    }))
    return <Atom ref={ref} {...props}/>
}

function InstancedCubes ({count:c=100, ...props}: any) {
    const colors = React.useMemo(() => [...Array(c)].map(() =>
        niceColors[17][~~(random() * 5)]
    ), [c])
    return (
        <Render>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshPhongMaterial attach="material" />
            <group {...props}>
                {[...Array(c)].map((_, i) =>
                    <Cube key={i} color={colors[i]}
                        position={[random()*10 - 5, random() * 20, random()*10 - 5]}/>
                )}
            </group>
        </Render>
    )
}
export function Cubes () {
    return (
        <Physics>
            <Plane rotation={[-PI / 2, 0, 0]} />
            <InstancedCubes />
        </Physics>
    )
}
