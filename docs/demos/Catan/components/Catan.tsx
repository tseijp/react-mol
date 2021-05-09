// import {createElement as el} from 'react'
// import {Html} from '@react-three/drei'
// import {Flex, Box} from '@react-three/flex'
//
// import {icons} from '../utils'
// import {Terrain} from '../meshes'
import {Control} from './Control'

export function Catan ({
    children
}: any) {
    return (
      <group>
        {children}
        <Control/>
        {/*
        <Tools items={["hills", "forest", "mountains", "fields", "pasture", "desert"]}>
          {item =>
            <Terrain terrain={item} rockTerrain>
              <Html prepend center transform rotation-x={-Math.PI/2} style={{ pointerEvents: 'none'}}>
                {el((icons as any)[item] || undefined, {fill: "white", width: 500})}
              </Html>
            </Terrain>
          }
        </Tools>
        */}
      </group>
    )
}
