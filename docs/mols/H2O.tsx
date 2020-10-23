import React from 'react'
import {Canvas} from 'react-three-fiber'
import {OrbitControls} from 'drei'
import {H, O} from '../../src'

// const rand =(mul=10,add=-5)=> add+Math.random()*mul
export function H2O () {
    return (
        <>
            <Canvas
                style={{position:"absolute", width:'100%', height: '100%', top:0, left:0}}
                gl={{ alpha: false, antialias: false, logarithmicDepthBuffer: true }}
                camera={{ fov: 75, position: [0, 0, 10] }}>
                <ambientLight intensity={1} />
                <pointLight position={[100, 100, 100]} intensity={2.2} />
                <pointLight position={[-100, -100, -100]} intensity={5} color="red" />
                <axesHelper />
                <gridHelper />
                <gridHelper rotation={[Math.PI/2, 0, 0]}/>
                <O>
                    <H/>
                    <H/>
                </O>
                <OrbitControls />
            </Canvas>
        </>
    )
}
