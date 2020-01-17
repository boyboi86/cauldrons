import React from 'react';
import { Link } from 'react-router-dom';

const AppHead = props => {
   return (
    <div>
      <header className="App-header">
        <Link to = '/'>{props.subject}</Link>
      </header>
    </div>
  );   
}

export default AppHead;
