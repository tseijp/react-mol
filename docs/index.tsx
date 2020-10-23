import React from 'react'
import ReactDOM from 'react-dom'
import {unregister}  from './utils'
import {HelmetProvider} from 'react-helmet-async'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import {App} from './App'
import * as MOLS from './mols'

const About = () => <>About</>
const Basic = () => <>Basic</>
console.log(Object.entries(MOLS))
const Root = () => (
    <HelmetProvider>
            <BrowserRouter>
                <Switch>
                    <Route path="/"      component={App}   exact/>
                    <Route path="/about" component={About} exact/>
                    <Route path="/basic" component={Basic} exact/>
                    {Object.entries(MOLS).map(([key, Val]) =>
                        <Route key={key} path={"/"+key} component={Val} />
                    )}
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
