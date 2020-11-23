import React from 'react'
import {Canvas} from 'react-three-fiber'
import {OrbitControls} from 'drei'
import {Helmet} from 'react-helmet-async';
import * as MOL from './Mol'
import * as HEL from './Hel'
import * as FLOW from './Flow'
import * as PLANT from './Plant'
const Link =({path="",name=""})=> (
    <div onClick={() => void (window.location.href = "/rmol/"+path+name)}>{name}</div>
)
const Button =({loc="",alt="",src=""})=> (
    <a href={(src?"https://":"")+loc}>
        <img alt={alt} src={"https://"+(
            src||`img.shields.io/badge/${alt}-gray.svg`
        )}/>
    </a>
)
const TWEET = "🍡A molecular chemistry based simulation library"
const INDEX: any = {
    m: Object.keys(MOL).map(key => <Link key={key} name={key} path="m/" />),
    h: Object.keys(HEL).map(key => <Link key={key} name={key} path="h/" />),
    f: Object.keys(FLOW).map(key => <Link key={key} name={key} path="f/" />),
    p: Object.keys(PLANT).map(key => <Link key={key} name={key} path="p/" />),
}
export const App: React.FC = ({children}) => {
    const paths = window.location.pathname.split('/').filter(v=>v)
    return (
        <>
            <Canvas
                style={{position:"absolute", width:'100%', height: '100%', top:0, left:0, zIndex:-1}}
                pixelRatio={window.devicePixelRatio}
                onCreated={({ gl }) => gl.setClearColor('lightpink')}
                gl={{ alpha: true, antialias: false, logarithmicDepthBuffer: true }}
                camera={{ fov: 75, position: [0, 0, 5] }}>
                <ambientLight intensity={.3} />
                <pointLight position={[ 100, 100, 100]} intensity={2.2} />
                <pointLight position={[-100,-100,-100]} intensity={5} color="pink" />
                <OrbitControls />
                {children}
            </Canvas>
            {/**/
            <div style={{position:"absolute", userSelect:"none",fontSize:"1.5rem", display:"inline-block"}}>
                {INDEX[paths[1]] || INDEX.f}
                <Button loc="/rmol/m/" alt="Mol" />
                <Button loc="/rmol/h/" alt="Hel" />
                <Button loc="/rmol/f/" alt="Flow" />
                <Button loc="/rmol/s/" alt="Sign" />
                <Button loc="/rmol/p/" alt="Plant" /><br/>
                <Button loc="github.com/tseijp/react-mol"     alt="license MIT"/>
                <Button loc="www.npmjs.com/package/react-mol" alt="npm version"
                        src="badge.fury.io/js/react-mol.svg"  /><br/>
                <Button loc={`twitter.com/intent/tweet?url=https=//tsei.jp/rmol/&text=${TWEET}`} alt="Tweet"
                        src="img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Ftseijp"/>
                <Button loc="github.com/tseijp/react-mol" alt="GitHub watchers"
                        src="img.shields.io/github/watchers/tseijp/react-mol?style=social" /><br/>
            </div>
            /**/}
            <Helmet>
                <title>{window.location.pathname.split('/').slice(-1)[0]}</title>
                <meta charSet="utf-8" />
                <meta name="Hatena::Bookmark" content="nocomment" />
                <link rel="canonical" href="https://tsei.jp/" />
            </Helmet>
        </>
    )
}
