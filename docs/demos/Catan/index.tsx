import React from 'react'
import {Text, OrbitControls} from '@react-three/drei'

import {Hex} from './components/Hex'
import {Item} from './components/Item'
import {Catan} from './components/Catan'
import {Instanced, Atom, Honey} from '../../../src'
import {PolyhedronGeometry} from 'three'

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

export function Rhombic ({radius: r=1}) {
    const [x, y, z] = React.useMemo(() => [
        {i: r/_2, j:-r/_2, k: r/_2, l:-r/_2},
        {i: r/_2, j:-r/_2, k:-r/_2, l: r/_2},
        {i: r/_2, j: r/_2, k:-r/_2, l:-r/_2},
    ], [r])
    const geometry = React.useMemo(() => {
        const vertices = [
             2, 0, 0,
            -2, 0, 0,
             0, 2, 0,
             0,-2, 0,
             0, 0, 2,
             0, 0,-2,
             1, 1, 1,
             1, 1,-1,
             1,-1, 1,
             1,-1,-1,
            -1, 1, 1,
            -1, 1,-1,
            -1,-1, 1,
            -1,-1,-1,
        ]
        const indices = [
            0, 6, 8,   1,10,11,   2, 6, 7,   3, 8,12,   4, 6,10,   5, 7, 9,
            0, 7, 6,   1,11,13,   2, 7,11,   3, 9, 8,   4, 8, 6,   5, 9,13,
            0, 8, 9,   1,12,10,   2,10, 6,   3,12,13,   4,10,12,   5,11, 7,
            0, 9, 7,   1,13,12,   2,11,10,   3,13, 9,   4,12, 8,   5,13,11,
        ]
        return new PolyhedronGeometry(vertices, indices, 1, 0)
    }, [])
    return (
        <Instanced geometry={geometry} scale={[.5, .5, .5]}>
          <meshPhysicalMaterial attach="material" color="red" roughness={0.2} metalness={1.0}/>
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
                              <Atom key={key}
                                position-x={x.i*i+x.j*j+x.k*k+x.l*l}
                                position-y={y.i*i+y.j*j+y.k*k+y.l*l}
                                position-z={z.i*i+z.j*j+z.k*k+z.l*l}/>
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
