<head>
	<script type="text/javascript" src="js/tinycolor.js"></script>
	<script type="text/javascript" src="js/is.js"></script>
	<script type="text/javascript">
// Kevin Dilts 2016
var G = 6.67*Math.pow(10,-11);
var kgPerSolarMass = 1.989*Math.pow(10,30);
var mPerAu = 1.496*Math.pow(10,11);

var gfxLeft; var gfxRight; var gfxGraph;
var gfxSpectrum; var gfxMenu;

var canvases = []; var sliders = [];
var buttons = []; var boxes = [];

// user set
var currentA; var currentE; var currentI;
var currentW; var currentM1; var currentM2;

// calculated
var currentP; var currentVMin; var currentVMax; var currentRVMax;
var pViewPaths; var eViewPaths;
var velocities = []; var radialVels = [];
var lambdas;

var trails = true;

var simSpeed = 3; var deltaT = 1000/60;
var const1 = 30; var const2 = .0005;

var count1 = count2 = 0; secondHalf = false;

var ff = false; var ie = false; var chr = false;

var lim;

var lMin; var lMax;

var scale = 60;

var sliderSpacing = 10;
var sliderOffset = 14;

window.onload = function(){
	
	if(is.ie()){ ie = true; }
	if(is.firefox()){ ff = true; }
	if(is.chrome()){ chr = true; }

	// initialize canvases
	for(var i = 0; i < 5; i++){
		canvases[i] = document.createElement('canvas');
		document.body.appendChild(canvases[i]);
	}

	setCanvasAttributes();

	canvases[2].style.zIndex = canvases[3].style.zIndex = 1;
	canvases[4].style.zIndex = 0;

	gfxLeft = canvases[0].getContext('2d');
	gfxRight = canvases[1].getContext('2d');
	gfxGraph = canvases[2].getContext('2d');
	gfxSpectrum = canvases[3].getContext('2d');
	gfxMenu = canvases[4].getContext('2d');

	// initialize sliders and buttons
	for(var i = 0; i < 12; i++){
		if(i < 4){
			sliders[i] = document.createElement('input');
			sliders[i].type = 'range';

			if(chr|| (!ie && !ff)){
				sliders[i].setAttribute('style',
					'position:absolute; left:10.2%; top:'+(sliderOffset+i*sliderSpacing)+'%; width:12%');
			}else if(ff){
				sliders[i].setAttribute('style',
					'position:absolute; left:10.2%; top:'+(sliderOffset+i*sliderSpacing)+'%; width:12%');
			}else if(ie){

				sliders[i].setAttribute('style',
					'position:absolute; left:10.8%; top:'+((sliderOffset-1.5)+i*(sliderSpacing))+'%; width:12%');				
			}

			document.body.appendChild(sliders[i]);
		}

		buttons[i] = document.createElement('input');
		buttons[i].type = 'button';
		if(i > 4 && i%2 == 1){
			buttons[i-1].setAttribute('style',
				'position:absolute; left:7%; top:'+(sliderOffset+(i-5)/2*sliderSpacing)+'%');
			buttons[i-1].value = '<-';

			buttons[i].setAttribute('style',
				'position:absolute; left:23%; top:'+(sliderOffset+(i-5)/2*sliderSpacing)+'%');
			buttons[i].value = '->';
		}
		document.body.appendChild(buttons[i]);
	}

	// slider values / initial conditions on launch
	sliders[0].setAttribute('min',.1); sliders[0].setAttribute('max',2);
	sliders[0].setAttribute('step',.1);
	sliders[0].value = currentA = 1;

	sliders[1].setAttribute('min',0); sliders[1].setAttribute('max',.9);
	sliders[1].setAttribute('step',.1);
	sliders[1].value = currentE = .5;

	sliders[2].setAttribute('min',0); sliders[2].setAttribute('max',90);
	sliders[2].setAttribute('step',15);
	sliders[2].value = currentI = 60;

	sliders[3].setAttribute('min',-90); sliders[3].setAttribute('max',90);
	sliders[3].setAttribute('step',15);
	sliders[3].value = currentW = 0;

	// button text
	buttons[0].value = 'Enter';
	buttons[1].value = 'Trail Off';
	buttons[2].value = '<-';
	buttons[3].value = '->';

	// position buttons
	buttons[0].setAttribute('style','position:absolute; left:0%; top:0%');
	buttons[1].setAttribute('style','position:absolute; left:10%; top:0%');
	buttons[2].setAttribute('style','position:absolute; left:45%; top:0%');
	buttons[3].setAttribute('style','position:absolute; left:53%; top:0%');

	// button actions
	buttons[0].onclick = function(){ // enter values
		console.clear();

		currentA = sliders[0].value; currentE = sliders[1].value;
		currentI = sliders[2].value; currentW = sliders[3].value;

		if(parseFloat(boxes[0].value) > parseFloat(boxes[1].value)){
			tempBox = boxes[1].value;
			boxes[1].value = boxes[0].value;
			boxes[0].value = tempBox;
		}

		currentM1 = parseFloat(boxes[0].value);
		currentM2 = parseFloat(boxes[1].value);

		count1 = count2 = 0;

		secondHalf = false;

		scale = 60;

		//console.clear();

		calculate();
	}

	buttons[1].onclick = function(){ // toggle trails
		if(trails){
			trails = false; buttons[1].value = 'Trails On';
		}else{
			trails = true; buttons[1].value = 'Trails Off';
		}
	}

	buttons[2].onclick = function(){ // slow down
		if(simSpeed > 0){ simSpeed--; }
	}

	buttons[3].onclick = function(){ // speed up
		if(simSpeed < 9){ simSpeed++; }
	}

	// slider a
	buttons[4].onclick = function(){
		if(sliders[0].value > sliders[0].min){
			sliders[0].value = parseFloat(sliders[0].value) - 
				parseFloat(sliders[0].step);
		}
	}

	buttons[5].onclick = function(){
		if(sliders[0].value < sliders[0].max){
			sliders[0].value = parseFloat(sliders[0].value) + 
				parseFloat(sliders[0].step);
		}
	}	

	// slider e
	buttons[6].onclick = function(){
		if(sliders[1].value > sliders[1].min){
			sliders[1].value = parseFloat(sliders[1].value) - 
				parseFloat(sliders[1].step);
		}
	}

	buttons[7].onclick = function(){
		if(sliders[1].value < sliders[1].max){
			sliders[1].value = parseFloat(sliders[1].value) + 
				parseFloat(sliders[1].step);
		}
	}

	// slider i
	buttons[8].onclick = function(){
		if(sliders[2].value > sliders[2].min){
			sliders[2].value = parseFloat(sliders[2].value) - 
				parseFloat(sliders[2].step);
		}
	}

	buttons[9].onclick = function(){
		if(sliders[2].value < sliders[2].max){
			sliders[2].value = parseFloat(sliders[2].value) + 
				parseFloat(sliders[2].step);
		}
	}

	// slider w
	buttons[10].onclick = function(){
		if(sliders[3].value > parseFloat(sliders[3].min)){
			sliders[3].value = parseFloat(sliders[3].value) - 
				parseFloat(sliders[3].step);
		}
	}

	buttons[11].onclick = function(){
		if(sliders[3].value < sliders[3].max){
			sliders[3].value = parseFloat(sliders[3].value) + 
				parseFloat(sliders[3].step);
		}
	}

	// initialize text boxes
	boxes[0] = document.createElement('input');
	boxes[1] = document.createElement('input');
	boxes[0].type = boxes[1].type = 'text';
	boxes[0].setAttribute('style','position:absolute; left:6%; top:6%; width:4%');
	boxes[1].setAttribute('style','position:absolute; left:16%; top:6%; width:4%');
	document.body.appendChild(boxes[0]);
	document.body.appendChild(boxes[1]);
	boxes[0].value = boxes[1].value = 1; // initial masses on launch
	currentM1 = currentM2 = parseFloat(boxes[0].value);

	calculate();

	// start rendering
	setInterval(render,1000/60);
}

setCanvasAttributes = function(){
	canvases[0].setAttribute('style','position:absolute; left:0%; top:50%');
	canvases[0].setAttribute('width',window.innerWidth*.45);
	canvases[0].setAttribute('height',window.innerHeight*.5);

	canvases[1].setAttribute('style','position:absolute; left:55%; top:50%');
	canvases[1].setAttribute('width',window.innerWidth*.45);
	canvases[1].setAttribute('height',window.innerHeight*.5);

	canvases[2].setAttribute('style','position:absolute; left:31%; top:5%');
	canvases[2].setAttribute('width',window.innerWidth*.55);
	canvases[2].setAttribute('height',window.innerHeight*.2);

	canvases[3].setAttribute('style','position:absolute; left:31%; top:27.5%');
	canvases[3].setAttribute('width',window.innerWidth*.55);
	canvases[3].setAttribute('height',window.innerHeight*.2);

	canvases[4].setAttribute('style','position:absolute; left:0%; top:0%');
	canvases[4].setAttribute('width',window.innerWidth);
	canvases[4].setAttribute('height',window.innerHeight*.5);	
}

window.onresize = function(){ setCanvasAttributes(); }

calculate = function(){
	var a = parseFloat(currentA);
	var m1 = parseFloat(currentM1); var m2 = parseFloat(currentM2);	
	var e = parseFloat(currentE);
	var i = parseFloat(currentI); var w = parseFloat(currentW);

	currentP = calculatePeriod(a,m1,m2);
	currentVMin = calculateVMin(m1,m2,a,e);
	currentVMax = calculateVMax(m1,m2,a,e);

	pViewPaths = calculatePview(a,e,w,m1,m2);
	eViewPaths = calculateEview();

	calculateThetas();
	calculateVs(a,m1,m2);
	calculateRadVs(i,w);
	calculateLambdas();

	lim = 0;
	for(var i in pViewPaths[0]){
		if(pViewPaths[0][i].t <= Math.PI*2){ lim++; }
	}

	calculateScale();
}

calculateScale = function(){
	var maxX = null; var minX = null;
	var maxY = null; var minY = null;
	var width = canvases[0].width/2;
	var height = canvases[0].height/2;

	for(var z in pViewPaths){
		for(var i in pViewPaths[z]){
			var x = pViewPaths[z][i].x*scale;
			var y = pViewPaths[z][i].y*scale;

			if(maxX === null || x > maxX){ maxX = x; }
			if(maxY === null || y > maxY){ maxY = y; }
			if(minX === null || x < minX){ minX = x; }
			if(minY === null || y < minY){ minY = y; }
		}
	}

	if(Math.abs(maxX) > width || Math.abs(minX) > width){
		scale -= 5;
		calculateScale();
		return;
	}

	if(Math.abs(maxY) > height || Math.abs(minY) > height){
		scale -= 5;
		calculateScale();
		return;
	}
}

calculateLambdas = function(){
	lambdas = [[],[]];
	var lambda1Valid = true; var lambda2Valid = true;

	var lambda0 = .25; var arbConst = 1;
	lMin = null; lMax = null;
	for(var z in radialVels){
		for(var i in radialVels[z]){
			lambdas[z][i] = lambda0*(1+radialVels[z][i]*arbConst);
			if(isNaN(lambdas[z][i])){
				//console.log('lambdas: ',z,i,lambdas[z][i]);
				if(z == 0){ lambda1Valid = false; }
				if(z == 1){ lambda2Valid = false; }
			}
			if(lMin === null || lambdas[z][i] < lMin){ lMin = lambdas[z][i]; }
			if(lMax === null || lambdas[z][i] > lMax){ lMax = lambdas[z][i]; }
		}
	}

	console.log('lambdas 1 valid: '+ lambda1Valid);
	console.log('lambdas 2 valid: '+ lambda2Valid);

	//console.log(lMin, lMax);
}

// scale a by mass ratio for blue star here or at function call
calculateVelocity = function(a,m1,m2,r){
	var vsqrd = G*((m1+m2)*kgPerSolarMass)*(2/(r*mPerAu) - 1/(a*mPerAu));
	var v = (Math.sqrt(vsqrd)/1000).toFixed(2);
	if(isNaN(v)){ console.log('>>>>> ',a,m1,m2,r,v,vsqrd); }
	return v;
}

calculateVs = function(a,m1,m2){
	velocities = [[],[]];
	var vel1Valid = true; var vel2Valid = true;
	var a1 = a/(1+m1/m2); var a2 = a/(1+m2/m1);

	for(var z in pViewPaths){
		for(var i in pViewPaths[z]){
			var tempV;
			if(z == 0){
				tempV = calculateVelocity(a,m1,m2,pViewPaths[z][i].r);
				tempV = tempV*a1/a;
			}else{
				tempV = calculateVelocity(a,m1,m2,pViewPaths[z][i].r);
				tempV = tempV*a2/a;
			}
			velocities[z].push(tempV);
			if(isNaN(tempV)){
				//console.log('Vs: ',z,i,tempV);
				if(z == 0){ vel1Valid = false; }
				if(z == 1){ vel2Valid = false; }
			}
		}
	}

	console.log('velocities 1 valid: '+ vel1Valid);
	console.log('velocities 2 valid: '+ vel2Valid);
}

calcRV = function(v,theta,inc,w){
	var radV = v*Math.sin(inc*Math.PI/180)*Math.cos(theta-((w-0)*Math.PI/180));
	//console.log(Math.sin(inc*Math.PI/180), Math.cos(theta-(w*Math.PI/180)));
	return radV.toFixed(2);
}

calculateRadVs = function(inc,w){
	radialVels = [[],[]];
	var radV1Valid = true; var radV2Valid = true;

	var max = null;
	for(var z in velocities){
		for(var i in velocities[z]){
			var rv = calcRV(velocities[z][i],pViewPaths[z][i].cTheta,inc,w);
			radialVels[z].push(rv);

			if(isNaN(rv)){
				//console.log('radVs: ',z,i,rv);
				if(z == 0){ radV1Valid = false; }
				if(z == 1){ radV2Valid = false; }
			}

			if(max == null){ max = rv; }
			if(Math.abs(parseFloat(rv)) > parseFloat(max)){ max = Math.abs(rv); }
			console.log(rv, max);
		}
	}
	currentRVMax = max;

	radialVels[0][0] = -radialVels[0][0];
	radialVels[1][0] = -radialVels[1][0];

	console.log('radialVels 1 valid: '+ radV1Valid);
	console.log('radialVels 2 valid: '+ radV2Valid);
}

calculatePview = function(a,e,w,m1,m2){
	var path1 = []; var path2 = [];

	var theta = 0;
	var r = a * (1 - e);
	var deltaTheta = const2/(r*r)*deltaT;

		theta = theta + deltaTheta;
		r = a*(1-Math.pow(e,2)) / (1+e*Math.cos(theta));
		deltaTheta = const2/(r*r)*deltaT;

		//console.log(r,theta);

	while(theta < Math.PI*2.05){
		path1.push(rtToxy(r,theta));
		path2.push(rtToxy(r,theta+Math.PI));
		theta = theta + deltaTheta;
		r = a*(1-Math.pow(e,2)) / (1+e*Math.cos(theta));
		deltaTheta = const2/(r*r)*deltaT;
		//console.log(r,theta);
	}

	var p1Valid = true; var p2Valid = true;
	for(var i in path1){
		if(isNaN(path1[i].x)){ console.log(i, path1[i]); p1Valid = false; }
		if(isNaN(path1[i].y)){ console.log(i, path1[i]); p1Valid = false; }
		if(isNaN(path1[i].r)){ console.log(i, path1[i]); p1Valid = false; }
		if(isNaN(path1[i].t)){ console.log(i, path1[i]); p1Valid = false; }
	}

	for(var i in path2){
		if(isNaN(path2[i].x)){ console.log(i, path2[i]); p2Valid = false; }
		if(isNaN(path2[i].y)){ console.log(i, path2[i]); p2Valid = false; }
		if(isNaN(path2[i].r)){ console.log(i, path2[i]); p2Valid = false; }
		if(isNaN(path2[i].t)){ console.log(i, path2[i]); p2Valid = false; }
	}

	console.log('pview path1 valid: ' + p1Valid);
	console.log('pview path2 valid: ' + p2Valid);

	return [path1, path2];
}

calculateEview = function(){
	var path1 = []; var path2 = [];
	var cosT = Math.cos(Math.PI/180*currentW);
	var sinT = Math.sin(Math.PI/180*currentW);
	for(var i in pViewPaths[0]){
		var x = pViewPaths[0][i].x*cosT - pViewPaths[0][i].y*sinT;
		var y = pViewPaths[0][i].x*sinT + pViewPaths[0][i].y*cosT;
		y = y * Math.cos(currentI*Math.PI/180);
		path1.push({x:x,y:y});
	}

	for(var i in pViewPaths[1]){
		var x = pViewPaths[1][i].x*cosT - pViewPaths[1][i].y*sinT;
		var y = pViewPaths[1][i].x*sinT + pViewPaths[1][i].y*cosT;
		y = y * Math.cos(currentI*Math.PI/180);
		path2.push({x:x,y:y});
	}

	var p1Valid = true; var p2Valid = true;
	for(var i in path1){
		if(isNaN(path1[i].x)){ console.log(i, path1[i]); p1Valid = false; }
		if(isNaN(path1[i].y)){ console.log(i, path1[i]); p1Valid = false; }
	}

	for(var i in path2){
		if(isNaN(path2[i].x)){ console.log(i, path2[i]); p2Valid = false; }
		if(isNaN(path2[i].y)){ console.log(i, path2[i]); p2Valid = false; }
	}

	console.log('eview path1 valid: ' + p1Valid);
	console.log('eview path2 valid: ' + p2Valid);

	return [path1, path2];
}

calculatePeriod = function(a,m1,m2){
	var period = Math.sqrt(Math.pow(a,3)/(m1+m2));
	return period.toFixed(2);
}

calculateVMin = function(m1,m2,a,e){
	var M = (m1+m2)*kgPerSolarMass;
	a = a*mPerAu;
	var vmaxsqrd = ((G*M)/a)*((1-e)/(1+e));
	return (Math.sqrt(vmaxsqrd)/1000).toFixed(2);
}

calculateVMax = function(m1,m2,a,e){
	var M = (m1+m2)*kgPerSolarMass;
	a = a*mPerAu;
	var vmaxsqrd = ((G*M)/a)*((1+e)/(1-e));
	return (Math.sqrt(vmaxsqrd)/1000).toFixed(2);
}

calculateThetas = function(){
	var ct1Valid = true; ct2Valid = true;
	for(var z = 0; z < 2; z++){
		for(var i = 0; i < pViewPaths[z].length; i++){
			var idx1 = i; var idx2 = i-1;
			if(idx2 < 0){ idx2 = pViewPaths[z].length-1; }

			pViewPaths[z][i].cTheta = Math.atan2(
				pViewPaths[z][idx2].x-pViewPaths[z][idx1].x,
				pViewPaths[z][idx2].y-pViewPaths[z][idx1].y
			);
			
			if(isNaN(pViewPaths[z][i].cTheta)){
				console.log('cTheta: ',z,i,pViewPaths[z][i].cTheta);
				if(z == 0){ ct1Valid = false; }
				if(z == 1){ ct2Valid = false; }
			}
		}
	}

	console.log('cThetas1 valid: ' + ct1Valid);
	console.log('cThetas2 valid: ' + ct2Valid);
}

render = function(){
	renderMenu();
	renderLeft(); renderRight();
	renderGraph(); renderSpectrum();
}

renderMenu = function(){
	gfxMenu.clearRect(0,0,window.innerWidth,window.innerHeight);

	changeColor(gfxMenu,'black');
	gfxMenu.font = '12pt verdana';

	var tempWidth = gfxMenu.measureText('Speed:').width;
	gfxMenu.fillText('Speed:',window.innerWidth*.45-tempWidth,18);
	
	gfxMenu.fillText(''+currentRVMax+' km/s', window.innerWidth-105, window.innerHeight*.05);
	gfxMenu.fillText('-'+currentRVMax+' km/s', window.innerWidth-105, window.innerHeight*.05+canvases[2].height);
	gfxMenu.fillText('0 km/s', window.innerWidth-105, window.innerHeight*.05+canvases[2].height/2);

	var tempWidth = gfxMenu.measureText('M1:').width+3;
	gfxMenu.fillText('M1:', window.innerWidth*.06-tempWidth,window.innerHeight*.06+15);
	tempWidth = gfxMenu.measureText('M1:').width+3;
	gfxMenu.fillText('M2:', window.innerWidth*.16-tempWidth,window.innerHeight*.06+15);

	gfxMenu.fillText('Period: '+ currentP +' yrs',window.innerWidth-300,18);

	if(chr || (!ie && !ff)){
		gfxMenu.fillText(''+simSpeed,window.innerWidth/2,18);

		gfxMenu.fillText('a: .1',2,
			sliderOffset/100*window.innerHeight+15);

		gfxMenu.fillText('e: 0',2,
			(sliderOffset+sliderSpacing)/100*window.innerHeight+15);

		gfxMenu.fillText('i: 0',2,
			(sliderOffset+sliderSpacing*2)/100*window.innerHeight+15);

		gfxMenu.fillText('w: -90',2,
			(sliderOffset+sliderSpacing*3)/100*window.innerHeight+15);

		gfxMenu.fillText('2',window.innerWidth*.27,
			sliderOffset/100*window.innerHeight+15);

		gfxMenu.fillText('.9',window.innerWidth*.27,
			(sliderOffset+sliderSpacing)/100*window.innerHeight+15);

		gfxMenu.fillText('90',window.innerWidth*.27,
			(sliderOffset+sliderSpacing*2)/100*window.innerHeight+15);

		gfxMenu.fillText('90',window.innerWidth*.27,
			(sliderOffset+sliderSpacing*3)/100*window.innerHeight+15);

		gfxMenu.fillText(''+sliders[0].value,window.innerWidth*.16
			,sliderOffset/100*window.innerHeight-3);

		gfxMenu.fillText(''+sliders[1].value,window.innerWidth*.16
			,(sliderOffset+sliderSpacing)/100*window.innerHeight-3);
		
		gfxMenu.fillText(''+sliders[2].value,window.innerWidth*.16
			,(sliderOffset+sliderSpacing*2)/100*window.innerHeight-3);
		
		gfxMenu.fillText(''+sliders[3].value,window.innerWidth*.16
			,(sliderOffset+sliderSpacing*3)/100*window.innerHeight-3);
	}else if(ff){
		gfxMenu.fillText(''+simSpeed,window.innerWidth/2,18);

		gfxMenu.fillText('a: .1',2,
			sliderOffset/100*window.innerHeight+15);

		gfxMenu.fillText('e: 0',2,
			(sliderOffset+sliderSpacing)/100*window.innerHeight+15);

		gfxMenu.fillText('i: 0',2,
			(sliderOffset+sliderSpacing*2)/100*window.innerHeight+15);

		gfxMenu.fillText('w: -90',2,
			(sliderOffset+sliderSpacing*3)/100*window.innerHeight+15);

		gfxMenu.fillText('2',window.innerWidth*.28,
			sliderOffset/100*window.innerHeight+15);

		gfxMenu.fillText('.9',window.innerWidth*.28,
			(sliderOffset+sliderSpacing)/100*window.innerHeight+15);

		gfxMenu.fillText('90',window.innerWidth*.28,
			(sliderOffset+sliderSpacing*2)/100*window.innerHeight+15);

		gfxMenu.fillText('90',window.innerWidth*.28,
			(sliderOffset+sliderSpacing*3)/100*window.innerHeight+15);

		gfxMenu.fillText(''+sliders[0].value,window.innerWidth*.16
			,sliderOffset/100*window.innerHeight-3);

		gfxMenu.fillText(''+sliders[1].value,window.innerWidth*.16
			,(sliderOffset+sliderSpacing)/100*window.innerHeight-3);
		
		gfxMenu.fillText(''+sliders[2].value,window.innerWidth*.16
			,(sliderOffset+sliderSpacing*2)/100*window.innerHeight-3);
		
		gfxMenu.fillText(''+sliders[3].value,window.innerWidth*.16
			,(sliderOffset+sliderSpacing*3)/100*window.innerHeight-3);
	}else if(ie){
		gfxMenu.fillText(''+simSpeed,window.innerWidth/2,18);

		gfxMenu.fillText('a: .1',2,
			sliderOffset/100*window.innerHeight+15);

		gfxMenu.fillText('e: 0',2,
			(sliderOffset+sliderSpacing)/100*window.innerHeight+15);

		gfxMenu.fillText('i: 0',2,
			(sliderOffset+sliderSpacing*2)/100*window.innerHeight+15);

		gfxMenu.fillText('w: -90',2,
			(sliderOffset+sliderSpacing*3)/100*window.innerHeight+15);

		gfxMenu.fillText('2',window.innerWidth*.28,
			sliderOffset/100*window.innerHeight+15);

		gfxMenu.fillText('.9',window.innerWidth*.28,
			(sliderOffset+sliderSpacing)/100*window.innerHeight+15);

		gfxMenu.fillText('90',window.innerWidth*.28,
			(sliderOffset+sliderSpacing*2)/100*window.innerHeight+15);

		gfxMenu.fillText('90',window.innerWidth*.28,
			(sliderOffset+sliderSpacing*3)/100*window.innerHeight+15);

		gfxMenu.fillText(''+sliders[0].value,window.innerWidth*.16
			,sliderOffset/100*window.innerHeight-3);

		gfxMenu.fillText(''+sliders[1].value,window.innerWidth*.16
			,(sliderOffset+sliderSpacing)/100*window.innerHeight-3);
		
		gfxMenu.fillText(''+sliders[2].value,window.innerWidth*.16
			,(sliderOffset+sliderSpacing*2)/100*window.innerHeight-3);
		
		gfxMenu.fillText(''+sliders[3].value,window.innerWidth*.16
			,(sliderOffset+sliderSpacing*3)/100*window.innerHeight-3);	
	}
}

renderLeft = function(){
	var center = {x:canvases[0].width/2, y:canvases[0].height/2};

	gfxLeft.clearRect(0,0,window.innerWidth,window.innerHeight);	
	
	changeColor(gfxLeft,'black');
	arc(gfxLeft,center.x,center.y,3,true);

	gfxLeft.font = '12pt verdana';
	var tempWidth = gfxLeft.measureText('Fiducial View').width;
	gfxLeft.fillText('Fiducial View', center.x-tempWidth/2, 30);

	gfxLeft.save();
	gfxLeft.translate(center.x, center.y);
	if(trails){
		changeColor(gfxLeft,'red');
		var begin = false;
		for(var p in pViewPaths[0]){
			if(!begin){
				begin = true;
				gfxLeft.beginPath();
				gfxLeft.moveTo(pViewPaths[0][p].x*scale,pViewPaths[0][p].y*scale);
			}else{
				gfxLeft.lineTo(pViewPaths[0][p].x*scale,pViewPaths[0][p].y*scale);
			}
		}
		gfxLeft.stroke();

		changeColor(gfxLeft,'blue');
		var mr = currentM1/currentM2;
		begin = false;
		for(var p in pViewPaths[1]){
			if(!begin){
				begin = true;
				gfxLeft.beginPath();
				gfxLeft.moveTo(pViewPaths[1][p].x*scale*mr,pViewPaths[1][p].y*scale*mr);
			}else{
				gfxLeft.lineTo(pViewPaths[1][p].x*scale*mr,pViewPaths[1][p].y*scale*mr);
			}
		}
		gfxLeft.stroke();
	}

	changeColor(gfxLeft,'red');
	arc(gfxLeft,pViewPaths[0][count1].x*scale,pViewPaths[0][count1].y*scale,5,true);
	changeColor(gfxLeft,'blue');
	arc(gfxLeft,pViewPaths[1][count2].x*scale*mr,pViewPaths[1][count2].y*scale*mr,5,true);

	// view direction indicator
	changeColor(gfxLeft, 'black');
	gfxLeft.save();
	gfxLeft.rotate(currentW*Math.PI/180);
	gfxLeft.translate(0,canvases[0].height/2-35);
	gfxLeft.beginPath();
	gfxLeft.moveTo(0,0); gfxLeft.lineTo(-4,10);
	gfxLeft.lineTo(4,10); gfxLeft.lineTo(0,0);
	gfxLeft.fill(); gfxLeft.stroke();
	gfxLeft.restore();

	count1+= simSpeed; count2+= simSpeed;
	if(count1 >= pViewPaths[0].length){
		count1 = skip();
		//console.log(skip());
		if(secondHalf){ secondHalf = false }else{ secondHalf = true; }
	}
	if(count2 >= pViewPaths[1].length){ count2 = skip(); }
	
	///// previously removed
	if(pViewPaths[0][count1].t > Math.PI*2 + (currentW*Math.PI/180) ){
		count1 = 0;
		if(secondHalf){ secondHalf = false }else{ secondHalf = true; }
	}
	if(pViewPaths[1][count2].t > Math.PI*3 + (currentW*Math.PI/180) ){ count2 = 0; }
	////

	gfxLeft.restore();
}

skip = function(){
	if(currentE == 0){ return 20; }
	if(currentE == .1){ return 18; }
	if(currentE == .2){ return 15; }
	if(currentE == .3){ return 12; }
	if(currentE == .4){ return 9; }
	if(currentE == .5){ return 6; }
	if(currentE == .6){ return 3; }
	if(currentE == .7){ return 0; }
	if(currentE == .8){ return 0; }
	if(currentE == .9){ return 0; }
	return 0;
}

renderRight = function(){
	var center = {x:canvases[1].width/2, y:canvases[1].height/2};

	gfxRight.clearRect(0,0,window.innerWidth,window.innerHeight);	
	
	changeColor(gfxRight,'black');
	arc(gfxRight,center.x,center.y,3,true);

	gfxRight.font = '12pt verdana';
	var tempWidth = gfxLeft.measureText('Earth View').width;
	gfxRight.fillText('Earth View', center.x-tempWidth/2, 30);

	gfxRight.save();
	gfxRight.translate(center.x, center.y);
	if(trails){
		changeColor(gfxRight,'red');
		var begin = false;
		for(var p in eViewPaths[0]){
			if(!begin){
				begin = true;
				gfxRight.beginPath();
				gfxRight.moveTo(eViewPaths[0][p].x*scale,eViewPaths[0][p].y*scale);
			}else{
				gfxRight.lineTo(eViewPaths[0][p].x*scale,eViewPaths[0][p].y*scale);
			}
		}
		gfxRight.stroke();

		changeColor(gfxRight,'blue');
		var mr = currentM1/currentM2;
		begin = false;
		for(var p in eViewPaths[1]){
			if(!begin){
				begin = true;
				gfxRight.beginPath();
				gfxRight.moveTo(eViewPaths[1][p].x*scale*mr,eViewPaths[1][p].y*scale*mr);
			}else{
				gfxRight.lineTo(eViewPaths[1][p].x*scale*mr,eViewPaths[1][p].y*scale*mr);
			}
		}
		gfxRight.stroke();
	}

	changeColor(gfxRight,'red');
	arc(gfxRight,eViewPaths[0][count1].x*scale,eViewPaths[0][count1].y*scale,5,true);
	changeColor(gfxRight,'blue');
	arc(gfxRight,eViewPaths[1][count2].x*scale*mr,eViewPaths[1][count2].y*scale*mr,5,true);

	gfxRight.restore();
}

renderGraph = function(){
	var width = canvases[2].width;
	var height = canvases[2].height;

	gfxGraph.clearRect(0,0,width,height);

	changeColor(gfxGraph,'black');
	gfxGraph.strokeRect(0,0,canvases[2].width,canvases[2].height);

	// dashed line
	var dashLength = 39.5;
	for(var i = 0; i < 35; i++){
		drawLine(gfxGraph,i*dashLength,height/2,i*dashLength+dashLength/2,height/2);
	}

	// red line
	changeColor(gfxGraph,'red');
	var begin = false;
	var redPt1; var redPt2;
	var bluePt1; var bluePt2;
	for(var i = 1; i < radialVels[0].length; i++){
		if(!begin){
			begin = true;
			gfxGraph.beginPath();
			var x = lerp(0,lim, i ,0,canvases[2].width/2);
			var y = lerp(-currentRVMax,currentRVMax, -radialVels[0][i] ,0,canvases[2].height);
			gfxGraph.moveTo(x,y);
		}else{
			if(pViewPaths[0][i].t <= Math.PI*2){
				var x = lerp(0,lim, i ,0,canvases[2].width/2);
				var y = lerp(-currentRVMax,currentRVMax, -radialVels[0][i] ,0,canvases[2].height);
				gfxGraph.lineTo(x,y);
				redPt1 = {x:x,y:y};
			}				
		}
	}
	gfxGraph.stroke();

	// red second half
	begin = false;
	for(var i = 1; i < radialVels[0].length; i++){
		if(!begin){
			begin = true;
			var x = lerp(0,lim, i ,canvases[2].width/2,canvases[2].width);
			var y = lerp(-currentRVMax,currentRVMax, -radialVels[0][i] ,0,canvases[2].height);
			gfxGraph.beginPath();
			gfxGraph.moveTo(x,y);
			redPt2 = {x:x,y:y};
		}else{
			if(pViewPaths[0][i].t <= Math.PI*2){
				gfxGraph.lineTo(
					lerp(0,lim, i ,canvases[2].width/2,canvases[2].width),
					lerp(-currentRVMax,currentRVMax, -radialVels[0][i] ,0,canvases[2].height)
				);
			}
		}
	}
	gfxGraph.stroke();

	drawLine(gfxGraph,redPt1.x,redPt1.y,redPt2.x,redPt2.y);

	// blue line
	changeColor(gfxGraph,'blue');
	var begin = false;
	for(var i = 1; i < radialVels[1].length; i++){
		if(!begin){
			begin = true;
			gfxGraph.beginPath();
			gfxGraph.moveTo(
				lerp(0,lim, i ,0,canvases[2].width/2),
				lerp(currentRVMax,-currentRVMax, radialVels[1][i] ,0,canvases[2].height)
			);				
		}else{
			//if(pViewPaths[1][i].t <= Math.PI*2){
				var x = lerp(0,lim, i ,0,canvases[2].width/2);
				var y = lerp(currentRVMax,-currentRVMax, radialVels[1][i] ,0,canvases[2].height);
				gfxGraph.lineTo(x,y);
				bluePt1 = {x:x,y:y};
			//}
		}
	}
	gfxGraph.stroke();

	// blue second half
	begin = false;
	for(var i = 1; i < radialVels[1].length; i++){
		if(!begin){
			begin = true;
			gfxGraph.beginPath();
			var x = lerp(0,lim, i ,canvases[2].width/2,canvases[2].width);
			var y = lerp(currentRVMax,-currentRVMax, radialVels[1][i] ,0,canvases[2].height);
			gfxGraph.moveTo(x,y);		
			bluePt2 = {x:x,y:y};
		}else{
			//if(pViewPaths[1][i].t <= Math.PI*2){
				gfxGraph.lineTo(
					lerp(0,lim, i ,canvases[2].width/2,canvases[2].width),
					lerp(currentRVMax,-currentRVMax, radialVels[1][i] ,0,canvases[2].height)
				);
			//}
		}
	}
	gfxGraph.stroke();

	drawLine(gfxGraph,bluePt1.x,bluePt1.y,bluePt2.x,bluePt2.y);

	// dots
	changeColor(gfxGraph,'red');
	if(!secondHalf){
		arc(gfxGraph,
			lerp(0,lim, count1 ,0,canvases[2].width/2),
			lerp(-currentRVMax,currentRVMax, -radialVels[0][count1] ,0,canvases[2].height),
		5,true);
	}else{
		arc(gfxGraph,
			lerp(0,lim, count1 ,canvases[2].width/2,canvases[2].width),
			lerp(-currentRVMax,currentRVMax, -radialVels[0][count1] ,0,canvases[2].height),
		5,true);		
	}

	changeColor(gfxGraph,'blue');
	if(!secondHalf){
		arc(gfxGraph,
			lerp(0,lim, count2 ,0,canvases[2].width/2),
			lerp(currentRVMax,-currentRVMax, radialVels[1][count2] ,0,canvases[2].height),
		5,true);
	}else{
		arc(gfxGraph,
			lerp(0,lim, count2 ,canvases[2].width/2,canvases[2].width),
			lerp(currentRVMax,-currentRVMax, radialVels[1][count2] ,0,canvases[2].height),
		5,true);		
	}
}

renderSpectrum = function(){
	var width = canvases[3].width;
	var height = canvases[3].height;

	gfxSpectrum.clearRect(0,0,width,height);

	for(var x = 0; x < width; x++){
		var c = new tinycolor('hsv('+
        lerp(width,0,x,0,300) +',1,1)');

        var r = parseInt(c._r);
        var g = parseInt(c._g);
        var b = parseInt(c._b);

        gfxSpectrum.fillStyle = gfxSpectrum.strokeStyle = 
        	'rgb(' + r + ',' + g + ',' + b + ')';

        drawLine(gfxSpectrum,x,10,x,height);
	}

	changeColor(gfxSpectrum,'black');
	drawLine(gfxSpectrum,width/4,0,width/4,10);
	drawLine(gfxSpectrum,width/4*3,0,width/4*3,10);

	// red lines
	var maxDisp = window.innerWidth*.01;
	var disp1 = lerp(-lMax,lMax,lambdas[0][count1],-maxDisp,maxDisp);
	var disp2 = -lerp(-lMax,lMax,lambdas[1][count1],-maxDisp,maxDisp);

	changeColor(gfxSpectrum,'red');
	arc(gfxSpectrum,width/4+disp1,5,3,true);
	changeColor(gfxSpectrum,'black');
	drawLine(gfxSpectrum,width/4+disp1,10,width/4+disp1,height);

	changeColor(gfxSpectrum,'red');
	arc(gfxSpectrum,width/4*3+disp1,5,3,true);
	changeColor(gfxSpectrum,'black');
	drawLine(gfxSpectrum,width/4*3+disp1,10,width/4*3+disp1,height);

	// blue lines
	changeColor(gfxSpectrum,'blue');
	arc(gfxSpectrum,width/4*3-disp2,5,3,true);
	changeColor(gfxSpectrum,'black');
	drawLine(gfxSpectrum,width/4*3-disp2,10,width/4*3-disp2,height);

	changeColor(gfxSpectrum,'blue');
	arc(gfxSpectrum,width/4-disp2,5,3,true);
	changeColor(gfxSpectrum,'black');
	drawLine(gfxSpectrum,width/4-disp2,10,width/4-disp2,height);
}

arc = function(gfx,x,y,d,fill){
	gfx.beginPath();

	gfx.arc(x,y,d,0,Math.PI*2);

	if(fill == true){ gfx.fill(); }
	gfx.stroke();
}

drawLine = function(gfx,x1,y1,x2,y2){
	gfx.beginPath();
	gfx.moveTo(x1,y1);
	gfx.lineTo(x2,y2);
	gfx.stroke();
}

changeColor = function(gfx,c){
	gfx.fillStyle = gfx.strokeStyle = c;
}

rtToxy = function(r,t){
	var x = r*Math.cos(t);
	var y = r*Math.sin(t);
	return {x:x,y:y,r:r,t:t};
}

lerp = function(oldMin,oldMax,oldVal,newMin,newMax){
	return (oldVal-oldMin)/(oldMax-oldMin)*(newMax-newMin)+newMin;
}

dist = function(v1,v2){ return mag(add(v1,neg(v2))); }

vec2 = function(x,y){ this.x = x; this.y = y; }
add = function(v1, v2){ return new vec2(v1.x+v2.x, v1.y+v2.y); }
sub = function(v1, v2){ return new vec2(v1.x-v2.x, v1.y-v2.y); }
neg = function(v){ return new vec2(-v.x, -v.y); }
mag = function(v){ return Math.sqrt(Math.pow(v.x,2) + Math.pow(v.y,2)); }
dot = function(v1,v2){ return v1.x*v2.x + v1.y*v2.y; }
unit = function(v){ return new vec2(v.x/mag(v), v.y/mag(v)); }
mult = function(v,s){ return new vec2(v.x*s, v.y*s); }

	</script>
</head>
<body bgcolor="grey">
</body>