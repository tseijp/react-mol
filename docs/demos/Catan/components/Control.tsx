import React from 'react'
import {Camera} from '@react-three/fiber'
import {useAtom} from 'jotai'
import {useControls as _} from 'leva'
import {MapControls, PerspectiveCamera} from '@react-three/drei'
import {dragAtom} from '../atom'

export function Control ({
    children,
    scale=_({scale: {value: 100, min: 0, max: 500}}).scale,
    enableRotate=false,
    ...other
}: any) {
    const camera = React.useRef<Camera>()
    const [drag] = useAtom(dragAtom)
    return (
      <group {...other}>
        {children}
        <PerspectiveCamera makeDefault ref={camera} position={[0, scale, 0]} />
        <MapControls
            camera={camera.current}
            enabled={!drag?.terrain && !drag?.token}
            enableRotate={enableRotate}/>
      </group>
    )
}
