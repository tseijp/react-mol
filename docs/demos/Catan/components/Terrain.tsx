import {useState} from 'react'
import {useAtom} from 'jotai'
import {animated as a} from 'react-spring/three'

import {Gesture} from './Gesture'
import {colorAtom, hoverAtom, dragAtom} from '../atom'


export function Terrain (props: any) {
    const {rockTerrain=false, terrain, setTerrain, children, ...other} = props
    const [drag, setDrag] = useAtom(dragAtom)
    const [hover, setHover] = useAtom(hoverAtom)
    const [hovered, setHovered] = useState(false)

    const onDrag = ({first, last}: any) => {
        setDrag(first? {terrain}: undefined)
        if (last && hover && hover?.setTerrain) {
            hover.setTerrain(terrain)
            if (!rockTerrain)
                setTerrain(hover.terrain)
        }
    }

    const onHover = ({hovering}: any) => {
        setHovered(hovering)
        setHover(hovering && {terrain, setTerrain})
    }

    return (
      <Gesture {...{onDrag, onHover}}
        disableDrag={!terrain && !drag?.terrain && !!drag?.token}
        disableHover={!terrain && !drag?.terrain && !!hover?.token}>
        {bind =>
          <a.mesh {...bind()} {...other}>
            <TerrainGeometry />
            <TerrainMaterial hovered={hovered} terrain={terrain}/>
            {children}
          </a.mesh>
        }
      </Gesture>
    )
}

export function TerrainGeometry (props: any) {
    return (
      <cylinderGeometry {...props}
        attach="geometry"
        args={[9, 10, 1, 6, 1, false]}/>
    )
}

export function TerrainMaterial (props: any) {
    const {terrain, hovered, ...other} = props
    const [color] = useAtom(colorAtom)
    const [drag] = useAtom(dragAtom)
    return (
      <meshLambertMaterial {...other} attach="material"
        wireframe={!!(!terrain && (drag && hovered))}
          visible={!!(terrain || (drag && hovered))}
            color={(color as any)[terrain] || "red"}/>
    )
}
