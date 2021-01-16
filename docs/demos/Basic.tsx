import React from 'react'
import {useFrame} from 'react-three-fiber'
import {Atom, Render} from '../../src'
import {useControl as _} from 'react-three-gui'
const {random} = Math

export function Add () {
  const range  = _('range', {type: "number", value:  5, min: 0, max: 10})
  const number = _('number', {type: "number", value: 10, min: 0, max: 100})
  return (
    <Render>
      <boxBufferGeometry attach="geometry"/>
      <meshPhongMaterial attach="material"/>
      {[...Array(number)].map((_, key) =>
        <Atom key={key}
            color={0xffffff*random()}
            position={[...Array(3)].map(() => range*(random()-.5))}/>
      )}
    </Render>
  )
}
export function Hierarchy () {
    return (
        <Render>
            <boxBufferGeometry attach="geometry"/>
            <meshPhongMaterial attach="material"/>
        </Render>
    )
}
export function Basic () {
  const ref = React.useRef<any>(null)
  const top = React.useMemo(() => [1,-2,-10], [])
  const pos = React.useMemo(() => [2, 0, 1], [])
  const rot = React.useMemo(() => [0, 0, Math.PI/3], [])
  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.x  =
    ref.current.rotation.y  =
    ref.current.rotation.z += 0.025
  })
  return (
    <Render>
      <boxBufferGeometry attach="geometry"/>
      <meshPhongMaterial attach="material"/>
      <Atom color="red" position={top} rotation={rot}>
        <Atom color="green" position={pos} rotation={rot}>
          <Atom color="green" position={pos} rotation={rot}>
            <Atom color="green" position={pos} rotation={rot}>
              <Atom color="green" position={pos} rotation={rot}>
                <Atom color="green" position={pos} rotation={rot}>
                  <Atom color="green" position={pos} rotation={rot}>
                    <Atom color="green" position={pos} rotation={rot}>
                      <Atom color="green" position={pos} rotation={rot}>
                        <Atom color="green" position={pos} rotation={rot}>
                          <Atom color="green" position={pos} rotation={rot}>
                            <Atom color="green" position={pos} rotation={rot}>
                              <Atom color="blue" position={[2,0,0]} ref={ref}/>
                            </Atom>
                          </Atom>
                        </Atom>
                      </Atom>
                    </Atom>
                  </Atom>
                </Atom>
              </Atom>
            </Atom>
          </Atom>
        </Atom>
      </Atom>
    </Render>
  )
}
export default Basic
