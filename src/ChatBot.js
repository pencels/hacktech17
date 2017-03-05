import React, { Component } from 'react';
import $ from 'jquery';

const WL_API = 'https://www.wolframcloud.com/objects/cpence/Evolutionary';
const RESPONSE = '/respondTo';
const ADD_HUMAN = '/addHumanMsg';
const ADD_BOT = '/addBotMsg';
const DATA = d => ({
  input: d
});

// Max number of chats that will be on screen at a time.
const MAX_LENGTH = 10;

// Prepend item onto the end of an array.
function prepend(arr, item) {
  return [item].concat(arr);
}

function lastUserBotPair(msgs) {
  var len = msgs.length;
  var obj = {};
  if (len < 2) return obj;
  for (var i = --len; i >= 0; --i) {
    var curr = msgs[i];
    if (!obj.inp && curr.sen === 'user') obj.inp = curr.msg;
    if (!obj.res && curr.sen === 'bot') obj.res = curr.msg;
    if (obj.inp && obj.res) return obj;
  }
}

function WarningBanner(props) {
  var props = props.chatState;
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

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {msg: props.msg, isBot: props.isBot, isBotButtonPressed: false, notBotButtonPressed: false};
    this.handleBotClick = this.handleBotClick.bind(this);
    this.handleNotClick = this.handleNotClick.bind(this);
  }

  resetState() {
      this.setState((prevState,props) => ({
        isBotButtonPressed: false,
        notBotButtonPressed: false
      }));
  }

  handleBotClick(event) {
    if(!this.state.isBotButtonPressed && !this.state.notBotButtonPressed){
      this.setState((prevState,props) => ({
        isBotButtonPressed: true
      }));
      setTimeout(this.resetState.bind(this), 3000);

      // The bot did a bad job of pretending it wasn't a bot
      var data = lastUserBotPair(this.state.msg());
      $.get(WL_API + ADD_BOT, data).done(function () {
        this.state.msg([]);
      }.bind(this));
    }
  }

  handleNotClick(event) {
    if(!this.state.isBotButtonPressed && !this.state.notBotButtonPressed){
      this.setState((prevState,props) => ({
        notBotButtonPressed: true
      }));
      setTimeout(this.resetState.bind(this), 3000);
    }
  }

  render() {
    return (
      <div>
        <div className="Banner-alert">
          <WarningBanner chatState={this.state} />
        </div>
        <div className="Buttons-div">
            <button onClick={this.handleBotClick} type="button" className="btn btn-lg btn-primary Buttons-margin">Bot</button>
            <button onClick={this.handleNotClick} type="button" className="btn btn-lg btn-primary Buttons-margin">Not</button>
        </div>
      </div>
    );
  }
}


class ChatBot extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: [], value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.msg = this.msg.bind(this);
  }

  msg(set) {
    if (set) {
      this.setState(prev => ({
        messages: set,
      }));
      return;
    }
    return this.state.messages;
  }

  handleSubmit(event) {
    var msg = this.state.value;
    var words = msg.split(" ");
    console.log(msg);
    var delay = Math.pow((Math.pow(msg.length, 0.333) + (Math.random() * 2 - 1)) * Math.pow(words.length, 0.333), 0.69) * 1000;
    console.log(delay);
    // Don't count empty string or whitespace as message.
    if (/\S/.test(this.state.value)) {
      this.setState(prevState => ({
        messages: prepend(prevState.messages, {
          sen: 'user',
          msg: this.state.value
        }),
        value: ''
      }));
    // Also send in info about the last bot response. It must have been good
    console.log(this.state.messages.length);
    if (this.state.messages.length >= 2) {
      var data = lastUserBotPair(this.state.messages);
      $.get(WL_API + ADD_HUMAN, data)
    }
      setTimeout((function() {
        // Get response from endpoint and display.
        $.get(WL_API + RESPONSE, DATA(msg))
          .done(function (res) {
              this.setState(prevState => ({
                messages: prepend(prevState.messages, {
                    sen: 'bot',
                    msg: res
                })
              }));
          }.bind(this));
      }).bind(this), delay);
    }
    event.preventDefault();
  }

  handleChange(event) {
    event.persist();
    this.setState(prevState => ({
      value: event.target.value
    }));
  }

  render() {
    const child_opacity = i => ({
      opacity: 1 - i / MAX_LENGTH
    });
    const messages = this.state.messages.map((m, i) =>
      <li key={i} style={child_opacity(i)} >
        <strong>{m.sen + ':'}</strong> {m.msg}
      </li>
    ).slice(0, MAX_LENGTH);
    return (
      <div>
      <Buttons isBot={true} msg={this.msg} />
      <form className="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
        <div className="form-group">
        <input type="text"
               value={this.state.value}
               onChange={this.handleChange}
               id="user-input"
               className="form-control" />
        </div>
        <button type="submit" className="hidden" onClick={this.handleSubmit}>
        </button>
        <div className="row">
          <ul className="messages">{messages}</ul>
        </div>
      </form>
      </div>
    );
  }
}

export default ChatBot;
