import React from 'react'
import {Render, Sph, Box} from '../src'
import niceColors from 'nice-color-palettes'
import {useFrame} from 'react-three-fiber'

export const Points =()=> {
    const colors = React.useMemo(() => new Array(2500).fill(0).map(() =>
        niceColors[17][Math.floor(Math.random()*5)]
    ), [])
    return (
        <Render position={[-12.5,0,-25]} max={2500}>
            <sphereBufferGeometry attach="geometry" args={[1,32,32]}/>
            <meshPhongMaterial    attach="material" />
            {Array(2500).fill(0).map((_,i) =>
                <Sph key={i}
                    scale={r=>[r/3,r/3,r/3]}
                    position={r=>[i%50,r,i/50%50]}
                    color={colors[i]}/>
            )}
        </Render>
    )
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
        <Render ref={ref} max={10**3}>
            <boxBufferGeometry attach="geometry" />
            <meshPhongMaterial attach="material" />
            {Array(1000).fill(0).map((_,i) =>
                <Box key={i}
                    scale={r=>[r/4,r/4,r/4]}
                    rotation={r=>[0,r*2,r*3]}
                    position={[i%10-5,i/10%10-5,i/100-5]}
                    color={colors[i]}/>
            )}
        </Render>
    )
}
// const Swarm =({speed=0, factor=100, size=50, factors=[0,0,0], mx=0, my=0, ...props}: any)=> {
//     const ref = React.useRef<any>(null)
//     const now = React.useRef<number>(0)
//     useFrame(() => {
//         // now.current += speed / 2
//         const t = now.current
//         const a = Math.cos(t) + Math.sin(t * 1) / 10
//         const b = Math.sin(t) + Math.cos(t * 2) / 10
//         const s = Math.max(1.5, Math.cos(t) * size / 10)
//         // ref.current.scale.set(s, s, s)
//         // ref.current.position.set(
//         //     (mx/10)*a + factors.x + Math.cos((t/10)*factor) + Math.sin(t*1)*factor/10,
//         //     (my/10)*b + factors.y + Math.sin((t/10)*factor) + Math.cos(t*2)*factor/10,
//         //     (my/10)*b + factors.z + Math.cos((t/10)*factor) + Math.sin(t*3)*factor/10,
//         // )
//     })
//     return <Atom {...props} ref={ref} depth={1} />
// }
// export const Swarms =({rand=(m=1,a=0)=>m*Math.random()+a})=> {
//     return (
//         <Render max={1000} position={[0,0,-10]}>
//             <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
//             <meshPhongMaterial    attach="material" color={0xffffff} />
//             {Array(2).fill(0).map((_, i) =>
//                 <Swarm key={i}
//                     speed ={rand(1/200,1/100)}
//                     factor={rand(100, 2)}
//                     factors={Array(3).fill(0).map(()=>rand(40,-20))}/>
//             )}
//         </Render>
//     )
// }
