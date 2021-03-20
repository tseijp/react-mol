import React from 'react'
import {useFrame} from 'react-three-fiber'
import {Atom, Instanced} from '../../src'
import {useControl as _} from 'react-three-gui'
import * as THREE from 'three'

const {random} = Math

export function Add () {
  const range  = _('range', {type: "number", value:  5, min: 0, max: 10})
  const number = _('number', {type: "number", value: 10, min: 0, max: 100})
  return (
    <Instanced>
      <boxBufferGeometry attach="geometry"/>
      <meshPhongMaterial attach="material"/>
      {[...Array(number)].map((_, key) =>
        <Atom key={key}
            color={0xffffff*random()}
            position={[...Array(3)].map(() => range*(random()-.5)) as any}/>
      )}
    </Instanced>
  )
}

export function Basic () {
  // This reference will give us direct access to the last instance
  const ref = React.useRef<THREE.Group>(null)

  // Rotate instance every frame, this is outside of React without overhead
  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.x  =
    ref.current.rotation.y  =
    ref.current.rotation.z += 0.025
  })

  return (
    <Instanced>
      <boxBufferGeometry attach="geometry" />
      <meshPhongMaterial attach="material" />
      <Atom color="red" position={[1, -2, -5]} rotation={[0, 0, Math.PI/3]}>
        <Atom color="green" position={[2, 0, 1]} rotation={[0, 0, Math.PI/3]}>
          <Atom color="green" position={[2, 0, 1]} rotation={[0, 0, Math.PI/3]}>
            <Atom color="green" position={[2, 0, 1]} rotation={[0, 0, Math.PI/3]}>
              <Atom color="green" position={[2, 0, 1]} rotation={[0, 0, Math.PI/3]}>
                <Atom color="green" position={[2, 0, 1]} rotation={[0, 0, Math.PI/3]}>
                  <Atom color="blue" position={[2, 0, 0]} ref={ref}/>
                </Atom>
              </Atom>
            </Atom>
          </Atom>
        </Atom>
      </Atom>
    </Instanced>
  )
}
export default Basic
