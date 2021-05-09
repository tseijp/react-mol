import React from 'react'
import {floorVec} from '../utils'
import {Html} from '@react-three/drei'
import styled from 'styled-components'
import {Settlement} from '../meshes'

const {sqrt, PI} = Math

export function Item (props: any) {
    const {children} = props
    const [[i,j,k], setFloor] = React.useState(props.floor)
    const [x, z] = React.useMemo(() => floorVec(10*sqrt(3)), [])
    const position = React.useMemo(() => [
        x.i*i + x.j*j + x.k*k, 0,
        z.i*i + z.j*j + z.k*k
    ] as [number, number, number], [x, z, i, j, k])
    return (
      <group position={position}>
        <Settlement {...{floor:[i,j,k], setFloor}}>
          <SettlementStyle prepend center transform
            style={{ pointerEvents: 'none'}}
            rotation-x={-PI/2}>
            <span>{`${""+[i,j,k]}`}<span/></span>
          </SettlementStyle>
          {children}
        </Settlement>
      </group>
    )
}

export const SettlementStyle = styled<any>(Html)``
