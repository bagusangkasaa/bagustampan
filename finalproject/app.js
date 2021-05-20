const express = require('express');
const bodyParser = require('body-parser');
var qString   = require('querystring');
var app      = express();
server = require('http').createServer(app),
io = require('socket.io').listen(server);

var mqttHandler = require('./mqtt_handler');

var mqttClient = new mqttHandler();
mqttClient.connectToSwitch1();
mqttClient.connectToSwitch2();
mqttClient.connectToSwitch3();


// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

//send data using socket io

io.on("connection", socket => {
	socket.on("switchall", (msg) => {
		mqttClient.sendMessage('switch1', msg);
		mqttClient.sendMessage('switch2', msg);
		mqttClient.sendMessage('switch3', msg);
		console.log("all switch ", msg);
	});
	
	socket.on("switch1", (msg) => {
		mqttClient.sendMessage('switch1', msg);
		console.log("switch 1 ",msg);
	});
	
	socket.on("switch2", (msg) => {
		mqttClient.sendMessage('switch2', msg);
		console.log("switch 2 ", msg);
	});
	
	socket.on("switch3", (msg) => {
		mqttClient.sendMessage('switch3', msg);
		console.log("switch 3 ", msg);
	});
});

 
 
//handle user interfaces
app.get('/',(req, res) => {
	res.render('pages/index');
})

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// detail page
app.get('/detail', function(req, res) {
    res.render('pages/detail');
});



server.listen(3000, function () {
    console.log('App listening on port 3000!');
});