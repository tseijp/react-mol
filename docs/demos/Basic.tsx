import React from 'react'
import {useFrame} from 'react-three-fiber'
import {Atom} from '../../src'
export function Basic () {
  const ref = React.useRef<any>(null)
  useFrame(() => {
    ref.current.rotation.x  =
    ref.current.rotation.y  =
    ref.current.rotation.z += 0.025
  })
  return (
    <Atom top color="red"
        position={[1, -2, -5]}
        rotation={[0,  0,  Math.PI/3]}>
      <boxBufferGeometry attach="geometry" />
      <meshPhongMaterial attach="material" />
      <Atom  color="green"
          position={[2, 0, 1]}
          rotation={[0, 0, Math.PI/3]}>
        <Atom>
          <Atom>
            <Atom>
              <Atom>
                <Atom ref={ref}
                  color="blue"
                  position={[2,0,0]}/>
              </Atom>
            </Atom>
          </Atom>
        </Atom>
      </Atom>
    </Atom>
  )
}
export default Basic
