var canvas; var gfx;

window.onload = function(){
	canvas = document.getElementById('myCanvas');
	canvas.style.zIndex = 1;

	gfx = canvas.getContext('2d');

	gfx.fillStyle='rgb(200,0,0)';
	gfx.strokeStyle='rgb(200,0,0)';
	gfx.lineWidth=3;
	gfx.clearRect(0,0,400,400);
	gfx.beginPath();
	gfx.arc(20,20,5,0,Math.PI*2);
	gfx.stroke();

	img = document.createElement('img');
	img.src = './gifs/anim14.gif';
	img.width = 75;
	img.height = 75;
	img.style.zIndex = 0;
	img.setAttribute('style','position: absolute; left: 0; top: 0');
	document.body.appendChild(img);
}

window.onmouseup = function(){

}