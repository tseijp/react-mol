import React from 'react'
import ReactDOM from 'react-dom'
import {Canvas} from 'react-three-fiber'
import {unregister}  from './utils'
import {OrbitControls} from 'drei'
import {HelmetProvider} from 'react-helmet-async'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import * as MOLS from './mols'
import {M, Poly} from '../src'

const About = () => <>About</>
const Basic = () => <>Basic</>

const App:React.FC = ({children}) => {
    return (
        <Canvas
            style={{position:"absolute", width:'100%', height: '100%', top:0, left:0}}
            gl={{ alpha: false, antialias: false, logarithmicDepthBuffer: true }}
            camera={{ fov: 75, position: [0, 0, 10] }}>
            <ambientLight intensity={1} />
            <pointLight position={[100, 100, 100]} intensity={2.2} />
            <pointLight position={[-100, -100, -100]} intensity={5} color="red" />
            <axesHelper />
            <gridHelper />
            <gridHelper rotation={[Math.PI/2, 0, 0]}/>
            <OrbitControls />
            {children}
        </Canvas>
    )
}
const rand =(mul=10,add=-5)=> add+Math.random()*mul
export const Home =()=>
    <M position={[0,0,0]} scale={[.3, .3, .3]}>
        <Poly poly={4}>
        {(children, props) => <>
            <M {...props} {...{children}} color="red"   position={[rand(), rand(), rand()]}/>
            <M {...props} {...{children}} color="green" position={[rand(), rand(), rand()]}/>
            <M {...props} {...{children}} color="blue"  position={[rand(), rand(), rand()]}/>
        </>}
        </Poly>
    </M>

const Root = () => (
    <HelmetProvider>
            <BrowserRouter>
                <Switch>
                    <Route path="/"      component={()=><App><Home/></App>} exact/>
                    <Route path="/about" component={About} exact/>
                    <Route path="/basic" component={Basic} exact/>{Object.entries(MOLS).map(([key, Val]) =>
                    <Route key={key} path={"/"+key} component={()=><App><Val/></App>} />)}
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
