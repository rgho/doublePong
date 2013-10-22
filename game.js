// RequestAnimFrame: a browser API for getting smooth animations
window.requestAnimFrame = (function(){
	return window.requestAnimationFrame    || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     ||  
		function( callback ){
			return window.setTimeout(callback, 1000 / 60);
		};
})();



// Initialize canvas and required variables 
var canvas = document.getElementById("canvas"); 
var ctx = canvas.getContext("2d"); // Create canvas context



// Window's width and height
var W = window.innerWidth;
var H = window.innerHeight;

// Set the canvas's height and width to full screen 
canvas.width = W;
canvas.height = H;

// Make the canvas black!
ctx.fillRect(0, 0, W, H);

// Create game objects
var particles = [], // Array containing particles 
ball = {}, // Ball object 
paddles = [2]; // Array containing two paddles
var mouse = {};

// Ball object has an x and y coordinate, radius, color, 
// and velocities in each dimension. and a draw function
ball = {
	x: 50, 
	y: 50,
	r: 5,
	c: "white",
	vx: 4,
	vy: 8,
	draw: function() {
    		ctx.beginPath();
    		ctx.fillStyle = this.c;
    		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
    		ctx.fill();
		}
	};

// Function for creating paddles 
function Paddle(pos) { 
	// Height and width 
	this.h = 5; this.w = 150;
	// Paddle's position
	this.x = W/2 - this.w/2;
	this.y = (pos == "top") ? 0 : H - this.h;
}

// Push two new paddles into the paddles[] array 
paddles.push(new Paddle("bottom")); 
paddles.push(new Paddle("top"));

// Function to paint canvas 
function paintCanvas() { 
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, W, H); 
}

// Draw everything on canvas
function draw() {
	// PAINT BG
	paintCanvas();
	// DRAW PADDLES
	for(var i = 0; i < paddles.length; i++) {
		p = paddles[i];
		ctx.fillStyle = "white";
		ctx.fillRect(p.x, p.y, p.w, p.h);
	}
	// DRAW BALL
	ball.draw();

	update();
}

// Function for running the whole animation 
function animloop() { 
	requestAnimFrame(animloop); 
	draw(); 
}

function update() { 
	// Move the ball 
	ball.x += ball.vx; 
	ball.y += ball.vy;

	// Move the paddles on mouse move 
	if(mouse.x && mouse.y) {
		for(var i = 1; i < paddles.length; i++) {
			p = paddles[i];
			p.x = mouse.x - p.w/2;
		}		
	}
}

// LISTEN FOR MOUS MOVES.
canvas.addEventListener("mousemove", trackPosition, true);


// Track the position of mouse cursor 
function trackPosition(e) { 
	mouse.x = e.pageX; 
	mouse.y = e.pageY; 
}

animloop();