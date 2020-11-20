import React from 'react'
import {useFrame} from 'react-three-fiber'
import {Atom, Props, Render} from '../src'
import niceColors from 'nice-color-palettes'
const Point = (props: Partial<Props>): null | JSX.Element => {
    const ref = React.useRef<any>(null)
    const now = React.useRef<number>(0)
    useFrame((_, delta) => {
        const t = now.current
        const [x,,z] = ref.current.position.toArray()
        const y = Math.sin((x+t)/3) + Math.sin((z+t)/2)
        ref.current.position.y = y
        ref.current.scale.set(...Array(3).fill(y/3))
        now.current += delta * 10
    })
    return <Atom {...props} ref={ref} depth={1}/>
}
export const Points =()=> {
    const colors = React.useMemo(() => new Array(2500).fill(0).map(() =>
        niceColors[17][Math.floor(Math.random()*5)]
    ), [])
    return (
        <Render position={[-12.5,0,-25]} maxLength={2500}>
            <sphereBufferGeometry attach="geometry" args={[1,32,32]}/>
            <meshPhongMaterial    attach="material" />
            {Array(50).fill(0).map((_,z) =>
                Array(50).fill(0).map((_,x) =>
                    <Point key={x}
                        position={[x,0,z]}
                        color={colors[z*50+x]}/>
                )
            )}
        </Render>
    )
}
const Box =(props: Partial<Props>): null|JSX.Element => {
    const ref = React.useRef<any>(null)
    const now = React.useRef<number>(0)
    useFrame((_, delta) => {
        const [x, y, z] = ref.current.position.toArray()
        const t = now.current
        const r = Math.sin(x/4 + t) + Math.sin(y/4 + t) + Math.sin(z/4 + t)
        ref.current.scale.set(...Array(3).fill(r/4))
        ref.current.rotation.y = r * 2
        ref.current.rotation.z = r * 3
        now.current += delta
    })
    return <Atom {...props} ref={ref} depth={1} />
}
export const Boxes =()=> {
    const ref = React.useRef<any>(null)
    const now = React.useRef<number>(0)
    const colors = React.useMemo(() => new Array(1000).fill(0).map(() =>
        niceColors[17][~~(Math.random()*5)]
    ), [])
    useFrame((_, delta) => {
        ref.current.rotation.x = Math.sin(now.current / 4)
        ref.current.rotation.y = Math.sin(now.current / 2)
        now.current += delta
    })
    return (
        <Render ref={ref} maxLength={10**3}>
            <boxBufferGeometry attach="geometry" />
            <meshPhongMaterial attach="material" />
            {Array(10).fill(0).map((_,z) =>
                Array(10).fill(0).map((_,y) =>
                    Array(10).fill(0).map((_,x) =>
                        <Box key={z*100+y*10+x}
                            color={colors[z*100+y*10+x]}
                            position={[x-5,y-5,z-5]}
                            scale={[.5,.5,.5]} />
                    )
                )
            )}
        </Render>
    )
}
export const Colors =({count:c=16})=> {
    return (
        <Render maxLength={c**3}>
            <boxBufferGeometry attach="geometry" />
            <meshPhongMaterial attach="material" />
            {Array(c).fill(0).map((_,z) =>
                Array(c).fill(0).map((_,y) =>
                    Array(c).fill(0).map((_,x) =>
                        <Box key={z*100+y*10+x}
                            color={`rgb(${[x,y,z].map(v=>~~(255*v/c)).join()})`}
                            position={[x-5,y-5,z-5]}
                            scale={[.5,.5,.5]} />
                    )
                )
            )}
        </Render>
    )
}
