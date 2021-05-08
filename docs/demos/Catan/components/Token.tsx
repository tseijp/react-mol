import {useState} from 'react'
import {useAtom} from 'jotai'
import {animated as a} from 'react-spring/three'

import {Gesture} from './Gesture'
import {colorAtom, hoverAtom, dragAtom} from '../atom'


export function Token (props: any) {
    const {rockToken=false, token, setToken, children, ...other} = props
    const [hovered, setHovered] = useState(false)
    const [drag, setDrag] = useAtom(dragAtom)
    const [hover, setHover] = useAtom(hoverAtom)

    const onDrag = ({first, last}: any) => {
        setDrag(first? {token}: undefined)
        if (last && hover?.setToken) {
            hover.setToken(token)
            if (!rockToken)
                setToken(hover.token)
        }
    }

    const onHover = ({hovering}: any) => {
        setHovered(hovering)
        setHover(hovering? {token, setToken}: undefined)
    }

    return (
      <Gesture {...{onDrag, onHover}}
        disableDrag={!token && !drag?.token}
        disableHover={!token && !drag?.token}>
        {bind =>
          <a.mesh {...other} {...bind()}>
            <TokenGeometry />
            <TokenMaterial hovered={hovered} token={token}/>
            {children}
          </a.mesh>
        }
      </Gesture>
    )
}

export function TokenGeometry (props: any) {
    return (
      <cylinderGeometry {...props}
        attach="geometry"
        args={[4, 5, 1, 30, 1, false]}/>
    )
}

export function TokenMaterial (props: any) {
    const {token, hovered, ...other} = props
    const [color] = useAtom(colorAtom)
    const [drag, ] = useAtom(dragAtom)
    return (
      <meshLambertMaterial {...other} attach="material"
        wireframe={!!(!token && (drag && hovered))}
          visible//={!!(token || (drag && hovered))}
            color={(color as any)[token] || "white"}/>
    )
}
