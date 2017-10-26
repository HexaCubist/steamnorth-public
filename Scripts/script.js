var expanded = true;
var navUL, nav, pages;

function setup() {
	nav = document.getElementsByTagName("nav")[0];
	navUL = document.getElementById("navInner");
	
	//find all li elements in the nav and put them in an array
	//(I could've done this more easily by giving them all a class)
	var li = document.getElementsByTagName("li");
	pages = [];
	
	for (var i=0;i<li.length;i++) {
		if (li[i].parentNode == document.getElementById("navInner")) {
			pages.push(li[i]);
		}
	}
	
	hide();
	scroll();
}

function scroll() {
	//on homepage nav starts at top. on other pages it starts under an image
	//find what scroll height it should start to move at
	try {
		var maxScroll = document.getElementById("banner").height;
	} 
	catch(err) {
		var maxScroll = 0;
	}
	
	//if scrolled further than the max, change mode of nav bar
	if (window.scrollY > maxScroll) {
		navUL.className = "scrolled";
		nav.style.top = 0;
		nav.style.position = "fixed";
	} else {
		navUL.className = "notscrolled";
		nav.style.top = maxScroll;
		nav.style.position = "absolute";
	}
	
	//if screen width is too small, give nav solid background
	if (window.innerWidth < 1000) {
		hide();
		navUL.className = "scrolled";
	} 
}

function toggle() {
	//hide all links, except the current page
	if (expanded) {
		navUL.style.top = "-180px";
		setTimeout(
			function() {
				navUL.style.transition = "all 0s";
				navUL.style.top = "0px";
				hide();
			}, 300
		);
	}
	
	//if already hidden, show all links
	else {
		navUL.style.transition = "all 0s ease";
		navUL.style.top = "-140px";
		setTimeout(function(){
			navUL.style.transition = "all 0.7s ease";
			navUL.style.top = "0px";
			}, 50
		);
		show();
	}
}

function hide() {
	expanded = false;
	for (var i=0;i<pages.length;i++) {
		pages[i].className = "hidden";
		if (pages[i].id === "selected") {
			pages[i].style.display = "block";
		}
	}
}

function show() {
	expanded = true;
	for (var i=0;i<pages.length;i++) {
		pages[i].className = ""; //no longer has the className 'hidden'
	}
}