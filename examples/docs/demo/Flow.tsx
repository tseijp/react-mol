import React, {useRef, useMemo} from 'react'
import {Instanced, Flow, Vec3} from 'react-mol'
import niceColors from 'nice-color-palettes'
import {useFrame} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'

const {sin,cos,max} = Math
const rand=(m=1,a=0)=>m*Math.random()+a

export const Points =({count:c=50})=> {
    const colors = useMemo(() => new Array(c**2).fill(0).map(() =>
        niceColors[17][Math.floor(Math.random()*5)]
    ), [c])
    return (
        <Instanced position={[-c/4,-1,-c/4]} count={2500}>
            <OrbitControls {...({} as any)}/>
            <sphereGeometry attach="geometry" args={[1,32,32]}/>
            <meshPhongMaterial    attach="material" />
            {Array(c**2).fill(0).map((_,i) =>
                <Flow key={i} color={colors[i]}
                    args={(t,x,_,z) => [sin((x+t)/3)+sin((z+t)/2)]}
                    position={r => [i%c,r,i/c%c]}
                    scale={r => [r/3,r/3,r/3]} />
            )}
        </Instanced>
    )
}
export const Boxes =()=> {
    const ref = useRef<THREE.Group>(null)
    const now = useRef<number>(0)
    const colors = useMemo(() => new Array(1000).fill(0).map(() =>
        niceColors[17][~~(Math.random()*5)]
    ), [])
    useFrame((_, delta) => {
        if (!ref.current) return
        ref.current.rotation.x = Math.sin(now.current / 4)
        ref.current.rotation.y = Math.sin(now.current / 2)
        now.current += delta
    })
    return (
        <Instanced ref={ref} count={10**3}>
            <OrbitControls {...({} as any)}/>
            <boxGeometry attach="geometry" />
            <meshPhongMaterial attach="material" />
            {Array(1000).fill(0).map((_,i) =>
                <Flow key={i} color={colors[i]}
                    args={(t,x,y,z) => [
                        sin(x/4+t)
                       +sin(y/4+t)
                       +sin(z/4+t)
                    ]}
                    position={[i%10-5, i/10%10-5, i/100-5]}
                    rotation={r => [0,r*2,r*3]}
                    scale={r => [r/4,r/4,r/4]}/>
            )}
        </Instanced>
    )
}
export const Spheres =() => {
    const c = 1000//useControl("count", {type: "number", value: 1000, min: 0, max: 2500})
    const r = 20//useControl("range", {type: "number", value: 20, min: 10, max: 30})
    const colors = useMemo(() => [...Array(c)].map(() =>
        niceColors[17][~~rand(5)]
    ), [c])
    return (
        <Instanced count={c}>
            <OrbitControls {...({} as any)}/>
            <sphereGeometry attach="geometry" args={[1, 32, 32]} />
            <meshPhongMaterial    attach="material" color={0xffffff} />
            {Array(c).fill(0).map((_, i) =>
                <Flow key={i} color={colors[i]}
                    args={[...Array(4)].map(_ => rand())}
                    position={(t,s,x,y,z) => [
                        x*2*r - r + cos(t*s*6) + sin(t*s*2),
                        y*2*r - r + sin(t*s*4) + cos(t*s*4),
                        z*2*r - r + cos(t*s*2) + sin(t*s*6),
                    ]}
                    scale={(t,s) => Array(3).fill(max(.5, 2*cos(t+s*50))) as Vec3}
                    />
            )}
        </Instanced>
    )
}
export const Particles =({count=1000}) => {
    const colors = useMemo(() => [...Array(count)].map(() =>
        niceColors[17][~~rand(5)]
    ), [count])
    return (
        <Instanced count={count}>
            <OrbitControls {...({} as any)}/>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshPhongMaterial />
            {Array(count).fill(0).map((_, i) =>
                <Flow key={i} color={colors[i]}
                    args={[...Array(5)].map(() => rand(100,-50))}
                    position={(t,s,f,x,y,z) => [
                        x + cos(t*s*f/50) + sin(t*s/50)*f/10,
                        y + sin(t*s*f/50) + cos(t*s/50)*f/10,
                        z + cos(t*s*f/50) + sin(t*s/50)*f/10,]}
                    scale={t => Array(3).fill(Math.cos(t)) as Vec3}/>
            )}
        </Instanced>
    )
}
export const Dodecas =({count=2500,size=5}) => {
    const colors = useMemo(() => [...Array(count)].map(() =>
        niceColors[17][~~rand(5)]
    ), [count])
    return (
        <Instanced count={count}>
            <OrbitControls {...({} as any)}/>
            <dodecahedronGeometry args={[1,0]}/>
            <meshStandardMaterial />
            {Array(count).fill(0).map((_,i) =>
                <Flow key={i}
                    args={[...Array(4)].map(_ => rand())}
                    position={(t,s,x,y,z) => [
                        ((x-.5) - cos(t*s+x) - sin(t*s/1))*(x*100+50),
                        ((y-.5) - sin(t*s+y) - cos(t*s/3))*(y*100+50),
                        ((z-.5) - cos(t*s+z) - sin(t*s/5))*(z*100+50),
                    ]}
                    rotation={(t,s)=>Array(3).fill(cos(t*s)*size) as Vec3}
                    scale={(t,s)=>Array(3).fill(cos(t*s/2)*size) as Vec3}
                    color={colors[i]}/>
            )}
        </Instanced>
    )
}
export default Dodecas
// ************************* CODES ************************* //
