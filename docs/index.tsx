import React from 'react'
import ReactDOM from 'react-dom'
import {unregister}  from './utils'
import {HelmetProvider} from 'react-helmet-async'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import * as HIERARCHY from './MolsHierarchy'
import * as RECURSION from './MolsRecursion'
import * as HELS from './Hels'
import {App} from './App'
const About =()=> <>TODO</>
const Basic =()=> <>TODO</>
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
                <Route path="/rmol/about"  component={About} exact/>
                <Route path="/rmol/basic"  component={Basic} exact/>
                <Redirect to='/rmol/' />
            </Switch>
        </BrowserRouter>
    </HelmetProvider>
)

ReactDOM.render(<Root/>, document.getElementById('root'));
unregister();
