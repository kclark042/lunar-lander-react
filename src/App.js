import React, { Component } from "react";
import logo from "./logo.svg";
import CanvasWrapper from "./CanvasWrapper";
import "./App.css";

const SPACE_BAR = 32;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.keyPressed = this.keyPressed.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keyup", this.keyPressed);
    document.addEventListener("keydown", this.keyPressed);
    this.animationID = window.requestAnimationFrame(() => this.update());
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationID);
  }

  update() {
    this.canvasRef.current.updateSpaceship();
    this.isLanded();
  }

  isLanded() {
    if (this.canvasRef.current.isLanded()) {
      window.cancelAnimationFrame(this.animationID);
      if (this.canvasRef.current.isCrashed()) {
        this.canvasRef.current.displayCrashed();
      } else {
        this.canvasRef.current.displaySafe();
      }
    } else {
      this.animationID = window.requestAnimationFrame(() => this.update());
    }
  }

  isCountingDown() {
    if (this.canvasRef.current.isCountingDown()) {
    }
  }

  keyPressed(event) {
    if (event.keyCode === SPACE_BAR) {
      if (
        this.canvasRef.current.isCrashed() ||
        this.canvasRef.current.isLanded()
      ) {
        this.canvasRef.current.resetGame();
        this.animationID = window.requestAnimationFrame(() => this.update());
      }
      this.canvasRef.current.toggleEngine();
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <CanvasWrapper ref={this.canvasRef} />
      </div>
    );
  }
}
