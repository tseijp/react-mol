import React from 'react'
import {Atom, Poly, Render} from '../../../src'
import {useLoader} from 'react-three-fiber'
import * as THREE from 'three'
import { Physics, usePlane, useBox } from 'use-cannon'

const {PI, random} = Math
const bookURL = "http://images-jp.amazon.com/images/P/4041315220.09.MZZZZZZZ"

const Plane = (props: any) => {
    const [ref] = usePlane(() => ({ mass: 0, ...props }))
    return (
        <mesh ref={ref} receiveShadow>
          <planeBufferGeometry attach="geometry" args={[5, 5]} />
          <shadowMaterial attach="material" color="#171717" opacity={0.5} />
        </mesh>
    )
}
const Book = React.forwardRef(({
    children,
    position=[0, 0, 0],
    scale=[1, 1, 1],
    ...props
}: any) => {
    const [ref] = useBox(() => ({
        mass: 1,
        args: scale || [1, 1, 1]
    }))
    return (
        <>
            <Atom ref={ref} rotation-x={Math.PI/2} scale={scale} {...props} />
            <group position-y={position[2] + scale[2]}>
                {children}
            </group>
        </>
    )
})

export const Books = ({count:c=100}) => {
    const widths = React.useMemo(() => [...Array(c)].map(() =>
        random() * 1 + 3
    ), [c])
    const heights = React.useMemo(() => [...Array(c)].map(() =>
        random() / c + 1 / c
    ), [c])

    const geometry = React.useRef<THREE.Geometry>()
    React.useEffect(() => void geometry.current?.translate(0, 0, -.5), [])

    const texture = useLoader(THREE.TextureLoader, bookURL)
    // const normMap = useLoader(THREE.TextureLoader, bookURL)
    const aspect = React.useMemo(() => texture.image.height / texture.image.width, [texture])
    const [TextureMaterial, PaperMaterial] = React.useMemo(() => [
            (p: any) => <meshPhongMaterial map={texture} {...p}/>,
            (p: any) => <meshPhongMaterial color="white" {...p}/>
    ], [texture])
    return (
        <Physics>
            <Plane rotation={[-PI / 2, 0, 0]}/>
            <Render>
                <boxBufferGeometry attach="geometry" args={[1, 1]} ref={geometry}/>
                <TextureMaterial attachArray="material" />
                <PaperMaterial attachArray="material" />
                <PaperMaterial attachArray="material" />
                <PaperMaterial attachArray="material" />
                <TextureMaterial attachArray="material" />
                <TextureMaterial attachArray="material" />
                <Poly n={heights.length - 1}>
                {(children, i) =>
                    <Book
                        key={i}
                        children={children}
                        scale={[1*widths[i], aspect*widths[i], heights[i]]}/>
                }
                </Poly>
            </Render>
        </Physics>
    )
}
