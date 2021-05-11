import React from 'react'
import {Text, OrbitControls} from '@react-three/drei'

import {Hex} from './components/Hex'
import {Item} from './components/Item'
import {Catan} from './components/Catan'
import {Instanced, Atom, Honey} from '../../../src'

const {cos, sin, sqrt, PI} = Math
const _2 = sqrt(2)
const _3 = sqrt(3)

export function OneField () {
    return (
      <Catan>
        <Hex/>
        <Honey>
          {(floor, key) =>
            <Item {...{floor, key}}/>
          }
        </Honey>
      </Catan>
    )
}

export function SevenField () {
    return (
      <Catan>
        <Honey>
          {(floor, key) =>
            <Hex {...{floor, key}}/>
          }
        </Honey>
      </Catan>
    )
}

export function NineteenField () {
    return (
      <Catan>
        <Honey>
          {(floor, key) =>
            <Honey floor={floor} key={key}>
              {(floor, key) =>
                <Hex floor={floor} key={key}/>
              }
            </Honey>
          }
        </Honey>
      </Catan>
    )
}

export function Truncated () {
    const [r, R] = React.useMemo(() => [1/ sqrt(5), 2 / sqrt(5)], [])
    const [x, y, z] = React.useMemo(() => [
        {i: R, j:-R, k:-R, l: R},
        {i: R, j:-R, k: R, l:-R},
        {i: R, j: R, k:-R, l:-R},
    ], [])
    const args = React.useMemo(() => [
        [R, r, 0,   R,-r, 0,   R, 0, r,   R, 0,-r,
        -R, r, 0,  -R,-r, 0,  -R, 0, r,  -R, 0,-r,
         r, R, 0,  -r, R, 0,   0, R, r,   0, R,-r,
         r,-R, 0,  -r,-R, 0,   0,-R, r,   0,-R,-r,
         r, 0, R,  -r, 0, R,   0, r, R,   0,-r, R,
         r, 0,-R,  -r, 0,-R,   0, r,-R,   0,-r,-R,],
        [0, 2, 1,   0, 1, 3,   4, 5, 6,   4, 7, 5, // ⏹: 0, 1, 2, 3, 4, 5, 6, 7,
         8, 9,10,   8,11, 9,  12,14,13,  12,13,15, // ⏹: 8, 9,10,11,12,13,14,15,
        16,17,19,  16,18,17,  20,21,22,  20,23,21, // ⏹:16,17,18,19,20,21,22,23,
         0, 8, 2,   2, 8,16,   8,10,16,  10,18,16, // 🔯: 0, 2, 8,10,16,18,
         1, 2,16,   1,16,12,  12,16,19,  12,19,14, // 🔯: 1, 2,12,14,16,19,
         1,12, 3,   3,12,20,  12,15,20,  15,23,20, // 🔯: 1, 3,12,15,20,23,
         0, 3,20,   0,20, 8,   8,20,22,   8,22,11, // 🔯: 0, 3, 8,11,20,22,
         4, 6,17,   4,17, 9,   9,17,18,   9,18,10, // 🔯: 4, 6, 9,10,17,18,
         5,13, 6,   6,13,17,  13,14,17,  14,19,17, // 🔯: 5, 6,13,14,17,19,
         4, 9, 7,   7, 9,21,   9,11,21,  11,22,21, // 🔯: 4, 7, 9,11,21,22,
         5, 7,21,   5,21,13,  13,21,23,  13,23,15, // 🔯: 5, 7,13,15,21,23,
         ]
    ], [r, R])
    return (
        <Instanced scale={[.5, .5, .5]}>
          <meshPhysicalMaterial attach="material" color="red" roughness={0.2} metalness={1.0}/>
          <polyhedronGeometry args={args as any}/>
          <OrbitControls />
          <Honey floor={[0,0,0,0]}>
            {(floor, key) =>
              <Honey {...{floor, key}}>
                {(floor, key) =>
                  <Honey {...{floor, key}}>
                    {(floor, key) =>
                      <Honey {...{floor, key}}>
                        {(floor, key) =>
                          <Honey {...{floor, key}}>
                            {([i, j, k, l], key) =>
                              <Atom key={key} position={[
                                x.i*i+x.j*j+x.k*k+x.l*l,
                                y.i*i+y.j*j+y.k*k+y.l*l,
                                z.i*i+z.j*j+z.k*k+z.l*l]}/>
                            }
                          </Honey>
                        }
                      </Honey>
                    }
                  </Honey>
                }
              </Honey>
            }
          </Honey>
        </Instanced>
    )
}

export function Rhombic ({radius: r=1}) {
    const [x, y, z] = React.useMemo(() => [
        {i: r/_2, j:-r/_2, k: r/_2, l:-r/_2},
        {i: r/_2, j:-r/_2, k:-r/_2, l: r/_2},
        {i: r/_2, j: r/_2, k:-r/_2, l:-r/_2},
    ], [r])
    const args = React.useMemo(() => [
        [2, 0, 0,  -2, 0, 0,   0, 2, 0,   0,-2, 0,   0, 0, 2,   0, 0,-2,
         1, 1, 1,   1, 1,-1,   1,-1, 1,   1,-1,-1,
        -1, 1, 1,  -1, 1,-1,  -1,-1, 1,  -1,-1,-1],
        [0, 6, 8,   1,10,11,   2, 6, 7,   3, 8,12,   4, 6,10,   5, 7, 9,
         0, 7, 6,   1,11,13,   2, 7,11,   3, 9, 8,   4, 8, 6,   5, 9,13,
         0, 8, 9,   1,12,10,   2,10, 6,   3,12,13,   4,10,12,   5,11, 7,
         0, 9, 7,   1,13,12,   2,11,10,   3,13, 9,   4,12, 8,   5,13,11], 1, 0
    ], [])
    return (
        <Instanced scale={[.5, .5, .5]}>
          <meshPhysicalMaterial attach="material" color="red" roughness={0.2} metalness={1.0}/>
          <polyhedronGeometry args={args as any}/>
          <OrbitControls />
          <Honey floor={[0,0,0,0]}>
            {(floor, key) =>
              <Honey {...{floor, key}}>
                {(floor, key) =>
                  <Honey {...{floor, key}}>
                    {(floor, key) =>
                      <Honey {...{floor, key}}>
                        {(floor, key) =>
                          <Honey {...{floor, key}}>
                            {([i, j, k, l], key) =>
                              <Atom key={key} position={[
                                x.i*i+x.j*j+x.k*k+x.l*l,
                                y.i*i+y.j*j+y.k*k+y.l*l,
                                z.i*i+z.j*j+z.k*k+z.l*l]}/>
                            }
                          </Honey>
                        }
                      </Honey>
                    }
                  </Honey>
                }
              </Honey>
            }
          </Honey>
        </Instanced>
    )
}

export function Honeycomb ({radius: r=10*_3, angle: a=0}) {
    const [x, z] = React.useMemo(() => [
        {i: r*cos(a), j: r*cos(a-PI*2/3), k: r*cos(a+PI*2/3)},
        {i: r*sin(a), j: r*sin(a-PI*2/3), k: r*sin(a+PI*2/3)}
    ], [r, a])
    return (
      <Instanced>
        <cylinderGeometry attach="geometry" args={[9, 10, 1, 6, 1, false]}/>
        <meshPhysicalMaterial attach="material" color="red" roughness={0.2} metalness={1.0}/>
        <OrbitControls />
        <Honey>
          {(floor, key) =>
            <Honey {...{floor, key}}>
              {(floor, key) =>
                <Honey {...{floor, key}}>
                  {(floor, key) =>
                    <Honey {...{floor, key}}>
                      {(floor, key) =>
                          <Honey {...{floor, key}}>
                            {(floor, key) =>
                              <Honey {...{floor, key}}>
                                {(floor, key) =>
                                  <Honey {...{floor, key}}>
                                    {(floor, key) =>
                                      <Honey {...{floor, key}}>
                                        {(floor, key) =>
                                            <Honey {...{floor, key}}>
                                              {(floor, key) =>
                                                <Honey {...{floor, key}}>
                                                  {([i, j, k], key) =>
                                                    <Atom key={key}
                                                      position-x={x.i*i+x.j*j+x.k*k}
                                                      position-z={z.i*i+z.j*j+z.k*k}>
                                                      <Text fontSize={2}
                                                        position-y={1}
                                                        rotation-x={-Math.PI/2}>
                                                        {`${floor}`}
                                                      </Text>
                                                    </Atom>
                                                  }
                                                </Honey>
                                              }
                                            </Honey>
                                        }
                                      </Honey>
                                    }
                                  </Honey>
                                }
                              </Honey>
                            }
                          </Honey>
                      }
                    </Honey>
                  }
                </Honey>
              }
            </Honey>
          }
        </Honey>
      </Instanced>
    )
}
