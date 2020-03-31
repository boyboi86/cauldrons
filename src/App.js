import React from 'react';
import ParticlesBg from 'particles-bg';
import { BrowserRouter } from 'react-router-dom';

import AppHead from './components/pagecomponent/AppHead';
import RoutePath from './components/Route.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
    
  render() {
      return (
          <div className="app">
            <BrowserRouter>
                <div>
                    <AppHead />
                    <RoutePath />
                      <div className="bgimg">
                      <ParticlesBg color="#7F8288" num={100} type="cobweb" bg={true} />
                      </div>
                </div>
            </BrowserRouter>
        </div>
        );
      }
}

export default App;
