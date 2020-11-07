import React from 'react'
import ReactDOM from 'react-dom'
import {unregister}  from './utils'
import {HelmetProvider} from 'react-helmet-async'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import * as MOLS from './mols'
import {App} from './App'
const About =()=> <>TODO</>
const Basic =()=> <>TODO</>
const Root  =()=> (
    <HelmetProvider>
        <BrowserRouter>
            <Switch>
                {Object.entries(MOLS).map(([key, Val]) =>
                <Route path={"/rmol/"+key} component={()=><App><Val/></App>} key={key}/> )}
                <Route path="/rmol/"       component={()=><App><MOLS.Random/></App>} exact/>
                <Route path="/rmol/about"  component={About} exact/>
                <Route path="/rmol/basic"  component={Basic} exact/>
                <Redirect to='/rmol/' />
            </Switch>
        </BrowserRouter>
    </HelmetProvider>
)

ReactDOM.render(<Root/>, document.getElementById('root'));
unregister();
