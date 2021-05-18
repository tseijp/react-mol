import {useMemo, useState, useEffect, createElement as el} from 'react'
import {useAtom} from 'jotai'
import {Html} from '@react-three/drei'
import styled from 'styled-components'

import * as atoms from './atoms'
import {useMesh, Mesh} from './containers'
import {icons, floorVec} from './utils'

const {PI, random, abs} = Math

export function Robber (props: any) {
    const [m] = useMesh(random() > .7, atoms.dragRobberAtom),
          mat = {visible: m.mesh}
    return (
      <Mesh {...props} {...m} disable={!m.mesh} position={[-5, 5, 0]}>
        <coneGeometry args={[2.5, 10, 6]}/>
        <meshLambertMaterial {...mat} color='#212121'/>
      </Mesh>
    )
}

export function Road (props: any) {
    const [m] = useMesh(`user${~~(random()*4)}`, atoms.dragRoadAtom),
          [d] = useAtom(atoms.dragRoadAtom),
          [c] = useAtom(atoms.colorAtom),
          pos = useMemo(() => floorVec.roadPos(...props.floor), [props.floor]),
          rot = useMemo(() => floorVec.roadRot(...props.floor), [props.floor]),
          mat = {wireframe: !!(!m.mesh && d), visible: !!(m.mesh || d)}
    return (
      <Mesh {...props} {...m} position={pos} rotation={rot}>
        <boxGeometry args={[6, 1.5, 1.5]}/>
        <meshLambertMaterial {...mat} color={(c as any)[m.mesh]}/>
        <Style prepend center transform rotation-x={-PI/2}/>
      </Mesh>
    )
}

export function Settle (props: any) {
    const [m] = useMesh(`user${~~(random()*4)}`, atoms.dragRoadAtom),
          [d] = useAtom(atoms.dragSettleAtom),
          [c] = useAtom(atoms.colorAtom),
          pos = useMemo(() => floorVec.settlePos(...props.floor), [props.floor]),
          mat = {wireframe: !!(!m.mesh && d), visible: !!(m.mesh || d)}
    return (
      <Mesh {...props} {...m} position={pos}>
        <boxGeometry args={[3, 3, 3]}/>
        <meshLambertMaterial {...mat} color={(c as any)[m.mesh]}/>
        <Style prepend center transform rotation-x={-PI/2}/>
      </Mesh>
    )
}

export function Terrain (props: any) {
    const [m, setMesh] = useMesh(undefined, atoms.dragTerrainAtom),
          [t, setToken] = useState(0),
          [h] = useAtom(atoms.honeycombAtom),
          [d] = useAtom(atoms.dragTerrainAtom),
          [c] = useAtom(atoms.colorAtom),
          pos = useMemo(() => floorVec.terrainPos(...(props.floor || [0,0,0])), [props.floor]),
          mat = { wireframe: !!(!m.mesh && d ), visible: !!(m.mesh || d )},
          icn = (icons as any)[m.mesh]
    useEffect(() => {
        if (props.hidden) return
        setMesh(h.terrain(...(props.floor || [0,0,0])))
        setToken(h.token(...(props.floor || [0,0,0])))
    }, [h, setMesh, props.hidden, props.floor])
    return (
      <Mesh {...props} {...m} position={pos}>
        <cylinderGeometry args={[9, 10, 1, 6, 1, false]}/>
        <meshLambertMaterial {...mat} color={(c as any)[m.mesh]}/>
        <Icon rotation-x={-PI/2} token={t}>
          {icn && el(icn)}<span>{`${t}`}<span/></span>
        </Icon>
        {props.children}
      </Mesh>
    )
}

const Style = styled<any>(Html)`
  font-size: 50px;
  pointer-events: none;
`

const Icon = styled<any>(Html).attrs(_ => ({
    center: true,
    transform: true,
    padding: 50,
    fontSize: 150,
    style: { pointerEvents: 'none', zindex: -1},
    color: (_.token-7)**2-1? 'black': '#ff5588',
    dotLen: 7 - abs(_.token - 7) - 1,
    filter: `drop-shadow(0px 25px 25px rgba(0, 0, 0, 0.1))`,
}))`
    pointer-events: none;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    z-index: 0;
    > svg {
        fill: white;
        width: ${_ => _.padding*2 + _.fontSize}px;
        height: ${_ => _.padding*2 + _.fontSize}px;
        filter: ${_ => _.filter};
        margin: ${_ => _.padding}px;
    }
    > span {
        filter: ${_ => _.filter};
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        background: white;
        color: ${_ => _.color};
        width: ${_ => _.padding*2 + _.fontSize}px;
        height: ${_ => _.padding*2 + _.fontSize}px;
        padding: ${_ => _.padding}px 0px;
        font-size: ${_ => _.fontSize}px;
        border-radius: ${_ => _.padding}px;
        margin-bottom: ${_ => _.padding}px;
        > span {
            width: ${_ => _.dotLen*(_.fontSize/4 - 5)}px;
            border-bottom: dotted ${_ => _.fontSize/8}px ${_ => _.color};
            transform: translateY(${_ => -_.padding/2 -_.fontSize/16}px);
        }
    }
`
