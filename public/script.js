// socket shit
var socket = io();
socket.on('new user', function(msg){
	var obj = JSON.parse(msg);
	for (i=0; i < obj.length; i++){
		var circle = new stampIt(obj[i].mouseX * canvas.width, obj[i].mouseY * canvas.height, obj[i].which);
		circle.draw();
	}
});
socket.on('new circle', function(msg){
	var obj = JSON.parse(msg);
	var circle = new stampIt(obj.mouseX * canvas.width, obj.mouseY * canvas.height, obj.which);
	circle.draw();
})

//canvas shit
var canvas = document.querySelector('canvas');
canvas.width = window.visualViewport.height * 1.9;
canvas.height = window.visualViewport.height;
var c = canvas.getContext('2d');
var pastCircle = [];
document.getElementById('canvas-wrapper').addEventListener('click', function(event){
	var proportionX = event.pageX / canvas.width;
	var proportionY = event.pageY / canvas.height;
	var circle = new stampIt(proportionX * canvas.width, proportionY * canvas.height, whichStamp);
	circle.draw();
	var record = {
		"mouseX": proportionX,
		"mouseY": proportionY,
		"which": whichStamp
	}
	pastCircle.push(record);
	socket.emit('new circle', JSON.stringify(record));
})
var radius = 30;
var stampIt = function(x, y, z){
	this.x = x;
	this.y = y;
	this.draw = function(){
		if (z){
			c.beginPath();
			c.arc(x, y, radius, 0, Math.PI*2, false)
			c.strokeStyle = 'black';
			c.stroke();
			c.fillStyle = 'rgba(255, 255, 255, 0.7)';
			c.fill();
			c.fillStyle = 'black';
			c.textBaseline = 'middle';
			c.textAlign = 'center';
			c.font = "12px helvetica";
			c.fillText('so', x, y-7);
			c.fillText('true', x, y+7);
		} else {
			c.beginPath();
			c.arc(x, y, radius, 0, Math.PI*2, false)
			c.strokeStyle = 'black';
			c.stroke();
			c.fillStyle = 'rgba(255, 255, 255, 0.7)';
			c.fill();
			c.fillStyle = 'black';
			c.textBaseline = 'middle';
			c.textAlign = 'center';
			c.font = "12px helvetica";
			c.fillText('nah', x, y);
		}
	}
}


// for admin

var clear = function(int){
	socket.emit('clear json', int);
};