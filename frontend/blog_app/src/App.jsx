// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Logout from './components/Logout';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/register" component={Register} />
                {/* <Route path="/login" component={Login} />
                <Route path="/profile" component={Profile} />
                <Route path="/logout" component={Logout} /> */}
            </Switch>
        </Router>
    );
}

export default App;
