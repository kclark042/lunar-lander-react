import React  from 'react';

export default class Stars extends React.Component {
    constructor(){
        super();
        this.state= {
            stars:[],
        }
        this.canvasRef = React.createRef();
        this.createStars = this.createStars.bind(this)
    }

    get canvas() {
        return this.canvasRef.current;
    }
    
    get ctx() {
        return this.canvas.getContext('2d');
    }
    
    componentDidMount() {
        this.renderCanvas();
    }
    
      componentDidUpdate() {
        this.renderCanvas();
      }
    
      renderCanvas() {
        const { assets, card } = this.props;
    
        this.drawStars()
      }
    

    createStars(){
        const stars = [];
        for (var i = 0; i < 500; i++) {
            stars[i] = {
              x: Math.random() * this.refs.canvas.width,
              y: Math.random() * this.refs.canvas.height,
              radius: Math.sqrt(Math.random() * 2),
              alpha: 1.0,
              decreasing: true,
              dRatio: Math.random()*0.05
            };
        }
        this.setState({stars})  
    }

    drawStars() {
        const stars = this.state.stars;

        const canvas = this.refs.canvas;
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
       
        // stars[i] = star
         this.setState({stars})
    }
    render() {
        
        return (
            <div/>
        );
    }
}