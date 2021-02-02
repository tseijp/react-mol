import * as THREE from 'three'
import React from 'react'
import { Canvas, createPortal, useFrame } from 'react-three-fiber'
import { Text, Shadow, OrthographicCamera, OrbitControls } from 'drei'
import { Render, Atom as _ } from '../../../src'
import { animated } from 'react-spring'

const Atom = animated(_)
const text = `
const textConfig: any = {
    color:"#dcecd3",
    fontSize: 6,
    maxWidth: 60,
    lineHeight: 1,
    letterSpacing: -0.1,
    textAlign: "left",
    font: "https://fonts.googleapis.com/css?family=Barlow:400,700https://fonts.gstatic.com/barlow-v4-latin-regular.woff",
    anchorX: "center",
    anchorY: "
`
const textConfig: any = {
    color:"#dcecd3",
    fontSize: 6,
    maxWidth: 60,
    lineHeight: 1,
    letterSpacing: -0.1,
    textAlign: "left",
    font: "https://fonts.googleapis.com/css?family=Barlow:400,700https://fonts.gstatic.com/barlow-v4-latin-regular.woff",
    anchorX: "center",
    anchorY: "middle",
}
export function Texts () {
    const [scene, target, camera] = React.useMemo(() => {
        const scene = new THREE.Scene()
        const target = new THREE.WebGLRenderTarget(2048, 2048)
        const camera = new THREE.OrthographicCamera(-1024, 1024, -1024, 1024)
        camera.position.set(0, 0, 10)
        scene.background = new THREE.Color('#ff492c')
        return [scene, target, camera]
    }, [])

    useFrame(({ gl }) => {
        gl.setRenderTarget(target)
        gl.render(scene, camera)
        gl.setRenderTarget(null)
    })

    return (
        <Render>
            <sphereBufferGeometry attach="geometry" args={[1, 64, 64]} />
            <meshStandardMaterial attach="material" map={target.texture} />
            <Atom position={[0, 0, 0]}/>
            <Atom position={[1, 0, 0]}/>
            <Atom position={[0, 1, 0]}/>
            <Atom position={[0, 0, 1]}/>
            <Atom position={[-1, 0, 0]}/>
            <Atom position={[0, -1, 0]}/>
            <Atom position={[0, 0, -1]}/>
            {createPortal(<Text {...textConfig} text={text}>{text}</Text>, scene)}
        </Render>
    )
}
