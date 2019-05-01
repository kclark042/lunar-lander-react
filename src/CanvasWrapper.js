import React from 'react';
import {createStars, drawStars} from "./Stars"

export default class CanvasWrapper extends React.Component{
    constructor(props){
        super(props)
        this.state = {
         stars:   []
        }
    }

    componentDidMount(){
        this.setState({stars: createStars(this.el)})  
        this.renderCanvas(); 
    }
    
    componentDidUpdate() {
        this.renderCanvas();
    }

    renderCanvas() {
        drawStars(this.state.stars,this.el)
    }

    drawStars(){
        drawStars(this.state.stars, this.el)
    }
    
    render(){
        return(
            <div><canvas className="stars" height={400} width={500} ref={el=>{this.el =el}} /></div>
        )
    }
}