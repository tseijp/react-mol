import React, {useMemo as memo} from 'react'
import {Html} from '@react-three/drei'
import styled from 'styled-components'
import {useAtom} from 'jotai'
import {Settlement as Mesh} from '../meshes'
import {floorVec} from '../utils'
import {dragAtom} from '../atom'
import {Gesture} from './Gesture'

const {PI} = Math
const [x, z] = floorVec(10, PI/6)
const getPos = (i=0, j=0, k=0) => () => [x.i*i+x.j*j+x.k*k, 2, z.i*i+z.j*j+z.k*k]

export function Settlement (props: any) {
    const {children} = props
    const [floor] = React.useState(props.floor)
    const [settlement] = React.useState(props.settlement)
    const [, setDrag] = useAtom(dragAtom)

    const onDrag = memo(() => ({first}: any) => {
        setDrag(first? {settlement}: undefined)
    }, [settlement])

    return (
      <group position={memo(getPos(...floor), [floor]) as any}>
        <Gesture {...{onDrag}}>
          <Mesh {...{floor, settlement}}/>
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
