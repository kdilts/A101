<html><head><script type='text/javascript'>
// Kevin Dilts 2016
var cwidth; var cheight;
var canvas; var gfx;

var mx; var my;

var orbitDiam = [.5*.72,.5,.5*1.5];
var thetas = [0,0,0];

var lookFrom = 1; var lookAt = 2;

var orbitAdj = 0;
var orbitModMin = .75;
var orbitModMax = 1.25;
var venusMod = 1;
var marsMod = 1;

var showTrace = false;
var showSun = true;
var showColoring = false;

var lh = 25;

var paused = false;

var sli1 = .5; var sli2 = .5;

var dragging1 = false;
var dragging2 = false;

var coords = [];

var oldpos;
var newpos;
var dir;

var trace; var traceLimit = 20; var traceSkip = 4;

window.onload = function(){
	canvas = document.createElement('canvas');
	canvas.width = cwidth = window.innerWidth;
	canvas.height = cheight = window.innerHeight;
	canvas.setAttribute('style','position:absolute; left:0; top:0');
	document.body.appendChild(canvas);
	gfx = canvas.getContext('2d');

	genCoords();

	setInterval(render, 1000/60);
}

window.onresize = function(){
	canvas.width = cwidth = window.innerWidth;
	canvas.height = cheight = window.innerHeight;
}

window.onmousemove = function(e){
	mx = e.x; my = e.y;
	if(!mx){ mx = e.clientX; my = e.clientY; }

	if(dragging1){
		var min = cwidth*1/8-35;
		var max = cwidth*1/8+145;

		sli1 = lerp(min,max, mx-cwidth*3/5, 0,1);

		if(sli1 < 0){ sli1 = 0; }
		if(sli1 > 1){ sli1 = 1; }

		if(orbitAdj == 0){
			venusMod = lerp(0,1,sli1,orbitModMin,orbitModMax);
		}else{
			marsMod = lerp(0,1,sli1,orbitModMin,orbitModMax);
		}
	}

	if(dragging2){
		var min = cwidth*1/8-35;
		var max = cwidth*1/8+145;

		sli2 = lerp(min,max, mx-cwidth*3/5, 0,1);

		if(sli2 < 0){ sli2 = 0; }
		if(sli2 > 1){ sli2 = 1; }
	}
}

window.onmouseup = function(){ dragging1 = dragging2 = false; }

window.onmousedown = function(e){
	mx = parseInt(mx); my = parseInt(my);
	
	if(mx > cwidth*3/5){ mx = mx - cwidth*3/5 }else{ return; }

	// venus orbit
	if(Math.abs(mx - (cwidth*1/8+45)) < 10){
		if(Math.abs(my - (lh*1.8)) < 10){
			orbitAdj = 0;
			sli1 = lerp(orbitModMin,orbitModMax,venusMod,0,1);
		}
	}

	// mars orbit
	if(Math.abs(mx - (cwidth*1/8+170)) < 10){
		if(Math.abs(my - (lh*1.8)) < 10){
			orbitAdj = 1;
			sli1 = lerp(orbitModMin,orbitModMax,marsMod,0,1);
		}
	}

	// look from venus
	if(Math.abs(mx - (cwidth*1/8)) < 10){
		if(Math.abs(my - (lh*8.3)) < 10){
			if(lookAt !== 0){
				lookFrom = 0;
				trace = [];
			}
		}
	}

	// look from earth
	if(Math.abs(mx - (cwidth*1/8)) < 10){
		if(Math.abs(my - (lh*9.8)) < 10){
			if(lookAt !== 1){
				lookFrom = 1;
				trace = [];
			}
		}
	}

	// look from mars
	if(Math.abs(mx - (cwidth*1/8)) < 10){
		if(Math.abs(my - (lh*11.3)) < 10){
			if(lookAt !== 2){
				lookFrom = 2;
				trace = [];
			}
		}
	}

	// look at venus
	if(Math.abs(mx - (cwidth*1/8+120)) < 10){
		if(Math.abs(my - (lh*8.3)) < 10){
			if(lookFrom !== 0){
				lookAt = 0;
				trace = [];
			}
		}
	}

	// look at earth
	if(Math.abs(mx - (cwidth*1/8+120)) < 10){
		if(Math.abs(my - (lh*9.8)) < 10){
			if(lookFrom !== 1){
				lookAt = 1;
				trace = [];
			}
		}
	}

	// look at mars
	if(Math.abs(mx - (cwidth*1/8+120)) < 10){
		if(Math.abs(my - (lh*11.3)) < 10){
			if(lookFrom !== 2){
				lookAt = 2;
				trace = [];
			}
		}
	}

	// show trace
	if(mx > cwidth*1/8+35 && mx < cwidth*1/8+55){
		if(my > lh*13.4 && my < lh*13.4+20){
			if(showTrace){
				showTrace = false;
			}else{
				showTrace = true;
				trace = [];
				traceSkip = 10;
			}
		}
	}

	// show sun
	if(mx > cwidth*1/8+160 && mx < cwidth*1/8+180){
		if(my > lh*13.4 && my < lh*13.4+20){
			if(showSun){
				showSun = false;
			}else{
				showSun = true;
			}
		}
	}

	// use direction coloring
	if(mx > cwidth*1/8+130 && mx < cwidth*1/8+150){
		if(my > lh*14.4 && my < lh*14.4+20){
			if(showColoring){
				showColoring = false;
			}else{
				showColoring = true;
			}
		}
	}

	// reset speed
	if(mx > cwidth*1/8-5 && mx < cwidth*1/8+129){
		if(my > lh*18 && my < lh*18+24){
			sli2 = .5;
		}
	}

	// pause / play
	if(mx > cwidth*1/8-5 && mx < cwidth*1/8+129){
		if(my > lh*19.2 && my < lh*19.2+24){
			if(paused){
				paused = false;
			}else{
				paused = true;
			}
		}
	}

	// slider 1
	if(Math.abs(mx - (cwidth*1/8-35+(180*sli1))) < 10){
		if(Math.abs(my - (lh*4+12)) < 10){
			dragging1 = true;
		}
	}

	// slider 2
	if(Math.abs(mx - (cwidth*1/8-35+(180*sli2))) < 10){
		if(Math.abs(my - (lh*16.5+12)) < 10){
			dragging2 = true;
		}
	}
}

render = function(){
	clearCanvas();

	drawSun();
	drawStars();
	drawRings();
	if(showTrace){
		drawTrace();
	}
	drawPlanets();

	drawMenu();
}

drawTrace = function(){
	gfx.save();
	gfx.translate((cwidth*3/5)/2, cheight/2);

	for(var i in trace){ trace[i].draw(); }

	gfx.restore();
}

traceDot = function(x,y,c,s){
	this.x = x; this.y = y;
	this.c = c; this.s = s;
	this.draw = function(){
		var d;
		if(cwidth*3/5*.45 <= cheight/2){
			d = cwidth*3/5*.35;
		}else{
			d = cheight*.4;
		}
		gfx.fillStyle = gfx.strokeStyle = c;
		gfx.beginPath();
		gfx.arc(this.x*d,this.y*d,s,0,Math.PI*2);
		gfx.fill(); gfx.stroke();
	}
}

clearCanvas = function(){
	gfx.fillStyle = gfx.strokeStyle = 'black';
	gfx.fillRect(0,0,cwidth,cheight);
}

genCoords = function(){
	for(var i = 0; i < 100; i++){
		var r = Math.random()*.09+.355;
		var t = Math.random()*Math.PI*2;
		var x = r*Math.cos(t);
		var y = r*Math.sin(t);
		coords[i] = {x:x, y:y};
	}
}

drawStars = function(){
	gfx.save();
	gfx.translate( (cwidth*3/5)/2,cheight/2 );
	gfx.fillStyle = gfx.strokeStyle = 'white';

	if(cwidth*3/5*.45 <= cheight/2){
		for(var i in coords){
			gfx.beginPath();
			gfx.arc(coords[i].x*cwidth*3/5, coords[i].y*cwidth*3/5, 1, 0,Math.PI*2);
			gfx.fill(); gfx.stroke();
		}
	}else{
		for(var i in coords){
			gfx.beginPath();
			gfx.arc(coords[i].x*cheight*1.125, coords[i].y*cheight*1.125, 1, 0,Math.PI*2);
			gfx.fill(); gfx.stroke();
		}		
	}

	gfx.restore();
}

drawMenu = function(){
	gfx.save();
	gfx.translate(cwidth*3/5, 0);

	// menu text
	gfx.fillStyle = gfx.strokeStyle = 'green';
	gfx.font = '20px verdana';
	gfx.fillText('Orbit Modifications',cwidth*1/5-100, lh);
	gfx.fillText('View Control',cwidth*1/5-50, lh*6);
	gfx.fillText('Look From:',cwidth*1/5-140, lh*7);
	gfx.fillText('Look At:',cwidth*1/5+50, lh*7);
	gfx.fillText('Options',cwidth*1/5-40, lh*13);
	gfx.fillText('Speed',cwidth*1/5-35, lh*16);
	
	gfx.fillStyle = gfx.strokeStyle = 'white';
	gfx.fillText('Reset Speed',cwidth*1/8, lh*18.75);

	if(!paused){
		gfx.fillText('Pause',cwidth*1/8+30, lh*20);
	}else{
		gfx.fillText('Play',cwidth*1/8+40, lh*20);
	}

	gfx.font = '16px verdana'
	gfx.fillText('Venus orbit',cwidth*1/8-70, lh*2);
	gfx.fillText('Mars orbit',cwidth*1/8+70, lh*2);

	var diam = 0;
	if(orbitAdj == 0){
		diam = (venusMod * 108.21).toFixed(0);
	}else{
		diam = (marsMod * 277.92).toFixed(0);
	}
	gfx.fillText('Orbit radius: ' + diam + ' million km',cwidth*1/8-60, lh*3);
	
	gfx.fillText('Show Trace',cwidth*1/8-70, lh*14);
	gfx.fillText('Show Sun',cwidth*1/8+70, lh*14);
	gfx.fillText('Use Direction Coloring',cwidth*1/8-60, lh*15);

	gfx.fillStyle = gfx.strokeStyle = 'green';	
	gfx.fillText('Venus',cwidth*1/8+35, lh*8.5);

	gfx.fillStyle = gfx.strokeStyle = 'blue';
	gfx.fillText('Earth',cwidth*1/8+35, lh*10);

	gfx.fillStyle = gfx.strokeStyle = 'red';
	gfx.fillText('Mars',cwidth*1/8+35, lh*11.5);

	// bubbles
		// background
	gfx.fillStyle = gfx.strokeStyle = 'grey';
	
	gfx.beginPath();
	gfx.arc(cwidth*1/8+45, lh*1.8, 10, 0,Math.PI*2);
	gfx.fill(); gfx.stroke();

	gfx.beginPath();
	gfx.arc(cwidth*1/8+170, lh*1.8, 10, 0,Math.PI*2);
	gfx.fill(); gfx.stroke();

	gfx.beginPath();
	gfx.arc(cwidth*1/8, lh*8.3, 10, 0,Math.PI*2);
	gfx.fill(); gfx.stroke();

	gfx.beginPath();
	gfx.arc(cwidth*1/8+120, lh*8.3, 10, 0,Math.PI*2);
	gfx.fill(); gfx.stroke();

	gfx.beginPath();
	gfx.arc(cwidth*1/8, lh*9.8, 10, 0,Math.PI*2);
	gfx.fill(); gfx.stroke();

	gfx.beginPath();
	gfx.arc(cwidth*1/8+120, lh*9.8, 10, 0,Math.PI*2);
	gfx.fill(); gfx.stroke();

	gfx.beginPath();
	gfx.arc(cwidth*1/8, lh*11.3, 10, 0,Math.PI*2);
	gfx.fill(); gfx.stroke();

	gfx.beginPath();
	gfx.arc(cwidth*1/8+120, lh*11.3, 10, 0,Math.PI*2);
	gfx.fill(); gfx.stroke();

		// border
	gfx.fillStyle = gfx.strokeStyle = 'rgb(75,75,75)';
	gfx.lineWidth = 3;

	gfx.beginPath();
	gfx.arc(cwidth*1/8+45, lh*1.8, 10, 0,Math.PI*2);
	gfx.stroke();

	gfx.beginPath();
	gfx.arc(cwidth*1/8+170, lh*1.8, 10, 0,Math.PI*2);
	gfx.stroke();

	gfx.beginPath();
	gfx.arc(cwidth*1/8, lh*8.3, 10, 0,Math.PI*2);
	gfx.stroke();

	gfx.beginPath();
	gfx.arc(cwidth*1/8+120, lh*8.3, 10, 0,Math.PI*2);
	gfx.stroke();

	gfx.beginPath();
	gfx.arc(cwidth*1/8, lh*9.8, 10, 0,Math.PI*2);
	gfx.stroke();

	gfx.beginPath();
	gfx.arc(cwidth*1/8+120, lh*9.8, 10, 0,Math.PI*2);
	gfx.stroke();

	gfx.beginPath();
	gfx.arc(cwidth*1/8, lh*11.3, 10, 0,Math.PI*2);
	gfx.stroke();

	gfx.beginPath();
	gfx.arc(cwidth*1/8+120, lh*11.3, 10, 0,Math.PI*2);
	gfx.stroke();

	gfx.lineWidth = 1;

		// checks
	gfx.fillStyle = gfx.strokeStyle = 'blue';

	if(orbitAdj == 0){
		gfx.beginPath();
		gfx.arc(cwidth*1/8+45, lh*1.8, 5, 0,Math.PI*2);
		gfx.fill(); gfx.stroke();
	}else{
		gfx.beginPath();
		gfx.arc(cwidth*1/8+170, lh*1.8, 5, 0,Math.PI*2);
		gfx.fill(); gfx.stroke();
	}

	if(lookFrom == 0){
		gfx.beginPath();
		gfx.arc(cwidth*1/8, lh*8.3, 5, 0,Math.PI*2);
		gfx.fill(); gfx.stroke();
	}

	if(lookAt == 0){
		gfx.beginPath();
		gfx.arc(cwidth*1/8+120, lh*8.3, 5, 0,Math.PI*2);
		gfx.fill(); gfx.stroke();
	}

	if(lookFrom == 1){
		gfx.beginPath();
		gfx.arc(cwidth*1/8, lh*9.8, 5, 0,Math.PI*2);
		gfx.fill(); gfx.stroke();
	}

	if(lookAt == 1){
		gfx.beginPath();
		gfx.arc(cwidth*1/8+120, lh*9.8, 5, 0,Math.PI*2);
		gfx.fill(); gfx.stroke();
	}

	if(lookFrom == 2){
		gfx.beginPath();
		gfx.arc(cwidth*1/8, lh*11.3, 5, 0,Math.PI*2);
		gfx.fill(); gfx.stroke();
	}

	if(lookAt == 2){
		gfx.beginPath();
		gfx.arc(cwidth*1/8+120, lh*11.3, 5, 0,Math.PI*2);
		gfx.fill(); gfx.stroke();
	}

	// boxes
		// background
	gfx.fillStyle = gfx.strokeStyle = 'grey';
	gfx.fillRect(cwidth*1/8+35, lh*13.4, 20,20);
	gfx.fillRect(cwidth*1/8+160, lh*13.4, 20,20);
	gfx.fillRect(cwidth*1/8+130, lh*14.4, 20,20);
		// border
	gfx.fillStyle = gfx.strokeStyle = 'rgb(75,75,75)';
	gfx.lineWidth = 3;
	gfx.strokeRect(cwidth*1/8+35, lh*13.4, 20,20);
	gfx.strokeRect(cwidth*1/8+160, lh*13.4, 20,20);
	gfx.strokeRect(cwidth*1/8+130, lh*14.4, 20,20);
	gfx.lineWidth = 1;
		// checks
	gfx.fillStyle = gfx.strokeStyle = 'blue';
	if(showTrace){ gfx.fillRect(cwidth*1/8+38, lh*13.4+3, 14,14); }
	if(showSun){ gfx.fillRect(cwidth*1/8+163, lh*13.4+3, 14,14); }
	if(showColoring){ gfx.fillRect(cwidth*1/8+133, lh*14.4+3, 14,14); }

	// sliders
		// background
	gfx.fillStyle = gfx.strokeStyle = 'grey';
	gfx.fillRect(cwidth*1/8-45, lh*4, 200,24);
	gfx.fillRect(cwidth*1/8-45, lh*16.5, 200,24);
		// track line
	gfx.fillStyle = gfx.strokeStyle = 'black';
	gfx.fillRect(cwidth*1/8-42, lh*4+12, 194,2);
	gfx.fillRect(cwidth*1/8-42, lh*16.5+12, 194,2);
		// slider button
	if(!dragging1){
		gfx.fillStyle = gfx.strokeStyle = 'blue';
	}else{
		gfx.fillStyle = gfx.strokeStyle = 'lightblue';
	}
	gfx.beginPath();
	gfx.arc(cwidth*1/8-35+(180*sli1), lh*4+12, 8, 0, Math.PI*2);
	gfx.fill(); gfx.stroke();

	if(!dragging2){
		gfx.fillStyle = gfx.strokeStyle = 'blue';
	}else{
		gfx.fillStyle = gfx.strokeStyle = 'lightblue';
	}
	gfx.beginPath();
	gfx.arc(cwidth*1/8-35+(180*sli2), lh*16.5+12, 8, 0, Math.PI*2);
	gfx.fill(); gfx.stroke();

	// buttons
	gfx.fillStyle = gfx.strokeStyle = 'grey';
	gfx.lineWidth = 3;
	gfx.strokeRect(cwidth*1/8-5, lh*18, 134,24);
	gfx.strokeRect(cwidth*1/8-5, lh*19.2, 134,24);
	gfx.restore();
}

drawSun = function(){
	gfx.fillStyle = gfx.strokeStyle = 'yellow';
	gfx.beginPath();
	gfx.arc((cwidth*3/5)/2,cheight/2, cwidth/100 ,0,Math.PI*2);
	gfx.fill(); gfx.stroke();
}

drawRings = function(){
	gfx.save();
	gfx.translate((cwidth*3/5)/2,cheight/2);
	gfx.lineWidth = 2;
	gfx.fillStyle = gfx.strokeStyle = 'white';
	
	if(cwidth*3/5*.45 <= cheight/2){
		// planet rings - variable size
		gfx.beginPath();
		gfx.arc(0,0, cwidth*3/5*.35*orbitDiam[0]*venusMod ,0,Math.PI*2);
		gfx.stroke();
		
		gfx.beginPath();
		gfx.arc(0,0, cwidth*3/5*.35*orbitDiam[1] ,0,Math.PI*2);
		gfx.stroke();

		gfx.beginPath();
		gfx.arc(0,0, cwidth*3/5*.35*orbitDiam[2]*marsMod ,0,Math.PI*2);
		gfx.stroke();

		// outer 2 rings - fixed
		gfx.beginPath();
		gfx.arc(0,0, cwidth*3/5*.35 ,0,Math.PI*2);
		gfx.stroke();

		gfx.beginPath();
		gfx.arc(0,0, cwidth*3/5*.45,0,Math.PI*2);
		gfx.stroke();
	}else{
		// planet rings - variable size
		gfx.beginPath();
		gfx.arc(0,0, cheight*.4*orbitDiam[0]*venusMod ,0,Math.PI*2);
		gfx.stroke();
		
		gfx.beginPath();
		gfx.arc(0,0, cheight*.4*orbitDiam[1] ,0,Math.PI*2);
		gfx.stroke();

		gfx.beginPath();
		gfx.arc(0,0, cheight*.4*orbitDiam[2]*marsMod ,0,Math.PI*2);
		gfx.stroke();

		// outer 2 rings - fixed
		gfx.beginPath();
		gfx.arc(0,0, cheight*.4 ,0,Math.PI*2);
		gfx.stroke();

		gfx.beginPath();
		gfx.arc(0,0, cheight*.5,0,Math.PI*2);
		gfx.stroke();
	}

	gfx.restore();
}

drawPlanets = function(){
	var d; var outerD;
	if(cwidth*3/5*.45 <= cheight/2){
		d = cwidth*3/5*.35; // max diameter of inner planet orbits
		outerD = cwidth*3/5*.4; // diameter of outer ring stuff
	}else{
		d = cheight*.4; // max diameter of inner planet orbits
		outerD = cheight*.45; // diameter of outer ring stuff
	}
	// calculate planet positions
	var positions = [
		{
			x:d*orbitDiam[0]*Math.cos(thetas[0])*venusMod,
			y:d*orbitDiam[0]*Math.sin(thetas[0])*venusMod
		},

		{
			x:d*orbitDiam[1]*Math.cos(thetas[1]),
			y:d*orbitDiam[1]*Math.sin(thetas[1])
		},

		{
			x:d*orbitDiam[2]*Math.cos(thetas[2])*marsMod,
			y:d*orbitDiam[2]*Math.sin(thetas[2])*marsMod
		}
	];

	// vector calculations for projection
	var fromPos = new vec2(
		positions[lookFrom].x,
		positions[lookFrom].y
	);
	
	var toPos = new vec2(
		positions[lookAt].x,
		positions[lookAt].y
	);

	var fromTo = add(fromPos, neg(toPos));
	fromTo = mult(unit(neg(fromTo)),outerD);

	// update planet rotations
	if(!paused){
		//thetas[0] -= Math.PI/180*(1/.723)*2*(sli2*2);
		thetas[0] -= Math.PI/180*(1/.723)*(sli2*2);
		thetas[1] -= Math.PI/180*(sli2*2);
		thetas[2] -= Math.PI/180*(1/1.88)*(sli2*2);
		//thetas[2] -= Math.PI/180*(1/1.88)/2*(sli2*2);

		// reset theta after each orbit
		for(var i in thetas){
			if(thetas[i] < 0){
				thetas[i] += Math.PI*2;
			}
		}
	}

	gfx.save();
	gfx.translate((cwidth*3/5)/2, cheight/2);

	// ensure that projected view stays at correct radius
	var d1 = dist(0,0,outerD,0);
	var d2 = dist(0,0,fromPos.x+fromTo.x,fromPos.y+fromTo.y);

	while(d2 > d1){
		fromTo = mult(fromTo,.999);
		d2 = dist(0,0,fromPos.x+fromTo.x,fromPos.y+fromTo.y);
	}

	while(d2 < d1){
		fromTo = mult(fromTo,1.001);
		d2 = dist(0,0,fromPos.x+fromTo.x,fromPos.y+fromTo.y);
	}

	// show direction colors
	oldpos = newpos;
	newpos = add(fromPos,fromTo);

	if(oldpos && newpos){
		oldtheta = Math.atan2(oldpos.x,oldpos.y);
		newtheta = Math.atan2(newpos.x,newpos.y);
		dir = newtheta - oldtheta;
	}

	// lookAt line
	gfx.fillStyle = gfx.strokeStyle = 'white';
	gfx.lineWidth = 2;
	gfx.beginPath();

	gfx.moveTo(positions[lookFrom].x,positions[lookFrom].y);
	gfx.lineTo(positions[lookAt].x,positions[lookAt].y);
	
	gfx.stroke();
	gfx.lineWidth = 1;

	// venus
	gfx.fillStyle = gfx.strokeStyle = 'green';
	gfx.beginPath();
	gfx.arc(positions[0].x,positions[0].y, cwidth/100 ,0,Math.PI*2);
	gfx.fill(); gfx.stroke();

	// earth
	gfx.fillStyle = gfx.strokeStyle = 'blue';
	gfx.beginPath();
	gfx.arc(positions[1].x,positions[1].y, cwidth/100 ,0,Math.PI*2);
	gfx.fill(); gfx.stroke();
	
	// mars
	gfx.fillStyle = gfx.strokeStyle = 'red';
	gfx.beginPath();
	gfx.arc(positions[2].x,positions[2].y, cwidth/100 ,0,Math.PI*2);
	gfx.fill(); gfx.stroke();

	// outer ring sun
	if(showSun){
		gfx.fillStyle = gfx.strokeStyle = 'yellow';
		gfx.beginPath();
		gfx.arc(outerD*Math.cos(thetas[lookFrom]+Math.PI) ,outerD*Math.sin(thetas[lookFrom]+Math.PI), cwidth/100 ,0,Math.PI*2);
		gfx.fill(); gfx.stroke();	
	}

	// outer ring lookAt planet
	if(lookAt == 0){
		gfx.fillStyle = gfx.strokeStyle = 'green';
	}else if(lookAt == 1){
		gfx.fillStyle = gfx.strokeStyle = 'blue';
	}else{
		gfx.fillStyle = gfx.strokeStyle = 'red';
	}

	// set color if direction coloring is enabled
	if(dir && showColoring){
		if(dir > 0){
			gfx.fillStyle = gfx.strokeStyle = 'green';
		}else{
			gfx.fillStyle = gfx.strokeStyle = 'red';
		}
	}

	// record projection position for trace
	if(showTrace){		
		if(traceSkip == 10){
			if(dir && dir > 0){
				trace.push(new traceDot((fromPos.x+fromTo.x)/d, (fromPos.y+fromTo.y)/d, 'green',5));
			}else{
				trace.push(new traceDot((fromPos.x+fromTo.x)/d, (fromPos.y+fromTo.y)/d, 'red',7));
			}
			if(trace.length >= traceLimit){
				var temp = [];
				for(var i = 1; i < trace.length; i++){
					temp.push(trace[i]);
				}
				trace = [];
				for(var i in temp){
					trace.push(temp[i]);
				}
			}
		}
		traceSkip--;
		if(traceSkip == 0){ traceSkip = 10; }
	}

	gfx.beginPath();
	gfx.arc(fromPos.x+fromTo.x, fromPos.y+fromTo.y, cwidth/100 ,0,Math.PI*2);
	gfx.fill();
	gfx.stroke();

	// lookFrom circle
	gfx.fillStyle = gfx.strokeStyle = 'white';
	gfx.lineWidth = 2;
	gfx.beginPath();
	gfx.arc(positions[lookFrom].x,positions[lookFrom].y, cwidth/100+4 ,0,Math.PI*2);
	gfx.stroke();
	gfx.lineWidth = 1;

	gfx.restore();
}

vec2 = function(x,y){ this.x = x; this.y = y; }
add = function(v1,v2){ return new vec2(v1.x+v2.x, v1.y+v2.y); }
mult = function(v,s){ return new vec2(v.x*s, v.y*s); }
dot = function(v1,v2){ return v1.x*v2.x + v1.y*v2.y; }
neg = function(v){ return new vec2(-v.x, -v.y); }
mag = function(v){ return Math.sqrt(Math.pow(v.x,2) + Math.pow(v.y,2)); }
unit = function(v){ return new vec2(v.x/mag(v), v.y/mag(v)); }

dist = function(x1,y1,x2,y2){
	return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));
}

lerp = function(oldMin,oldMax,oldVal,newMin,newMax){
	return (oldVal-oldMin)/(oldMax-oldMin)*(newMax-newMin)+newMin;
}

</script></head>
<body bgcolor='grey'>
</body>