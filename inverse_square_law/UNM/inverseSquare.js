var canvas; var gfx;
var mx; var my; var mouseDown = false;

var cwidth; var cheight;

var starRad = [.1,.1,.1];
var lum = ['4.0e+004','4.0e+005','4.0e+006']
var centers = [];

window.onload = function(){
	canvas = document.getElementById('c1');

	gfx = canvas.getContext('2d');

	setInterval(render,1000/60);

}

window.onmousemove = function(e){
	mx = e.x; my = e.y;
	if(!mx || !my){ mx = e.clientX; my = e.clientY; }
}

window.onmousedown = function(e){ mouseDown = true; }

window.onmouseup = function(e){	mouseDown = false; }

window.onresize = function(){ render(); };

clearAll = function(){
	gfx.fillStyle='rgb(75,75,75)';
	gfx.fillRect(0,0,cwidth,cheight);
}

render = function(){
	cwidth = canvas.width = window.innerWidth*.999;
	cheight = canvas.height = window.innerHeight*.999;

	clearAll();
	drawPanels();

	for(var i = 0; i < 3; i++){
		if(dist(centers[i],new vec2(mx,my)) < .23*cheight){
			document.body.style='cursor:none';
			gfx.fillStyle = 'red'; gfx.strokeStyle = 'red';
			gfx.beginPath();
			gfx.arc(mx,my,3,0,Math.PI*2);
			gfx.fill();
			gfx.stroke();

			var d = dist(centers[i], new vec2(mx,my));
			var intens = (4*Math.pow(10,4+i))/Math.pow(d,2);

			gfx.fillStyle = 'white'; gfx.strokeStyle = 'white';
			gfx.font = '20px verdana';
			gfx.fillText('Distance: ' + truncate(''+d), mx+5, my+19);
			gfx.fillText('Intensity: ' + truncate(''+intens), mx+5, my+37);
			break;
		}else{
			document.body.style='';
		}
	}
}

calculateIntensity = function(i){
	return 31337.2122;
}

drawPanels = function(){
	gfx.fillStyle = 'rgb(190,190,190)';
	gfx.fillRect(.01*cwidth,.5*cheight,.32*cwidth,.49*cheight);
	gfx.fillRect(.34*cwidth,.5*cheight,.32*cwidth,.49*cheight);
	gfx.fillRect(.67*cwidth,.5*cheight,.32*cwidth,.49*cheight);

	gfx.font = '28px verdana';
	for(var i = 0; i < 3; i++){
		centers[i] = {x:.33*cwidth/2+(i*.33*cwidth), y:.25*cheight };

		gfx.strokeStyle = 'black';
		gfx.fillStyle = 'black';
		gfx.beginPath();
		gfx.arc(.33*cwidth/2+(i*.33*cwidth),.25*cheight,.23*cheight,0,Math.PI*2);
		gfx.fill();
		gfx.stroke();

		gfx.strokeStyle = 'white';
		gfx.fillStyle = 'white';
		gfx.beginPath();
		gfx.arc(.33*cwidth/2+(i*.33*cwidth),.25*cheight,.23*cheight*starRad[i],0,Math.PI*2);
		gfx.fill();
		gfx.stroke();

		gfx.fillStyle = 'yellow';
		gfx.fillText('Luminosity: ' + lum[i],.01*cwidth+(i*.33*cwidth),.03*cheight);
	}
}

truncate = function(str){
	var idx = str.indexOf('.');
	return str.substr(0,idx+3);
}

dist = function(v1,v2){ return mag(add(v1,neg(v2))); }

vec2 = function(x,y){ this.x = x; this.y = y; }
add = function(v1, v2){ return new vec2(v1.x+v2.x, v1.y+v2.y); }
neg = function(v){ return new vec2(-v.x, -v.y); }
mag = function(v){ return Math.sqrt(Math.pow(v.x,2) + Math.pow(v.y,2)); }
dot = function(v1,v2){ return v1.x*v2.x + v1.y*v2.y; }
unit = function(v){ return new vec2(v.x/mag(v), v.y/mag(v)); }
mult = function(v,s){ return new vec2(v.x*s, v.y*s); }