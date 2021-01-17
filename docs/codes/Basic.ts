export const Basic = `
import React from 'react'
import ReactDOM from 'react-dom'
import { Atom } from 'react-mol'
import { Canvas, useFrame } from 'react-three-fiber'
function BasicExample () {
  const ref = React.useRef(null)
  useFrame(() => {
    ref.current.rotation.x  =
    ref.current.rotation.y  =
    ref.current.rotation.z += 0.025
  })
  return (
    <Atom  color="red"
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

ReactDOM.render(
  <Canvas>
    <pointLight   />
    <ambientLight />
    <BasicExample />
  </Canvas>,
  document.getElementById('root')
)
`
