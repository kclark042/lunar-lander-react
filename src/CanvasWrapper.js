import React from "react";
import { createStars, drawStars } from "./Stars";
import { drawSpaceship, updateSpaceship, toggleEngine } from "./Spaceship";

export default class CanvasWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: [],
      spaceship: {
        color: "red",
        width: 8,
        height: 22,
        position: {
          x: 300,
          y: 20
        },
        velocity: {
          x: 0,
          y: 0
        },
        thrust: {
          x: 0,
          y: 0
        },
        gravity: {
          x: 0,
          y: -0.1622
        },
        fuel: 20,
        fuelBurned: 0,
        angle: 100.5,
        engineOn: false,
        landed: false,
        MTV: 5.0, //max touch down velocity
        crashed: false
      }
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
		drawStars(this.state.stars, this.el);
		drawSpaceship(this.state.spaceship, this.el)
  }

	drawSpaceship(){
		drawSpaceship(this.state.spaceship, this.el)
	}

  drawStars() {
    drawStars(this.state.stars, this.el);
	}
	
	updateSpaceship(){
		this.setState({spaceship: updateSpaceship(this.state.spaceship)})
		drawSpaceship(this.state.spaceship, this.el)
  }
  
  toggleEngine(){
    this.setState({spaceship: toggleEngine(this.state.spaceship)})
    drawSpaceship(this.state.spaceship, this.el)
  }

  render() {
    return (
      <div>
        <canvas
          className="stars"
          height={400}
          width={500}
          ref={el => {
            this.el = el;
          }}
        />
      </div>
    );
  }
}
