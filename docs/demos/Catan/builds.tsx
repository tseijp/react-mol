import {useState, useEffect, createElement as el} from 'react'
import {Html} from '@react-three/drei'
import styled from 'styled-components'
import {useAtom} from 'jotai'
import {icons} from './utils'
import * as atoms from './atoms'
import * as meshes from './meshes'

const {PI, random, abs} = Math

export function useBuild (initState: any, atom: any) {
    const [drag, setDrag]  = useAtom(atom) as any,
         [build, setBuild] = useState(initState),
        onHover = (e: any) => setDrag({hover: e.active && {build, setBuild}}),
        onDrag  = (e: any) => setDrag(e.first && {build, setBuild}) || (() => {
            if (!drag.hover?.setBuild) return
            drag.hover?.setBuild(build)
            setBuild((drag.hover || {}).build)
        })
    return [{build, onHover, onDrag} as any, setBuild]
}

export function Road (props: any) {
    const [state] = useBuild(`user${~~(random()*4)}`, atoms.dragRoadAtom)
    return (
      <meshes.Road {...props} {...state}>
        <Style prepend center transform rotation-x={-PI/2}/>
      </meshes.Road>
    )
}

export function Settle (props: any) {
    const [state] = useBuild(`user${~~(random()*4)}`, atoms.dragSettleAtom)
    return (
        <meshes.Settle {...props} {...state}>
          <Style prepend center transform rotation-x={-PI/2}/>
        </meshes.Settle>
    )
}

export function Terrain (props: any) {
    const [honeycomb] = useAtom(atoms.honeycombAtom),
  [state, setTerrain] = useBuild(undefined, atoms.dragTerrainAtom),
    [token, setToken] = useState(undefined as any),
                    _ = state.build

    useEffect(() => {
        if (props.hidden) return
        setToken(honeycomb.token(...(props.floor || [0,0,0])))
        setTerrain(honeycomb.terrain(...(props.floor || [0,0,0])))
    }, [honeycomb, setTerrain, props.hidden, props.floor])

    return (
      <meshes.Terrain {...props} {...state}>
        <Icon rotation-x={-PI/2} token={token}>
          {(icons as any)[_] && el((icons as any)[_])}
          <span>{`${token}`}<span/></span>
        </Icon>
      </meshes.Terrain>
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
    justify-content: center;
    align-items: center;
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
