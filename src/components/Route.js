import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Profile from './Profile';
import About_Cauldrons from './About';
import Philosophy from './Philosophy.js'
import Research from './Research.js'



const RoutePath = () => {
      return (
            <div>
                <Switch>
                    <Route path = '/' exact component = {About_Cauldrons}/>
                    <Route path = '/profile' exact component = {Profile}/>
                    <Route path = '/philosophy' exact component ={Philosophy}/>
                    <Route path = '/Research' exact component ={Research}/>
                    <Redirect from = '*' to = '/' />
                </Switch>
            </div>
        );
}

export default RoutePath;
