/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import axios from 'axios';

/**
 * Can you explain the differences between all those ways
 * of passing function to a component?
 *
 * What happens when you click each of the buttons?
 */
class Test extends React.Component {
  constructor() {
    super();
    this.name = 'MyComponent';

    this.handleClick2 = this.handleClick1.bind(this);
  }

  handleClick1() {
    alert(this.name);
  }

  handleClick3 = () => alert(this.name);

  render() {
    return (
      <div>
        <button onClick={this.handleClick1()}>click 1</button>
        <button onClick={this.handleClick1}>click 2</button>
        <button onClick={this.handleClick2}>click 3</button>
        <button onClick={this.handleClick3}>click 4</button>
      </div>
    );
  }
}

export default Test;
