import React from 'react'
import {useFrame} from '@react-three/fiber'
import * as THREE from 'three'
import {useControls as _} from 'leva'
import {OrbitControls} from '@react-three/drei'
import {Atom, Instanced, Poly} from 'react-mol'

const {random} = Math

export function Add ({
    range = _({range: {value: 5, min: 0, max: 10}}).range,
    number = _({number: {value: 5, min: 0, max: 100}}).number
}) {
  return (
    <Instanced>
      <boxGeometry attach="geometry"/>
      <meshPhongMaterial attach="material"/>
      <OrbitControls {...({} as any)}/>
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
      <boxGeometry attach="geometry" />
      <meshPhongMaterial attach="material" />
      <OrbitControls/>
      <Atom color="red" position={[1, -2, -5]} rotation-z={Math.PI/3}>
        <Atom color="green" position={[2, 0, 1]} rotation-z={Math.PI/3}>
          <Atom color="green" position={[2, 0, 1]} rotation-z={Math.PI/3}>
            <Atom color="green" position={[2, 0, 1]} rotation-z={Math.PI/3}>
              <Atom color="green" position={[2, 0, 1]} rotation-z={Math.PI/3}>
                <Atom color="green" position={[2, 0, 1]} rotation-z={Math.PI/3}>
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

export function Utils () {
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
      <boxGeometry attach="geometry" />
      <meshPhongMaterial attach="material" />
      <OrbitControls/>
      <Atom color="red" position={[1, -2, -5]} rotation-z={Math.PI/3}>
      <Poly n={5}>
        {next =>
          <Atom color="green" position={[2, 0, 1]} rotation-z={Math.PI/3}>
            {next ||
              <Atom color="blue" position={[2, 0, 0]} ref={ref}/>}
          </Atom>
        }
      </Poly>
      </Atom>
    </Instanced>
  )
}
export default Basic
