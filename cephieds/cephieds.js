window.onload = function(){
	displayGridPage();
}

window.onmouseup = function(){

}

displayGridPage = function(){
	h = document.createElement('B1');
	t = document.createTextNode('Now you\'re ready to do your own Cepheid hunt.');
	h.setAttribute('style','position:absolute; left: 40; top:20; color:FFFFFF');
	h.appendChild(t);
	document.body.appendChild(h);

	h = document.createElement('H3');
	t = document.createTextNode('Click on grid section 47 below to begin your hunt.');
	h.setAttribute('style','position:absolute; left: 40; top:30; color:FFFF00');
	h.appendChild(t);
	document.body.appendChild(h);

	h = document.createElement('B1');
	
	t = document.createTextNode('You are to find at least 2 Cepheids noting their period and apparent magnitude.' +
	 ' If you need more information on what to expect click on ');
	
	lnk = document.createElement('a'); lnk.href = 'http://physics.unm.edu/101lab/portal/labs/Cepheid_check.html';
	lnk.setAttribute('onclick','window.open(this.href); return false;');
	lnk.appendChild(document.createTextNode('this link.')); lnk.setAttribute('style', 'color:00FF00');

	h.setAttribute('style','position:absolute; left: 40; top:75; color:FFFFFF');
	h.appendChild(t);
	h.appendChild(lnk);
	document.body.appendChild(h);


}