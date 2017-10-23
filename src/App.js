import React, { Component } from 'react';
import logo from './minilogo.png';
import './App.css';
import './components/common'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Under Construction!</h2>
        </div>
        <p className="App-intro">
          We'll be up soon enough, don't worry!
        </p>
      </div>
    );
  }
}

export default App;
