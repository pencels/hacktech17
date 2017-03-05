import React, { Component } from 'react';
import $ from 'jquery';

const WL_API =
  'https://www.wolframcloud.com/objects/053ee82a-001c-4d2b-b814-b24eba0b5898';
const ENDPT = '/Result';
const DATA = d => ({
  str: d
});

const MAX_LENGTH = 10;

function prepend(arr, item) {
  return [item].concat(arr);
}

class ChatBot extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: [], value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      setTimeout((function() {
        // Get response from endpoint and display.
        $.get(WL_API + ENDPT, DATA(msg))
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
    );
  }
}

export default ChatBot;
