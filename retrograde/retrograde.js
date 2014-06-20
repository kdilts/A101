var simCanvas; var simGfx;
var menuCanvas; var menuGfx;
var orbitDiameters = [90, 110, 150];
var outerRings = [180, 250];
var centerX = 255; var centerY = 255;

window.onload = function(){
	simCanvas = document.getElementById('sim');
	simGfx = simCanvas.getContext('2d');

	menuCanvas = document.getElementById('menu');
	menuGfx = menuCanvas.getContext('2d');

	clearMenu();

	setInterval(loop, 1000/60);
}

clearMenu = function(){
	menuGfx.fillStyle='000000';
	menuGfx.fillRect(0,0,300,510);

	menuGfx.fillStyle='00FF00';
	menuGfx.font='18px Verdana';
	menuGfx.fillText('Orbit Modifications', 80, 20);
	menuGfx.fillText('Options', 80, 300);

	var viewCtrl = 120;
	menuGfx.fillText('View Control', 80, viewCtrl);
	menuGfx.fillText('Look From:', 10, viewCtrl+20);
	menuGfx.fillText('Look At:', 200, viewCtrl+20);

	menuGfx.fillStyle='FFFFFF';
	menuGfx.font='14px Verdana';
	menuGfx.fillText('Venus Orbit', 10, 40);
	menuGfx.fillText('Mars Orbit', 130, 40);
	menuGfx.fillText('Orbit Radius: ' + 108 + ' million km', 10, 60);

	var opts = 320;
	menuGfx.fillText('Show Trace', 10, opts);
	menuGfx.fillText('Show Sun', 130, opts);
	menuGfx.fillText('Use Direction Coloring', 10, opts+20);

	var planets = 190;
	menuGfx.font='18px Verdana';
	menuGfx.fillStyle='FF0000';
	menuGfx.fillText('Mars', 140, planets);
	menuGfx.fillStyle='0000FF';
	menuGfx.fillText('Earth', 137, planets+30);
	menuGfx.fillStyle='00FF00';
	menuGfx.fillText('Venus', 135, planets+60);
}

clearSim = function(){
	simGfx.fillStyle='000000';
	simGfx.fillRect(0,0,600,600);

	simGfx.fillStyle='FFFF00';
	simGfx.strokeStyle='FFFF00';
	simGfx.lineWidth=2;
	simGfx.beginPath();
	simGfx.arc(centerX,centerY,8,0,Math.PI*2);
	simGfx.fill();
	simGfx.stroke();

	simGfx.strokeStyle='rgb(150,150,150)';
	for(var d in orbitDiameters){
		simGfx.beginPath();
		simGfx.arc(centerX,centerY,orbitDiameters[d],0,Math.PI*2);
		simGfx.stroke();
	}

	simGfx.strokeStyle='rgb(100,100,100)';
	for(var d in outerRings){
		simGfx.beginPath();
		simGfx.arc(centerX,centerY,outerRings[d],0,Math.PI*2);
		simGfx.stroke();
	}
}

loop = function(){
	clearSim();
}

vec2 = function(x,y){ this.x = x; this.y = y; }
add = function(v1,v2){ return new vec2(v1.x+v2.x, v1.y+v2.y); }
mult = function(v,s){ return new vec2(v.x*s, v.y*s); }
dot = function(v1,v2){ return v1.x*v2.x + v1.y*v2.y; }
neg = function(v){ return new vec2(-v.x, -v.y); }
mag = function(v){ return Math.sqrt(Math.pow(v.x,2) + Math.pow(v.y,2)); }

button = function(x,y,active){
	this.x = x; this.y = y; this.active = active;

	this.draw = function(){}
	this.clicked = function(){}
}

checkBox = function(x,y,active){
	this.x = x; this.y = y; this.active = active;

	this.draw = function(){}
	this.clicked = function(){}	
}

slider = function(x,y,lowVal,highVal){
	this.x = x; this.y = y;
	this.lowVal = lowVal; this.highVal = highVal;

	this.draw = function(){}
	this.clicked = function(){}
}