import React, {useEffect} from 'react'
import {Camera} from '@react-three/fiber'
import {MapControls, PerspectiveCamera} from '@react-three/drei'
import {useAtom} from 'jotai'
import {useControls as _} from 'leva'
import {hoverCursor} from '../utils'
import {hoverAtom, colorAtom, honeycombAtom} from '../atoms'

// 64 6b 7c b4 be
const {PI} = Math

export function Map ({
    children,
    enableRotate=false,
    scale=_({scale: {value: 100, min: 0, max: 500}}).scale,
    colors=_({
        mountains: '#8689c3', // ore
        pasture: '#c27bc8', // wool
        fields: '#88bfbf', // grain
        desert: '#e3d7a3', //nothing
        forest: '#96c78c', // lumber
        hills: '#de7c6b', //brick
        user0: "#a31215",
        user1: "#02a32d",
        user2: "#1220a3",
        user3: "#a3810a",
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
    const [{mesh}] = useAtom(hoverAtom),
      [color, set] = useAtom(colorAtom),
      [, setHoney] = useAtom(honeycombAtom)
    useEffect(() => void set(colors), [set, colors])
    useEffect(() => void setHoney({rate}), [setHoney, rate])
    useEffect(() => {document.body.style.cursor = hoverCursor(mesh, color)}, [mesh, color])
    return (
      <group {...other}>
        <PerspectiveCamera makeDefault ref={camera} position={[0, scale, 0]}>
          <pointLight position-y={0} intensity={2}/>
          <group position={[0, 0, -scale]} rotation-x={PI/2}>
            {children}
          </group>
        </PerspectiveCamera>
        <MapControls
            camera={camera.current}
            enabled={!mesh}
            enableRotate={enableRotate}/>
      </group>
    )
}
