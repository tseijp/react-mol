import React from 'react'
import ReactDOM from 'react-dom'
import {unregister}  from './utils'
import {HelmetProvider} from 'react-helmet-async'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import * as MOLSH from './MolsHierarchy'
import * as MOLSR from './MolsRecursion'
import {App} from './App'
const About =()=> <>TODO</>
const Basic =()=> <>TODO</>
const Root  =()=> (
    <HelmetProvider>
        <BrowserRouter>
            <Switch>
                {Object.entries(MOLSH).map(([k, V]) =>
                <Route path={"/rmol/"+k}   component={()=><App><V/></App>} key={k}/> )}
                {Object.entries(MOLSR).map(([k, V]) =>
                <Route path={"/rmol/m/"+k} component={()=><App><V/></App>} key={k}/> )}
                <Route path="/rmol/"       component={()=><App><MOLSH.Random/></App>} exact/>
                <Route path="/rmol/m/"     component={()=><App><MOLSR.Random/></App>} exact/>
                <Route path="/rmol/about"  component={About} exact/>
                <Route path="/rmol/basic"  component={Basic} exact/>
                <Redirect to='/rmol/' />
            </Switch>
        </BrowserRouter>
    </HelmetProvider>
)

ReactDOM.render(<Root/>, document.getElementById('root'));
unregister();
