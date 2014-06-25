var simCanvas; var simGfx; var mx; var my; var mouseDown = false; var dragging = false;
var menuCanvas; var menuGfx;
var orbitRadius = [54, 74, 114];
var outerRings = [180, 250];
var centerX = 255; var centerY = 255;
var buttons = [];
var orbiters = []; var traceDots = [];

var showSun = true; var showTrace = false; var useDirectionColoring = false;
var fromPlanet = 1; var toPlanet = 2; var activeOrbit = 0;

var play = true;

var orbitSlider;
var speedSlider;

var starSpots = [];

window.onload = function(){
	simCanvas = document.getElementById('sim');
	simGfx = simCanvas.getContext('2d');

	menuCanvas = document.getElementById('menu');
	menuGfx = menuCanvas.getContext('2d');

	// planets
	orbiters.push(new orbiter(orbitRadius[0], .75, 7, '00FF00')); // venus
	orbiters.push(new orbiter(orbitRadius[1], 1, 7, '0000FF')); // earth
	orbiters.push(new orbiter(orbitRadius[2], .5, 7, 'FF0000')); // mars

	orbiters[1].from = true; orbiters[2].to = true;

	// sun
	orbiters.push(new orbiter(215, 1, 10, 'FFFF00'));

	// orbit radius slider
	orbitSlider = new slider(20,73,80,0,100,'orbit',function(){});
	buttons.push(orbitSlider);

	// speed slider
	speedSlider = new slider(20,393,1,0,2,'speed',function(){});
	buttons.push(speedSlider);

	// orbit Radius
	buttons.push(new button(110,35,true,function(){ // venus orbit
		buttons[3].active = false; buttons[2].active = true;
		activeOrbit = 0;
		orbitSlider.lowVal = 25;
		orbitSlider.highVal = 100;
	}));
	
	buttons.push(new button(220,35,false,function(){ // mars orbit
		buttons[2].active = false; buttons[3].active = true;
		activeOrbit = 2;
		orbitSlider.lowVal = 80;
		orbitSlider.highVal = 200;
	}));

	// view
	buttons.push(new button(80,180,false,function(){  // from mars - 4
		buttons[4].active = true;
		buttons[6].active = false; buttons[8].active = false;
		if(buttons[5].active){ buttons[5].active = false; buttons[7].active = true; toPlanet = 1; }
		setFromPlanet(2);
	}));

	buttons.push(new button(240,180,true,function(){  // to mars - 5
		buttons[5].active = true;
		buttons[7].active = false; buttons[9].active = false;
		if(buttons[4].active){ buttons[4].active = false; buttons[6].active = true; setFromPlanet(1); }
		toPlanet = 2;
	})); 

	buttons.push(new button(80,210,true,function(){  // from earth - 6
		buttons[6].active = true;
		buttons[4].active = false; buttons[8].active = false;
		if(buttons[7].active){ buttons[7].active = false; buttons[9].active = true; toPlanet = 0; }
		setFromPlanet(1);
	}));

	buttons.push(new button(240,210,false,function(){ // to earth - 7
		buttons[7].active = true;
		buttons[5].active = false; buttons[9].active = false;
		if(buttons[6].active){ buttons[6].active = false; buttons[8].active = true; setFromPlanet(0); }
		toPlanet = 1;
	}));

	buttons.push(new button(80,240,false,function(){ // from venus - 8
		buttons[8].active = true;
		buttons[6].active = false; buttons[4].active = false;
		if(buttons[9].active){ buttons[9].active = false; buttons[5].active = true; toPlanet = 2; }
		setFromPlanet(0);
	}));

	buttons.push(new button(240,240,false,function(){  // to venus - 9
		buttons[9].active = true;
		buttons[5].active = false; buttons[7].active = false;
		if(buttons[8].active){ buttons[8].active = false; buttons[4].active = true; setFromPlanet(2); }
		toPlanet = 0;
	}));

	// options
	buttons.push(new checkBox(107,313,false,function(){showTrace = !showTrace;})); // show trace - 10
	buttons.push(new checkBox(215,313,true,function(){showSun = !showSun;})); // show sun - 11
	buttons.push(new checkBox(177,335,false,function(){useDirectionColoring = !useDirectionColoring;})); // direction coloring - 12

	// play / pause
	playButton = new textButton(20,475,'Pause', function(){
		if(play){ play = false;
			playButton.text = 'Play';
			clearMenu();
		} else {
			play = true;
			playButton.text = 'Pause';
			clearMenu();
		}
	});
	buttons.push(playButton);

	// reset speed
	resetButton = new textButton(20,445,'1X speed', function(){
		speedSlider.val = 1;
		clearMenu();
	});
	buttons.push(resetButton);

	// background stars
	for(var i = 0; i < 500; i++){
		var x = Math.random()*510;
		var y = Math.random()*510;
		var d = dist(centerX,centerY,x,y);
		if(d > outerRings[0] && d < outerRings[1]){
			starSpots.push({ x:x, y:y });
		}
	}

	clearMenu();

	setInterval(loop, 1000/60);
}

window.onmousemove = function(e){
	mx = e.x; my = e.y;
	if(dragging === 'speed'){
		speedSlider.val = (mx-510)/260*speedSlider.highVal;
		if(speedSlider.val < speedSlider.lowVal){ speedSlider.val = speedSlider.lowVal; }
		if(speedSlider.val > speedSlider.highVal){ speedSlider.val = speedSlider.highVal; }
		clearMenu();
	}

	if(dragging === 'orbit'){
		orbitSlider.val = (mx-510)/260*orbitSlider.highVal;
		if(orbitSlider.val < orbitSlider.lowVal){ orbitSlider.val = orbitSlider.lowVal; }
		if(orbitSlider.val > orbitSlider.highVal){ orbitSlider.val = orbitSlider.highVal; }
		changeRadius(activeOrbit, orbitSlider.val);
		clearMenu();
	}
}

window.onmousedown = function(e){ for(var b in buttons){ buttons[b].clicked(); mouseDown = true; }}

window.onmouseup = function(e){ mouseDown = false; dragging = false; }

clearMenu = function(){
	menuGfx.fillStyle='000000';
	menuGfx.fillRect(0,0,300,510);

	menuGfx.fillStyle='00FF00';
	menuGfx.font='18px Verdana';
	menuGfx.fillText('Orbit Modifications', 80, 20);
	menuGfx.fillText('Options', 120, 300);
	menuGfx.fillText('Speed', 120, 380);

	var viewCtrl = 120;
	menuGfx.fillText('View Control', 100, viewCtrl);
	menuGfx.fillText('Look From:', 10, viewCtrl+20);
	menuGfx.fillText('Look At:', 200, viewCtrl+20);

	menuGfx.fillStyle='FFFFFF';
	menuGfx.font='14px Verdana';
	menuGfx.fillText('Venus Orbit', 10, 40);
	menuGfx.fillText('Mars Orbit', 130, 40);
	menuGfx.fillText('Orbit Radius: ' + Math.floor(orbitSlider.val) + ' million km', 10, 60);

	var opts = 320;
	menuGfx.fillText('Show Trace', 10, opts);
	menuGfx.fillText('Show Sun', 130, opts);
	menuGfx.fillText('Use Direction Coloring', 10, opts+22);

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

	simGfx.fillStyle='FFFFFF';
	simGfx.strokeStyle='FFFFFF';
	simGfx.lineWidth=.5;
	for(var i in starSpots){
		simGfx.beginPath();
		simGfx.arc(starSpots[i].x,starSpots[i].y,.1,0,Math.PI*2);
		simGfx.fill();
		simGfx.stroke();
	}

	simGfx.strokeStyle='rgb(150,150,150)';
	simGfx.lineWidth=2;
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
	drawLine();
	if(showTrace){ drawTrace(); }
	for(x in orbiters){ orbiters[x].draw(); }
	drawProjection();
}

vec2 = function(x,y){ this.x = x; this.y = y; }
add = function(v1,v2){ return new vec2(v1.x+v2.x, v1.y+v2.y); }
mult = function(v,s){ return new vec2(v.x*s, v.y*s); }
dot = function(v1,v2){ return v1.x*v2.x + v1.y*v2.y; }
neg = function(v){ return new vec2(-v.x, -v.y); }
mag = function(v){ return Math.sqrt(Math.pow(v.x,2) + Math.pow(v.y,2)); }
unit = function(v){ return new vec2(v.x/mag(v), v.y/mag(v)); }

dist = function(x1,y1,x2,y2){ return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2)); }

button = function(x,y,active,action){
	this.x = x; this.y = y; this.active = active; this.action = action;

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

	this.clicked = function(){
		if(mag(add(new vec2(mx-510,my),neg(new vec2(this.x,this.y)))) < 14){
			this.action();
			clearMenu();
		}
	}
}

checkBox = function(x,y,active,action){
	this.x = x; this.y = y; this.active = active; this.action = action;

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

	this.clicked = function(){
		if(mx - 510 > this.x - 5 && mx - 510 < this.x + 10){
			if(my > this.y - 5 && my < this.y + 10){
				if(this.active){ this.active = false; } else { this.active = true; }
				this.action();
				clearMenu();
			}
		}
	}	
}

textButton = function(x,y,text,action){
	this.x = x; this.y = y;
	this.action = action;
	this.text = text;

	this.clicked = function(){
		if(mx - 510 > this.x && mx - 510 < this.x + 260){
			if(my > this.y && my < this.y + 25){
				this.action();
			}
		}
	}

	this.draw = function(){
		menuGfx.fillStyle='000000';
		menuGfx.strokeStyle='rgb(100,100,100)';
		menuGfx.fillRect(this.x,this.y,260,25);
		menuGfx.strokeRect(this.x,this.y,260,25);
		menuGfx.font='20px Verdana';
		menuGfx.fillStyle='FFFFFF';
		menuGfx.strokeStyle='FFFFFF';
		menuGfx.fillText(this.text, this.x+100, this.y+19);
	}
}

slider = function(x,y,startVal,lowVal,highVal,id,action){
	this.x = x; this.y = y; this.val = startVal;
	this.lowVal = lowVal; this.highVal = highVal;
	this.action = action; this.id = id;

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

	this.clicked = function(){
		if(mag(add(new vec2(mx-510,my),neg(new vec2(this.x + 10 + (this.val/this.highVal*240),this.y)))) < 15){
			dragging = this.id;
			this.action();
			clearMenu();
		}		
	}
}

orbiter = function(radius, speed, sz, color){
	this.rad = radius; this.spd = speed;
	this.rot = 0; this.color = color;
	this.sz = sz; this.from = false;

	this.draw = function(){
		if(this.sz === 10 && !showSun){ return; }
		if(this.sz === 10){ this.rot = orbiters[fromPlanet].rot-180; }
		if(play){ this.rot -= (this.spd*speedSlider.val); }

		simGfx.fillStyle=this.color;
		simGfx.strokeStyle=this.color;

		simGfx.save();
		simGfx.translate(centerX, centerY);
		simGfx.rotate(this.rot*Math.PI/180);
		simGfx.translate(0,-this.rad);
		simGfx.beginPath();
		simGfx.arc(0,0,this.sz,0,Math.PI*2);
		simGfx.fill();
		simGfx.stroke();

		if(this.from){
			simGfx.fillStyle='FFFFFF';
			simGfx.strokeStyle='FFFFFF';
			simGfx.beginPath();
			simGfx.arc(0,0,this.sz+5,0,Math.PI*2);
			simGfx.stroke();
		}

		if(this.sz === 10){
			for(var i = 0; i < 25; i++){
				simGfx.save();
				simGfx.rotate((15*i)*Math.PI/180);
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
	}
}

drawProjection = function(){
	simGfx.save();
	simGfx.translate(centerX, centerY);

	var fromPos = new vec2(Math.cos((orbiters[fromPlanet].rot-90)*Math.PI/180)*orbiters[fromPlanet].rad, Math.sin((orbiters[fromPlanet].rot-90)*Math.PI/180)*orbiters[fromPlanet].rad);
	var toPos = new vec2(Math.cos((orbiters[toPlanet].rot-90)*Math.PI/180)*orbiters[toPlanet].rad, Math.sin((orbiters[toPlanet].rot-90)*Math.PI/180)*orbiters[toPlanet].rad);
	
	var fromTo = add(fromPos, neg(toPos));

	fromTo = neg(fromTo);
	
	var maxDist = orbitRadius[fromPlanet]+orbitRadius[toPlanet];
	var curDist = mag(fromTo);

	while(dist(0,0,fromPos.x+fromTo.x,fromPos.y+fromTo.y) < 215){
		fromTo = mult(unit(fromTo),mag(fromTo)+.5);
	}

	if(toPlanet === 0){
		simGfx.fillStyle='00FF00';
		simGfx.strokeStyle='00FF00';
	}
	else if(toPlanet === 1){
		simGfx.fillStyle='0000FF';
		simGfx.strokeStyle='0000FF';
	}else{
		simGfx.fillStyle='FF0000';
		simGfx.strokeStyle='FF0000';
	}

	simGfx.beginPath();
	simGfx.arc(fromPos.x+fromTo.x,fromPos.y+fromTo.y,8+(6-(curDist/maxDist)*6),0,Math.PI*2);
	simGfx.fill();
	simGfx.stroke();

	/*simGfx.fillStyle='FF0000';
	simGfx.strokeStyle='FF0000';
	simGfx.beginPath();
	simGfx.moveTo(0,0);
	simGfx.lineTo(fromPos.x,fromPos.y);
	simGfx.moveTo(0,0);
	simGfx.lineTo(toPos.x,toPos.y);
	simGfx.stroke();
	simGfx.fillStyle='00FF00';
	simGfx.strokeStyle='00FF00';
	simGfx.beginPath();
	simGfx.moveTo(fromPos.x,fromPos.y);
	simGfx.lineTo(fromPos.x+fromTo.x,fromPos.y+fromTo.y);
	simGfx.stroke();*/

	simGfx.restore();
}

drawLine = function(){
	simGfx.save();
	simGfx.translate(centerX, centerY);

	fromPos = new vec2(Math.cos((orbiters[fromPlanet].rot-90)*Math.PI/180)*orbiters[fromPlanet].rad, Math.sin((orbiters[fromPlanet].rot-90)*Math.PI/180)*orbiters[fromPlanet].rad);
	toPos = new vec2(Math.cos((orbiters[toPlanet].rot-90)*Math.PI/180)*orbiters[toPlanet].rad, Math.sin((orbiters[toPlanet].rot-90)*Math.PI/180)*orbiters[toPlanet].rad);

	simGfx.strokeStyle='FFFFFF';
	simGfx.lineWidth=2;
	simGfx.beginPath();
	simGfx.moveTo(fromPos.x, fromPos.y);
	simGfx.lineTo(toPos.x, toPos.y);
	simGfx.stroke();

	simGfx.restore();
}

setFromPlanet = function(n){
	if(n === 0){ orbiters[0].from = true; orbiters[1].from = false; orbiters[2].from = false; fromPlanet = 0; }
	else if(n === 1){ orbiters[0].from = false; orbiters[1].from = true; orbiters[2].from = false; fromPlanet = 1; }
	else{ orbiters[0].from = false; orbiters[1].from = false; orbiters[2].from = true; fromPlanet = 2; }
}

changeRadius = function(planet, rad){
	if(planet === 0){ orbiters[0].rad = rad; orbitRadius[0] = rad; }
	else if(planet === 2){ orbiters[2].rad = rad; orbitRadius[2] = rad; }
}

traceDot = function(x,y){
	this.x = x; this.y = y;

	this.color = '00FF00';
	this.size = 5;

	this.draw = function(){
		simGfx.fillStyle = this.color;
		simGfx.strokeStyle = this.color;

		simGfx.beginPath();
		simGfx.arc(this.x,this.y,this.size,0,Math.PI*2);
		simGfx.fill();
		simGfx.stroke();
	}
}

drawTrace = function(){
	for(d in traceDots){ traceDots[d].draw(); }
}