import {useState} from 'react'
import {useAtom} from 'jotai'
import {Html} from '@react-three/drei'
import styled from 'styled-components'
import {dragRoadAtom} from '../atoms'
import {Road as Mesh} from '../meshes'

const {PI, random} = Math

export function Road (props: any) {
    const {children, rock, ...other} = props
    const [drag, setDrag] = useAtom(dragRoadAtom),
          [road, setRoad] = useState(props.road || `user${~~(random()*4)}`)

    const state = {
        disable: !(road || drag.road) || drag.settle || drag.terrain,
        onHover: (e: any) => setDrag({hover: e.active && {road, setRoad}}),
         onDrag: (e: any) => setDrag(e.first && {road, setRoad}) || (() => {
            if (!drag.hover?.setRoad) return
            if (!rock) drag.hover?.setRoad(road)
            setRoad(drag.hover?.road)
        })
    }

    return (
      <Mesh {...{...state, ...other, road}}>
        <Style prepend center transform
          style={{pointerEvents: 'none'}}
          rotation-x={-PI/2}>
          <span>{``}<span/></span>
        </Style>
        {children}
      </Mesh>
    )
}

const Style = styled<any>(Html)`
  font-size: 100px;
`
