var canvas; var gfx;
var mx; var my;

var cwidth; var cheight;

var starRad = [.05,.075,.1];
var lum = ['4.0e+004','4.0e+005','4.0e+006']
var centers = [];

var graphs = []; var buttons = [];

var noiseThreshold = 8; var noiseRange = 5;

window.onload = function(){
	canvas = document.getElementById('c1');

	gfx = canvas.getContext('2d');

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

window.onresize = function(){ window.resizeTo(1600,1000); render(); };

clearAll = function(){
	gfx.fillStyle='rgb(0,0,0)';
	gfx.fillRect(0,0,cwidth,cheight);
}

render = function(){
	cwidth = canvas.width = window.innerWidth*.999;
	cheight = canvas.height = window.innerHeight*.998;

	clearAll();
	drawPanels();

	for(var i = 0; i < 3; i++){
		if(dist(centers[i],new vec2(mx,my)) < .21*cheight){
			document.body.style='cursor:none';
			gfx.fillStyle = 'red'; gfx.strokeStyle = 'red';
			gfx.beginPath();
			gfx.arc(mx,my,3,0,Math.PI*2);
			gfx.fill();
			gfx.stroke();

			var d = dist(centers[i], new vec2(mx,my));
			d = lerp(0,195,d,0,300);

			var intens = (4*Math.pow(10,4+i))/Math.pow(d,2);

			gfx.fillStyle = 'white'; gfx.strokeStyle = 'white';
			gfx.font = '20px verdana';
			if(d- .4*cheight*starRad[i] > 0){
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

	for(var g in graphs){ graphs[g].draw(); buttons[g].draw(); }

	gfx.fillStyle = 'yellow';
	gfx.font = '24px verdana'
	gfx.fillText('Simulated Photometry', .42*cwidth, .03*cheight);

}

drawPanels = function(){

	gfx.font = '20px verdana';
	for(var i = 0; i < 3; i++){
		centers[i] = {x:.33*cwidth/2+(i*.33*cwidth), y:.25*cheight };

		gfx.fillStyle = 'rgb(190,190,190)';
		gfx.fillRect(.01*cwidth+(i*.33*cwidth),.5*cheight,.32*cwidth,.49*cheight);

		// outer rings
		gfx.save();
		gfx.lineWidth = 2.5;
		gfx.strokeStyle = 'grey';
		gfx.fillStyle = 'black';
		gfx.beginPath();
		gfx.arc(.33*cwidth/2+(i*.33*cwidth),.25*cheight,.21*cheight,0,Math.PI*2);
		gfx.fill();
		gfx.stroke();
		gfx.restore();

		// stars
		if(i === 0){
			gfx.fillStyle = gfx.strokeStyle = 'red';
		}else if(i === 1){
			gfx.fillStyle = gfx.strokeStyle = 'yellow';
		}else{
			gfx.fillStyle = gfx.strokeStyle = 'blue';
		}
		gfx.beginPath();
		gfx.arc(.33*cwidth/2+(i*.33*cwidth),.25*cheight,.23*cheight*starRad[i],0,Math.PI*2);
		gfx.fill();
		gfx.stroke();

		gfx.fillStyle = 'yellow';
		gfx.fillText('Luminosity: ' + lum[i],.1*cwidth+(i*.33*cwidth),.495*cheight);

		gfx.fillStyle = gfx.strokeStyle = 'red';
		gfx.beginPath();
		gfx.arc(cwidth*.6666-18,18,4,0,Math.PI*2);
		gfx.fill(); gfx.stroke();

		gfx.fillStyle = gfx.strokeStyle = 'yellow';
		gfx.fillText('- Light Probe',cwidth*.6666,25);
	}
}

graph = function(n){
	this.id = n;
	this.data = [];
	this.r1 = []; this.r2 = [];
	this.mouseIn = false;

	var mod = [ [.05, 4], [.005, .4], [.0005, .04] ];
	for(var i = 1; i < 300; i++){
		this.r1[i-1] = mod[n][0]*Math.pow(10,4+n)/i;
		this.r2[i-1] = mod[n][1]*Math.pow(10,4+n)/(i*i);
	}

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
		gfx.fillText('Intensity', -58,3);
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

		gfx.save();
		gfx.translate(.035*cwidth+(n*.33*cwidth),.94*cheight);
		gfx.strokeStyle = gfx.fillStyle = 'black';
		for(var i in this.r1){
			if(-this.r1[i]*(.44*cheight/30) > -410){
				gfx.save();
				gfx.translate(i*(.295*cwidth/300),-this.r1[i]*(.44*cheight/30));
				gfx.beginPath();
				gfx.arc(0,0,3,0,Math.PI*2);
				gfx.fill();
				gfx.stroke();
				gfx.restore();
			}
		}
		gfx.restore();

		gfx.save();
		gfx.translate(.035*cwidth+(n*.33*cwidth),.94*cheight);
		gfx.strokeStyle = gfx.fillStyle = 'grey';
		for(var i in this.r2){
			if(-this.r2[i]*(.44*cheight/30) > -410){
				gfx.save();
				gfx.translate(i*(.295*cwidth/300),-this.r2[i]*(.44*cheight/30));
				gfx.beginPath();
				gfx.arc(0,0,3,0,Math.PI*2);
				gfx.fill();
				gfx.stroke();
				gfx.restore();
			}
		}
		gfx.restore();

		for(var i in this.data){
			gfx.save();
			//gfx.strokeStyle = gfx.fillStyle = 'red';
			gfx.translate(.035*cwidth+(n*.33*cwidth),.94*cheight);

			var d = this.data[i].x;
			var intens = this.data[i].y;

			if(this.id === 0 && intens > -30 && d > 0 && d < 300){
				gfx.strokeStyle = gfx.fillStyle = 'red';
				gfx.translate(d*(.295*cwidth/300),intens*(.44*cheight/30));
				gfx.beginPath();
				gfx.arc(0,0,3,0,Math.PI*2);
				gfx.fill();
				gfx.stroke();
			}
			else if(this.id === 1 && intens > -300 && d > 0 && d < 300){
				gfx.strokeStyle = gfx.fillStyle = 'yellow';
				gfx.translate(d*(.295*cwidth/300),intens*(.44*cheight/300));
				gfx.beginPath();
				gfx.arc(0,0,3,0,Math.PI*2);
				gfx.fill();
				gfx.stroke();
			}
			else if(this.id === 2 && intens > -3000 && d > 0 && d < 300){
				gfx.strokeStyle = gfx.fillStyle = 'blue';
				gfx.translate(d*(.295*cwidth/300),intens*(.44*cheight/3000));
				gfx.beginPath();
				gfx.arc(0,0,3,0,Math.PI*2);
				gfx.fill();
				gfx.stroke();
			}

			gfx.restore();
		}

		if(this.mouseIn){
			gfx.save();
			gfx.strokeStyle = gfx.fillStyle = 'green';
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
		gfx.fillText('Clear',.29*cwidth+(n*.33*cwidth),.97*cheight);
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

angleBetween = function(v1, v2){
	var angle = dot(v1,v2);
	angle = angle/(mag(v1)*mag(v2));
	angle = Math.acos(angle);
	return angle;
}