import React from 'react'
import {Leva} from 'leva'
import Layout from '@theme/Layout'
import styled from 'styled-components'
import {Canvas} from '@react-three/fiber'
import {Card, Split, Trees} from '@tsei/core'
import {colors}  from './colors'

// const {isDarkTheme: dark } = useThemeContext();
const Home = styled(Layout)`
    overflow-x: hidden;
    min-height: 100%;
`

Home.Split = styled(Split).attrs({min: .1})``

Home.Note = styled.div`
    width: 100%;
    height: 100%;
    display: block;
    padding: 1rem;
`

Home.Card = (props: any) => <Card {...props} min={-1} rate={.1} style={{width: '100%', height: '100%'}}/>
// styled(props => <Card min={-1} rate={.1} {...props}/>)`
//     width: 100%;
//     height: 100%;
// `

Home.Leva = styled(props =>
    <Leva
      fill
      flat
      hideTitleBar
      titleBar={{drag:false}}
      {...props}/>
)`
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
`

Home.Trees = styled(Trees).attrs({size: 0.5})``

Home.Canvas = ({children}: any) => (
  <Canvas
    onCreated={({gl}: any) => gl.setClearColor(colors[~~(Math.random()*colors.length)])}
    camera={{fov: 75, position: [0, 0, 5]}}
    style={{width: '100%', height: 'calc(100vh - 2rem)'}}
    gl={{alpha: true, antialias: false, logarithmicDepthBuffer: true}}>
    <ambientLight intensity={.3} />
    <pointLight position={[ 100, 100, 100]} intensity={2.5} />
    <React.Suspense fallback={null}>
        {React.useMemo(() => children, [children])}
    </React.Suspense>
  </Canvas>
)

export {Home}
