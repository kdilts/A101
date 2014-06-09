window.onload = function(){
	displayGridPage();
}

window.onmouseup = function(){

}

displayGridPage = function(){
	h = document.createElement('H1');
	t = document.createTextNode('test');

	h.setAttribute('style','position:absolute; left: 20; top:50; color:FFFF00');

	h.appendChild(t);
	document.body.appendChild(h);
}