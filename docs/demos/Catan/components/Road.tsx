import React, {useState, useMemo as memo} from 'react'
import {Html} from '@react-three/drei'
import styled from 'styled-components'
import {useAtom} from 'jotai'
import {Gesture} from './Gesture'
import {floorVec} from '../utils'
import {Road as Mesh} from '../meshes'
import {dragAtom} from '../atoms'

const {sqrt, PI, random} = Math
const [x, z] = floorVec(5 * sqrt(3))
const getPos = (i=0, j=0, k=0) => () => [x.i*i+x.j*j+x.k*k, 2, z.i*i+z.j*j+z.k*k]
const getRot = (i=0, j=0, k=0) => () => [0, PI/2 + [PI/3, 0, -PI/3][[i%2-j%2, j%2-k%2, k%2-i%2].indexOf(0)],  0]

export function Road (props: any) {
    const {children, floor, rock, ...other} = props
    const [drag, setDrag] = useAtom(dragAtom),
          [road, setRoad] = useState(props.road || `user${~~(random()*40)}`)

    const position = memo(getPos(...floor), [floor])
    const disable = !(road || drag?.road) || drag?.settle || drag?.terrain
    const onHover = (e: any) => setDrag({hover: e.active && {road, setRoad}})
    const onDrag = (e: any) => {
        setDrag(e.first && {road, setRoad})
        return () => {
            if (!drag?.hover?.setRoad) return
            console.log(drag?.hover)
            setRoad(drag?.hover?.road)
            if (!rock) drag?.hover?.setRoad(road)
        }
    }

    return (
      <Gesture {...{disable, onHover, onDrag, position, ...other}}>
        <Mesh {...{road}} rotation={memo(getRot(...floor), [floor]) as any}/>
        <Style prepend center transform
          style={{ pointerEvents: 'none'}}
          rotation-x={-PI/2}>
          <span>{``}<span/></span>
        </Style>
        {children}
      </Gesture>
    )
}

export const Style = styled<any>(Html)`
  font-size: 100px;
`
