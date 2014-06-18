var canvas; var gfx;
var mx; var my; var mouseDown = false;

window.onload = function(){
	canvas = document.getElementById('myCanvas');
	gfx = canvas.getContext('2d');

	clear();

	b1 = new button(150,300,150,50,'4.0e+004',18,35,true);
	b1.draw();
	b2 = new button(300,300,150,50,'4.0e+005',18,35,false);
	b2.draw();
	b3 = new button(450,300,150,50,'4.0e+006',18,35,false);
	b3.draw();
}

window.onmousemove = function(e){ mx = e.x; my = e.y; }

window.onmousedown = function(e){
	mouseDown = true;
}

window.onmouseup = function(e){
	mouseDown = false;
}

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

drawCamera = function(){}

drawGrid = function(){}

drawStats = function(){}

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

	this.clicked = function(){}
}

camera = function(){
	this.x; this.y; this.rot;

	this.draw = function(){}
	this.getDist = function(){}
	this.getIntensity = function(){}
}