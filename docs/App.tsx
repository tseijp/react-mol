import React, {Suspense} from 'react'
import {Canvas} from 'react-three-fiber'
import {OrbitControls} from 'drei'
import {Helmet} from 'react-helmet-async';
import * as MOLS from './mols'

export const App:React.FC = ({children}) => {
    return (
        <>
            <Canvas
                style={{position:"absolute", width:'100%', height: '100%', top:0, left:0, zIndex:-1}}
                gl={{ alpha: true, antialias: false, logarithmicDepthBuffer: true }}
                camera={{ fov: 75, position: [0, 0, 5] }}>
                <ambientLight intensity={1} />
                <pointLight position={[100, 100, 100]} intensity={2.2} />
                <pointLight position={[-100, -100, -100]} intensity={5} color="red" />
                <OrbitControls />
                <mesh position={[0, 0, -10]}>
                    <circleBufferGeometry attach="geometry" args={[8, 64]} />
                    <meshBasicMaterial attach="material" color="lightpink" />
                </mesh>
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            </Canvas>
            <div style={{position:"absolute", userSelect:"none",fontSize:"1.5rem", display:"inline-block"}}>
                {Object.keys(MOLS).map(key =>
                    <div key={key} onClick={()=>void (window.location.href = "/rmol/"+key)}>{key}</div>
                )}
                <a href="https://twitter.com/intent/tweet?url=https://tsei.jp/rmol/&text=🍡A molecular chemistry based simulation library" >
                    <img alt="tweet" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Ftseijp"/></a>
                <a href="https://github.com/tseijp/react-mol">
                    <img alt="GitHub watchers" src="https://img.shields.io/github/watchers/tseijp/react-mol?style=social"/></a>
                <br/>
                <a href="https://github.com/tseijp/react-mol">
                    <img alt="license MIT" src="https://img.shields.io/badge/license-MIT-green.svg"/></a>
                <a href="https://www.npmjs.com/package/react-mol">
                    <img src="https://badge.fury.io/js/react-mol.svg" alt="npm version" height="18"/></a>
            </div>
            <Helmet>
                <title>{window.location.pathname.split('/').slice(-1)[0]}</title>
                <meta charSet="utf-8" />
                <meta name="Hatena::Bookmark" content="nocomment" />
                <link rel="canonical" href="https://tsei.jp/" />
            </Helmet>
        </>
    )
}
