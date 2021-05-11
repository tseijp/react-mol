import {createElement as el, useState, useMemo as memo} from 'react'
import {useAtom} from 'jotai'
import {Icon} from './Icon'
import {Gesture} from './Gesture'
import {Terrain} from '../meshes'
import {floorVec, icons} from '../utils'
import {hoverAtom, dragAtom} from '../atom'

const {random, sqrt, PI} = Math
const [x, z] = floorVec(10 * sqrt(3))
const getPos = (i=0, j=0, k=0) => () => [x.i*i+x.j*j+x.k*k, 0, z.i*i+z.j*j+z.k*k]
const terrainKeys = ['hills', 'forest', 'mountains', 'fields', 'pasture', 'desert']

export function Hex (props: any) {
    const {children, rockTerrain=false, ...other} = props
    const  [drag, setDrag] = useAtom(dragAtom),
          [hover, setHover] = useAtom(hoverAtom),
          [floor,_setFloor] = useState(props.floor || [0, 0, 0]),
          [token,_setToken] = useState(props.token || ~~(random()* 10)),
        [terrain, setTerrain] = useState(props.terrain || terrainKeys[~~(random()*6)])

    const disable = memo(() => !terrain && !drag?.terrain && !!drag?.token, [terrain, drag])
    const onHover = memo(() => (e: any) => {
        setHover(e.hovering && {terrain, setTerrain})
    }, [setHover, terrain, setTerrain])
    const onDrag = memo(() => ({first, last}: any) => {
        setDrag(first? {terrain}: {})
        if (last && hover?.setTerrain) {
            hover.setTerrain(terrain)
            if (!rockTerrain)
                setTerrain(hover.terrain)
        }
    }, [rockTerrain, terrain, hover.terrain, hover.setTerrain])

    return (
      <group {...other} position={memo(getPos(...floor), [floor])}>
        <Gesture {...{disable, onDrag, onHover}}>
          <Terrain {...{floor, token, terrain}}>
            <Icon rotation-x={-PI/2} {...{token, padding: 50, fontSize: 150}}>
              {(icons as any)[terrain] && el((icons as any)[terrain])}
              <span>{`${token}`}<span/></span>
            </Icon>
          </Terrain>
        </Gesture>
        {children}
      </group>
    )
}

// ************************************************************************** //
// export function _Hex (props: any) {
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
//   ? <TerrainHex {...{...other, floor, key}}/>
//   : childSet[key - 1] && cloneElement(childSet[key - 1] as any, {floor, key})
// )}
// {floorSet.current.map((floor, key) =>
//   typeof childSet[key - 1] !== "object"
//     ? <Terrain {...{...(!key && other), floor, key}}/>
//     : React.cloneElement(childSet[key - 1] as any,{floor, key})
// }
// const [, setHex] = useAtom(hexesAtom)
// React.useMemo(() => {
//     setHex({terrain, floor, position})
// }, [setHex, terrain, floor, position])
//
// const [hexes] = useAtom(hexesAtom)
// const floorSet = React.useRef(
//     dirs.map(([di, dj]) => [di + i, dj + j])
//         .filter(([i=0, j=0]) => !hexes.some(({floor}: any) =>
//             floor && floor[0] === i && floor[1] === j
//         ))
// )
