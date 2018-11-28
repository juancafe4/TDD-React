import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      error: '',
    };

    this.decrementCounter = this.decrementCounter.bind(this);
  }

  decrementCounter() {
    const { counter } = this.state;

    if (counter === 0 ) {
      this.setState({ error: 'error counter cannot be less than 0'});
    } else {
      this.setState({ counter: counter - 1})
    }
  }
  render() {
    const { counter, error } = this.state;
    return (
      <div className="App" data-test="component-app">
        <h1 id="display">
          The counter is currently is {counter}
        </h1>
        <h1 id="error" style={ {color: 'red', } }>
          {error}
        </h1>
        <button id="increment" onClick={() => this.setState({ counter: counter + 1, error: '' })}>Increment counter</button>
        <button id="decrement" onClick={this.decrementCounter}>Decrement counter</button>
      </div>
    );
  }
}

export default App;
