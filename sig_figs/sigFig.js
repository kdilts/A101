// TODO compatibility testing

var roundCtx;
var minCtx;
var secCtx;

window.onload = function(){

	console.log('loaded');

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
	roundCtx.arc(60,55,53,0,Math.PI*2);
	roundCtx.stroke();

	roundCtx.beginPath();
	roundCtx.arc(60,55,3,0,Math.PI*2);
	roundCtx.stroke();
	roundCtx.fill();

	for(i = 0; i < 4; i++){
		roundCtx.save();
		roundCtx.translate(60,55);
		roundCtx.rotate(i*degToRad(90));
		dots();
		roundCtx.restore();
	}

	roundCtx.font = '12px Verdana';
	roundCtx.fillText('12',50,15);
	roundCtx.fillText('3',102,60);
	roundCtx.fillText('9',10,60);
	roundCtx.fillText('6',55,105);

	// calculate angles of hands
	var hAngle = degToRad(hour * 30 + minute * .5);
	var mAngle = degToRad(minute * 6);

	roundCtx.save();
	roundCtx.translate(60,55);
	roundCtx.rotate(hAngle);
	roundCtx.beginPath();
	roundCtx.moveTo(0,0);
	roundCtx.lineTo(0,-25);
	roundCtx.stroke();
	roundCtx.restore();

	roundCtx.save();
	roundCtx.translate(60,55);
	roundCtx.rotate(mAngle);
	roundCtx.beginPath();
	roundCtx.moveTo(0,0);
	roundCtx.lineTo(0,-40);
	roundCtx.stroke();
	roundCtx.restore();

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
	if(minute < 10){
		if(second < 10){
			secCtx.fillText(hour + ':0' + minute + ':0' + second,10,35);
		}else{
			secCtx.fillText(hour + ':0' + minute + ':' + second,10,35);
		}
	}else{
		if(second < 10){
			secCtx.fillText(hour + ':' + minute + ':0' + second,10,35);
		}else{
			secCtx.fillText(hour + ':' + minute + ':' + second,10,35);
		}
	}
}

dots = function(){
		roundCtx.save();
		roundCtx.rotate(degToRad(30));
		roundCtx.translate(0,-46);
		roundCtx.beginPath();
		roundCtx.arc(0,0,1,0,Math.PI*2);
		roundCtx.stroke();
		roundCtx.fill();
		roundCtx.restore();

		roundCtx.save();
		roundCtx.rotate(2*degToRad(30));
		roundCtx.translate(0,-46);
		roundCtx.beginPath();
		roundCtx.arc(0,0,1,0,Math.PI*2);
		roundCtx.stroke();
		roundCtx.fill();
		roundCtx.restore();
}

degToRad = function(x){
	return x*Math.PI/180;
}