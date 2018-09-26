import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import SelectState from './Components/SelectState/SelectState';
import SelectCity from './Components/SelectCity/SelectCity';
import City from './Components/SelectCity/city';
import Trails from './Components/Trails/Trails';
import Trail from './Components/Trails/Trail';
import Reviews from './Components/Reviews/Reviews';
// import GoogleMaps from './Components/GoogleMaps/GoogleMaps';
import Profile from './Components/Profile/Profile';
import CreateProfile from './Components/Profile/CreateProfile';
import EditProfile from './Components/Profile/EditProfile';



export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/selectstate' component={SelectState} />
        <Route path='/selectcity' component={SelectCity} />
        <Route path='/city' component={City} />
        <Route path='/trails' component={Trails} />
        <Route path='/trail/:id' component={Trail} />
        <Route path='/trail' component={Reviews} />
        {/* <Route path='/googlemaps' component={GoogleMaps} /> */}
        <Route path='/profile/:id' component={Profile} />
        <Route path='/profileCreate' component={CreateProfile} />
        <Route path='/profileEdit/:id' component={EditProfile} />
    </Switch>
)