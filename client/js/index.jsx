import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import store from "./store";
import Signup from './component/container/Signup.jsx';
import Signin from './component/container/Signin.jsx';
import AddEvent from './component/container/AddEvent.jsx';
import Events from './component/container/Events.jsx';
import userPage from './component/container/UserPage.jsx';

const history = createBrowserHistory();
const App = () => {
    return (
        <Switch>
            <Route exact path='/' component={Signup} />
            <Route exact path='/users/login' component={Signin} />
            <Route exact path='/addEvent' component={AddEvent} />
            <Route exact path='/events' component={Events} />
        </Switch>
    )
}

const app = document.getElementById('app')

ReactDOM.render(
<Provider store={store}>
    <Router history={history}>
        <App />
    </Router>
</Provider>, app
);
    
export default history;

