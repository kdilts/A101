var simCanvas; var simGfx;
var menuCanvas; var menuGfx;
var orbitDiameters = [90, 110, 150, 180, 250];
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

	var viewCtrl = 120;
	menuGfx.fillText('View Control', 80, viewCtrl);
	menuGfx.fillText('Look From:', 10, viewCtrl+20);
	menuGfx.fillText('Look At:', 200, viewCtrl+20);

	menuGfx.fillStyle='FFFFFF';
	menuGfx.font='14px Verdana';
	menuGfx.fillText('Venus Orbit', 10, 40);
	menuGfx.fillText('Mars Orbit', 130, 40);
	menuGfx.fillText('Orbit Radius: ' + 108 + ' million km', 10, 60);

	
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

	simGfx.strokeStyle='FFFFFF';
	for(var d in orbitDiameters){
		simGfx.beginPath();
		simGfx.arc(centerX,centerY,orbitDiameters[d],0,Math.PI*2);
		simGfx.stroke();
	}
}

loop = function(){
	clearSim();
}