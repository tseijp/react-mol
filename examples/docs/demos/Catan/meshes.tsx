import {useMemo, useState, useEffect, useRef} from 'react'
import {Html} from '@react-three/drei'
import {useAtom} from 'jotai'
import styled from 'styled-components'
import * as atoms from './atoms'
import {useMesh, Mesh} from './containers'
import {icons, floorVec} from './utils'

const {PI, random, abs} = Math

export function Robber (props: any) {
    const [m] = useMesh(random() > .9? 'user1': null, atoms.dragRobberAtom, props.rock),
          mat = {visible: m.mesh}
    return (
      <Mesh {...props} {...m} disable={!m.mesh} position={[-5, 5, 0]}>
        <coneGeometry args={[2.5, 10, 6]}/>
        <meshLambertMaterial {...mat} color='#212121'/>
      </Mesh>
    )
}

export function Road (props: any) {
    const [m] = useMesh(`user${~~(random()*4)}`, atoms.dragRoadAtom, props.rock),
          [d] = useAtom(atoms.dragRoadAtom),
          [c] = useAtom(atoms.colorAtom),
          pos = useMemo(() => floorVec.roadPos(props.floor || [0,0,0]), [props.floor]),
          rot = useMemo(() => floorVec.roadRot(props.floor || [0,0,0]), [props.floor]),
          geo = useRef(null as any),
          mat = {wireframe: !!(!m.mesh && d), visible: !!(m.mesh || d), color: (c as any)[m.mesh]}
    useEffect (() => {
        geo.current?.rotateZ(rot[0])
        geo.current?.rotateY(rot[1])
        geo.current = null
    }, [rot])
    return (
      <Mesh {...props} {...m} position={props.position || pos}>
        <cylinderGeometry args={[1, 1, 6, 6]} ref={geo}/>
        <meshLambertMaterial {...mat}/>
        <Style prepend center transform rotation-x={-PI/2}/>
      </Mesh>
    )
}

export function Settle (props: any) {
    const [m] = useMesh(`user${~~(random()*4)}`, atoms.dragRoadAtom, props.rock),
          [d] = useAtom(atoms.dragSettleAtom),
          [c] = useAtom(atoms.colorAtom),
          pos = useMemo(() => floorVec.settlePos(props.floor || [0,0,0]), [props.floor]),
          mat = {wireframe: !!(!m.mesh && d), visible: !!(m.mesh || d), color: (c as any)[m.mesh]}
    return (
      <Mesh {...props} {...m} position={props.position || pos}>
        <cylinderGeometry args={[2, 2, 3, 6]}/>
        <meshLambertMaterial {...mat}/>
        <Style prepend center transform rotation-x={-PI/2}/>
      </Mesh>
    )
}

export function Terrain (props: any) {
    const [m, setMesh] = useMesh(props.terrain, atoms.dragTerrainAtom, props.rock),
          [t, setToken] = useState(0),
          [h] = useAtom(atoms.honeycombAtom),
          [d] = useAtom(atoms.dragTerrainAtom),
          [c] = useAtom(atoms.colorAtom),
          pos = useMemo(() => floorVec.terrainPos(props.floor || [0,0,0]), [props.floor]),
          mat = {wireframe: !!(!m.mesh&&d), visible: !!(m.mesh||d), color: (c as any)[m.mesh]},
          Svg = (icons as any)[m.mesh]
    useEffect(() => {
        if (props.hidden || m.mesh) return
        setMesh(h.terrain(...(props.floor || [0,0,0])))
        setToken(h.token(...(props.floor || [0,0,0])))
    }, [h, m.mesh, setMesh, props.hidden, props.floor])
    return (
      <Mesh {...props} {...m} position={pos}>
        <cylinderGeometry args={[9, 10, 1, 6, 1, false]}/>
        <meshLambertMaterial {...mat}/>
        <Icon rotation-x={-PI/2} token={t}>
          {Svg && <Svg/>}<span>{`${t}`}<span/></span>
        </Icon>
        {props.children}
      </Mesh>
    )
}

export function User (props: any) {
    const [m] = useMesh(props.user, atoms.dragUserAtom, props.rock),
          [c] = useAtom(atoms.colorAtom),
          [r] = useState(props.road || ~~(random()* 5)),
          [s] = useState(props.start || ~~(random()* 5)),
          [k] = useState(props.knight || ~~(random()* 5))
    return (
      <Mesh {...props} {...m} scale={Array(3).fill(.75) as any}>
        <cylinderGeometry args={[9, 10, 1, 6, 1, false]}/>
        <meshLambertMaterial color={(c as any)[m.mesh]}/>
        <UserStyle rotation-x={-PI/2}>
          <span>
            <svg/>
            <span>
              <span>r{r}</span>
              <span>s{s}</span>
              <span>k{k}</span>
            </span>
          </span>
          <div>
            <svg/>
            <svg/>
            <svg/>
          </div>
        </UserStyle>
      </Mesh>
    )
}

export const UserStyle = styled<any>(Html).attrs(_ => ({
    center: true,
    transform: true,
    padding: 50,
    fontSize: 150,
    style: { pointerEvents: 'none', zindex: -1},
    filter: `drop-shadow(0px 25px 25px rgba(0, 0, 0, 0.1))`,
}))`
    display: flex;
    width: 500px;
    flex-flow: column;
    > span {
        display: flex;
        flex-grow: 1;
        border-bottom: 10px solid black;
        > svg {
            background: white;
            border-radius: 1000px;
            width: 300px;
            height: 300px;
            filter: ${_ => _.filter};
        }
        > span {
            background: white;
            margin-left: 100px;
            border-radius: 50px;
            flex-flow: column;
            flex-grow: 1;
            display: flex;
            filter: ${_ => _.filter};
            > span {
                height: 100px;
                margin: 10px;
                font-size: 100px;
            }
        }
    }
    > div {
        display: flex;
        flex-grow: 1;
        > svg {
            margin: 10px;
            background white;
            width: 90px;
            height: 160px;
            filter: ${_ => _.filter};
        }
    }
`

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
