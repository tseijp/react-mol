import React from 'react'
import {Canvas} from 'react-three-fiber'
import {OrbitControls} from 'drei'
import * as THREE from 'three'
import {M, MolProvider} from '../src'

// const rand =(mul=10,add=-5)=> add+Math.random()*mul
export function App () {
    return (
        <>
            <Canvas
                style={{position:"absolute", width:'100%', height: '100%', top:0, left:0}}
                gl={{ alpha: false, antialias: false, logarithmicDepthBuffer: true }}
                camera={{ fov: 75, position: [0, 0, 10] }}
                onCreated={({ gl }) => {
                    gl.setClearColor('white')
                    gl.toneMapping = THREE.ACESFilmicToneMapping
                    gl.outputEncoding = THREE.sRGBEncoding
                }}>
                <ambientLight intensity={1} />
                <pointLight position={[100, 100, 100]} intensity={2.2} />
                <pointLight position={[-100, -100, -100]} intensity={5} color="red" />
                <axesHelper />
                <gridHelper />
                <gridHelper rotation={[Math.PI/2, 0, 0]}/>
                <MolProvider>
                    <M color="red" scale={[.1,.1,.1]}>
                        <M color="red" scale={[.1, .1, .1]}>
                            <M color="green" scale={[.1, .1, .1]}>
                                <M color="blue" scale={[.1, .1, .1]}>
                                    <M color="red" scale={[.1, .1, .1]}>
                                        <M color="green" scale={[.1, .1, .1]}>
                                            <M color="blue" scale={[.1, .1, .1]}/>
                                        </M>
                                    </M>
                                </M>
                            </M>
                        </M>
                    </M>
                </MolProvider>

                <OrbitControls />
            </Canvas>
        </>
    )
}
