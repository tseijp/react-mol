import {useMemo} from 'react'
import {useAtom} from 'jotai'
import * as atoms from './atoms'
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
    const {children, build, floor, ...other} = props
    const [d] = useAtom(atoms.dragRoadAtom),
          [c] = useAtom(atoms.colorAtom),
          pos = useMemo(() => floorVec.roadPos(...floor), [floor]),
          rot = useMemo(() => floorVec.roadRot(...floor), [floor])
    return (
      <Gesture {...other} position={pos} rotation={rot}>
        <boxGeometry args={[6, 1.5, 1.5]}/>
        <meshLambertMaterial
            wireframe={!!(!build && d )}
            visible={!!( build || d )}
            color={(c as any)[build] || "red"}/>
        {children}
      </Gesture>
    )
}

export function Settle (props: any) {
    const {children, build, floor, ...other} = props
    const [d] = useAtom(atoms.dragSettleAtom),
          [c] = useAtom(atoms.colorAtom),
          pos = useMemo(() => floorVec.settlePos(...floor), [floor])
    return (
      <Gesture {...other} position={pos}>
        <boxGeometry args={[3, 3, 3]}/>
        <meshLambertMaterial
            wireframe={!!(!build && d )}
            visible={!!( build || d )}
            color={(c as any)[build]}/>
        {children}
      </Gesture>
    )
}

export function Terrain (props: any) {
    const {children, build, floor=[0,0,0], ...other} = props
    const [d] = useAtom(atoms.dragTerrainAtom),
          [c] = useAtom(atoms.colorAtom),
          pos = useMemo(() => floorVec.terrainPos(...floor), [floor])
    return (
      <Gesture {...other} position={pos}>
        <cylinderGeometry
            attach="geometry"
            args={[9, 10, 1, 6, 1, false]}/>
        <meshLambertMaterial
            attach="material"
            wireframe={!!(!build && d )}
            visible={!!( build || d )}
            color={(c as any)[build]}/>
        {children}
      </Gesture>
    )
}
