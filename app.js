var express = require('express');
var app = express();
var http = require('http').Server(app);
vario = require('socket.io')(http);
varWiFiControl = require('wifi-control');

http.listen(3000, function () {
console.log('listening on *:3000');
});

app.get('/', function (req, res) {
res.sendfile('addsoc.html');
});
// Initializewifi-control package with verbose output

io.on('connection', function (socket) {
console.log('someone just connected here...The person who connected is : ' +
socket.id);
socket.on('scannetworks', function () {
console.log('client called scannetworks...');
// Try scanning for access points:
WiFiControl.init({
debug: true
});
WiFiControl.scanForWiFi(function (err, response) {
if (err) console.log(err);

45

console.log(response);
socket.emit('scanresults', response);
});
socket.on('connectnet', function (results) {
WiFiControl.connectToAP(results, function (err, response) {
if (err) console.log(err);
console.log(response);
socket.emit('connectresult', response);
});
});

socket.on('disconnectnet', function(results){
WiFiControl.resetWiFi(function (err, response) {
if (err) console.log(err);
console.log(response);
console.log('Disconnect fn');
socket.emit('disconnect', response);
});
});

});
});
