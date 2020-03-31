import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

import logo from './logo.png';

const AppHead = () => {
   return (
       <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="navbar">
          <Navbar.Brand as={ Link } to="/">
             <div>
             <img src={logo} alt="logo" className="logo"/>
              Cauldrons
              </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" eventKey="0"/>
          <Navbar.Collapse id="responsive-navbar-nav" eventKey="0">
            <Nav className="mr-auto">
            <Nav.Link as={ Link } to="/" className="navbarlink hvr-underline-from-left" eventKey="1">Home</Nav.Link>
            <Nav.Link as={ Link } to="/profile" className="navbarlink hvr-underline-from-left" eventKey="1">About</Nav.Link>
            <Nav.Link as={ Link } to="/philosophy" className="navbarlink hvr-underline-from-left" eventKey="1">Philosophy</Nav.Link>
            <Nav.Link href="https://github.com/boyboi86/bsm-model" rel="nofollow" target="_blank" className="navbarlink hvr-underline-from-left" eventKey="1">Research Tools</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
  );   
}

export default AppHead;
