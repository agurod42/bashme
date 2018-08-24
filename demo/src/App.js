import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Clime from 'clime';

class App extends Component {

  componentDidMount() {
    Clime
      .show(document.getElementById('terminal'));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <div id='terminal' />
        </p>
      </div>
    );
  }

}

export default App;
