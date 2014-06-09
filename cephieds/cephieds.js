window.onload = function(){
	displayGridPage();
}

window.onmouseup = function(){

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
	canvas.id = 'myCanvas';
	canvas.setAttribute('style','position:absolute; left:240; top:180');
	h.appendChild(canvas);

	gfx = canvas.getContext('2d');
	gfx.fillStyle='rgb(200,200,200)';
	gfx.fillRect(0,0,450,300);
	gfx.fillStyle='rgb(0,0,0)';
	gfx.fillRect(2,2,446,48);
	gfx.fillRect(2,52,446,246);

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