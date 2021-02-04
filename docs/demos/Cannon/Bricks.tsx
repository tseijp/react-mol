import React, {useMemo} from 'react'
import {Brick, Poly, Render} from '../../../src'
// import * as THREE from 'three'
// import {useLoader} from 'react-three-fiber'
import palettes from 'nice-color-palettes'
import { Physics, usePlane, useBox } from 'use-cannon'
const {PI, random} = Math

const Plane = (props: any) =>  (
    <mesh ref={usePlane(() => ({ mass: 0, ...props }))[0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[5, 5]} />
        <meshPhongMaterial attach="material" color="#171717" opacity={0.5} />
    </mesh>
)

const Box = ({scale: [dx, dy, dz]=[1, 1, 1], ...props}: any) => (
    <Brick {...props}
        ref={useBox(() => ({mass: 1, args: [dx, dy / 2, dz]}))[0]}
        scale={[dx, dy, dz]}
        />
)


export const Bricks = ({count:c=100}) => {
    const cs = useMemo(() => [...Array(c)].map(() => palettes[17][~~(Math.random()*5)]), [c])
    const ws = useMemo(() => [...Array(c)].map(() => 1 - .5 * random()), [c])
    const hs = useMemo(() => [...Array(c)].map(() => random() / c + 1 / c), [c])

    return (
        <Physics>
            <Plane rotation={[-PI / 2, 0, 0]}/>
            <Render>
                <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
                <meshPhongMaterial
                    attach="material"
                    color="firebrick"
                    shininess={0}/>
                <axesHelper scale={[2, 2, 2]}/>
                <Poly n={c-1}>
                    {(children, i) =>
                        <Box
                            key={i}
                            color={cs[i]}
                            children={children}
                            scale={[ws[i], hs[i], ws[i]]}/>
                    }
                </Poly>
            </Render>
        </Physics>
    )
}
export default Bricks
