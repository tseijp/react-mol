import React from 'react'

export function Robber (_props: any) {
    const ref= React.useRef<any>()
    return (
        <mesh ref={ref} position-y={5}>
            <coneGeometry args={[3, 10, 32]}/>
            <meshPhongMaterial />
        </mesh>
    )
}
