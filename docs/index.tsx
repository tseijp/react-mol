import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import {Canvas} from 'react-three-fiber'
import {unregister}  from './utils'
import {OrbitControls} from 'drei'
import {HelmetProvider} from 'react-helmet-async'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import {C, H, Poly} from '../src'
import * as MOLS from './mols'
const About = () => <>TODO</>
const Basic = () => <>TODO</>

const App:React.FC = ({children}) => {
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
            {Object.keys(MOLS).map(key =>
                <div key={key} style={{userSelect:"none",fontSize:"1.5rem",display:"table"}}
                    onClick={()=>void (window.location.href = key)}>{key}</div>
            )}
            <div style={{display:"inline-block"}}>
                <a href="https://github.com/tseijp/react-mol">
                    <img alt="license MIT" src="https://img.shields.io/badge/license-MIT-green.svg"/></a>
                <a href="https://www.npmjs.com/package/react-mol">
                    <img src="https://badge.fury.io/js/react-mol.svg" alt="npm version" height="18"/></a>
                <br/>
                <a href="https://twitter.com/intent/tweet?url=https://tsei.jp/rmol/&text=🍡A molecular chemistry based simulation library" >
                    <img alt="tweet" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Ftseijp"/></a>
                <a href="https://github.com/tseijp/react-mol">
                    <img alt="GitHub watchers" src="https://img.shields.io/github/watchers/tseijp/react-mol?style=social"/></a>
            </div>
        </>
    )
}
export const Home =({rand=(mul=Math.PI*2)=>Math.random()*mul})=>
    <App>
        <H>
            <Poly poly={250}>
            {(children,props) =>
                <C {...props} angle={rand()}>
                    <C angle={rand()}>
                        {children||<H/>}
                        <H/>
                        <C angle={rand()}><H/><H/><H/></C>
                    </C>
                    <H/>
                    <H/>
                </C>
            }
            </Poly>
        </H>
    </App>

const Root = () => (
    <HelmetProvider>
            <BrowserRouter>
                <Switch>
                    <Route path="/"      component={Home} exact/>
                    <Route path="/about" component={About} exact/>
                    <Route path="/basic" component={Basic} exact/>
                    {Object.entries(MOLS).map(([key, Val]) =>
                    <Route key={key} path={"/"+key} component={()=><App><Val/></App>} /> )}
                    <Redirect to='/' />
                </Switch>
            </BrowserRouter>
    </HelmetProvider>
)

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);

unregister();
