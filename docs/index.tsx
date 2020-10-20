import React from 'react'
import ReactDOM from 'react-dom'
import {unregister}  from './utils/serviceWorker'
import {HelmetProvider} from 'react-helmet-async'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import {App} from './App'

const About = () => <>About</>
const Basic = () => <>Basic</>
const Root = () => (
    <HelmetProvider>
            <BrowserRouter>
                <Switch>
                    <Route path="/"      component={App}   exact/>
                    <Route path="/about" component={About} exact/>
                    <Route path="/basic" component={Basic} exact/>
                    <Redirect to='/' />
                </Switch>
            </BrowserRouter>
    </HelmetProvider>
)

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

unregister();
