import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import App from './App';
import Feed from './components/feedComponent';
import Card from './components/myFirstComponent';
import Hello from './components/Hello';



const Routes = () => (
    <App>
        <Switch>
            <Route exact path="/feed" component={Feed} />
            <Route exact path="/card" component={Card} />
            <Route exact path="/hello/:name" component={Hello} />
        </Switch>
    </App>   
)

export default Routes