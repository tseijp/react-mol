import React from 'react'
import {Canvas} from 'react-three-fiber'
import {OrbitControls} from 'drei'
import {Helmet} from 'react-helmet-async';
import * as MOLSH from './MolsHierarchy'
import * as MOLSR from './MolsRecursion'
import * as HELS from './Hels'
const Link =({path="",name=""})=>
    <div onClick={() => void (window.location.href = "/rmol/"+path+name)}>{name}</div>
const TWEET = "🍡A molecular chemistry based simulation library"
const INDEX: any = {
    _: Object.keys(MOLSH).map(key => <Link key={key} name={key} />),
    m: Object.keys(MOLSR).map(key => <Link key={key} name={key} path="m/" />),
    h: Object.keys(HELS ).map(key => <Link key={key} name={key} path="h/" />),
}
const BTNS = [
   {alt:"tweet",
    src:"img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Ftseijp",
    ref:`twitter.com/intent/tweet?url=https://tsei.jp/rmol/&text=${TWEET}`},
   {alt: "GitHub watchers", br:true,
    src: "img.shields.io/github/watchers/tseijp/react-mol?style=social",
    ref: "github.com/tseijp/react-mol"},
   {alt: "license MIT",
    src: "img.shields.io/badge/license-MIT-green.svg",
    ref: "github.com/tseijp/react-mol"},
   {alt: "npm version",
    src: "badge.fury.io/js/react-mol.svg",
    ref: "www.npmjs.com/package/react-mol"}
]
export const App:React.FC = ({children}) => {
    const paths = window.location.pathname.split('/').filter(v=>v)
    return (
        <>
            <Canvas
                style={{position:"absolute", width:'100%', height: '100%', top:0, left:0, zIndex:-1}}
                gl={{ alpha: true, antialias: false, logarithmicDepthBuffer: true }}
                camera={{ fov: 75, position: [0, 0, 5] }}>
                <ambientLight intensity={1} />
                <pointLight position={[ 100, 100, 100]} intensity={2.2} />
                <pointLight position={[-100,-100,-100]} intensity={5} color="red" />
                <OrbitControls />
                <mesh position={[0, 0, -10]}>
                    <circleBufferGeometry attach="geometry" args={[8, 64]} />
                    <meshBasicMaterial attach="material" color="lightpink" />
                </mesh>
                {children}
            </Canvas>
            <div style={{position:"absolute", userSelect:"none",fontSize:"1.5rem", display:"inline-block"}}>
                {INDEX[paths[1]] || INDEX._}
                {BTNS.map(b => <>
                    <a href={"https://"+b.ref}><img alt={b.alt} src={"https://"+b.src}/></a>
                    {b.br && <br/>}
                </>)}
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
