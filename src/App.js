import React, { Component } from 'react';
import Nav from './Components/Nav/Nav';
import routes from './routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <header><Nav></Nav></header>
        
        <div>{routes}</div>
        
      </div>
    );
  }
}

export default App;
