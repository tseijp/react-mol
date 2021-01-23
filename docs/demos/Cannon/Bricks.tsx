import React from 'react'
import {Atom, Poly, Render} from '../../src'

const {random} = Math

export const Bricks = () => {
    const heights = [1, 3, 2, 2, 1, 2]
    return (
        <Render>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshPhongMaterial attach="material" color="darksalmon"/>
            <Poly n={10}>
            {(children, i) =>
                <group>
                    <Atom
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
