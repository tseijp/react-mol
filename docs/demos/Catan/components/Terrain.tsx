import {createElement as el, useState, useMemo as memo} from 'react'
import styled from 'styled-components'
import {Html} from '@react-three/drei'
import {useAtom} from 'jotai'
import {Gesture} from './Gesture'
import {Terrain as Mesh} from '../meshes'
import {floorVec, icons} from '../utils'
import {hoverAtom, dragAtom} from '../atom'

const {random, sqrt, PI} = Math
const [x, z] = floorVec(10 * sqrt(3))
const getPos = (i=0, j=0, k=0) => () => [x.i*i+x.j*j+x.k*k, 0, z.i*i+z.j*j+z.k*k]
const terrainKeys = ['hills', 'forest', 'mountains', 'fields', 'pasture', 'desert']

export function Terrain (props: any) {
    const {children, rockTerrain=false, ...other} = props
    const  [drag, setDrag] = useAtom(dragAtom),
          [hover, setHover] = useAtom(hoverAtom),
          [floor,_setFloor] = useState(props.floor || [0, 0, 0]),
          [token,_setToken] = useState(props.token || ~~(random()* 10)),
        [terrain, setTerrain] = useState(props.terrain || terrainKeys[~~(random()*6)])

    const disable = memo(() => !terrain && !drag?.terrain && !!drag?.token, [terrain, drag])
    const onHover = memo(() => (e: any) => {
        // setHover(e.hovering && {terrain, setTerrain})
    }, [setHover, terrain, setTerrain])
    const onDrag = memo(() => ({first, last}: any) => {
        setDrag(first? {terrain}: undefined)
        if (last && hover?.setTerrain) {
            hover.setTerrain(terrain)
            if (!rockTerrain)
                setTerrain(hover.terrain)
        }
    }, [rockTerrain, terrain, hover])

    return (
      <group {...other} position={memo(getPos(...floor), [floor])}>
        <Gesture {...{disable, onDrag, onHover}}>
          <Mesh {...{floor, token, terrain}}/>
          <Style rotation-x={-PI/2} {...{token, padding: 50, fontSize: 150}}>
            {(icons as any)[terrain] && el((icons as any)[terrain])}
            <span>{`${token}`}<span/></span>
          </Style>
        </Gesture>
        {children}
      </group>
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
