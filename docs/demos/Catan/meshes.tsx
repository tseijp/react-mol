import {useAtom} from 'jotai'
import {colorAtom, dragAtom, hoverAtom} from './atom'

export function Robber (props: any) {
    const {children, ...other} = props
    return (
      <mesh {...other}>
        <coneGeometry args={[5, 10, 32]}/>
        <meshLambertMaterial />
        {children}
      </mesh>
    )
}

export function Path (props: any) {
    const {children, path, ...other} = props
    // const [drag] = useAtom(dragAtom),
    //      [hover] = useAtom(hoverAtom)
    return (
      <mesh {...other}>
        <boxGeometry args={[6, 1.5, 1.5]}/>
        <meshLambertMaterial
          wireframe//={!!(!path && (drag && hover))}
            visible//={!!(path || (drag && hover))}
            />
        {children}
      </mesh>
    )
}

export function Settlement (props: any) {
    const {children, settlement, ...other} = props
    // const [drag] = useAtom(dragAtom),
    //      [hover] = useAtom(hoverAtom)
    return (
      <mesh {...other}>
        <boxGeometry args={[3, 3, 3]}/>
        <meshLambertMaterial
          wireframe//={!!(!settlement && (drag && hover))}
            visible//={!!(settlement || (drag && hover))}
            />
        {children}
      </mesh>
    )
}

export function Terrain (props: any) {
    const {children, terrain, ...other} = props
    const [drag] = useAtom(dragAtom),
         [hover] = useAtom(hoverAtom),
         [color] = useAtom(colorAtom)
    return (
      <mesh {...other}>
        <cylinderGeometry
          attach="geometry"
          args={[9, 10, 1, 6, 1, false]}/>
        <meshLambertMaterial attach="material"
          wireframe={!!(!terrain && (drag && hover))}
            visible={!!(terrain || (drag && hover))}
              color={(color as any)[terrain] || "red"}/>
        {children}
      </mesh>
    )
}
