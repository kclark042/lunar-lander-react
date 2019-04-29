import React from 'react';


export default class CanvasWrapper extends React.Component{
    constructor(props){
        super(props)
        this.state = {
         stars:   []
        }
    }
    componentDidMount(){
        this.createStars()
        this.renderCanvas(); 
    }
    
    componentDidUpdate() {
        this.renderCanvas();
    }

    renderCanvas() {
        this.drawStars()
    }

    createStars(){
        const canvas = this.el;
        const stars = [];
        for (var i = 0; i < 500; i++) {
            stars[i] = {
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              radius: Math.sqrt(Math.random() * 2),
              alpha: 1.0,
              decreasing: true,
              dRatio: Math.random()*0.009
            };
        } 
        this.setState({stars})
    }

    drawStars() {
        
        const stars = this.state.stars;

        const canvas = this.el;
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.fillStyle = "#111"
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < stars.length; i++) {
            let star = stars[i];
            context.beginPath();
            context.arc(star.x, star.y, star.radius, 0, 2*Math.PI);
            context.closePath();
            context.fillStyle = "rgba(255, 255, 255, " + star.alpha + ")";
            star = this.updateStar(star)
            context.fill();
            stars[i] = star
        }
        context.restore();
    }

    updateStar(star){
        if (star.decreasing){
            star.alpha -= star.dRatio;
            if (star.alpha < 0.1){ 
                star.decreasing = false; 
            }
        } else {
            star.alpha += star.dRatio;
            if (star.alpha > 0.95){ 
                star.decreasing = true;
            }
        }
       return star
    }
    
    render(){
        return(
            <div><canvas className="stars" height={400} width={500} ref={el=>{this.el =el}} /></div>
        )
    }
}