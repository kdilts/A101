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

window.onmousemove = function(e){
	mx = e.x; my = e.y;
	cam.pos.x = mx; cam.pos.y = my;
	if(cam.pos.x > 299){ cam.pos.x = 299; }
	if(cam.pos.y > 299){ cam.pos.y = 299; }
	clearSim();
	drawLight();
	drawStats();
	cam.draw();
}

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

clearGrid = function(){}

clearSim = function(){
	gfx.fillStyle='000000';
	gfx.fillRect(0,0,300,300);
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
	gfx.fillText('Distance: ' + truncate(''+cam.getDist()), 5, 296);
	gfx.fillText('Intensity: ', 185, 296);
}

drawLight = function(){
	clearSim();

	var star;
	for(var b in buttons){ if(buttons[b].active){ star = b; } }

	if(parseInt(star) === 0){
		var grd = gfx.createRadialGradient(150,150,5,150,150,25);
		grd.addColorStop(0,'rgb(100,100,100)');
		grd.addColorStop(1,'000000');
		gfx.fillStyle = grd;
		gfx.strokeStyle = '000000';
		gfx.beginPath();
		gfx.arc(150,150,25,0,Math.PI*2);
		gfx.fill();
		gfx.stroke();

		gfx.strokeStyle='FFFFFF';
		gfx.fillStyle='FFFFFF';
		gfx.beginPath();
		gfx.arc(150,150,5,0,Math.PI*2);
		gfx.fill();
		gfx.stroke();
	} else if(parseInt(star) === 1){
		var grd = gfx.createRadialGradient(150,150,20,150,150,100);
		grd.addColorStop(0,'rgb(100,100,100)');
		grd.addColorStop(1,'000000');
		gfx.fillStyle = grd;
		gfx.strokeStyle = '000000';
		gfx.beginPath();
		gfx.arc(150,150,100,0,Math.PI*2);
		gfx.fill();
		gfx.stroke();

		gfx.strokeStyle='FFFFFF';
		gfx.fillStyle='FFFFFF';
		gfx.beginPath();
		gfx.arc(150,150,20,0,Math.PI*2);
		gfx.fill();
		gfx.stroke();
	} else {
		var grd = gfx.createRadialGradient(150,150,40,150,150,150);
		grd.addColorStop(0,'rgb(100,100,100)');
		grd.addColorStop(1,'000000');
		gfx.fillStyle = grd;
		gfx.strokeStyle = '000000';
		gfx.beginPath();
		gfx.arc(150,150,147,0,Math.PI*2);
		gfx.fill();
		gfx.stroke();

		gfx.strokeStyle='FFFFFF';
		gfx.fillStyle='FFFFFF';
		gfx.beginPath();
		gfx.arc(150,150,45,0,Math.PI*2);
		gfx.fill();
		gfx.stroke();
	}
}

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
				drawStats();
				cam.draw();
			}
		}
	}
}

camera = function(x,y){
	this.pos = new vec2(x,y);
	this.rot = 0;

	this.draw = function(){
		var toStar = add(neg(this.pos), new vec2(150,150));
		var cosTheta = dot(new vec2(0,-10), toStar)/ (mag(new vec2(0,-10))*mag(toStar));

		if(this.pos.x < 150){
			this.rot = Math.acos(cosTheta);
		} else {
			this.rot = -Math.acos(cosTheta);
		}

		gfx.save();
		gfx.translate(this.pos.x,this.pos.y);
		gfx.rotate(this.rot);

		gfx.fillStyle = 'rgb(150,255,255)';
		gfx.strokeStyle = 'rgb(20,20,200)';
		gfx.beginPath();
		gfx.moveTo(0,0);
		gfx.arc(0,0,28,-Math.PI/10-Math.PI/2,Math.PI/10-Math.PI/2);
		gfx.fill();
		gfx.stroke();

		gfx.fillStyle = 'rgb(100,20,200)';
		gfx.strokeStyle = 'rgb(100,20,200)';
		gfx.beginPath();
		gfx.moveTo(0,0);
		gfx.arc(0,0,25,-Math.PI/10-Math.PI/2,Math.PI/10-Math.PI/2);
		gfx.fill();
		gfx.stroke();

		gfx.restore();
	}

	this.getDist = function(){ var toStar = add(neg(this.pos), new vec2(150,150)); return mag(toStar); }
	this.getIntensity = function(){}
}

truncate = function(str){
	var idx = str.indexOf('.');
	return str.substr(0,idx+3);
}

vec2 = function(x,y){ this.x = x; this.y = y; }
add = function(v1, v2){ return new vec2(v1.x+v2.x, v1.y+v2.y); }
neg = function(v){ return new vec2(-v.x, -v.y); }
mag = function(v){ return Math.sqrt(Math.pow(v.x,2) + Math.pow(v.y,2)); }
dot = function(v1,v2){ return v1.x*v2.x + v1.y*v2.y; }