import React from 'react'
import {useThree, useFrame} from '@react-three/fiber'

export function Tools (props: {
    children: (item: any, key: any) => JSX.Element,
    items: any[],
    reverse?: boolean,
}): JSX.Element

export function Tools (props: any) {
    const {children, items=[], ...other} = props
    const ref =React.useRef<any>()
    const {width: w, height: h} = useThree(three => three.viewport)
    useFrame(({camera}) => {
        if (!ref.current) return
        const {x, y, z} = camera.position
        ref.current.position.set(x, y - 200, z + 10 * h)
    })
    return (
      <group ref={ref} {...other}>
        {items.map((item: any, key: any) =>
          <group key={key}
            position-x={10 * Math.sqrt(3) * w * (key - items.length/2) / items.length}>
            {children(item, key)}
          </group>
        )}
      </group>
    )
}
