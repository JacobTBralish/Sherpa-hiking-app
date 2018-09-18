import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import SelectState from './Components/SelectState/SelectState';
import SelectCity from './Components/SelectCity/SelectCity';
import City from './Components/SelectCity/city';
import Trails from './Components/Trails/Trails';
import Trail from './Components/Trails/Trail';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import GoogleMaps from './Components/GoogleMaps/GoogleMaps';
import Profile from './Components/Profile/Profile';



export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/selectstate' component={SelectState} />
        <Route path='/selectcity' component={SelectCity} />
        <Route path='/city' component={City} />
        <Route path='/trails' component={Trails} />
        <Route path='/trail' component={Trail} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/googlemaps' component={GoogleMaps} />
        <Route path='/profile' component={Profile} />
    </Switch>
)