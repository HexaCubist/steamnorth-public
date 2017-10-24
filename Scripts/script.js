var visible = false;

//update nav once page has loaded
window.onload = function(){
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
	
	var nav = document.getElementById("nav");
	//if scrolled further than the max, change mode of nav bar
		
	if (window.scrollY > maxScroll) {
		nav.className = "scrolled"
		nav.style.top = 0;
		nav.style.position = "fixed";
	} else {
		nav.className = "notscrolled"
		nav.style.top = maxScroll;
		nav.style.position = "absolute";
	}
	
	//if screen width is too small, give nav solid background and small version
	if (visible == false && window.innerWidth < 720) {
		nav.className = "scrolled";
		visible = true;
		hide();
	} else if (visible == true && window.innerWidth >= 720) {
		visible = false;
		hide();
	}
}

function hide() {
	//find all li elements in the nav and put them in an array
	//(I could've done this more easily by giving them all a class)
	var li = document.getElementsByTagName("li");
	var pages = [];
	
	for (var i=0;i<li.length;i++) {
		if (li[i].parentNode == document.getElementById("nav")) {
			pages.push(li[i]);
		}
	}
	
	//hide all links, except the current page
	if (visible) {
		for (var i=0;i<pages.length;i++) {
			pages[i].className = "hidden";
			if (pages[i].id === "selected") {
				pages[i].style.display = "block";
			}
			visible = false;
		} 
	} 
	//if already hidden, show all links
	else {
		for (var i=0;i<pages.length;i++) {
			pages[i].className = "visible";
			visible = true;
		}
	}
}