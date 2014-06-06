var roundCtx;
var minCtx;
var secCtx;

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

	// draw digital clock with minutes
	minCtx.fillStyle = 'rgb(0,0,0)';
	minCtx.fillRect(0,0,200,200);
	minCtx.fillStyle = 'rgb(200,200,200)';
	minCtx.font = '30px Verdana';
	minCtx.fillText(hour + ':' + minute,10,35);

	minCtx.fillStyle = 'rgb(200,200,200)';

	// draw digital clock with seconds
	secCtx.fillStyle = 'rgb(0,0,0)';
	secCtx.fillRect(0,0,200,200);

	secCtx.fillStyle = 'rgb(200,200,200)';
	secCtx.font = '30px Verdana';
	secCtx.fillText(hour + ':' + minute + ':' + second,10,35);
}