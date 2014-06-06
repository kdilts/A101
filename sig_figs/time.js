var time;
var roundCtx;
var minCtx;
var secCtx;

window.onload = function(){
	roundCtx = document.getElementById('round').getContext('2d');
	minCtx = document.getElementById('min').getContext('2d');
	secCtx = document.getElementById('sec').getContext('2d');

	roundCtx.fillStyle = 'rgb(0,0,0)';
	roundCtx.fillRect(0,0,200,200);

	minCtx.fillStyle = 'rgb(0,0,0)';
	minCtx.fillRect(0,0,200,200);

	secCtx.fillStyle = 'rgb(0,0,0)';
	secCtx.fillRect(0,0,200,200);
}