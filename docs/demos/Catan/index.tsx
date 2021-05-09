import React from 'react'
import {Text} from '@react-three/drei'

import {Instanced, Atom, Honey} from '../../../src'
import {Catan} from './components/Catan'
import {Hex} from './components/Hex'
import {Control} from './components/Control'
import {floorVec} from './utils'

export function OneField () {
    return (
      <Catan>
        <Hex/>
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

export function Honeycomb () {
    const [x, z] = React.useMemo(() => floorVec(10 * Math.sqrt(3)), [])
    return (
      <Instanced>
        <cylinderGeometry attach="geometry" args={[9    , 10, 1, 6, 1, false]}/>
        <meshPhysicalMaterial attach="material" color="red" roughness={0.2} metalness={1.0}/>
        <Control enableRotate/>
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
