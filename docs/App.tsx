import React from 'react'
import {Canvas} from 'react-three-fiber'
import {OrbitControls} from 'drei'
import * as THREE from 'three'
import {Mol, MolProvider} from '../src'

const rand =(mul=10,add=-5)=> add+Math.random()*mul

export function App () {
    return (
        <div>
            <Canvas
                style={{position:"absolute", width:'100%', height: '100%'}}
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
                <MolProvider>
                    {Array(1000).fill(0).map((_,i) =>
                        <Mol key={i} position={[rand(), rand(), rand()]}/>
                    )}
                </MolProvider>
                <OrbitControls />
            </Canvas>
        </div>
    )
}
