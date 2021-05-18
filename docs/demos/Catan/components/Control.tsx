import React, {useEffect} from 'react'
import {Camera} from '@react-three/fiber'
import {useAtom} from 'jotai'
import {useControls as _} from 'leva'
import {MapControls, PerspectiveCamera} from '@react-three/drei'

import {hoverCursor} from '../utils'
import {hoverAtom, colorAtom, honeycombAtom} from '../atoms'

export function Control ({
    children,
    enableRotate=false,
    scale=_({scale: {value: 100, min: 0, max: 500}}).scale,
    colors=_({
        hills: '#f00', //brick
        forest: '#0f0', // lumber
        mountains: '#00f', // ore
        fields: '#0ff', // grain
        pasture: '#f0f', // wool
        desert: '#ff0', //nothing
        user0: "#f00",
        user1: "#0f0",
        user2: "#00f",
        user3: "#fff",
    }),
    rate=_({
        hills: 3,
        forest: 4,
        mountains: 3,
        fields: 4,
        pasture: 4,
        desert: 1
    }),
    ...other
}: any) {
    const camera = React.useRef<Camera>()
    const [{build}] = useAtom(hoverAtom),
       [color, set] = useAtom(colorAtom),
       [, setHoney] = useAtom(honeycombAtom)
    useEffect(() => void set(colors), [set, colors])
    useEffect(() => void setHoney({rate}), [setHoney, rate])
    useEffect(() => {
        document.body.style.cursor = hoverCursor(build, color)
    }, [build, color])
    return (
      <group {...other}>
        {children}
        <PerspectiveCamera makeDefault ref={camera} position={[0, scale, 0]} />
        <MapControls
            camera={camera.current}
            enabled={!build}
            enableRotate={enableRotate}/>
      </group>
    )
}
