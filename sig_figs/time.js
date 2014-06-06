var roundCtx;
var minCtx;
var secCtx;

var rot = .523598776; // 30 degrees converted to radians, because javascript's rotate uses radians
var ninety = 1.57079633; // 90 degrees converted to radians

window.onload = function(){

	// get time
	var time = new Date();
	var hour = time.getHours();
	var minute = time.getMinutes();
	var second = time.getSeconds();

	if(hour > 12){ hour = hour - 12; }

	// set up to draw
	roundCtx = document.getElementById('round').getContext('2d');
	minCtx = document.getElementById('min').getContext('2d');
	secCtx = document.getElementById('sec').getContext('2d');

	// draw round clock
	roundCtx.fillStyle = 'rgb(0,0,0)';
	roundCtx.fillRect(0,0,200,200);

	roundCtx.strokeStyle = 'rgb(200,200,200)';
	roundCtx.fillStyle = 'rgb(200,200,200)';
	roundCtx.lineWidth = 2.5;

	roundCtx.beginPath();
	roundCtx.arc(75,75,70,0,Math.PI*2);
	roundCtx.stroke();

	roundCtx.beginPath();
	roundCtx.arc(75,75,3,0,Math.PI*2);
	roundCtx.stroke();
	roundCtx.fill();

	for(i = 0; i < 4; i++){
		roundCtx.save();
		roundCtx.translate(75,75);
		roundCtx.rotate(i*ninety);
		dots();
		roundCtx.restore();
	}

	roundCtx.font = '16px Verdana';
	roundCtx.fillText('12',65,25);
	roundCtx.fillText('3',132,80);
	roundCtx.fillText('9',8,80);
	roundCtx.fillText('6',70,140);



	// draw digital clock with minutes
	minCtx.fillStyle = 'rgb(0,0,0)';
	minCtx.fillRect(0,0,200,200);

	minCtx.fillStyle = 'rgb(200,200,200)';
	minCtx.font = '30px Verdana';
	minCtx.fillText(hour + ':' + minute,10,35);

	// draw digital clock with seconds
	secCtx.fillStyle = 'rgb(0,0,0)';
	secCtx.fillRect(0,0,200,200);

	secCtx.fillStyle = 'rgb(200,200,200)';
	secCtx.font = '30px Verdana';
	secCtx.fillText(hour + ':' + minute + ':' + second,10,35);
}

dots = function(){
		roundCtx.save();
		roundCtx.rotate(rot);
		roundCtx.translate(0,-60);
		roundCtx.beginPath();
		roundCtx.arc(0,0,1,0,Math.PI*2);
		roundCtx.stroke();
		roundCtx.fill();
		roundCtx.restore();

		roundCtx.save();
		roundCtx.rotate(2*rot);
		roundCtx.translate(0,-60);
		roundCtx.beginPath();
		roundCtx.arc(0,0,1,0,Math.PI*2);
		roundCtx.stroke();
		roundCtx.fill();
		roundCtx.restore();
}

degToRad = function(){
	
}