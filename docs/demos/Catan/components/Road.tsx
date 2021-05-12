import React, {useState, useMemo as memo} from 'react'
import {Html} from '@react-three/drei'
import styled from 'styled-components'
import {useAtom} from 'jotai'
import {Gesture} from './Gesture'
import {floorVec} from '../utils'
import {Road as Mesh} from '../meshes'
import {hoveringAtom, draggingAtom} from '../atoms'

const {sqrt, PI} = Math
const [x, z] = floorVec(5 * sqrt(3))
const getPos = (i=0, j=0, k=0) => () => [x.i*i+x.j*j+x.k*k, 2, z.i*i+z.j*j+z.k*k]
const getRot = (i=0, j=0, k=0) => () => [0, PI/2 + [PI/3, 0, -PI/3][[i%2-j%2, j%2-k%2, k%2-i%2].indexOf(0)],  0]

export function Road (props: any) {
    const {children, floor} = props
    const [ , setHovering] = useAtom(hoveringAtom),
          [d, setDragging] = useAtom(draggingAtom),
           [road, setRoad] = useState(props.road || "user1")

    const disable = !(road || d?.road) || d?.settle || d?.terrain
    const onHover = memo(() => (e: any) => {
        setHovering(e.hovering && {road, setRoad})
    }, [setHovering, road, setRoad])
    const onDrag = memo(() => ({first}: any) => {
        setDragging(first? {road}: undefined)
    }, [road])

    return (
      <group position={memo(getPos(...floor), [floor]) as any}>
        <Gesture {...{disable, onHover, onDrag}}>
          <Mesh {...{road}} rotation={memo(getRot(...floor), [floor]) as any}/>
          <Style prepend center transform
            style={{ pointerEvents: 'none'}}
            rotation-x={-PI/2}>
            <span>{``}<span/></span>
          </Style>
          {children}
        </Gesture>
      </group>
    )
}

export const Style = styled<any>(Html)`
  font-size: 100px;
`
