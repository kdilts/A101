var canvas; var gfx;
var mx; var my;

var cwidth; var cheight;

var starRad = [.05,.075,.1];
var lum = ['4.0e+004','4.0e+005','4.0e+006']
var centers = [];

var graphs = []; var buttons = [];

var noiseThreshold = 8; var noiseRange = 2;

var show = 0;

var imgs = [];

window.onload = function(){
	canvas = document.getElementById('c1');

	gfx = canvas.getContext('2d');

	for(var i = 1; i <= 6; i++){
		imgs[i-1] = new Image();
		imgs[i-1].src = './suns/'+i+'.jpg';
	}

	for(var i = 0; i < 3; i++){
		graphs[i] = new graph(i);
		buttons[i] = new clearButton(i);
	}

	setInterval(render,1000/60);
}

window.onmousemove = function(e){
	mx = e.x; my = e.y;
	if(!mx || !my){ mx = e.clientX; my = e.clientY; }
}

window.onmousedown = function(e){
	for(var g in graphs){
		if(graphs[g].mouseIn){ graphs[g].plot(); }
		buttons[g].clicked();
	}
}

window.onresize = function(){ window.resizeTo(1400,800); render(); };

clearAll = function(){
	gfx.fillStyle='rgb(0,0,0)';
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
			gfx.save();
			gfx.fillStyle = 'blue'; gfx.strokeStyle = 'cyan';
			gfx.beginPath();
			gfx.translate(mx,my);

			var r = dot(centers[i], add(neg(centers[i]), new vec2(mx,my)));
			r = r / (mag(centers[i])*mag(add(neg(centers[i]), new vec2(mx,my))));

			if(my > centers[i].y){
				r = Math.acos(r)-Math.PI/2;
			}else{
				r = -Math.acos(r)-Math.PI/2;
			}

			gfx.rotate(r);

			gfx.moveTo(0,14);
			gfx.arc(0,0,8,Math.PI,Math.PI*2);
			gfx.lineTo(0,14);
			gfx.fill();
			gfx.stroke();
			gfx.restore();

			var d = dist(centers[i], new vec2(mx,my));
			d = lerp(0,195,d,0,300);

			var intens = (4*Math.pow(10,4+i))/Math.pow(d,2);

			gfx.fillStyle = 'white'; gfx.strokeStyle = 'white';
			gfx.font = '20px verdana';
			if(d- .5*cheight*starRad[i] > 0){
				gfx.fillText('Distance: ' + truncate(''+d), mx+5, my+19);
				gfx.fillText('Intensity: ' + truncate(''+intens), mx+5, my+37);
				graphs[i].mouseIn = true;
			}else{
				gfx.fillText('Distance: --', mx+5, my+19);
				gfx.fillText('Intensity: --', mx+5, my+37);
			}
			break;
		}else{
			document.body.style='';
			graphs[i].mouseIn = false;
		}
	}

	if(show === 1){
		gfx.fillStyle='yellow';
		gfx.fillRect(.33*cwidth,0,.01*cwidth,cheight);
		gfx.fillRect(.66*cwidth,0,.01*cwidth,cheight);
	}

	for(var g in graphs){ graphs[g].draw(); buttons[g].draw(); }

}

drawPanels = function(){

	gfx.font = '20px verdana';
	for(var i = 0; i < 3; i++){
		centers[i] = {x:.33*cwidth/2+(i*.33*cwidth), y:.25*cheight };

		gfx.fillStyle = 'rgb(190,190,190)';
		gfx.fillRect(.01*cwidth+(i*.33*cwidth),.5*cheight,.32*cwidth,.49*cheight);

		gfx.save();
		gfx.lineWidth = 2.5;
		gfx.strokeStyle = 'grey';
		gfx.fillStyle = 'black';
		gfx.beginPath();
		gfx.arc(.33*cwidth/2+(i*.33*cwidth),.25*cheight,.23*cheight,0,Math.PI*2);
		gfx.fill();
		gfx.stroke();
		gfx.restore();

		gfx.save();
		gfx.translate(.33*cwidth/2+(i*.33*cwidth)-imgs[i].width/2,.25*cheight-imgs[i].height/2);
		gfx.scale(i*.3+.8,i*.3+.8);
		gfx.drawImage(imgs[Math.floor(Math.random()*imgs.length)],0,0);
		gfx.restore();

		gfx.fillStyle = 'yellow';
		gfx.fillText('Luminosity: ' + lum[i],.005*cwidth+(i*.33*cwidth),.03*cheight);
	}
}

graph = function(n){
	this.id = n;
	this.data = [];
	this.mouseIn = false;

	this.clear = function(){ this.data = []; }

	this.plot = function(){
		var d = dist(centers[n], new vec2(mx,my));
		d = lerp(0,195,d,0,300);
		var intens = -(4*Math.pow(10,4+n))/Math.pow(d,2);

		if(intens > -noiseThreshold){ intens += (Math.random()*noiseRange - noiseRange/2 ); }
		if(intens > 0){ intens = 0; }

		this.data.push({x:d,y:intens});
	}

	this.draw = function(){
		gfx.fillStyle = 'black'; gfx.strokeStyle = 'black';
		gfx.font = '20px verdana';
		gfx.fillText('Distance', .06*cwidth+(n*.33*cwidth), .985*cheight);

		gfx.save();
		gfx.translate(.02*cwidth+(n*.33*cwidth), .85*cheight);
		gfx.rotate(-Math.PI/2);
		gfx.fillText('Intensity', 0,0);
		gfx.restore();

		for(var i = 0; i < 3; i++){
			gfx.fillText(''+ 100*i, .032*cwidth+(n*.33*cwidth)+(i*.285*cwidth/3), .965*cheight);

			gfx.save();
			gfx.translate(.032*cwidth+(n*.33*cwidth), .945*cheight-(i*.42*cheight/3));
			gfx.rotate(-Math.PI/2);
			gfx.fillText(''+ Math.pow(10,this.id+1)*i, 0,0);
			gfx.restore();
		}

		gfx.lineWidth = 2.5;
		gfx.strokeRect(.035*cwidth+(n*.33*cwidth),.5*cheight,.295*cwidth,.44*cheight);
		gfx.strokeRect(.01*cwidth+(n*.33*cwidth),.5*cheight,.32*cwidth,.49*cheight);

		gfx.lineWidth = 1.5;
		for(var i = 0; i < 6; i++){
			gfx.beginPath();
			gfx.moveTo(.035*cwidth+(n*.33*cwidth)+(i*.295*cwidth/6), .5*cheight);
			gfx.lineTo(.035*cwidth+(n*.33*cwidth)+(i*.295*cwidth/6), .94*cheight);
			gfx.stroke();

			gfx.beginPath();
			gfx.moveTo(.035*cwidth+(n*.33*cwidth), .5*cheight+(i*.44*cheight/6));
			gfx.lineTo(.33*cwidth+(n*.33*cwidth), .5*cheight+(i*.44*cheight/6));
			gfx.stroke();
		}

		if(this.mouseIn){
			gfx.save();
			gfx.strokeStyle = gfx.fillStyle = 'blue';
			gfx.translate(.035*cwidth+(n*.33*cwidth),.94*cheight);

			var d = dist(centers[n], new vec2(mx,my));
			d = lerp(0,195,d,0,300);
			var intens = -(4*Math.pow(10,4+n))/Math.pow(d,2);

			if(this.id === 0 && intens > -30 && d > 0 && d < 300){
				gfx.translate(d*(.295*cwidth/300),intens*(.44*cheight/30));
				gfx.beginPath();
				gfx.arc(0,0,3,0,Math.PI*2);
				gfx.fill();
				gfx.stroke();
			}else if(this.id === 1 && intens > -300 && d > 0 && d < 300){
				gfx.translate(d*(.295*cwidth/300),intens*(.44*cheight/300));
				gfx.beginPath();
				gfx.arc(0,0,3,0,Math.PI*2);
				gfx.fill();
				gfx.stroke();
			}else if(this.id === 2 && intens > -3000 && d > 0 && d < 300){
				gfx.translate(d*(.295*cwidth/300),intens*(.44*cheight/3000));
				gfx.beginPath();
				gfx.arc(0,0,3,0,Math.PI*2);
				gfx.fill();
				gfx.stroke();
			}

			gfx.restore();
		}

		for(var i in this.data){
			gfx.save();
			gfx.strokeStyle = gfx.fillStyle = 'red';
			gfx.translate(.035*cwidth+(n*.33*cwidth),.94*cheight);

			var d = this.data[i].x;
			var intens = this.data[i].y;

			if(this.id === 0 && intens > -30 && d > 0 && d < 300){
				gfx.translate(d*(.295*cwidth/300),intens*(.44*cheight/30));
				gfx.beginPath();
				gfx.arc(0,0,3,0,Math.PI*2);
				gfx.fill();
				gfx.stroke();
			}
			else if(this.id === 1 && intens > -300 && d > 0 && d < 300){
				gfx.translate(d*(.295*cwidth/300),intens*(.44*cheight/300));
				gfx.beginPath();
				gfx.arc(0,0,3,0,Math.PI*2);
				gfx.fill();
				gfx.stroke();
			}
			else if(this.id === 2 && intens > -3000 && d > 0 && d < 300){
				gfx.translate(d*(.295*cwidth/300),intens*(.44*cheight/3000));
				gfx.beginPath();
				gfx.arc(0,0,3,0,Math.PI*2);
				gfx.fill();
				gfx.stroke();
			}

			gfx.restore();
		}
	}
}

clearButton = function(n){
	this.clicked = function(){
		if(mx < .33*cwidth+(n*.33*cwidth) && mx > .33*cwidth+(n*.33*cwidth)-.295*cwidth/6){
			if(my < .99*cheight && my > .94*cheight){
				graphs[n].clear();
			}		
		}
	}

	this.draw = function(){
		gfx.save();
		gfx.fillStyle = 'grey'; gfx.strokeStyle = 'black';
		gfx.fillRect(.33*cwidth+(n*.33*cwidth),.94*cheight,-.295*cwidth/6,.05*cheight);
		gfx.strokeRect(.33*cwidth+(n*.33*cwidth),.94*cheight,-.295*cwidth/6,.05*cheight);
		gfx.fillStyle = 'black';
		gfx.font='20px verdana';
		gfx.fillText('Clear',.295*cwidth+(n*.33*cwidth),.97*cheight);
		gfx.restore();
	}
}

truncate = function(str){
	var idx = str.indexOf('.');
	return str.substr(0,idx+3);
}

lerp = function(oldMin,oldMax,oldVal,newMin,newMax){
	return (oldVal-oldMin)/(oldMax-oldMin)*(newMax-newMin)+newMin;
}

dist = function(v1,v2){ return mag(add(v1,neg(v2))); }

vec2 = function(x,y){ this.x = x; this.y = y; }
add = function(v1, v2){ return new vec2(v1.x+v2.x, v1.y+v2.y); }
neg = function(v){ return new vec2(-v.x, -v.y); }
mag = function(v){ return Math.sqrt(Math.pow(v.x,2) + Math.pow(v.y,2)); }
dot = function(v1,v2){ return v1.x*v2.x + v1.y*v2.y; }
unit = function(v){ return new vec2(v.x/mag(v), v.y/mag(v)); }
mult = function(v,s){ return new vec2(v.x*s, v.y*s); }