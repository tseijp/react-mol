import React from 'react'
import styled from 'styled-components'
import rem from 'polished/lib/helpers/rem'
import {Live} from './Live'
import {colors} from '../utils'
import {Canvas} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import {Split} from './Split'

export function Demo (props: any) {
    const {scope, ...other} = props
    return (
      <Live {...{React, Canvas: StyledCanvas, ...scope, ...other}}/>
    )
}

export const StyledCanvas = styled(BaseCanvas)`
    width: 100%;
    height: 100%;
    border-radius: ${rem(10)};
`
export function BaseCanvas (props) {
    const {children, ...other} = props
    return (
      <Canvas {...other}
        onCreated={({gl}: any) => gl.setClearColor(colors[~~(Math.random()*colors.length)])}
        camera={{fov: 75, position: [0, 0, 5]}}
        gl={{alpha: true, antialias: false, logarithmicDepthBuffer: true}}>
        <ambientLight intensity={.3} />
        <pointLight position={[ 100, 100, 100]} intensity={2.5} />
        <OrbitControls />
        <React.Suspense fallback={null}>
            {React.useMemo(() => children, [children])}
        </React.Suspense>
      </Canvas>
    )
}
