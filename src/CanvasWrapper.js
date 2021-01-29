import React from "react";
import { createStars, drawStars } from "./Stars";
import {
  defaultSpaceship,
  drawSpaceship,
  updateSpaceship,
  toggleEngine,
  displayStatus
} from "./Spaceship";

const CANVAS_HEIGHT = 800;
const CANVAS_WIDTH = 800;

export default class CanvasWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: [],
      spaceship: defaultSpaceship()
    };
  }

  componentDidMount() {
    this.setState({ stars: createStars(this.el) });
    this.renderCanvas();
  }

  componentDidUpdate() {
    this.renderCanvas();
  }

  renderCanvas() {
    const context = this.el.getContext("2d");
    context.save();
    context.clearRect(0, 0, this.el.width, this.el.height);

    drawStars(this.state.stars, this.el, context);
    this.drawPlanet(context);
    displayStatus(this.state.spaceship, this.el, context);
    drawSpaceship(this.state.spaceship, this.el);
    context.restore();
  }

  drawPlanet(context) {
    context.save();
    context.fillStyle = "rgb(117, 176, 188)";
    context.fillRect(0, this.el.height - 50, this.el.width, 50);
    context.restore();
  }

  updateSpaceship() {
    this.setState({
      spaceship: updateSpaceship(this.state.spaceship, this.el)
    });
    drawSpaceship(this.state.spaceship, this.el);
  }

  toggleEngine() {
    this.setState({ spaceship: toggleEngine(this.state.spaceship) });
    drawSpaceship(this.state.spaceship, this.el);
  }

  isLanded() {
    return this.state.spaceship.landed;
  }

  isCrashed() {
    return this.state.spaceship.crashed;
  }

  resetGame() {
    this.setState({spaceship: defaultSpaceship()});
  }

  displayCrashed() {
    const context = this.el.getContext("2d");

    context.save();
    context.font = "bold 48px verdana";
    context.fillStyle = "white";
    context.fillText("You Crashed!", 80, this.el.height / 2);
    context.restore();
  }

  displaySafe() {
    const context = this.el.getContext("2d");

    context.save();
    context.font = "bold 40px verdana";
    context.fillStyle = "white";
    context.fillText("You Landed Safely!", 46, this.el.height / 2);
    context.restore();
  }

  displayCountDown(countDown){
    this.renderCanvas()
    const context = this.el.getContext("2d");
    
    context.save();
    context.font = "bold 40px verdana";
    context.fillStyle = "white";
    if(countDown >= 4){
      context.fillText("Go!", this.el.width/2, this.el.height / 2);
    } else {

      context.fillText(countDown, this.el.width/2, this.el.height / 2);
    }
    context.restore();
  }

  render() {
    return (
      <div>
        <canvas
          className="stars"
          height={CANVAS_HEIGHT}
          width={CANVAS_WIDTH}
          ref={el => {
            this.el = el;
          }}
        />
      </div>
    );
  }
}
