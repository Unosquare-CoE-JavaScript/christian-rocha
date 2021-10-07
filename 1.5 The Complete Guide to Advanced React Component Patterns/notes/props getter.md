#props getters


The whole idea of prop getters is to think of React as an extension of JavaScript and the fact that even functions are first-class objects. Instead of passing down components as children props, you could pass down functions with props as parameters that return JSX.

####Implementation:
```
/* src/Dropdown.js */
import { Component } from "react";

export default class Dropdown extends Component {
  state = { on: false };

  getStateAndHelpers() {
    const { on } = this.state;
    return {
      on,
      toggle: this.toggle,
      togglerProps: {
        onClick: this.toggle
      }
    };
  }

  toggle = e => {
    const { onToggle } = this.props;
    e.stopPropagation();
    this.setState(
      ({ on }) => ({ on: !on }),
      () => {
        const { on } = this.state;
        onToggle(on);
      }
    );
  };

  render() {
    const { children } = this.props;
    return children(this.getStateAndHelpers());
  }
}
```

Usage:
```
/* src/index.js */
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Dropdown from "./Dropdown";

import "./styles.css";

function App() {
  const [toggle, setToggle] = useState(false);

  function onToggle(value) {
    setToggle(value);
  }
  return (
    <div className="App">
      <h1>Dropdown Demo</h1>
      <h2>Using Component Composition</h2>
      Dropdown is {toggle ? "shown" : "hidden"}
      <Dropdown onToggle={onToggle}>
        {({ on, toggle, togglerProps }) => (
          <div className="dropdown">
            <button type="button" {...togglerProps}>
              {on ? "Hide" : "Show"}
            </button>
            {on ? <div className="content">This is the toggle-able content.</div> : null}
          </div>
        )}
      </Dropdown>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```