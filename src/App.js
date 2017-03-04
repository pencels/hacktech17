import React, { Component } from 'react';
import './App.css';
import ChatBot from './ChatBot';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Bot or Not</h2>
        </div>
        <ChatBot />
      </div>
    );
  }
}

export default App;
