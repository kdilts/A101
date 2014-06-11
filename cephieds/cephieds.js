// Kevin Dilts
// 6/11/2014

var mode = 0; // indicates which page is being displayed.
			  // 0 - grid
			  // 1 - beastie
			  // 48, 68, etc - specific cell
			  // X48, X68, etc - correct anser, specific cell, X refers to the solution number

var gridSpots = [];
var mX; var mY;

window.onload = function(){
	displayGridPage();
}

// TODO make sure mouse stuff is compatible with all browsers
window.onmousemove = function(e){
	mX = e.x; mY = e.y;
}

window.onmouseup = function(e){
	if(mode === 0){
		for(var s in gridSpots){
			gridSpots[s].clicked(mX,mY);
		}
	}
	else if(('' + mode).length === 2){
		var idx;
		for(var c in cellData){ if(cellData[c].cellNum === mode){ idx = c; } }
		for(var s in cellData[idx].spots){
			cellData[idx].spots[s].clicked(mX,mY);
		}
	}
}

displayBeastie = function(){
	document.body.setAttribute('bgcolor','white');
	h = document.createElement('H1');
	h.appendChild(document.createTextNode('You are no longer in Federation space.'));
	h.setAttribute('style','position:absolute; left: 50; top: 20');
	document.body.appendChild(h);

	h = document.createElement('H1');
	h.appendChild(document.createTextNode('Please go '));

	lnk = document.createElement('a'); lnk.href = './page.html';
	lnk.setAttribute('onclick','window.location(this.href); return false;');
	lnk.appendChild(document.createTextNode('back')); lnk.setAttribute('style', 'color:FF0000');
	h.appendChild(lnk);

	h.appendChild(document.createTextNode(' immediately!'));
	h.setAttribute('style','position:absolute; left: 80; top: 60');
	document.body.appendChild(h);

	img = document.createElement('img');
	img.zIndex = 1;
	img.src = './gifs/beastie.gif';
	img.width = 400; img.height = 400;
	img.setAttribute('style','position:absolute; left:60; top:120');
	document.body.appendChild(img);
}

displayEmptyCell = function(){
	h = document.createElement('H1');
	h.appendChild(document.createTextNode('Sorry, no Cepheids in this image!'));
	h.setAttribute('style','position:absolute; left: 250; top: 10');
	document.body.appendChild(h);

	h = document.createElement('B1');
	lnk = document.createElement('a'); lnk.href = './page.html';
	lnk.setAttribute('onclick','window.location(this.href); return false;');
	h.setAttribute('style','position:absolute; left: 20; top: 120');
	lnk.appendChild(document.createTextNode('Return to the main WF4 8x8 grid')); lnk.setAttribute('style', 'color:FF0000');
	h.appendChild(lnk);
	document.body.appendChild(h);
}

displayCell = function(cellNum, solutionNum, enhance, cepheidNum){

	document.body.setAttribute('bgcolor','white');

	if(cepheidNum == -1){ displayEmptyCell(); return; }

	h = document.createElement('H1');
	h.appendChild(document.createTextNode('Grid section ' + cellNum + '. Find the Cepheids!'));
	h.setAttribute('style','position:absolute; left: 50; top: 0');
	document.body.appendChild(h);

	if(cepheidNum === 1){
		h = document.createElement('B1');
		h.appendChild(document.createTextNode('There is one known Cepheid in this image from WF4.' + 
			' See if you can find it! Click on what you believe to be a Cepheid...'));
		h.setAttribute('style','position:absolute; left: 20; top: 60');
		document.body.appendChild(h);
	}else{
		h = document.createElement('B1');
		h.appendChild(document.createTextNode('There are ' + cepheidNum + ' known Cepheids in this image from WF4.' + 
			' See if you can find them! Click on what you believe to be a Cepheid...'));
		h.setAttribute('style','position:absolute; left: 20; top: 60');
		document.body.appendChild(h);
	}

	if(enhance){
		h = document.createElement('B1');
		h.appendChild(document.createTextNode('One is easy to find; the other will be easier to detect in a set of '));
		lnk = document.createElement('a'); lnk.href = '#';
		lnk.setAttribute('onclick', 'enhance()');
		h.setAttribute('style','position:absolute; left: 20; top: 80');
		lnk.appendChild(document.createTextNode('enhanced images.')); lnk.setAttribute('style', 'color:FF0000');
		h.appendChild(lnk);
		document.body.appendChild(h);
	}

	img = document.createElement('img');
	img.src = './gifs/anim' + cellNum + '.gif';
	img.width = 200; img.height = 200;
	img.setAttribute('style','position:absolute; left:360; top:120');
	document.body.appendChild(img);

	h = document.createElement('B1');
	lnk = document.createElement('a'); lnk.href = './page.html';
	lnk.setAttribute('onclick','window.location(this.href); return false;');
	h.setAttribute('style','position:absolute; left: 20; top: 370');
	lnk.appendChild(document.createTextNode('Return to the main WF4 8x8 grid')); lnk.setAttribute('style', 'color:FF0000');
	h.appendChild(lnk);
	document.body.appendChild(h);	
}

enhance = function(){
	img = document.createElement('img');
	img.src = './gifs/anim67enh5.gif';
	img.width = 200; img.height = 200;
	img.setAttribute('style','position:absolute; left:360; top:120');
	document.body.appendChild(img);

	h = document.createElement('B1');
	h.appendChild(document.createTextNode('The image has enhanced contrast to make the fainter Cepheid easier to discern.'));
	h.setAttribute('style','position:absolute; left: 250; top: 320');
	document.body.appendChild(h);

	h = document.createElement('B1');
	lnk = document.createElement('a'); lnk.href = '#';
	lnk.setAttribute('onclick','changeMode(67)');
	h.setAttribute('style','position:absolute; left: 20; top: 350');
	lnk.appendChild(document.createTextNode('Standard contrast image')); lnk.setAttribute('style', 'color:FF0000');
	h.appendChild(lnk);
	document.body.appendChild(h);
}

displayGridPage = function(){
	/////// top text
	h = document.createElement('B1');
	
	h.appendChild(document.createTextNode('Now you\'re ready to do your own Cepheid hunt.'));
	
	h.appendChild(document.createElement('br'));

	txt = document.createElement('H3');
	txt.setAttribute('style','color:FFFF00');
	txt.appendChild(document.createTextNode('Click on grid section 47 below to begin your hunt.'));
	h.appendChild(txt);

	h.appendChild(document.createTextNode('You are to find at least 2 Cepheids noting their period and apparent magnitude.' +
	 ' If you need more information on what to expect click on '));
	
	lnk = document.createElement('a'); lnk.href = 'http://physics.unm.edu/101lab/portal/labs/Cepheid_check.html';
	lnk.setAttribute('onclick','window.open(this.href); return false;');
	lnk.appendChild(document.createTextNode('this link.')); lnk.setAttribute('style', 'color:00FF00');
	h.appendChild(lnk);

	h.appendChild(document.createTextNode(' If you want a more accurate distance calculation, go to more grid sections.'));

	h.appendChild(document.createElement('br'));
	h.appendChild(document.createElement('br'));

	h.appendChild(document.createTextNode('Only grid sections with numbers are currently available.'));

	h.setAttribute('style','position:absolute; left: 40; top:10; color:FFFFFF');
	document.body.appendChild(h);

	////////////// middle image
	canvas = document.createElement('canvas');
	canvas.width = 450; canvas.height = 300;
	canvas.id = 'bgCanvas'; canvas.zIndex = 0;
	canvas.setAttribute('style','position:absolute; left:240; top:180');
	h.appendChild(canvas);

	gif = document.createElement('img');
	gif.zIndex = 1;
	gif.src = './gifs/quarter752.gif';
	gif.width = 200; gif.height = 200;
	gif.setAttribute('style','position:absolute; left:255; top:260');
	h.appendChild(gif);

	gif2 = document.createElement('img');
	gif2.zIndex = 1;
	gif2.src = './gifs/quarter752.gif';
	gif2.width = 200; gif2.height = 200;
	gif2.setAttribute('style','position:absolute; left:470; top:260');
	h.appendChild(gif2);

	canvas2 = document.createElement('canvas');
	canvas2.width = 450; canvas2.height = 300;
	canvas2.id = 'fgCanvas'; canvas2.zIndex = 2;
	canvas2.setAttribute('style','position:absolute; left:240; top:180');
	h.appendChild(canvas2);

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

	h.setAttribute('style','position:absolute; left: 40; top:510; color:FFFFFF');
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
	{cellNum:34, solutionNum:[], enhance:false, cepheidNum:-1, spots:[]}

];