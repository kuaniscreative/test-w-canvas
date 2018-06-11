var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var mongoose = require('mongoose');
var compression = require('compression');

// Building Schema and model

var schema = mongoose.Schema;
var circleSchema = new schema({
	proportionX: Number,
	proportionY: Number,
	which: Boolean
});
var circleModel = mongoose.model('circle', circleSchema);

// connect to mongoDB

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI/*'mongodb://localhost/canvasData'*/);
mongoose.connection.once('open', function(){
	console.log('connected to mongoDB');
}).on('error', function(error){
	console.log('connection error');
});

// display html

app.use('/public', express.static('public'));
app.use(compression());
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// io function

io.on('connection', function(socket){
	console.log('a user connected');
	circleModel.find({}, function(err, data){
		if (err) throw err;
		io.emit('new user', data);
	});
	socket.on('new circle', function(msg){
		io.emit('new circle', msg);
		var obj = new circleModel(JSON.parse(msg));
		obj.save().then(console.log('Saving success'));
	});
	socket.on('disconnect', function(){
		console.log('a user disconnected');
	});
});

http.listen(process.env.PORT || 3000, function(){
	console.log('listening to port 3000');
});