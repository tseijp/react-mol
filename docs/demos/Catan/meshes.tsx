import {useMemo} from 'react'
import {useAtom} from 'jotai'
import {colorAtom} from './atoms'
import {floorVec} from './utils'
import {Gesture} from './components'

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
    const {children, road, floor, ...other} = props
    const [c] = useAtom(colorAtom),
          pos = useMemo(() => floorVec.roadPos(...floor), [floor]),
          rot = useMemo(() => floorVec.roadRot(...floor), [floor])
    return (
      <Gesture {...other} position={pos} rotation={rot}>
        <boxGeometry args={[6, 1.5, 1.5]}/>
        <meshLambertMaterial
          wireframe//={!!(!path && (drag && hover))}
            visible//={!!(path || (drag && hover))}
              color={(c as any)[road] || "red"}/>
        {children}
      </Gesture>
    )
}

export function Settle (props: any) {
    const {children, settle, floor, ...other} = props
    const [c] = useAtom(colorAtom)
    const pos = useMemo(() => floorVec.settlePos(...floor), [floor])
    return (
      <Gesture {...other} position={pos}>
        <boxGeometry args={[3, 3, 3]}/>
        <meshLambertMaterial
          wireframe//={!!(!settlement && (drag && hover))}
            visible//={!!(settlement || (drag && hover))}
              color={(c as any)[settle] || "red"}/>
        {children}
      </Gesture>
    )
}

export function Terrain (props: any) {
    const {children, terrain, token, floor, ...other} = props
    const [c] = useAtom(colorAtom)
    const pos = useMemo(() => floorVec.terrainPos(...floor), [floor])
    return (
      <Gesture {...other} position={pos}>
        <cylinderGeometry
          attach="geometry"
          args={[9, 10, 1, 6, 1, false]}/>
        <meshLambertMaterial
          attach="material"
          color={(c as any)[terrain]}/>
        {children}
      </Gesture>
    )
}
