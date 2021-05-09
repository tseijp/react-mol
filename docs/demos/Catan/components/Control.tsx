import React from 'react'
import {Camera} from '@react-three/fiber'
import {useAtom} from 'jotai'
import {useControls as _} from 'leva'
import {MapControls, PerspectiveCamera} from '@react-three/drei'
import {dragAtom} from '../atom'
import {hoverCursor} from '../utils'
import {hoverAtom, colorAtom} from '../atom'

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
        desert: '#ff0' //nothing
    }),
    ...other
}: any) {
    const camera = React.useRef<Camera>()
    const [drag] = useAtom(dragAtom)
    const [hover] = useAtom(hoverAtom)
    const [color, setColor] = useAtom(colorAtom)
    React.useEffect(() => void setColor(colors), [setColor, colors])
    React.useEffect(() => {
        document.body.style.cursor = hoverCursor(hover?.terrain, color)
    }, [hover, color])
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
