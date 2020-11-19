import React from 'react'
import ReactDOM from 'react-dom'
import {unregister}  from './utils'
import {HelmetProvider} from 'react-helmet-async'
import {useFrame} from 'react-three-fiber'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import * as HIERARCHY from './MolsHierarchy'
import * as RECURSION from './MolsRecursion'
import * as FLOW from './Flow'
import * as HELS from './Hels'
import {App} from './App'
import {Atom, Poly} from '../src'
const About =()=> <></>
const Basic =()=> {
    const instance = React.useRef<any>(null)
    useFrame(() => {
        instance.current.rotation.x  =
        instance.current.rotation.y  =
        instance.current.rotation.z += 0.025
    })
    return (
      <Atom color="red" position={[-2.5,0,-10]} rotation={[0, 0, Math.PI/3]}>
        <boxBufferGeometry attach="geometry" />
        <meshPhongMaterial attach="material" />
        <Poly n={10}>
        {next =>
            <Atom color="green" position={[2,0,1]} rotation={[0, 0, -Math.PI/3]}>
                {next || <Atom color="blue" position={[2,0,0]} ref={instance}/>}
            </Atom>
        }
        </Poly>
      </Atom>
    )
}
const Root  =()=> (
    <HelmetProvider>
        <BrowserRouter>
            <Switch>
                {Object.entries(HIERARCHY).map(([k, V]) =>
                <Route path={"/rmol/"+k}   component={()=><App><V/></App>} key={k}/> )}
                {Object.entries(RECURSION).map(([k, V]) =>
                <Route path={"/rmol/m/"+k} component={()=><App><V/></App>} key={k}/> )}
                {Object.entries(HELS).map(([k, V]) =>
                <Route path={"/rmol/h/"+k} component={()=><App><V/></App>} key={k}/> )}
                <Route path="/rmol/"       component={()=><App><HIERARCHY.Random/></App>} exact/>
                <Route path="/rmol/m/"     component={()=><App><RECURSION.Random/></App>} exact/>
                <Route path="/rmol/h/"     component={()=><App><HELS.Archimedes/></App>} exact/>
                <Route path="/rmol/f/"     component={()=><App><FLOW.Stage/></App>} exact/>
                <Route path="/rmol/about"  component={()=><App><About/></App>} exact/>
                <Route path="/rmol/basic"  component={()=><App><Basic/></App>} exact/>
                <Redirect to='/rmol/' />
            </Switch>
        </BrowserRouter>
    </HelmetProvider>
)

ReactDOM.render(<Root/>, document.getElementById('root'));
unregister();
