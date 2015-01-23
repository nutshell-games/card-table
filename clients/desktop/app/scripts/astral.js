
// Astral.init();
// Astral.connect("localhost:3000");

// console.log(Astral);

//Astral.bind();


// Create a sockjs tunnel. Generally you'll need only
// one tunnel for all your sockets.
// var net = new WebTCP('localhost', 9999);

// // standard socket options
// options = {
//   encoding: "utf-8",
//   timeout: 300,
//   noDelay: true, // disable/enable Nagle algorithm
//   keepAlive: false, //default is false
//   initialDelay: 0 // for keepAlive. default is 0
// }

// // Create a socket. You can specify host and port of any TCP server here
// var socket = net.createSocket("192.168.2.40", 1337, options);

// // file:///Users/michaelgarrido/webtcp/examples/socket_client.html


// // On connection callback
// socket.on('connect', function(){
//   console.log('connected');
// })

// // This gets called every time new data for this socket is received
// socket.on('data', function(data) {
//   console.log("received: " + data);
// });

// socket.on('end', function(data) {
//   console.log("socket is closed ");
// });

// Astral.onLogin(function(userId){
//   console.log("logged in",userId);
// })