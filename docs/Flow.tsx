import React from 'react'
import {useFrame} from 'react-three-fiber'
import {Atom, Props, Render} from '../src'

function Point (props: Partial<Props>): null | JSX.Element
function Point (props: any) {
    const ref = React.useRef<any>(null)
    const now = React.useRef<number>(0)
    useFrame((_, delta) => {
        const t = now.current
        const x = ref.current.position.x
        const z = ref.current.position.z
        const y = Math.sin((x+t)/3) + Math.sin((z+t)/2)
        ref.current.position.y = y
        ref.current.scale.set(...Array(3).fill(y/3))
        now.current += delta * 10
    })
    return <Atom {...props} ref={ref} depth={1} calc={p=>p} color="black"/>
}
export const Stage =()=> (
    <Render position={[-12.5,0,-25]} cutLength={2} maxLength={2500}>
        <sphereBufferGeometry attach="geometry" args={[1,32,32]}/>
        <meshPhongMaterial    attach="material" />
        {Array(50).fill(0).map((_,z) =>
            <group key={z}>
            {Array(50).fill(0).map((_,x) =>
                <Point key={x} position={[x,0,z]} scale={[.1,.1,.1]} />
            )}
            </group>
        )}
    </Render>
)
