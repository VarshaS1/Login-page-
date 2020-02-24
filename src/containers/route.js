import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Login from './login';
import RegisterForm from './registrationform';


const Routes = () => (
    <BrowserRouter >
    <Switch>
    {/* <Route exact path="/" component={Welcome}/> */}
    <Route path="/login" component={Login}/>
    <Route path="/RegisterForm" component={RegisterForm}/>
    </Switch>
    </BrowserRouter>
    );
    export default Routes;
