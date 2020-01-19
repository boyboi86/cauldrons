import React from 'react';
import ParticlesBg from 'particles-bg';
import { BrowserRouter, Link } from 'react-router-dom';

import email from './icons/email_icon.png'
import linkedin from './icons/linkedin_icon.png'
import idea from './icons/idea_icon.png'
import me from './icons/me_icon.png'

import AppHead from './components/AppHead';
import RoutePath from './components/Route.js'
import './App.css';

const AppBottom = () => {
    return (
    <div className="App-bottom">
      <div className="bgimg">
          <ParticlesBg color="#7F8288" num={100} type="cobweb" bg={true} />
      </div>
    <div className="Images">
        <Link to = "/">
            <img className="email" rel="icon" src={email} alt="About Cauldrons"/>
        </Link>
        <Link to = "/philosophy">
            <img className="idea" rel="icon" src={idea} alt="Quantamental Philosophy"/>
        </Link>
        <Link to = "/profile">
            <img className="myself" rel="icon" src={me} alt="About Me"/>
        </Link>
        <a href="https://www.linkedin.com/in/wx-l-a74764167/">
            <img className="linkedin" rel="icon" src={linkedin} alt="Linkedin Profile"/>
        </a>
    </div>
    </div>
  );   
}



class App extends React.Component {
    
  render() {
      return (
          <div>
            <BrowserRouter>
                <div>
                <AppHead/>
                    <RoutePath />
                <AppBottom/>
                </div>
            </BrowserRouter>
        </div>
        );
      }
}

export default App;
