// Kevin Dilts
// 6/11/2014

var path = 'http://physics.unm.edu/101lab/portal/labs/cepheids/m100images/';

var mode = 0; // indicates which page is being displayed.
			  // 0 - grid
			  // 1 - beastie
			  // 2 - wrong answer
			  // 48, 68, etc - specific cell
			  // X48, X68, etc - correct anser, specific cell, X refers to the solution number

var gridSpots = [];
var mX; var mY;

window.onload = function(){
	window.scrollTo(0,0);
	displayGridPage();
}

// TODO make sure mouse stuff is compatible with all browsers
window.onmousemove = function(e){
	mX = e.x; mY = e.y;
	if(!mX){ mX = e.clientX; mY = e.clientY; }
}

window.onmouseup = function(e){
	if(mode === 0){
		for(var s in gridSpots){
			gridSpots[s].clicked(mX,mY);
		}
	}
	else if(('' + mode).length === 2 && mY <= 320 && mY > 100){
		var idx;
		for(var c in cellData){ if(cellData[c].cellNum === mode){ idx = c; } }
		for(var s in cellData[idx].spots){
			cellData[idx].spots[s].clicked(mX,mY);
		}
		if(('' + mode).length === 2){
			clearPage();
			displayWrong(mode);
			mode = 2;
		}
	}
}

displayBeastie = function(){
	document.body.setAttribute('bgcolor','white');

	addHeader(1,'You are no longer in Federation space.','position:absolute; left:50; top:20');

	h = document.createElement('H1');
	h.appendChild(document.createTextNode('Please go '));
	lnk = document.createElement('a'); lnk.href = './cepheidHunt.html';
	lnk.appendChild(document.createTextNode('back')); lnk.setAttribute('style', 'color:FF0000');
	h.appendChild(lnk);
	h.appendChild(document.createTextNode(' immediately!'));
	document.body.appendChild(h);
	lnk.setAttribute('onclick','window.location(this.href); return false;');
	h.setAttribute('style','position:absolute; left:80px; top:60px');

	addImage(path+'beastie.gif', 400, 400, 'position:absolute; left:60px; top:120px', 1);

}

addHeader = function(size, text, style){
	h = document.createElement('H' + size);
	h.appendChild(document.createTextNode(text));
	document.body.appendChild(h);
	h.setAttribute('style',style);
	return h;
}

addImage = function(src, w, h, style, z){
	var img = document.createElement('img');
	img.zIndex = z;
	img.src = src;
	img.width = w; img.height = h;
	document.body.appendChild(img);
	img.setAttribute('style', style);
	return img;
}

addLink = function(size, ref, onclick, style, text, color){
	h = document.createElement('B' + size);
	lnk = document.createElement('a'); lnk.href = ref;
	lnk.appendChild(document.createTextNode(text)); lnk.setAttribute('style', color);
	h.appendChild(lnk);
	document.body.appendChild(h);
	lnk.setAttribute('onclick',onclick);
	h.setAttribute('style',style);
	return h;
}

displayAnswer = function(cellNum, answerNum){
	var idx = -1;
	for(var c in cellData){ if(cellData[c].cellNum === parseInt(cellNum)){ idx = c;  } }

	addHeader(1,'C' + cellData[idx].solutionNum[answerNum] + ' Light Curve', 'position:absolute; left:250px; top:0px');

	h = document.createElement('B1');
	h.appendChild(document.createTextNode('You have discovered a Cepheid! Ferrarese et al. (1996) name this' +
		'Cepheid C' + cellData[idx].solutionNum[answerNum] + '. Below is their plot of C' + 
		cellData[idx].solutionNum[answerNum] + '\'s light curve. On Part I, Section B of your lab sheet, record' +
		'the name of the Cepheid, its grid section number (' + cellNum + '), its '));
	lnk = document.createElement('a'); lnk.href = 'http://physics.unm.edu/101lab/portal/labs/cepheids/physparm.html#Avgmag';
	lnk.setAttribute('onclick', 'window.open(this.href); return false;');
	lnk.appendChild(document.createTextNode('average apparent V magnitude'));
	h.appendChild(lnk);
	h.appendChild(document.createTextNode(' (mv), and its '));
	lnk = document.createElement('a'); lnk.href = 'http://physics.unm.edu/101lab/portal/labs/cepheids/physparm.html#Period';
	lnk.setAttribute('onclick', 'window.open(this.href); return false;');
	lnk.appendChild(document.createTextNode('period'));
	h.appendChild(lnk);
	h.appendChild(document.createTextNode(' (P). (Careful: the numbers decrease going up the vertical axis!)' +
		'When you\'re done, '));
	lnk = document.createElement('a'); lnk.href = '#';
	lnk.setAttribute('onclick', 'changeMode(' + cellNum + ')');
	lnk.appendChild(document.createTextNode('return to the main grid section ' + cellNum + ' page'));
	h.appendChild(lnk);
	h.appendChild(document.createTextNode(', or '));
	lnk = document.createElement('a'); lnk.href = './cepheidHunt.html';
	lnk.setAttribute('onclick', 'window.location(this.href); return false;');
	lnk.appendChild(document.createTextNode('return to the main WF4 8x8 grid.'));
	h.appendChild(lnk);
	document.body.appendChild(h);
	h.setAttribute('style','position:absolute; left:20px; top:70px');

	addImage(path+'C' + cellData[idx].solutionNum[answerNum] + 'light.gif', 237, 172, 'position:absolute; left:160px; top:200px', 1);

	addImage(path+'/C' + cellData[idx].solutionNum[answerNum] + 'anim.gif', 200, 200, 'position:absolute; left:460px; top:200px', 1);
}

displayWrong = function(cellNum){

	addHeader(1,'Nope, not a known Cepheid... Try Again!','position:absolute; left:150px; top:0px');

	h = document.createElement('B1');
	h.appendChild(document.createTextNode('The object on which you clicked is not a known Cepheid.' +
		' It might be a different type of variable star, a bad pixel event, or a completely different phenomenon. Keep hunting!' +
		' If you really want to ask your teaching assistant or professor about an object, you can get the' +
		'  coordinates of the object on a '));
	lnk = document.createElement('a'); lnk.href = './cepheidHunt.html';
	lnk.appendChild(document.createTextNode('separate page.'));
	h.appendChild(lnk);
	document.body.appendChild(h);
	lnk.setAttribute('onclick', 'window.location(this.href); return false;');
	h.setAttribute('style','position:absolute; left:20px; top:70px');

	addImage(path+'anim' + cellNum + '.gif', 200, 200, 'position:absolute; left:360px; top:180px', 1);

	addLink(1,'./cepheidHunt.html', 'window.location(this.href); return false;', 'position:absolute; left:20px; top:400px',
		'Return to the main WF4 8x8 grid', 'color:FF0000');
}

displayEmptyCell = function(){
	h = document.createElement('H1');
	h.appendChild(document.createTextNode('Sorry, no Cepheids in this image!'));
	document.body.appendChild(h);
	h.setAttribute('style','position:absolute; left:250px; top:10px');

	addLink(1,'./cepheidHunt.html', 'window.location(this.href); return false;', 'position:absolute; left:20px; top:120px',
		'Return to the main WF4 8x8 grid', 'color:FF0000');

	mode = 1;
}

displayCell = function(cellNum, solutionNum, enhance, cepheidNum){

	document.body.setAttribute('bgcolor','white');

	if(cepheidNum == -1){ displayEmptyCell(); return; }

	h = document.createElement('H1');
	h.appendChild(document.createTextNode('Grid section ' + cellNum + '. Find the Cepheids!'));
	document.body.appendChild(h);
	h.setAttribute('style','position:absolute; left:50px; top:0px');

	if(cepheidNum === 1){
		h = document.createElement('B1');
		h.appendChild(document.createTextNode('There is one known Cepheid in this image from WF4.' + 
			' See if you can find it! Click on what you believe to be a Cepheid...'));
		document.body.appendChild(h);
		h.setAttribute('style','position:absolute; left:20px; top:60px');
	}else{
		h = document.createElement('B1');
		h.appendChild(document.createTextNode('There are ' + cepheidNum + ' known Cepheids in this image from WF4.' + 
			' See if you can find them! Click on what you believe to be a Cepheid...'));
		document.body.appendChild(h);
		h.setAttribute('style','position:absolute; left:20px; top:60px');
	}

	if(enhance){
		h = document.createElement('B1');
		h.appendChild(document.createTextNode('One is easy to find; the other will be easier to detect in a set of '));
		lnk = document.createElement('a'); lnk.href = '#';
		lnk.appendChild(document.createTextNode('enhanced images.')); lnk.setAttribute('style', 'color:FF0000');
		h.appendChild(lnk);
		document.body.appendChild(h);
		h.setAttribute('style','position:absolute; left:20px; top:80px');
		lnk.setAttribute('onclick', 'enhance()');
	}

	addImage(path+'anim' + cellNum + '.gif', 200, 200, 'position:absolute; left:360px; top:120px', 1);

	addLink(1,'./cepheidHunt.html', 'window.location(this.href); return false;', 'position:absolute; left:20px; top:370px',
		'Return to the main WF4 8x8 grid', 'color:FF0000');
}

enhance = function(){

	addImage(path+'anim67enh5.gif',200,200,'position:absolute; left:360px; top:120px',1);

	h = document.createElement('B1');
	h.appendChild(document.createTextNode('The image has enhanced contrast to make the fainter Cepheid easier to discern.'));
	document.body.appendChild(h);
	h.setAttribute('style','position:absolute; left:250px; top:320px');

	addLink(1, '#', 'changeMode(67)', 'position:absolute; left:20px; top:350px', 'Standard contrast image', 'color:FF0000');
}

displayGridPage = function(){
	/////// top text
	h = document.createElement('B1');
	
	h.appendChild(document.createTextNode('Now you\'re ready to do your own Cepheid hunt.'));
	
	h.appendChild(document.createElement('br'));

	txt = document.createElement('H3');
	txt.setAttribute('style','color:yellow');
	txt.appendChild(document.createTextNode('Click on grid section 47 below to begin your hunt.'));
	h.appendChild(txt);

	h.appendChild(document.createTextNode('You are to find at least 2 Cepheids noting their period and apparent magnitude.' +
	 ' If you need more information on what to expect click on '));
	
	lnk = document.createElement('a'); lnk.href = 'http://physics.unm.edu/101lab/portal/labs/Cepheid_check.html';
	lnk.appendChild(document.createTextNode('this link.')); lnk.setAttribute('style', 'color:00FF00');
	h.appendChild(lnk);

	h.appendChild(document.createTextNode(' If you want a more accurate distance calculation, go to more grid sections.'));

	h.appendChild(document.createElement('br'));
	h.appendChild(document.createElement('br'));

	h.appendChild(document.createTextNode('Only grid sections with numbers are currently available.'));

	document.body.appendChild(h);
	lnk.setAttribute('onclick','window.open(this.href); return false;');
	h.style.color='white';
	h.setAttribute('cssText','position:absolute; left:40px; top:10px;');

	////////////// middle image
	canvas = document.createElement('canvas');
	canvas.width = 450; canvas.height = 300;
	canvas.id = 'bgCanvas'; canvas.zIndex = 0;
	h.appendChild(canvas);
	canvas.setAttribute('style','position:absolute; left:240px; top:180px');

	gif = document.createElement('img');
	gif.zIndex = 1;
	gif.src = path+'quarter752.gif';
	gif.width = 200; gif.height = 200;
	h.appendChild(gif);
	gif.setAttribute('style','position:absolute; left:255px; top:260px');

	gif2 = document.createElement('img');
	gif2.zIndex = 1;
	gif2.src = path+'quarter752.gif';
	gif2.width = 200; gif2.height = 200;
	h.appendChild(gif2);
	gif2.setAttribute('style','position:absolute; left:470px; top:260px');

	canvas2 = document.createElement('canvas');
	canvas2.width = 450; canvas2.height = 300;
	canvas2.id = 'fgCanvas'; canvas2.zIndex = 2;
	h.appendChild(canvas2);
	canvas2.setAttribute('style','position:absolute; left:240px; top:180px');

	// update canvases
	gfx = canvas.getContext('2d');
	gfx.fillStyle='rgb(200,200,200)';
	gfx.fillRect(0,0,450,300);

	gfx.fillStyle='rgb(0,0,0)';
	gfx.fillRect(2,2,446,48);
	gfx.fillRect(2,52,446,246);

	gfx.fillStyle='rgb(200,200,200)';
	gfx.font='20px Verdana';
	gfx.fillText('FIND the CEPHEIDS in M100', 85,30);

	gfx2 = canvas2.getContext('2d');
	gfx2.clearRect(0,0,450,300);
	gfx2.fillStyle='rgba(255,255,0,1)'; gfx2.strokeStyle='rgba(255,255,0,1)';
	gfx2.lineWidth=1.5;
	gfx2.strokeRect(230,80,200,200);

	for(i = 0; i < 8; i++){
		gfx2.fillRect(230,105+(i*25),200,1.5);
		gfx2.fillRect(230+(i*25),80,1.5,200);
	}

	gfx2.font = '12px Verdana'; 
	gfx2.fillText('48', gridCoords(3,0).x+5, gridCoords(3,0).y+7);
	gridSpots[0] = new hotspot(gridCoords(3,0).x, gridCoords(3,0).y-10, 25,25, '48');
	
	gfx2.fillText('68', gridCoords(5,0).x+5, gridCoords(5,0).y+7);
	gridSpots[1] = new hotspot(gridCoords(5,0).x, gridCoords(5,0).y-10, 25,25, '68');

	gfx2.fillText('78', gridCoords(6,0).x+5, gridCoords(6,0).y+7);
	gridSpots[2] = new hotspot(gridCoords(6,0).x, gridCoords(6,0).y-10, 25,25, '78');

	gfx2.fillText('88', gridCoords(7,0).x+5, gridCoords(7,0).y+7);
	gridSpots[3] = new hotspot(gridCoords(7,0).x, gridCoords(7,0).y-10, 25,25, '88');

	gfx2.fillText('17', gridCoords(0,1).x+5, gridCoords(0,1).y+7);
	gridSpots[4] = new hotspot(gridCoords(0,1).x, gridCoords(0,1).y-10, 25,25, '17');

	gfx2.fillText('47', gridCoords(3,1).x+5, gridCoords(3,1).y+7);
	gridSpots[5] = new hotspot(gridCoords(3,1).x, gridCoords(3,1).y-10, 25,25, '47');

	gfx2.fillText('67', gridCoords(5,1).x+5, gridCoords(5,1).y+7);
	gridSpots[6] = new hotspot(gridCoords(5,1).x, gridCoords(5,1).y-10, 25,25, '67');

	gfx2.fillText('77', gridCoords(6,1).x+5, gridCoords(6,1).y+7);
	gridSpots[7] = new hotspot(gridCoords(6,1).x, gridCoords(6,1).y-10, 25,25, '77');

	gfx2.fillText('87', gridCoords(7,1).x+5, gridCoords(7,1).y+7);
	gridSpots[8] = new hotspot(gridCoords(7,1).x, gridCoords(7,1).y-10, 25,25, '87');

	gfx2.fillText('26', gridCoords(1,2).x+5, gridCoords(1,2).y+7);
	gridSpots[9] = new hotspot(gridCoords(1,2).x, gridCoords(1,2).y-10, 25,25, '26');

	gfx2.fillText('46', gridCoords(3,2).x+5, gridCoords(3,2).y+7);
	gridSpots[10] = new hotspot(gridCoords(3,2).x, gridCoords(3,2).y-10, 25,25, '46');

	gfx2.fillText('56', gridCoords(4,2).x+5, gridCoords(4,2).y+7);
	gridSpots[11] = new hotspot(gridCoords(4,2).x, gridCoords(4,2).y-10, 25,25, '56');

	gfx2.fillText('66', gridCoords(5,2).x+5, gridCoords(5,2).y+7);
	gridSpots[12] = new hotspot(gridCoords(5,2).x, gridCoords(5,2).y-10, 25,25, '66');

	gfx2.fillText('76', gridCoords(6,2).x+5, gridCoords(6,2).y+7);
	gridSpots[13] = new hotspot(gridCoords(6,2).x, gridCoords(6,2).y-10, 25,25, '76');

	gfx2.fillText('86', gridCoords(7,2).x+5, gridCoords(7,2).y+7);
	gridSpots[14] = new hotspot(gridCoords(7,2).x, gridCoords(7,2).y-10, 25,25, '86');

	gfx2.fillText('55', gridCoords(4,3).x+5, gridCoords(4,3).y+7);
	gridSpots[15] = new hotspot(gridCoords(4,3).x, gridCoords(4,3).y-10, 25,25, '55');

	gfx2.fillText('65', gridCoords(5,3).x+5, gridCoords(5,3).y+7);
	gridSpots[16] = new hotspot(gridCoords(5,3).x, gridCoords(5,3).y-10, 25,25, '65');

	gfx2.fillText('75', gridCoords(6,3).x+5, gridCoords(6,3).y+7);
	gridSpots[17] = new hotspot(gridCoords(6,3).x, gridCoords(6,3).y-10, 25,25, '75');

	gfx2.fillText('85', gridCoords(7,3).x+5, gridCoords(7,3).y+7);
	gridSpots[18] = new hotspot(gridCoords(7,3).x, gridCoords(7,3).y-10, 25,25, '85');

	gfx2.fillText('64', gridCoords(5,4).x+5, gridCoords(5,4).y+7);
	gridSpots[19] = new hotspot(gridCoords(5,4).x, gridCoords(5,4).y-10, 25,25, '64');

	gfx2.fillText('74', gridCoords(6,4).x+5, gridCoords(6,4).y+7);
	gridSpots[20] = new hotspot(gridCoords(6,4).x, gridCoords(6,4).y-10, 25,25, '74');

	gfx2.fillText('84', gridCoords(7,4).x+5, gridCoords(7,4).y+7);
	gridSpots[21] = new hotspot(gridCoords(7,4).x, gridCoords(7,4).y-10, 25,25, '84');

	gfx2.fillText('63', gridCoords(5,5).x+5, gridCoords(5,5).y+7);
	gridSpots[22] = new hotspot(gridCoords(5,5).x, gridCoords(5,5).y-10, 25,25, '63');

	gfx2.fillText('73', gridCoords(6,5).x+5, gridCoords(6,5).y+7);
	gridSpots[23] = new hotspot(gridCoords(6,5).x, gridCoords(6,5).y-10, 25,25, '73');

	gfx2.fillText('83', gridCoords(7,5).x+5, gridCoords(7,5).y+7);
	gridSpots[24] = new hotspot(gridCoords(7,5).x, gridCoords(7,5).y-10, 25,25, '83');

	gfx2.fillText('62', gridCoords(5,6).x+5, gridCoords(5,6).y+7);
	gridSpots[25] = new hotspot(gridCoords(5,6).x, gridCoords(5,6).y-10, 25,25, '62');

	gfx2.fillText('72', gridCoords(6,6).x+5, gridCoords(6,6).y+7);
	gridSpots[26] = new hotspot(gridCoords(6,6).x, gridCoords(6,6).y-10, 25,25, '72');

	gfx2.fillText('82', gridCoords(7,6).x+5, gridCoords(7,6).y+7);
	gridSpots[27] = new hotspot(gridCoords(7,6).x, gridCoords(7,6).y-10, 25,25, '82');

	gfx2.fillText('61', gridCoords(5,7).x+5, gridCoords(5,7).y+7);
	gridSpots[28] = new hotspot(gridCoords(5,7).x, gridCoords(5,7).y-10, 25,25, '61');

	gfx2.fillText('71', gridCoords(6,7).x+5, gridCoords(6,7).y+7);
	gridSpots[29] = new hotspot(gridCoords(6,7).x, gridCoords(6,7).y-10, 25,25, '71');

	gfx2.fillText('81', gridCoords(7,7).x+5, gridCoords(7,7).y+7);
	gridSpots[30] = new hotspot(gridCoords(7,7).x, gridCoords(7,7).y-10, 25,25, '81');

	gfx2.fillText('14', gridCoords(0,4).x+5, gridCoords(0,4).y+7);
	gridSpots[31] = new hotspot(gridCoords(0,4).x, gridCoords(0,4).y-10, 25,25, '14');

	gfx2.fillText('34', gridCoords(2,4).x+5, gridCoords(2,4).y+7);
	gridSpots[32] = new hotspot(gridCoords(2,4).x, gridCoords(2,4).y-10, 25,25, '34');

	gfx2.fillText('33', gridCoords(2,5).x+5, gridCoords(2,5).y+7);
	gridSpots[33] = new hotspot(gridCoords(2,5).x, gridCoords(2,5).y-10, 25,25, '33');

	emptyCoords = [ {x: 0, y:0}, {x: 1, y:0}, {x: 2, y:0}, {x: 4, y:0},
					{x: 1, y:1}, {x: 2, y:1}, {x: 4, y:1},
	 				{x: 0, y:2}, {x: 2, y:2},
	 				{x: 0, y:3}, {x: 1, y:3}, {x: 2, y:3}, {x: 3, y:3},
	 				{x: 1, y:4}, {x: 3, y:4}, {x: 4, y:4},
	 				{x: 0, y:5}, {x: 1, y:5}, {x: 3, y:5}, {x: 4, y:5},
	 				{x: 0, y:6}, {x: 1, y:6}, {x: 2, y:6}, {x: 3, y:6}, {x: 4, y:6},
	 				{x: 0, y:7}, {x: 1, y:7}, {x: 2, y:7}, {x: 3, y:7}, {x: 4, y:7} ];

	for(var s in emptyCoords){
		gridSpots[parseInt(s) + 34] = new hotspot(gridCoords(emptyCoords[s].x).x, gridCoords(null, emptyCoords[s].y).y-10, 25,25, '1');
	}

	///////////// bottom text
	h = document.createElement('B1');

	h.appendChild(document.createTextNode('For each of the Cepheid stars you found, determine their apparent and absolute magnitudes.' +
		' From the difference in magnitudes determine the distance to each Cepheid. Remember! The magnitude difference is m-M' +
		' If you average your two results you will get a more accurate answer. You can use this average as the distance to the galaxy' +
		' M100. '));

	// TODO fix the link to go to the right page
	lnk = document.createElement('a'); lnk.href = 'http://physics.unm.edu/101lab/portal/userfiles/html/table2.html';
	lnk.setAttribute('onclick','window.open(this.href); return false;');
	lnk.appendChild(document.createTextNode('Use the dimming factor conversion table')); lnk.setAttribute('style', 'color:00FF00');
	h.appendChild(lnk);

	h.appendChild(document.createTextNode(' (also linked from the "Period-Luminosity Relation" page) to use the table' +
		' to convert magnitude differences into distance.'));

	h.setAttribute('style','position:absolute; left: 40px; top:510px; color:FFFFFF');
	document.body.appendChild(h);
}

hotcircle = function(x,y,diam,ref){
	this.x = x; this.y = y;
	this.diam = diam; this.ref = ref;

	this.clicked = function(x,y){
		x -= 360; y -= 120;

		//console.log('spot: ' + this.x + ' ' + this.y + ' mouse: ' + x + ' ' + y);

		if(dist(this.x,this.y,x,y) <= this.diam){
			changeMode(this.ref);
		}
	}
}

dist = function(x1,y1,x2,y2){ return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2)); }

hotspot = function(x,y,sx,sy,ref){
	this.x = x; this.y = y;
	this.sx = sx; this.sy = sy;
	this.ref = ref;

	this.clicked = function(x,y){
		x -= 280; y -= 190;

		if(x >= this.x && x < this.x + this.sx){
			if(y >= this.y && y < this.y + this.sy){
				changeMode(this.ref);
			}	
		}
	}
}

changeMode = function(n){
	mode = parseInt(n);

	clearPage();

	if(mode === 0){ displayGridPage(); }
	else if(mode === 1){ displayBeastie(); }
	else if(('' + mode).length === 2){ // specific cell
		var idx = -1;
		for(var c in cellData){ if(cellData[c].cellNum === mode){ idx = c; } }
		if(idx !== -1) {
			displayCell(cellData[idx].cellNum, cellData[idx].solutionNum, cellData[idx].enhance, cellData[idx].cepheidNum);
		}else{
			displayBeastie();
		}
	}else if(('' + mode).length === 3){
		var answerNum = ('' + mode)[0];
		var cellNum = ('' + mode).substr(1,2);
		displayAnswer(cellNum, answerNum-1);
	}
}

clearPage = function(){
	document.body.innerHTML = '';
}

gridCoords = function(x,y){ // transforms cell numbers x,y into pixel coordinates
	// coords for top left are: 230, 90. Cell size is 25
	return {x:230+25*x, y:90+25*y};
}

// data for cell pages
cellData = [

	{cellNum:48, solutionNum:[10], enhance:false, cepheidNum:1, spots:[new hotcircle(64,179,13,148)]},
	{cellNum:68, solutionNum:[], enhance:false, cepheidNum:-1, spots:[]},
	{cellNum:78, solutionNum:[], enhance:false, cepheidNum:-1, spots:[]},
	{cellNum:88, solutionNum:[], enhance:false, cepheidNum:-1, spots:[]},

	{cellNum:17, solutionNum:[18], enhance:false, cepheidNum:1, spots:[new hotcircle(45,77,10,117)]},
	{cellNum:47, solutionNum:[7,15,46], enhance:false, cepheidNum:3, spots:[new hotcircle(11,71,13,147), new hotcircle(8,41,9,247), new hotcircle(29,107,9,347)]},
	{cellNum:67, solutionNum:[13,56], enhance:true, cepheidNum:2, spots:[new hotcircle(72,53,9,167), new hotcircle(18,18,9,267)]},
	{cellNum:77, solutionNum:11, enhance:false, cepheidNum:1, spots:[new hotcircle(47,117,9,177)]},
	{cellNum:87, solutionNum:63, enhance:false, cepheidNum:1, spots:[new hotcircle(110,94,13,187)]},

	{cellNum:26, solutionNum:[], enhance:false, cepheidNum:-1, spots:[]},
	{cellNum:46, solutionNum:[47], enhance:false, cepheidNum:1, spots:[new hotcircle(176,76,9,146)]},
	{cellNum:56, solutionNum:[48], enhance:false, cepheidNum:1, spots:[new hotcircle(14,150,9,156)]},
	{cellNum:66, solutionNum:[], enhance:false, cepheidNum:-1, spots:[]},
	{cellNum:86, solutionNum:[4,28], enhance:false, cepheidNum:2, spots:[new hotcircle(132,8,9,186), new hotcircle(61,88,9,286)]},

	{cellNum:55, solutionNum:[54], enhance:false, cepheidNum:1, spots:[new hotcircle(141,27,9,155)]},
	{cellNum:65, solutionNum:[], enhance:false, cepheidNum:-1, spots:[]},
	{cellNum:75, solutionNum:[], enhance:false, cepheidNum:-1, spots:[]},
	{cellNum:85, solutionNum:[], enhance:false, cepheidNum:-1, spots:[]},

	{cellNum:14, solutionNum:[], enhance:false, cepheidNum:-1, spots:[]},

	///// TODO the rest don't work on their side. ask about correct answers
	//{cellNum:34, solutionNum:[], enhance:false, cepheidNum:-1, spots:[]}

];