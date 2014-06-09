var mode = 0; // indicates which page is being displayed. 0 - grid, 1 - beastie, 48, 68, etc - specific cell
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
	gridSpots[0] = new hotspot(gridCoords(3,0).x, gridCoords(3,0).y-10, 25,25, 'spot 48');
	
	gfx2.fillText('68', gridCoords(5,0).x+5, gridCoords(5,0).y+7);
	gfx2.fillText('78', gridCoords(6,0).x+5, gridCoords(6,0).y+7);
	gfx2.fillText('88', gridCoords(7,0).x+5, gridCoords(7,0).y+7);
	gfx2.fillText('17', gridCoords(0,1).x+5, gridCoords(0,1).y+7);
	gfx2.fillText('47', gridCoords(3,1).x+5, gridCoords(3,1).y+7);
	gfx2.fillText('67', gridCoords(5,1).x+5, gridCoords(5,1).y+7);
	gfx2.fillText('77', gridCoords(6,1).x+5, gridCoords(6,1).y+7);
	gfx2.fillText('87', gridCoords(7,1).x+5, gridCoords(7,1).y+7);
	gfx2.fillText('26', gridCoords(1,2).x+5, gridCoords(1,2).y+7);
	gfx2.fillText('46', gridCoords(3,2).x+5, gridCoords(3,2).y+7);
	gfx2.fillText('56', gridCoords(4,2).x+5, gridCoords(4,2).y+7);
	gfx2.fillText('66', gridCoords(5,2).x+5, gridCoords(5,2).y+7);
	gfx2.fillText('76', gridCoords(6,2).x+5, gridCoords(6,2).y+7);
	gfx2.fillText('86', gridCoords(7,2).x+5, gridCoords(7,2).y+7);
	gfx2.fillText('55', gridCoords(4,3).x+5, gridCoords(4,3).y+7);
	gfx2.fillText('65', gridCoords(5,3).x+5, gridCoords(5,3).y+7);
	gfx2.fillText('75', gridCoords(6,3).x+5, gridCoords(6,3).y+7);
	gfx2.fillText('85', gridCoords(7,3).x+5, gridCoords(7,3).y+7);
	gfx2.fillText('64', gridCoords(5,4).x+5, gridCoords(5,4).y+7);
	gfx2.fillText('74', gridCoords(6,4).x+5, gridCoords(6,4).y+7);
	gfx2.fillText('84', gridCoords(7,4).x+5, gridCoords(7,4).y+7);
	gfx2.fillText('63', gridCoords(5,5).x+5, gridCoords(5,5).y+7);
	gfx2.fillText('73', gridCoords(6,5).x+5, gridCoords(6,5).y+7);
	gfx2.fillText('83', gridCoords(7,5).x+5, gridCoords(7,5).y+7);
	gfx2.fillText('62', gridCoords(5,6).x+5, gridCoords(5,6).y+7);
	gfx2.fillText('72', gridCoords(6,6).x+5, gridCoords(6,6).y+7);
	gfx2.fillText('82', gridCoords(7,6).x+5, gridCoords(7,6).y+7);
	gfx2.fillText('61', gridCoords(5,7).x+5, gridCoords(5,7).y+7);
	gfx2.fillText('71', gridCoords(6,7).x+5, gridCoords(6,7).y+7);
	gfx2.fillText('81', gridCoords(7,7).x+5, gridCoords(7,7).y+7);
	gfx2.fillText('14', gridCoords(0,4).x+5, gridCoords(0,4).y+7);
	gfx2.fillText('34', gridCoords(2,4).x+5, gridCoords(2,4).y+7);
	gfx2.fillText('33', gridCoords(2,5).x+5, gridCoords(2,5).y+7);

	///////////// bottom text
	h = document.createElement('B1');

	h.appendChild(document.createTextNode('For each of the Cepheid stars you found, determine their apparent and absolute magnitudes.' +
		'From the difference in magnitudes determine the distance to each Cepheid. Remember! The magnitude difference is m-M' +
		'If you average your two results you will get a more accurate answer. You can use this average as the distance to the galaxy' +
		'M100. '));

	lnk = document.createElement('a'); lnk.href = 'http://physics.unm.edu/101lab/portal/labs/Cepheid_check.html';
	lnk.setAttribute('onclick','window.open(this.href); return false;');
	lnk.appendChild(document.createTextNode('Use the dimming factor conversion table')); lnk.setAttribute('style', 'color:00FF00');
	h.appendChild(lnk);

	h.appendChild(document.createTextNode(' (also linked from the "Period-Luminosity Relation" page) to use the table' +
		'to convert magnitude differences into distance.'));

	h.setAttribute('style','position:absolute; left: 40; top:510; color:FFFFFF');
	document.body.appendChild(h);
}

hotspot = function(x,y,sx,sy,ref){
	this.x = x; this.y = y;
	this.sx = sx; this.sy = sy;
	this.ref = ref;

	this.clicked = function(x,y){
		console.log(this);
		console.log(mX + ' ' + mY);
		gfx2.fillStyle='FFFFFF';
		gfx2.fillRect(this.x,this.y,this.sx,this.sy);
		if(x >= this.x && x < this.x + this.sx){
			if(y >= this.y && y < this.y + this.sy){
				console.log(this.ref);
			}	
		}
	}
}

gridCoords = function(x,y){ // transforms cell numbers x,y into pixel coordinates
	// coords for top left are: 230, 90. Cell size is 25
	return {x:230+25*x, y:90+25*y};
}