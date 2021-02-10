// [x, -x, y, -y, z, -z]
//     _______(6)
//    /  3   /|
// 2 /______/ |  1
//   |  5   | /
//   |______|/
//       4
import React, {useMemo} from 'react'
import {Atom, Poly, Render} from '../../../src'
import {useLoader} from 'react-three-fiber'
import * as THREE from 'three'
import { Physics, usePlane, useBox } from 'use-cannon'

const {PI, random} = Math
const bookURL = "http://images-jp.amazon.com/images/P/4041315220.09.MZZZZZZZ"

const Plane = (props: any) => (
    <mesh ref={usePlane(() => ({ mass: 0, ...props }))[0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[5, 5]} />
        <meshPhongMaterial attach="material" color="#171717" opacity={0.5} />
    </mesh>
)

const Book = ({scale: [dx, dy, dz], ...props}: any) => (
    <Atom {...props}
        scale={[dx, dy, dz]}
        ref={useBox(() => ({mass: 1, args: [dx, dy / 2, dz]}))[0]}/>
)

export const Books = ({count:c=10}) => {
    const ws = useMemo(() => [...Array(c)].map(() => 2 - random()), [c])
    const hs = useMemo(() => [...Array(c)].map(() => random() / c + 1 / c), [c])

    const texture = useLoader(THREE.TextureLoader, bookURL)
    const aspect = React.useMemo(() => texture.image.height / texture.image.width, [texture])
    const [TextureMaterial, PaperMaterial] = React.useMemo(() => [
            (p: any) => <meshPhongMaterial map={texture} {...p}/>,
            (p: any) => <meshPhongMaterial color="white" {...p}/>
    ], [texture])
    return (
        <Physics>
            <Plane rotation={[-PI / 2, 0, 0]}/>
            <Render>
                <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
                <PaperMaterial attachArray="material" />
                <TextureMaterial attachArray="material" />
                <TextureMaterial attachArray="material" />
                <TextureMaterial attachArray="material" />
                <PaperMaterial attachArray="material" />
                <PaperMaterial attachArray="material" />
                <Poly n={c}>
                {(children, i) =>
                    <React.Fragment key={`${i}`}>
                        <Book scale={[1*ws[i], hs[i], aspect*ws[i]]}/>
                        <group position-y={hs[i]} children={children}/>
                    </React.Fragment>
                }
                </Poly>
            </Render>
        </Physics>
    )
}
