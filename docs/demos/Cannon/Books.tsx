import React from 'react'
import {Atom, Poly, Render} from '../../../src'
import {useLoader} from 'react-three-fiber'
import * as THREE from 'three'

const bookURL = "http://images-jp.amazon.com/images/P/4041315220.09.MZZZZZZZ"

export const Books = () => {
    const heights = [1, 3, 2, 2, 1, 2]
    const texture = useLoader(THREE.TextureLoader, bookURL)
    return (
        <Render>
            <boxBufferGeometry attach="geometry" args={[1, 1]}/>
            <meshPhongMaterial attach="material" map={texture} />
            <Poly n={10}>
            {(children, i) =>
                <group>
                    <Atom
                        scale-x={1}
                        scale-z={1}
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
