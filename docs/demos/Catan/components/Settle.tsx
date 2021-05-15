import React, {useState, useMemo as memo} from 'react'
import {Html} from '@react-three/drei'
import styled from 'styled-components'
import {useAtom} from 'jotai'
import {Gesture} from './Gesture'
import {floorVec} from '../utils'
import {Settle as Mesh} from '../meshes'
import {dragAtom} from '../atoms'

const {PI, random} = Math
const [x, z] = floorVec(10, PI/6)
const getPos = (i=0, j=0, k=0) => () => [x.i*i+x.j*j+x.k*k, 2, z.i*i+z.j*j+z.k*k]

export function Settle (props: any) {
    const {children, rock, ...other} = props
    const [drag, setDrag] = useAtom(dragAtom),
      [settle, setSettle] = useState(props.settle || `user${~~(random()*4)}`),
                 [floor,] = useState(props.floor)
    const position = memo(getPos(...floor), [floor])
    const disable = !(settle || drag?.settle) || drag?.road || drag?.terrain
    const onHover = (e: any) => setDrag({hover: e.active && {settle, setSettle}})
    const onDrag = (e: any) => {
        setDrag(e.first && {settle, setSettle})
        return () => {
            if (!drag?.hover?.setSettle) return
            setSettle(drag?.hover?.settle)
            if (!rock) drag?.hover?.setSettle(settle)
        }
    }

    return (
      <Gesture {...{disable, onDrag, onHover, position, ...other}}>
        <Mesh {...{floor, settle}}/>
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
  font-size: 50px;
`
