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
	 ' If you need more information on what to expect click on');
	h.setAttribute('style','position:absolute; left: 40; top:75; color:FFFFFF');
	h.appendChild(t);
	document.body.appendChild(h);

	h = document.createElement('a');
	h.href = 'http://www.google.com';
	t = document.createTextNode('this link.');
	h.setAttribute('style','position:absolute; left: 862; top:75; color:00FF00');
	h.appendChild(t);
	document.body.appendChild(h);
}