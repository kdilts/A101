var ctx;
var num = 149597870;
var numStr = '149,597,870';
var exp = 0;
var place = 0;

window.onload = function(){

	ctx = document.getElementById('myCanvas').getContext('2d');
	
	ctx.fillStyle = 'rgb(0,0,0)';
	ctx.fillRect(0,0,800,150);

	ctx.fillStyle = 'rgb(255,25,25)';
	ctx.font = '35px Verdana';
	ctx.fillText('' + num + ' x 10  = ' + numStr, 15, 50);
	ctx.font = '30px Verdana';
	ctx.fillText('' + exp, 300,28);
}