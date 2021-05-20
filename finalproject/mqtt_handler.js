const mqtt = require('mqtt');

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = 'mqtt://127.0.0.1';
    this.username = 'test'; // mqtt credentials if these are needed to connect
    this.password = 'test';
  }
  
  connectToSwitch1() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected switch 1`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe('state1', {qos: 0});	

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
	  var msg=message.toString()
	  io.emit('stateswitch1', msg);
	  console.log("state switch 1 ", msg)
	  
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }
  
  connectToSwitch2() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected switch 2`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe('state2', {qos: 0});	

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
	  var msg=message.toString()
		io.emit('stateswitch2', msg);
	    console.log("state switch 2 ", msg)
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }
  
  connectToSwitch3() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected switch 3`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe('state3', {qos: 0});	

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
	  var msg=message.toString()
		io.emit('stateswitch3', msg);
	    console.log("state switch 3 ", msg)
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(topic, message) {
    this.mqttClient.publish(topic, message);
  }
}

module.exports = MqttHandler;
