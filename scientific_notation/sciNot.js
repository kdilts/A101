// TODO ensure cross browser compatibility

var ctx;
var num = 149597870;
var numStr = '149,597,870';
var exp = 0;

var lmbDown = false;
var dragging = false;
var decX = 215;

window.onload = function(){

	render();

	document.getElementById('myCanvas').onmousedown = mouseDown;
	document.getElementById('myCanvas').onmouseup = mouseUp;
	document.getElementById('myCanvas').onmousemove = mouseMove;

}

mouseMove = function(e){
		mX = e.x-10; mY = e.y-10; // don't like the constant offset. make sure this works across browsers and computers

		if(dragging){
			decX = mX;
			if(decX < 15){ decX = 15; }
			if(decX > 215){ decX = 215; }
			render();
		}
}

mouseDown = function(e){
	if(e.button === 0){
		mX = e.x-10; mY = e.y-10; // don't like the constant offset. make sure this works across browsers and computers
		lmbDown = true;

		if(mX >= decX - 2 && mX <= decX + 2){
			if(mY >= 108 && mY <= 112){
				dragging = true;
			}
		}
	}
}

mouseUp = function(e){
	if(e.button === 0){
		mX = e.x-10; mY = e.y-10; // don't like the constant offset. make sure this works across browsers and computers
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
	ctx.fillRect(0,0,800,150);

	// large text
	ctx.fillStyle = 'rgb(255,25,25)';
	ctx.font = '35px Verdana';
	ctx.fillText('' + num + ' x 10  = ' + numStr, 15, 110);
	ctx.fillText('                     10  = ' + Math.pow(10,exp), 5, 55);

	// small text for exponents
	ctx.font = '30px Verdana';
	ctx.fillText('' + exp, 300,88);
	ctx.fillText('' + exp, 300,33);

	// decimal point
	ctx.strokeStyle = 'rgb(255,25,25)';
	ctx.beginPath();
	ctx.arc(decX,110,2,0,2*Math.PI);
	ctx.stroke();
	ctx.fill();

}