import React, {createElement as el, useState, useMemo as memo} from 'react'
import styled from 'styled-components'
import {Html} from '@react-three/drei'
import {useAtom} from 'jotai'
import {Gesture} from './Gesture'
import {dragAtom} from '../atoms'
import {Terrain as Mesh} from '../meshes'
import {floorVec, icons} from '../utils'

const {random, sqrt, PI} = Math
const [x, z] = floorVec(10 * sqrt(3))
const getPos = (i=0, j=0, k=0) => () => [x.i*i+x.j*j+x.k*k, 0, z.i*i+z.j*j+z.k*k]
const terrainKeys = ['hills', 'forest', 'mountains', 'fields', 'pasture', 'desert']

export function Terrain (props: any) {
    const {children, rock=false, ...other} = props
    const [drag, setDrag] = useAtom(dragAtom),
    [terrain, setTerrain] = useState(props.terrain || terrainKeys[~~(random()*6)]),
                 [floor,] = useState(props.floor || [0, 0, 0]),
                 [token,] = useState(props.token || ~~(random()* 10))

    const position =  memo(getPos(...floor), [floor])
    const disable = !(terrain || drag?.terrain) || drag?.road || drag?.settle
    const onHover = (e: any) => setDrag({hover: e.active && {terrain, setTerrain}})
    const onDrag = (e: any) => {
        setDrag(e.first && {terrain, setTerrain})
        return () => {
            if (!drag?.hover?.setTerrain) return
            setTerrain(drag?.hover?.terrain)
            if (!rock) drag?.hover?.setTerrain(terrain)
        }
    }

    return (
      <Gesture {...{disable, onDrag, onHover, position, ...other}}>
        <Mesh {...{floor, token, terrain}}/>
        <Style rotation-x={-PI/2} {...{token, padding: 50, fontSize: 150}}>
          {(icons as any)[terrain] && el((icons as any)[terrain])}
          <span>{`${token}`}<span/></span>
        </Style>
        {children}
      </Gesture>
    )
}

const {abs} = Math

export const Style = styled<any>(Html).attrs(_ => ({
    center: true,
    transform: true,
    style: { pointerEvents: 'none'},
    color: (_.token-7)**2-1? 'black': '#ff5588',
    dotLen: 7 - abs(_.token - 7) - 1,
    filter: `drop-shadow(0px 25px 25px rgba(0, 0, 0, 0.1))`,
}))`
    pointer-events: none;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    z-index: 0;
    > svg {
        fill: white;
        width: ${_ => _.padding*2 + _.fontSize}px;
        height: ${_ => _.padding*2 + _.fontSize}px;
        filter: ${_ => _.filter};
        margin: ${_ => _.padding}px;
    }
    > span {
        filter: ${_ => _.filter};
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        background: white;
        color: ${_ => _.color};
        width: ${_ => _.padding*2 + _.fontSize}px;
        height: ${_ => _.padding*2 + _.fontSize}px;
        padding: ${_ => _.padding}px 0px;
        font-size: ${_ => _.fontSize}px;
        border-radius: ${_ => _.padding}px;
        margin-bottom: ${_ => _.padding}px;
        > span {
            width: ${_ => _.dotLen*(_.fontSize/4 - 5)}px;
            border-bottom: dotted ${_ => _.fontSize/8}px ${_ => _.color};
            transform: translateY(${_ => -_.padding/2 -_.fontSize/16}px);
        }
    }
`


// ************************************************************************** //
// export function _Terrain (props: any) {
//     const {children, floor:[i, j]=[0, 0], ...other} = props
//     const [honeycomb] = useAtom(honeycombAtom)
//     const openFloor = useMemo(() => honeycomb.openFloor(i, j), [honeycomb, i, j])
//     const childSet = useMemo(() => React.Children.toArray(children), [children])
//     return (
//         <>
//           {openFloor.map((floor, key) =>  typeof childSet[key - 1] !== "object"
//             ? <Terrain {...{...(!key && other), floor, key}}/>
//             : React.cloneElement(childSet[key - 1] as any, {floor, key})
//           )}
//         </>
//     )
// }
// {openFloor.map((floor, key) => key === 0
//   ? <TerrainTerrain {...{...other, floor, key}}/>
//   : childSet[key - 1] && cloneElement(childSet[key - 1] as any, {floor, key})
// )}
// {floorSet.current.map((floor, key) =>
//   typeof childSet[key - 1] !== "object"
//     ? <Terrain {...{...(!key && other), floor, key}}/>
//     : React.cloneElement(childSet[key - 1] as any,{floor, key})
// }
// const [, setTerrain] = useAtom(hexesAtom)
// React.useMemo(() => {
//     setTerrain({terrain, floor, position})
// }, [setTerrain, terrain, floor, position])
//
// const [hexes] = useAtom(hexesAtom)
// const floorSet = React.useRef(
//     dirs.map(([di, dj]) => [di + i, dj + j])
//         .filter(([i=0, j=0]) => !hexes.some(({floor}: any) =>
//             floor && floor[0] === i && floor[1] === j
//         ))
// )
