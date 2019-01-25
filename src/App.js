//Libraries
import React, { Component } from 'react';

//Local
import './App.css';
import Home from './components/Home';
import Login from './components/Login';

class App extends Component {
  constructor() {
    super()
    this.state = {
      route: 'home', //Change to login later
    }
  }
  render() {
    if(this.state.route === 'home') {
      return <Home />;
    } else {
      return <Login />;
    }
  }
}

export default App;
