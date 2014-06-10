// Kevin Dilts
// 6/10/2014

var ctx;
var num = 149597870;
var numStr = '149,597,870';
var exp = 0;

var lmbDown = false;
var dragging = false;
var decX = 255;

var canvas;
var canvasRect;

window.onload = function(){

	render();

	canvas = document.getElementById('myCanvas');
	canvasRect = canvas.getBoundingClientRect();

	document.getElementById('myCanvas').onmousedown = mouseDown;
	document.getElementById('myCanvas').onmouseup = mouseUp;
	document.getElementById('myCanvas').onmousemove = mouseMove;

}

mouseMove = function(e){
		
	if(e.button === 0){
		
		if(navigator.userAgent.toLowerCase().indexOf('firefox') === -1){ // if the browser is anything but firefox
			mX = e.pageX;
			mY = e.pageY;
		}
		else // if the browser is firefox
		{
			mX = e.clientX + document.documentElement.scrollLeft;
			mY = e.clientY + document.documentElement.scrollTop;
		}

		mX -= canvasRect.left; mY -= canvasRect.top;

		if(dragging){
			decX = mX;
			if(decX < 55){ decX = 55; }
			if(decX > 255){ decX = 255; }
			render();
		}
	}
}

mouseDown = function(e){

	if(e.button === 0){
		
		if(navigator.userAgent.toLowerCase().indexOf('firefox') === -1){ // if the browser is anything but firefox
			mX = e.pageX;
			mY = e.pageY;
		}
		else // if the browser is firefox
		{
			mX = e.clientX + document.documentElement.scrollLeft;
			mY = e.clientY + document.documentElement.scrollTop;
		}

		mX -= canvasRect.left; mY -= canvasRect.top;

		console.log(mX + ' ' + mY);

		lmbDown = true;

		if(mX >= decX - 3 && mX <= decX + 3){
			if(mY >= 107 && mY <= 113){
				dragging = true;
			}
		}
	}
}

mouseUp = function(e){
	if(e.button === 0){
		
		if(navigator.userAgent.toLowerCase().indexOf('firefox') === -1){ // if the browser is anything but firefox
			mX = e.pageX;
			mY = e.pageY;
		}
		else // if the browser is firefox
		{
			mX = e.clientX + document.documentElement.scrollLeft;
			mY = e.clientY + document.documentElement.scrollTop;
		}

		mX -= canvasRect.left; mY -= canvasRect.top;

		lmbDown = false;
		dragging = false;
	}
}

render = function(){

	ctx = document.getElementById('myCanvas').getContext('2d');
	
	// calculate exp based on decimal position
	temp = decX - 15; // decX is 15 - 215, shift to 0 - 200
	if(temp > 182){ exp = 0; }
	else if(temp < 182 && temp > 162){ exp = 1; }
	else if(temp < 162 && temp > 142){ exp = 2; }
	else if(temp < 142 && temp > 118){ exp = 3; }
	else if(temp < 118 && temp > 97){ exp = 4; }
	else if(temp < 97 && temp > 72){ exp = 5; }
	else if(temp < 72 && temp > 52){ exp = 6; }
	else if(temp < 52 && temp > 32){ exp = 7; }
	else if(temp < 32 && temp > 12){ exp = 8; }
	else if(temp < 12){ exp = 9; }

	// black background
	ctx.fillStyle = 'rgb(0,0,0)';
	ctx.fillRect(0,0,700,150);

	// large text
	ctx.fillStyle = 'rgb(255,25,25)';
	ctx.font = '35px Verdana';
	ctx.fillText('' + num + ' x 10  = ' + numStr, 55, 110);
	ctx.fillText('                     10  = ' + Math.pow(10,exp), 45, 55);

	// small text for exponents
	ctx.font = '30px Verdana';
	ctx.fillText('' + exp, 340,88);
	ctx.fillText('' + exp, 342,33);

	// decimal point
	ctx.strokeStyle = 'rgb(255,25,25)';
	ctx.beginPath();
	ctx.arc(decX,110,2,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();

}