import React from 'react'
import {Catan} from './components/Catan'
import {Group} from './components/Group'
import {Control} from './components/Control'
import {Instanced, Atom, Honey} from '../../../src'
import {floorVec} from './utils'
import {Text} from '@react-three/drei'

export function OneField () {
    return (
      <Catan>
        <Group terrain='desert'/>
      </Catan>
    )
}

export function TwoField () {
    return (
      <Catan>
        <Group terrain='forest' floor={[0,0,0]}/>
        <Group terrain='desert' floor={[1,0,0]}/>
      </Catan>
    )
}

export function SevenField () {
    return (
      <Catan>
        <Honey>
          {(floor, key) =>
            <Group {...{floor, key}}/>
          }
        </Honey>
      </Catan>
    )
}

export function NineteenField () {
    return (
      <Catan>
        <Honey>
          {(f, k) =>
            <Honey floor={f} key={k}>
              {(floor, key) =>
                <Group floor={floor} key={key} terrain='forest'/>
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
