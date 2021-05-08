import React, {createElement as el} from 'react'
import {Html} from '@react-three/drei'
import {useAtom} from 'jotai'
import {useControls as _} from 'leva'

import {Terrain} from './Terrain'
import {Token} from './Token'
import {Items} from './Items'
import {Control} from './Control'
import {hoverCursor, icons} from '../utils'
import {hoverAtom, honeycombAtom, colorAtom} from '../atom'
export function Catan ({
    children,
    colors=_({
        hills: '#f00', //brick
        forest: '#0f0', // lumber
        mountains: '#00f', // ore
        fields: '#0ff', // grain
        pasture: '#f0f', // wool
        desert: '#ff0' //nothing
    }),
}: any) {
    const [hover] = useAtom(hoverAtom)
    const [color, setColor] = useAtom(colorAtom)

    const [honeycomb] = useAtom(honeycombAtom)
    React.useEffect(() => void console.log(honeycomb), [honeycomb])

    React.useEffect(() => void setColor(colors), [setColor, colors])
    React.useEffect(() => {
        document.body.style.cursor = hoverCursor(hover?.terrain, color)
    }, [hover, color])

    return (
      <group>
        {children}
        <Control/>
        <Items items={["hills", "forest", "mountains", "fields", "pasture", "desert"]}>
          {item =>
            <Terrain terrain={item} rockTerrain>
              <Html prepend center style={{ pointerEvents: 'none'}}>
                {el((icons as any)[item] || undefined, {fill: "white", width: 30})}
              </Html>
            </Terrain>
          }
        </Items>
        <Items items={[...Array(11)].flatMap((_, i) => i + 2 === 7? []: i + 2)} reverse>
          {item =>
            <Token token={item} rockToken>
              <Html prepend center style={{ pointerEvents: 'none'}}>
              </Html>
            </Token>
          }
        </Items>
      </group>
    )
}
