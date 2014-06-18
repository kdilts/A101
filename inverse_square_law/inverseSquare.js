var canvas; var gfx;
var mx; var my; var mouseDown = false;

window.onload = function(){
	canvas = document.getElementById('myCanvas');
	gfx = canvas.getContext('2d');

	clear();

	b = new button(0,300,100,50,'test');
	b.draw();
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
}

drawCamera = function(){}

drawGrid = function(){}

drawStats = function(){}

drawLight = function(){}

button = function(x,y,sx,sy,text){
	this.x = x; this.y = y;
	this.sx = sx; this.sy = sy;
	this.text = text;

	this.draw = function(){
		gfx.fillStyle = '000000';
		gfx.fillRect(this.x,this.y,this.sx,this.sy);
		gfx.fillStyle = 'rgb(200,200,200)';
		gfx.fillRect(this.x+1,this.y+1,this.sx-2,this.sy-2);
		gfx.fillStyle = '000000';
		gfx.font='24px Verdana';
		gfx.fillText(this.text, this.x+this.sx/4, this.y+this.sy/1.5);
	}

	this.clicked = function(){}
}

camera = function(){
	this.x; this.y; this.rot;

	this.draw = function(){}
	this.getDist = function(){}
	this.getIntensity = function(){}
}