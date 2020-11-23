import React from 'react'
import ReactDOM from 'react-dom'
import {unregister}  from './utils'
import {HelmetProvider} from 'react-helmet-async'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import * as HEL from './Hel'
import * as Mol from './Mol'
import * as FLOW from './Flow'
// import * as PLANT from './Plant'

import {App} from './App'
import {Basic} from './Basic'
const About =()=> <></>

const Root  =()=> (
    <HelmetProvider>
        <BrowserRouter>
            <Switch>
                {Object.entries(Mol).map(([k, V]) =>
                <Route path={"/rmol/m/"+k}   component={()=><App><V/></App>} key={k}/> )}
                {Object.entries(HEL).map(([k, V]) =>
                <Route path={"/rmol/h/"+k} component={()=><App><V/></App>} key={k}/> )}
                {Object.entries(FLOW).map(([k, V]) =>
                <Route path={"/rmol/f/"+k} component={()=><App><V/></App>} key={k}/> )}
                <Route path="/rmol/"       component={()=><App><Basic/></App>} exact/>
                <Route path="/rmol/m/"     component={()=><App><Mol.Random/></App>} exact/>
                <Route path="/rmol/h/"     component={()=><App><HEL.Archimedes/></App>} exact/>
                <Route path="/rmol/f/"     component={()=><App><FLOW.Points/></App>} exact/>
                <Route path="/rmol/about"  component={()=><App><About/></App>} exact/>
                <Route path="/rmol/basic"  component={()=><App><Basic/></App>} exact/>
                <Redirect to='/rmol/' />
            </Switch>
        </BrowserRouter>
    </HelmetProvider>
)

ReactDOM.render(<Root/>, document.getElementById('root'));
unregister();
