var width = 1000;
var cur = moving = 0;
var images, text;

function start() {
	images = document.getElementsByClassName("image");
	text = document.getElementsByClassName("description");
	position();
}

//positions images on either side, ready to slide into view
function position() {
	//hide all images and remove their transition
	for (var i = 0; i < images.length; i++) {
		images[i].style.transition = "all 0s";
		text[i].style.display = "none";
	}
	//show and position current image
	text[cur].style.display = "block";
	images[cur].style.left = 0;
	//position adjacent images on either side
	images[loop(cur-1)].style.left = "100%";
	images[loop(cur+1)].style.left = "-100%";
}

//actually move the image into view
function move(dir) {
	if (moving == 0) {
		moving = 1;
		//give everything its transition back
		for (var i = 0; i < images.length; i++) {
			images[i].style.transition = "all 0.8s ease";
		}
		//move new image into view
		images[loop(cur+dir)].style.left = 0;
		//move old image out the way
		if (dir == 1) {
			images[cur].style.left = "100%";
		} else {
			images[cur].style.left = "-100%";
		}
		
		//after 800ms, update current image, reposition other images and allow for process to repeat
		setTimeout(
			function (){
				cur = loop(cur + dir);
				position();
				moving = 0;
			},
			800
		)
	}
}

//returns number referring to a slide, allows for gallery to loop around
function loop(d) {
	if (d < 0) {
		return images.length - 1;
	} else if (d >= images.length) {
		return 0;
	} else {
		return d;
	}
}