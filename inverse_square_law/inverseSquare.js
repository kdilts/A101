var canvas; var gfx;
var mx; var my; var mouseDown = false;
var buttons = [];
var xLines = 10; var yLines = 10;
var cam;

window.onload = function(){
	canvas = document.getElementById('myCanvas');
	gfx = canvas.getContext('2d');

	clear();

	buttons[0] = new button(150,300,150,50,'4.0e+004',18,35,true);
	buttons[1] = new button(300,300,150,50,'4.0e+005',18,35,false);
	buttons[2] = new button(450,300,150,50,'4.0e+006',18,35,false);

	cam = new camera(100,100);

	drawLight();
	cam.draw();
	drawGrid();
	drawStats();
	drawButtons();
}

window.onmousemove = function(e){ mx = e.x; my = e.y; }

window.onmousedown = function(e){
	mouseDown = true;
	// check buttons
	for(b in buttons){ buttons[b].clicked(); }

	// move camera
	// collect data
	// update graph data
	// update screen
}

window.onmouseup = function(e){	mouseDown = false; }

clear = function(){
	gfx.fillStyle = '000000';
	gfx.fillRect(0,0,300,300);
	gfx.fillStyle = 'FFFFFF';
	gfx.fillRect(300,0,300,300);
	gfx.fillStyle = 'rgb(200,200,200)';
	gfx.fillRect(0,300,600,50);
	gfx.fillStyle = '000000';
	gfx.font='24px Verdana';
	gfx.fillText('Luminosity:',8,335);
}

drawButtons = function(){ for(var b in buttons){ buttons[b].draw(); } }

drawGrid = function(){
	gfx.fillStyle='000000';
	gfx.font='14px Verdana';
	gfx.fillText('Distance', 415, 296);

	gfx.save();
	gfx.translate(315,170);
	gfx.rotate(-90*Math.PI/180);
	gfx.fillText('Intensity', 0, 0);
	gfx.restore();

	gfx.strokeStyle='000000';
	gfx.lineWidth=2;
	gfx.save();
	gfx.translate(360,0);
	gfx.strokeRect(0,0,240,240);
	gfx.restore();

	
	for(x = 0; x < xLines; x++){
		gfx.save()
		gfx.translate(360+x*(240/xLines),0);
		gfx.beginPath();
		gfx.moveTo(0,0);
		gfx.lineTo(0,240);
		gfx.stroke();
		gfx.restore()
	}

	for(y = 0; y < yLines; y++){
		gfx.save()
		gfx.translate(360,y*(240/yLines));
		gfx.beginPath();
		gfx.moveTo(0,0);
		gfx.lineTo(240,0);
		gfx.stroke();
		gfx.restore()
	}
}

drawStats = function(){
	gfx.fillStyle='FFFFFF';
	gfx.font='14px Verdana';
	gfx.fillText('Distance:', 5, 296);
	gfx.fillText('Intensity: ', 185, 296);
}

drawLight = function(){}

button = function(x,y,sx,sy,text,offX,offY,active){
	this.x = x; this.y = y;
	this.sx = sx; this.sy = sy;
	this.text = text;
	this.offX = offX; this.offY = offY;
	this.active = active;

	this.draw = function(){
		gfx.fillStyle = '000000';
		gfx.fillRect(this.x,this.y,this.sx,this.sy);
		if(this.active){ gfx.fillStyle = 'FFFF00'; }else{ gfx.fillStyle = 'rgb(200,200,200)'; }
		gfx.fillRect(this.x+2,this.y+2,this.sx-4,this.sy-4);
		gfx.fillStyle = '000000';
		gfx.font='24px Verdana';
		gfx.fillText(this.text, this.x+this.offX, this.y+this.offY);
	}

	this.clicked = function(){
		if(mx > this.x && mx < this.x+this.sx){
			if(my > this.y && my < this.y+this.sy){
				for(b in buttons){ buttons[b].active = false; }
				this.active = true;
				drawButtons();
				drawLight();
			}
		}
	}
}

camera = function(x,y){
	this.x = x;
	this.y = y;
	this.rot = 0;

	this.draw = function(){
		gfx.save();
		gfx.translate(this.x,this.y);
		gfx.rotate(this.rot);

		gfx.fillStyle = 'rgb(150,255,255)';
		gfx.strokeStyle = 'rgb(20,20,200)';
		gfx.beginPath();
		gfx.moveTo(0,0);
		gfx.arc(0,0,28,-Math.PI/10,Math.PI/10);
		gfx.fill();
		gfx.stroke();

		gfx.fillStyle = 'rgb(100,20,200)';
		gfx.strokeStyle = 'rgb(100,20,200)';
		gfx.beginPath();
		gfx.moveTo(0,0);
		gfx.arc(0,0,25,-Math.PI/10,Math.PI/10);
		gfx.fill();
		gfx.stroke();

		gfx.restore();
	}

	this.getDist = function(){}
	this.getIntensity = function(){}
}