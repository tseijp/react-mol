import React from 'react'
import {Atom, Poly, Render} from '../../../src'
// import {useLoader} from 'react-three-fiber'
// import * as THREE from 'three'
const {random} = Math

export const Bricks = () => {
    const heights = [1, 3, 2, 2, 1, 2]
    const bumpMap = undefined//useLoader(THREE.TextureLoader, '/JaggedStoneA_N.jpg')
    return (
        <Render>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshPhongMaterial
                attach="material"
                color="firebrick"
                bumpMap={bumpMap}
                shininess={0}/>
            <Poly n={10}>
            {(children, i) =>
                <group>
                    <Atom
                        color={["", "", ""]}
                        scale-x={random()*10}
                        scale-z={random()*10}
                        scale-y={heights[i]}/>
                    {children &&
                        <group position-y={heights[i-1]}>
                            {children}
                        </group>
                    }
                </group>
            }
        </Poly>
        </Render>
    )
}
export default Bricks
