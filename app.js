//This is for adding cells into the board
//for moving through rows and columns

var speed = 150;
var dir = 1;
var snake = ["3-10","2-10", "1-10"];
var food = "";

//Initiating game
function myInit() {
	dir = 1;
	snake = ["3-10","2-10", "1-10"];
	food = "";
	$("#div-main").html("");
	for (var r = 0; r < 20; r++) {
		for (var c = 0; c < 20; c++) {
			$("#div-main").append("<div class=mycell id=c-"+r+"-"+c+"></div>");
		} //above line added rows and column
	}

	//i want to initialize snake with 3 cells
	$("#c-1-10").addClass("sel");
	$("#c-2-10").addClass("sel");
	$("#c-3-10").addClass("sel");
	generateFood();
	setTimeout( function(){gameupdate()}, speed);
}
myInit();

//this is for generating food
function generateFood() {
	// body...
	var r1 = Math.floor(Math.random() * 19);
	var c1 = Math.floor(Math.random() * 19);
	$("#c-"+r1+"-"+c1).addClass("selA");
	food=""+r1+"-"+c1;
}
function gameupdate() {
	var tail = snake.pop();
	$("#c-"+tail).removeClass("sel");
	//head postioned at the front
	var hh = snake[0];
	var rc = hh.split("-");
	var r = parseInt(rc[0]);
	var c = parseInt(rc[1]);
	switch(dir) {
		case 1: r=r+1; break; //bottom
		case 2: c=c-1; break; //Left
		case 3: r=r-1; break; //top
		case 4: c=c+1; break; //right
	}
	var nn=""+r+"-"+c;
	//checking for foodeating
	if (nn==food) {
		snake.push(tail);
		$("#c-"+tail).addClass("sel")
		$("#c-"+food).removeClass("selA");
		generateFood();
	}
	snake.unshift(nn);
	$("#c-"+nn).hasClass("sel");
	//condition to exit the game
	if (c<0 || r<0 || c>19 || r>19 || $("#c-"+nn).hasClass("sel")) {
		alert("you lost the game!");
		myInit();
		return;
	}
	$("#c-"+nn).addClass("sel");
	setTimeout(function(){ gameupdate()}, speed);
}
//capture keyboard arrow keys
$(document).keydown(function (e) {
	// body...
	if (e.keyCode == 37) {
		dir = 2;
	} else if (e.keyCode == 38) {
		dir = 3;
	} else if (e.keyCode == 39) {
		dir = 4;
	} else if (e.keyCode == 40) {
		dir = 1;
	}
});


