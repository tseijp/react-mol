import React, {useMemo as memo} from 'react'
import {floorVec} from '../utils'
import {Html} from '@react-three/drei'
import styled from 'styled-components'
import {Settlement} from '../meshes'

const {sqrt, PI} = Math
const [x, z] = floorVec(5 * sqrt(3), PI/6)
const getPos = (i=0, j=0, k=0) => () => [x.i*i+x.j*j+x.k*k, 0, z.i*i+z.j*j+z.k*k]

export function Item (props: any) {
    const {children} = props
    const [floor, setFloor] = React.useState(props.floor)
    return (
      <group position={memo(getPos(...floor), [floor]) as any}>
        <Settlement {...{floor, setFloor}}>
          <SettlementStyle prepend center transform
            style={{ pointerEvents: 'none'}}
            rotation-x={-PI/2}>
            <span>{`${""+floor}`}<span/></span>
          </SettlementStyle>
          {children}
        </Settlement>
      </group>
    )
}

export const SettlementStyle = styled<any>(Html)``
