import React, {useMemo as memo} from 'react'
import {Html} from '@react-three/drei'
import styled from 'styled-components'
import {useAtom} from 'jotai'
import {Path as Mesh} from '../meshes'
import {floorVec} from '../utils'
import {Gesture} from './Gesture'
import {dragAtom} from '../atom'

const {sqrt, PI} = Math
const [x, z] = floorVec(5 * sqrt(3))
const getPos = (i=0, j=0, k=0) => () => [x.i*i+x.j*j+x.k*k, 2, z.i*i+z.j*j+z.k*k]
const getRot = (i=0, j=0, k=0) => () => [0, PI/2 + [PI/3, 0, -PI/3][[i%2-j%2, j%2-k%2, k%2-i%2].indexOf(0)],  0]

export function Path (props: any) {
    const {children, floor} = props
    const [path] = React.useState(props.path),
          [,setDrag] = useAtom(dragAtom)

    const onDrag = memo(() => ({first}: any) => {
        setDrag(first? {path}: undefined)
    }, [path])
    return (
      <group position={memo(getPos(...floor), [floor]) as any}>
        <Gesture {...{onDrag}}>
          <Mesh {...{path}} rotation={memo(getRot(...floor), [floor]) as any}/>
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
