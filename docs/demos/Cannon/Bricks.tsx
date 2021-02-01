import React from 'react'
import {Atom, Poly, Render} from '../../../src'
import * as THREE from 'three'
// import {useLoader} from 'react-three-fiber'
import niceColors from 'nice-color-palettes'
const {random} = Math

const Brick = React.forwardRef(({
    children,
    position=[0,0,0],
    scale=[1,1,1],
    ...props
}: any, ref) => {
    return (
        <>
            <Atom {...props} ref={ref} scale={scale} />
            <group position-y={position[1] + scale[1]}>
                {children}
            </group>
        </>
    )
})

export const Bricks = ({count:c=100}) => {
    const bumpMap = undefined  // useLoader(THREE.TextureLoader, '/JaggedStoneA_N.jpg')
    const colors = React.useMemo(() => [...Array(c)].map(() =>
        niceColors[17][~~(Math.random()*5)]
    ), [c])

    const heights = React.useMemo(() => [...Array(c)].map(() =>
        random() / c + 1 / c
    ), [c])

    const geometry = React.useRef<THREE.Geometry>()
    React.useEffect(() => void geometry.current?.translate(0, .5, 0), [])

    return (
        <Render>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} ref={geometry}/>
            <meshPhongMaterial
                attach="material"
                color="firebrick"
                bumpMap={bumpMap}
                shininess={0}/>
            <axesHelper scale={[2, 2, 2]}/>
            <Poly n={heights.length-1}>
            {(children, i) =>
                <Brick
                    key={i}
                    color={colors[i]}
                    children={children}
                    scale={[1 - .5 * random(), heights[i], 1 - .5 * random()]}/>
            }
        </Poly>
        </Render>
    )
}
export default Bricks
