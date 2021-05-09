import {useAtom} from 'jotai'
import {colorAtom, dragAtom} from './atoms'

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

export function Road (props: any) {
    const {children, road, ...other} = props
    const //[d] = useAtom(dragAtom),
          [c] = useAtom(colorAtom)
    return (
      <mesh {...other}>
        <boxGeometry args={[6, 1.5, 1.5]}/>
        <meshLambertMaterial
          wireframe//={!!(!path && (drag && hover))}
            visible//={!!(path || (drag && hover))}
              color={(c as any)[road] || "red"}/>
        {children}
      </mesh>
    )
}

export function Settle (props: any) {
    const {children, settle, ...other} = props
    const //[d] = useAtom(dragAtom),
          [c] = useAtom(colorAtom)
    return (
      <mesh {...other}>
        <boxGeometry args={[3, 3, 3]}/>
        <meshLambertMaterial
          wireframe//={!!(!settlement && (drag && hover))}
            visible//={!!(settlement || (drag && hover))}
              color={(c as any)[settle] || "red"}/>
        {children}
      </mesh>
    )
}

export function Terrain (props: any) {
    const {children, terrain, ...other} = props
    const [d] = useAtom(dragAtom),
          [c] = useAtom(colorAtom)
    return (
      <mesh {...other}>
        <cylinderGeometry
          attach="geometry"
          args={[9, 10, 1, 6, 1, false]}/>
        <meshLambertMaterial attach="material"
          wireframe={!!(!terrain && (d))}
            visible={!!(terrain || (d))}
              color={(c as any)[terrain] || "red"}/>
        {children}
      </mesh>
    )
}
