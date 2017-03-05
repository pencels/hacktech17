import React, { Component } from 'react';
import './App.css';
import ChatBot from './ChatBot';

function WarningBanner(props) {
  if (!props.isBotButtonPressed && !props.notBotButtonPressed){
    return null;
  }
  else if ((props.isBot && props.isBotButtonPressed) || (!props.isBot && props.notBotButtonPressed)){
   return (
      <div className="alert alert-success" role="alert">
        <strong>Well done!</strong> You chose right.
      </div>
    );
  }
  return (
    <div className="alert alert-danger" role="alert">
      <strong>Aww..</strong> Better luck next time.
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    //this value is hard-coded for now
    this.state = {isBot: true}
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Bot or Not</h2>
          <span className="glyphicon glyphicon-eye-close" aria-hidden="true">
          </span>
        </div>
        <div className="container">
          <Buttons isBot={this.state.isBot} />
          <ChatBot />
        </div>
      </div>
    );
  }
}

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {isBot: props.isBot, isBotbuttonPressed: false, notBotButtonPressed: false};
    this.handleBotClick = this.handleBotClick.bind(this);
    this.handleNotClick = this.handleNotClick.bind(this);
  }

  handleBotClick(event) {
    if(!this.state.isBotButtonPressed && !this.state.notBotButtonPressed){
      this.setState((prevState,props) => ({
        isBotButtonPressed: true
      }));
    }
  }

  handleNotClick(event) {
    if(!this.state.isBotButtonPressed && !this.state.notBotButtonPressed){
      this.setState((prevState,props) => ({
        notBotButtonPressed: true
      }));
    }
  }

  render() {
    return (
      <div>
        <div className="Banner-alert">
          <WarningBanner isBot={this.state.isBot} isBotButtonPressed={this.state.isBotButtonPressed} notBotButtonPressed={this.state.notBotButtonPressed} />
        </div>
        <div className="Buttons-div">
            <button onClick={this.handleBotClick} type="button" className="btn btn-lg btn-primary Buttons-margin">Bot</button>
            <button onClick={this.handleNotClick} type="button" className="btn btn-lg btn-primary Buttons-margin">Not</button>
        </div>
      </div>
    );
  }
}

export default App;
