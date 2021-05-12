import React, {useState, useMemo as memo} from 'react'
import {Html} from '@react-three/drei'
import styled from 'styled-components'
import {useAtom} from 'jotai'
import {Gesture} from './Gesture'
import {floorVec} from '../utils'
import {Settle as Mesh} from '../meshes'
import {draggingAtom, hoveringAtom} from '../atoms'

const {PI} = Math
const [x, z] = floorVec(10, PI/6)
const getPos = (i=0, j=0, k=0) => () => [x.i*i+x.j*j+x.k*k, 2, z.i*i+z.j*j+z.k*k]

export function Settle (props: any) {
    const {children} = props
    const [d, setDragging] = useAtom(draggingAtom),
          [ , setHovering] = useAtom(hoveringAtom),
       [settle, setSettle] = useState(props.settle || "user1"),
                  [floor,] = useState(props.floor)

    const disable = !(settle || d?.settle) || d?.road || d?.terrain
    const onHover = memo(() => (e: any) => {
        setHovering(e.hovering && {settle, setSettle})
    }, [setHovering, settle, setSettle])
    const onDrag = memo(() => ({first}: any) => {
        setDragging(first? {settle}: undefined)
    }, [settle])

    return (
      <group position={memo(getPos(...floor), [floor]) as any}>
        <Gesture {...{disable, onDrag, onHover}}>
          <Mesh {...{floor, settle}}/>
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
  font-size: 50px;
`
