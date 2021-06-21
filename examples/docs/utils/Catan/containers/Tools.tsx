import React from 'react'
import {useThree} from '@react-three/fiber'
import {Vector3} from 'three'
export function Tools (props: Partial<{
    items: any[],
    children: null | JSX.Element | ((item: any, key: any) => null | JSX.Element),
    top: boolean,
    left: boolean
    right: boolean,
    bottom: boolean,
    reverse: boolean,
}>): JSX.Element


export function Tools (props: any) {
    const {children, items=[], space=18/233, top, bottom, left, right, ...other} = props
    const vec = React.useMemo(() => new Vector3(0, 0, 0), [])
    const {width, height} = useThree(_ => _.viewport.getCurrentViewport(_.camera, vec))
    return (
      <group {...other}
        position-x={width * (1/2 - space) * (left? -1: right? 1: -1)}
        position-z={height * (1/2 - space) * (top? -1: bottom? 1: -1)}>
        {items.map((...args: any) =>
          <group key={args[1]} position-x={-width * space * 2 * (left? -1: right? 1: -1) * args[1]}>
            {typeof children!=='function'? children: children(...args)}
          </group>
        )}
      </group>
    )
}
