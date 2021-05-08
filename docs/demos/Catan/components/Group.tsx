import React, {useState, useMemo} from 'react'
import {useAtom} from 'jotai'
import {Text, Html} from '@react-three/drei'
import {floorVec, icons} from '../utils'
import {honeycombAtom} from '../atom'
import {Terrain} from './Terrain'
import {Token} from './Token'

const {random, sqrt, cos, sin, PI} = Math
const _3 = sqrt(3)

const iconStyle = {
    padding: 2,
    color: "white",
    borderRadius: "1000px",
    backgroundColor: "rgba(0,0,0, 0.419)",
}

export function Group (props: any) {
    const {children, floor=[0, 0, 0], ...other} = props
    const [token, setToken] = useState(props.token || ~~(random()* 10))
    const [terrain, setTerrain] = useState(props.terrain)
    const Icon = useMemo(() => (icons as any)[terrain] || undefined, [terrain])
    return (
      <TerrainGroup {...other} floor={floor}>
        <Terrain {...{floor, terrain, setTerrain}}>
          <Html position-z={-3} prepend center style={{ pointerEvents: 'none'}}>
            {Icon && <Icon fill="white" width={50}/>}
          </Html>
        </Terrain>
        <Token position-y={1} {...{floor, token, setToken}}>
          <Html prepend center style={{ pointerEvents: 'none'}}>
            <div style={iconStyle}>{`${token} ${floor}`}</div>
          </Html>
        </Token>
        {children}
      </TerrainGroup>
    )
}

export function TerrainGroup (props: any) {
    const {children, floor: [i, j, k]=[0, 0, 0]} = props
    const [x, z] = React.useMemo(() => floorVec(10 * sqrt(3)), [])
    const pos = React.useMemo(() => [
        x.i*i + x.j*j + x.k*k, 0,
        z.i*i + z.j*j + z.k*k
    ] as [number, number, number], [x, z, i, j, k])
    return (
      <group position={pos}>
        {children}
      </group>
    )
}

// ************************************************************************** //

export function _Group (props: any) {
    const {children, floor:[i, j]=[0, 0], ...other} = props
    const [honeycomb] = useAtom(honeycombAtom)
    const openFloor = useMemo(() => honeycomb.openFloor(i, j), [honeycomb, i, j])
    const childSet = useMemo(() => React.Children.toArray(children), [children])
    return (
        <>
          {openFloor.map((floor, key) =>  typeof childSet[key - 1] !== "object"
            ? <Terrain {...{...(!key && other), floor, key}}/>
            : React.cloneElement(childSet[key - 1] as any, {floor, key})
          )}
        </>
    )
}

export function _TerrainGroup (props: any) {
    const {children, floor, ...other} = props
    const [honeycomb] = useAtom(honeycombAtom)

    const position = React.useMemo(() => [
           2 * 10 * cos( PI/6+PI/3) * floor[0] * .86
        + _3 * 10 * sin( PI/6+PI/3) * floor[1] * .86, 0,
           2 * 10 * cos(-PI/6+PI/3) * floor[0]
        + _3 * 10 * sin(-PI/6+PI/3) * floor[1]
    ], [floor])

    const dissable = React.useMemo(() => {
        return honeycomb.hasFloor(floor)
    }, [floor, honeycomb])

    if (dissable) return null

    return (
      <group {...other} position={position}>
        <Terrain />
        {children}
        <Text position={[5*random(), 1, 5*random()]} rotation-x={-PI/2} fontSize={2} color="black">
          {`${floor}`}
        </Text>
      </group>
    )
}
// {openFloor.map((floor, key) => key === 0
//   ? <TerrainGroup {...{...other, floor, key}}/>
//   : childSet[key - 1] && cloneElement(childSet[key - 1] as any, {floor, key})
// )}
// {floorSet.current.map((floor, key) =>
//   typeof childSet[key - 1] !== "object"
//     ? <Terrain {...{...(!key && other), floor, key}}/>
//     : React.cloneElement(childSet[key - 1] as any,{floor, key})
// }
// const [, setGroup] = useAtom(hexesAtom)
// React.useMemo(() => {
//     setGroup({terrain, floor, position})
// }, [setGroup, terrain, floor, position])
//
// const [hexes] = useAtom(hexesAtom)
// const floorSet = React.useRef(
//     dirs.map(([di, dj]) => [di + i, dj + j])
//         .filter(([i=0, j=0]) => !hexes.some(({floor}: any) =>
//             floor && floor[0] === i && floor[1] === j
//         ))
// )
