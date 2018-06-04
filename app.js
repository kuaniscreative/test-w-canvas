var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
app.use('/public', express.static('public'));
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	var myReadStream = fs.createReadStream(__dirname + '/circles.json', 'utf8');
	myReadStream.on('data', function(chunk){
		var newObj = JSON.parse(chunk);
		io.emit('new user', chunk);
	});
	socket.on('new circle', function(msg){
		io.emit('new circle', msg);
		fs.readFile(__dirname + '/circles.json', 'utf8', function(err, data){
			var obj = JSON.parse(data);
			var newObj = JSON.parse(msg);
			obj.push(newObj);
			var json = JSON.stringify(obj);
			fs.writeFile(__dirname + '/circles.json', json, 'utf8', function(err, data){
				if (err){
					console.log(err);
				} else {
					console.log('JSON update successed');
				}
			});
		});
		/*
		// don't know why this won't work
		var myReadStream = fs.createReadStream(__dirname + '/circles.json', 'utf8');
		var myWriteStream = fs.createWriteStream(__dirname + '/circles.json');
		var obj = [];
		myReadStream.on('data', function(chunk){
			var parseData = JSON.parse(chunk);
			obj.push(parseData);
		});
		var newObj = JSON.parse(msg);
		obj.push(newObj);
		var json = JSON.stringify(obj);
		console.log(json);
		myWriteStream.write(json);
		*/
	});
	socket.on('disconnect', function(){
		console.log('a user disconnected');
	});
	socket.on('clear json', function(msg){
		if(msg === 1020){
			fs.readFile(__dirname + '/circles.json', 'utf8', function(err, data){
				var clear = [];
				var json = JSON.stringify(clear);
				fs.writeFile(__dirname + '/circles.json', json, 'utf8', function(err, data){
					if (err){
						console.log(err);
					} else {
						console.log('clear success');
					}
				});
			});
		}
	});
});

http.listen(5000, function(){
	console.log('listening to port 3000');
});