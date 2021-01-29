import React, { Component } from "react";
import CanvasWrapper from "./CanvasWrapper";

const SPACE_BAR = 32;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.keyPressed = this.keyPressed.bind(this);
    this.countDownStart = 0;
    this.countDownElapsedTime = 0;
    this.isCountingDown = false;
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
    if (this.isCountingDown) {
      const date = new Date()
      this.countDownElapsedTime = date.getSeconds()
      const countDown = Math.abs(this.countDownStart - this.countDownElapsedTime)
    
      this.isCountDownFinished(countDown)
      
      this.canvasRef.current.displayCountDown(countDown);
    } else {
      this.canvasRef.current.updateSpaceship();
      this.isLanded();
    }
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

  isCountDownFinished(countDown){
    if(countDown > 4){
      this.isCountingDown = false;
    } 
    this.animationID = window.requestAnimationFrame(() => this.update());
  }


  keyPressed(event) {
    if (event.keyCode === SPACE_BAR) {
      if (
        this.canvasRef.current.isCrashed() ||
        this.canvasRef.current.isLanded()
      ) {
        const date = new Date();
        this.isCountingDown = true;
        this.countDownStart = date.getSeconds();
        this.canvasRef.current.resetGame();
        this.animationID = window.requestAnimationFrame(() => this.update());
      }
      this.canvasRef.current.toggleEngine();
    }
  }

  render() {
    return (
      <div className="App">
        <CanvasWrapper ref={this.canvasRef} />
        <style jsx >
         { `
           .App {
             display: flex;
             justify-content: center;
             background: darkcyan;
           }
          `}
        </style>
      </div>
    );
  }
}
