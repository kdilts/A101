var simCanvas; var simGfx;
var menuCanvas; var menuGfx;
var orbitRadius = [54, 74, 114];
var outerRings = [180, 250];
var centerX = 255; var centerY = 255;
var buttons = [];
 orbiters = [];

window.onload = function(){
	simCanvas = document.getElementById('sim');
	simGfx = simCanvas.getContext('2d');

	menuCanvas = document.getElementById('menu');
	menuGfx = menuCanvas.getContext('2d');

	// planets
	orbiters.push(new orbiter(orbitRadius[0], .005, 7, '00FF00'));
	orbiters.push(new orbiter(orbitRadius[1], .007, 7, '0000FF'));
	orbiters.push(new orbiter(orbitRadius[2], .001, 7, 'FF0000'));

	// sun
	orbiters.push(new orbiter(215, .005, 10, 'FFFF00'))

	// slider
	buttons.push(new slider(20,73,80,0,100));

	// orbit Radius
	buttons.push(new button(110,35,true));
	buttons.push(new button(220,35,false));

	// view
	buttons.push(new button(80,180,false));
	buttons.push(new button(240,180,true));
	buttons.push(new button(80,210,true));
	buttons.push(new button(240,210,false));
	buttons.push(new button(80,240,false));
	buttons.push(new button(240,240,false));

	// options
	buttons.push(new checkBox(107,313,true));
	buttons.push(new checkBox(215,313,false));
	buttons.push(new checkBox(177,333,false));

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

	for(var b in buttons){ buttons[b].draw(); }
}

clearSim = function(){
	simGfx.fillStyle='000000';
	simGfx.fillRect(0,0,600,600);

	simGfx.fillStyle='FFFF00';
	simGfx.strokeStyle='FFFF00';
	simGfx.lineWidth=2;
	simGfx.beginPath();
	simGfx.arc(centerX,centerY,12,0,Math.PI*2);
	simGfx.fill();
	simGfx.stroke();

	simGfx.strokeStyle='rgb(150,150,150)';
	for(var d in orbitRadius){
		simGfx.beginPath();
		simGfx.arc(centerX,centerY,orbitRadius[d],0,Math.PI*2);
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
	for(x in orbiters){ orbiters[x].draw(); }
}

vec2 = function(x,y){ this.x = x; this.y = y; }
add = function(v1,v2){ return new vec2(v1.x+v2.x, v1.y+v2.y); }
mult = function(v,s){ return new vec2(v.x*s, v.y*s); }
dot = function(v1,v2){ return v1.x*v2.x + v1.y*v2.y; }
neg = function(v){ return new vec2(-v.x, -v.y); }
mag = function(v){ return Math.sqrt(Math.pow(v.x,2) + Math.pow(v.y,2)); }

button = function(x,y,active){
	this.x = x; this.y = y; this.active = active;

	this.draw = function(){
		menuGfx.fillStyle = 'rgb(200,200,200)';
		menuGfx.strokeStyle = 'rgb(100,100,100)';
		
		menuGfx.lineWidth=2;

		menuGfx.beginPath();
		menuGfx.arc(this.x, this.y, 7, 0, Math.PI*2);
		menuGfx.fill();
		menuGfx.stroke();

		if(this.active){
			menuGfx.fillStyle = '0000FF';
			menuGfx.strokeStyle = '0000FF';

			menuGfx.beginPath();
			menuGfx.arc(this.x, this.y, 2, 0, Math.PI*2);
			menuGfx.fill();
			menuGfx.stroke();			
		}
	}

	this.clicked = function(){}
}

checkBox = function(x,y,active){
	this.x = x; this.y = y; this.active = active;

	this.draw = function(){
		menuGfx.fillStyle = 'rgb(200,200,200)';
		menuGfx.fillRect(this.x-5, this.y-5, 15, 15);
		menuGfx.strokeStyle = 'rgb(100,100,100)';
		menuGfx.strokeRect(this.x-5, this.y-5, 15, 15);

		if(this.active){
			menuGfx.fillStyle = '0000FF';
			menuGfx.strokeStyle = '0000FF';
			menuGfx.fillRect(this.x-2,this.y-2,9,9);
		}
	}

	this.clicked = function(){}	
}

slider = function(x,y,startVal,lowVal,highVal){
	this.x = x; this.y = y; this.val = startVal;
	this.lowVal = lowVal; this.highVal = highVal;

	this.draw = function(){
		menuGfx.fillStyle='rgb(100,100,100)';
		menuGfx.fillRect(this.x,this.y,260,20);
		menuGfx.fillStyle='000000';
		menuGfx.fillRect(this.x+2,this.y+9,256,2);

		menuGfx.fillStyle='0000FF';
		menuGfx.save();
		menuGfx.translate(this.x + 10 + (this.val/this.highVal*240), this.y+12);
		menuGfx.rotate(45*Math.PI/180);
		menuGfx.fillRect(-8,-8,13,13);
		menuGfx.restore();

	}

	this.clicked = function(){}
}

orbiter = function(radius, speed, sz, color){
	this.rad = radius; this.spd = speed;
	this.rot = 0; this.color = color;
	this.sz = sz;

	this.draw = function(){
		simGfx.fillStyle=this.color;
		simGfx.strokeStyle=this.color;

		simGfx.save();
		simGfx.translate(centerX, centerY);
		simGfx.rotate(this.rot);
		simGfx.translate(0,-this.rad);
		simGfx.beginPath();
		simGfx.arc(0,0,this.sz,0,Math.PI*2);
		simGfx.fill();
		simGfx.stroke();

		if(this.sz === 10){
			for(var i = 0; i < 25; i++){
				simGfx.save();
				simGfx.rotate(10*i);
				simGfx.beginPath();
				simGfx.moveTo(-7,0);
				simGfx.lineTo(0,20);
				simGfx.lineTo(7,0);
				simGfx.fill();
				simGfx.stroke();
				simGfx.restore();
			}
		}

		simGfx.restore();
		this.rot -= this.spd;
	}
}