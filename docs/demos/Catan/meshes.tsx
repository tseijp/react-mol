import {useAtom} from 'jotai'
import {animated as a} from 'react-spring/three'
import {colorAtom, dragAtom, hoverAtom} from './atom'

export function Path (props: any) {
    const {children, ...other} = props
    return (
      <mesh {...other}>
        <boxGeometry args={[10, 1, 1]}/>
        <meshLambertMaterial />
        {children}
      </mesh>
    )
}

export function Robber (props: any) {
    const {children, ...other} = props
    return (
      <a.mesh {...other}>
        <coneGeometry args={[5, 10, 32]}/>
        <meshLambertMaterial />
        {children}
      </a.mesh>
    )
}

export function Settlement (props: any) {
    const {children, ...other} = props
    return (
      <a.mesh {...other}>
        <boxGeometry args={[3, 3, 3]}/>
        <meshLambertMaterial />
        {children}
      </a.mesh>
    )
}

export function Terrain (props: any) {
    const {children, terrain, ...other} = props
    const [drag] = useAtom(dragAtom),
         [hover] = useAtom(hoverAtom),
         [color] = useAtom(colorAtom)
    return (
      <a.mesh {...other}>
        <cylinderGeometry
          attach="geometry"
          args={[9, 10, 1, 6, 1, false]}/>
        <meshLambertMaterial attach="material"
          wireframe={!!(!terrain && (drag && hover))}
            visible={!!(terrain || (drag && hover))}
              color={(color as any)[terrain] || "red"}/>
        {children}
      </a.mesh>
    )
}
