// [x, -x, y, -y, z, -z]
//     _______(6)
//    /  3   /|
// 2 /______/ |  1
//   |  5   | /
//   |______|/
//       4

import React, {useMemo} from 'react'
import {Brick, Atom, Render} from '../../src'
import {useLoader} from 'react-three-fiber'
import { useControl as _ } from 'react-three-gui'
import { Physics, usePlane } from 'use-cannon'
import * as THREE from 'three'

const {PI, random, cos, sin} = Math
const bookURL = "http://images-jp.amazon.com/images/P/4041315220.09.MZZZZZZZ"

const Plane = (props: any) =>  (
    <mesh {...props} ref={usePlane(() => ({ mass: 0, ...props }))[0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[5, 5]} />
        <shadowMaterial attach="material" color="#171717" opacity={0.5} />
    </mesh>
)

// const Book = ({scale: [dx, dy, dz], ...props}: any) => (
//     <Brick {...props}
//         scale={[dx, dy, dz]}
//         ref={useBox(() => ({mass: 1, args: [dx, dy / 2, dz]}))[0]}/>
// )

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
                <Brick
                    position-y={(i=0) => hs[i]}
                    items={[...Array(c).keys()]}>
                    {i => <Atom scale={[1*ws[i], hs[i], aspect*ws[i]]}/>}
                </Brick>
            </Render>
        </Physics>
    )
}

export const Jenga = ({
    count:c=20,
    element: e=3,
    width: w=_('width', {type: 'number', value: 2.1, min: 0, max: 4}),
    depth: d=_('depth', {type: 'number', value: 1, min: 0, max: 2}),
    height: h=_('height', {type: 'number', value: .6, min: 0, max: 1}),
    dist=_('dist', {type: 'number', value: .1, min: 0, max: 1})
}) => (
    <Physics>
        <Plane rotation={[-PI / 2, 0, 0]} />
        <Render scale={Array(3).fill(10 / c / h)} position-y={-1}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
            <meshPhongMaterial attach="material" color="firebrick" shininess={0}/>
            <Brick items={[...Array(c).keys()]} position-y={h} rotation-y={PI / 2}>
                <Brick items={[...Array(e).keys()]} position-z={d + dist}>
                    <Atom scale={[w, h, d]}/>
                </Brick>
            </Brick>
        </Render>
    </Physics>
)

export const Bricks = ({
    count:c=75,
    element: e=4,
    width: w=_('width', {type: 'number', value: 2.1, min: 0, max: 4}),
    depth: d=_('depth', {type: 'number', value: 1, min: 0, max: 2}),
    height: h=_('height', {type: 'number', value: .6, min: 0, max: 1}),
    lap=_('lap', {type: 'number', value: 1, min: 0, max: 2}),
    dist=_('dist', {type: 'number', value: 1, min: 0, max: 2})
}) => (
    <Physics>
        <Plane scale={[10, 10, 10]} rotation={[-PI / 2, 0, 0]}/>
        <Render scale={Array(3).fill(20 / c / h)} position-y={-2}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
            <meshPhongMaterial attach="material" color="firebrick" shininess={0}/>
            <axesHelper scale={[2, 2, 2]}/>
            {[...Array(e).keys()].map(j => 2 * PI * j / e).map((ry, j) =>
            <group key={`${j}`}
                rotation-y={ry}
                position-x={(w + dist) / 2 * cos(ry)}
                position-z={-(w + dist) / 2 * sin(ry)}>
                <Brick
                    items={[...Array(c).keys()]}
                    position-x={(i=0) => ((i+j) % 2)? -dist: dist}
                    position-y={h}
                    rotation-y={2 * Math.PI * lap / c}>
                    <Atom scale={[w, h, d]}/>
                </Brick>
            </group>
            )}
        </Render>
    </Physics>
)
// <Poly n={c}>
//     {(children, j) =>
//     <Fragment key={`${j}`}>
//         <group position-z={- (d + dist) * (e - 1) / 2}>
//             <Poly n={e}>
//                 {(child, i) =>
//                 <Fragment key={`${i}`}>
//                     <Atom scale={[w, h, d]}/>
//                     <group position-z={d + dist}>
//                         {child}
//                     </group>
//                 </Fragment>
//                 }
//             </Poly>
//         </group>
//         <group
//             position-y={h}
//             rotation-y={PI / 2}
//             children={children}/>
//     </Fragment>
//     }
// </Poly>

// <Poly n={c}>
//     {(children, i) =>
//     <Fragment key={`${j}+${i}`}>
//         <Atom scale={[w, h, d]}/>
//         <group
//             position-x={((i+j) % 2)? -dist: dist}
//             position-y={h}
//             rotation-y={2 * Math.PI * lap / c}
//             children={children}/>
//     </Fragment>
//     }
// </Poly>
