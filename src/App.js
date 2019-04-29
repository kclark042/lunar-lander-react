import React, { Component } from 'react';
import logo from './logo.svg';
import CanvasWrapper from "./CanvasWrapper"
import './App.css';

export default class App extends Component {
  constructor(props){
    super(props);
    this.canvasRef = React.createRef();
  }
  componentDidMount(){
    this.animationID = window.requestAnimationFrame(() => this.update());  
  }
  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationID);
  }
  
  update() {
    this.canvasRef.current.drawStars();
    this.animationID = window.requestAnimationFrame(() => this.update());  
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
        <CanvasWrapper ref={this.canvasRef}/>
      </div>
    );
  }
}