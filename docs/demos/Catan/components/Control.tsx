import React, {useMemo} from 'react'
import {Camera} from '@react-three/fiber'
import {useAtom} from 'jotai'
import {useControls as _} from 'leva'
import {MapControls, PerspectiveCamera} from '@react-three/drei'
import {hoverCursor} from '../utils'
import {dragAtom, hoverAtom, colorAtom} from '../atoms'

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
    ...other
}: any) {
    const camera = React.useRef<Camera>()
    const [drag] = useAtom(dragAtom),
         [hover] = useAtom(hoverAtom),
     [color,set] = useAtom(colorAtom)
    const cursor = useMemo(() => {
        const {road, settle, terrain} = hover || {}
        if (drag?.road) return road
        if (drag?.settle) return settle
        if (drag?.terrain) return terrain
        return road || settle || terrain
    }, [drag, hover])
    React.useEffect(() => void set(colors), [set, colors])
    React.useEffect(() => {
        document.body.style.cursor = hoverCursor(cursor, color)
    }, [cursor, color])
    return (
      <group {...other}>
        {children}
        <PerspectiveCamera makeDefault ref={camera} position={[0, scale, 0]} />
        <MapControls
            camera={camera.current}
            enabled={!drag?.settle && !drag?.road && !drag?.terrain}
            enableRotate={enableRotate}/>
      </group>
    )
}
