var game_div = document.getElementById("game_div");

var w = null;
var context = null;
try {
	w =new Worker('bg_worder.js');
} catch(e) {
	alert('Load worker failed, make sure your browser support Worker.');
}
w.onmessage = function (event) {
	handle_bg_message(event.data);
}
function handle_bg_message (data) {
	console.log(data);
}

/**
 * 加载游戏地图
 */
function load_game_map () {
	draw_tree();
	draw_road();
	w.postMessage('load_map_finish');
}

window.onload = function() {
	var game_div = document.getElementById('game_div');
	try {
		var canvas = document.getElementById('global_canvas');
		canvas.style.borderStyle = "solid";
		canvas.style.borderWidth = "1px";
		canvas.style.borderColor = "#ace";
		game_div.appendChild(canvas);
		context = canvas.getContext('2d');
	} catch(e) {
		alert('Your browser may not support canvas, at this moment.');
	}
	load_game_map();
}

/**
 * 画树
 */
function draw_tree() {
	if(!context) {
		alert('Context init failed.');
	}
	context.save();
	context.translate(130, 250);

	createCanopyPath(context);

	context.lineWidth = 4;
	context.lineJoin = 'round';
	context.strokeStyle = '#663300';
	context.fillStyle = '#339900';
	context.fill();
	context.stroke();
	//利用渐变来填充树干
	var truckGradient = context.createLinearGradient(-5, -50, 10, 30);
	truckGradient.addColorStop(0, '#663300');
	truckGradient.addColorStop(0.4, '#996600');
	truckGradient.addColorStop(1, '#552200');
	context.fillStyle = truckGradient;
	context.fillRect(-5, -50, 10, 30);
	context.restore();
}

/**
 * 创建树冠的外观
 */
function createCanopyPath(context) {
	context.beginPath();
	context.moveTo(0, -50);
	context.lineTo(-25, -50);
	context.lineTo(-10, -80);
	context.lineTo(-20, -80);
	context.lineTo(-5, -110);
	context.lineTo(-15, -110);

	context.lineTo(0, -140);

	context.lineTo(15, -110);
	context.lineTo(5, -110);
	context.lineTo(20, -80);
	context.lineTo(10, -80);
	context.lineTo(25, -50);
	context.lineTo(0, -50);
	context.closePath();
}

/**
 * 画出一条模拟的树
 */
function draw_road() {
	context.save();
	context.translate(-10, 350);
	context.beginPath();
	
	context.moveTo(0, 0);
	context.quadraticCurveTo(170, -50, 260, -190);
	
	context.quadraticCurveTo(310, -250, 410, -250);
	
	context.strokeStyle = '#663300';
	context.lineWidth = 20;
	context.stroke();
	
	context.restore();
}

