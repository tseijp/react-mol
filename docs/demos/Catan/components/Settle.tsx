import {useState} from 'react'
import {Html} from '@react-three/drei'
import styled from 'styled-components'
import {useAtom} from 'jotai'
import {dragSettleAtom} from '../atoms'
import {Settle as Mesh} from '../meshes'

const {PI, random} = Math

export function Settle (props: any) {
    const {children, rock, ...other} = props
    const [drag, setDrag] = useAtom(dragSettleAtom),
        [settle, setSettle] = useState(props.settle || `user${~~(random()*4)}`)
    const state = {
         disable: !(settle || drag.settle) || drag.road || drag.terrain,
         onHover: (e: any) => setDrag({hover: e.active && {settle, setSettle}}),
          onDrag: (e: any) => setDrag(e.first && {settle, setSettle}) || (() => {
            if (!drag.hover?.setSettle) return
            if (!rock) drag.hover?.setSettle(settle)
            setSettle(drag.hover?.settle)
        })
    }

    return (
      <Mesh {...{...state, ...other, settle}}>
        <Style prepend center transform
          style={{ pointerEvents: 'none'}}
          rotation-x={-PI/2}>
          <span>{``}<span/></span>
        </Style>
        {children}
      </Mesh>
    )
}

const Style = styled<any>(Html)`
  font-size: 50px;
`
