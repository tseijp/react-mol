import React from 'react'
import {useFrame} from 'react-three-fiber'
import {Atom, Render, useRender} from '../../src'
import {useControl as _} from 'react-three-gui'
import * as THREE from 'three'

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
    <Render>
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
    </Render>
  )
}

const cylinderArgs = [
    new THREE.CylinderBufferGeometry(.1,.1,1,10),
    new THREE.MeshPhongMaterial(),
    1000
]
const sphereArgs = [
    new THREE.SphereBufferGeometry(.3, 32, 32),
    new THREE.MeshPhongMaterial(),
    1000
]
export function Multi () {
  const [args1, ...cylinder] = useRender(() => ({args: cylinderArgs}))
  const [args2, ...sphere] = useRender(() => ({args: sphereArgs}))

  return (
    <Render argsArray={[args1, args2]}>
      <Atom update={cylinder} position-x={1}>
        <Atom update={cylinder} position-x={1}>
          <Atom update={cylinder} position-x={1}>
            <Atom update={sphere} position-x={-1}/>
          </Atom>
        </Atom>
      </Atom>
    </Render>
  )
}

export default Basic
