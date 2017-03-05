import React, { Component } from 'react';
import './App.css';
import ChatBot from './ChatBot';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Bot or Not</h2>
          <span className="glyphicon glyphicon-eye-close" aria-hidden="true">
          </span>
        </div>
        <div className="container">
          <ChatBot />
        </div>
      </div>
    );
  }
}

export default App;
