// Poll SparkCore RPC for RFID presence 
// https://api.spark.io/v1/devices/54ff6d066672524815271167/rfid?access_token=634135148894853f8bad267aab7c328b473ee6bd

$('body').css('cursor', 'none');

var interval;

function startRFIDPolling() {
  timer = setInterval(function(){
    $.ajax({
      url: "https://api.spark.io/v1/devices/54ff6d066672524815271167/UID?access_token=634135148894853f8bad267aab7c328b473ee6bd"
    })
    .done(function( data ) {
      console.log(data);
    });
  },1000);
}

function stopRFIDPolling(){
  clearInterval(timer);
}



SmartTouch = function(id, x, y){

  this.id = id;
  this.x = x;
  this.y = y;
  this.clean = false;
  this.state = this.States.began;

  // this.identifier = identifier;
  // this.target = target;
  // this.clientX = pos.clientX + deltaX;
  // this.clientY = pos.clientY + deltaY;
  // this.screenX = pos.screenX + deltaX;
  // this.screenY = pos.screenY + deltaY;
  // this.pageX = pos.pageX + deltaX;
  // this.pageY = pos.pageY + deltaY;
};

SmartTouch.prototype = {

  States: {
    began: 0,
    moved: 1,
    fixed: 2,
    ended: 3
  },

  end: function(){
    this.clean = false;
    this.state = this.States.ended;
  }
};


SmartTouchClient = function(){
  this.delegate = null;
  buffer = "";
  touches = {};
};

SmartTouchClient.prototype = {

  configureLayout: function(data){
    console.log("configureLayout",data);
  },

  parseBundle: function(data){
    //console.log("parseBundle",data);

    //if (data.points.length!=1 || GameWorld.nodes.length==0) return;
    if (data.length==0 || GameWorld.nodes.length==0) return;

    // var point = data.points[0];
    // var index = GameWorld.nodes.length-1;

    // setTimeout(function(){
    //   GameWorld.nodes[index].sprites[1].position.x = point.x;
    //   GameWorld.nodes[index].sprites[1].position.y = point.y;
    // },1);

    setTimeout(function(){
      _.each(data,function(point,index){
        console.log(point,index,GameWorld.nodes[index]);
        GameWorld.nodes[index].sprites[1].position.x = point[1];
        GameWorld.nodes[index].sprites[1].position.y = point[2];
        GameWorld.nodes[index].sprites[0].position.x = point[1];
        GameWorld.nodes[index].sprites[0].position.y = point[2];
      
      })
    },1);

    
    

  },

  bindToServer: function(host,port,options) {
    var self = this;

    this.websocketClient = new WebSocketClient();

    this.websocketClient.mapMessageHandlers({
      parseBundle: this.parseBundle.bind(this),
      configureLayout: this.configureLayout.bind(this),
      rfidPresent: this.rfidPresent.bind(this)
    });

    this.websocketClient.connect(host,port);

    // if (!options) {
    //   // standard socket options
    //   options = {
    //     encoding: "utf-8",
    //     timeout: 300,
    //     noDelay: true, // disable/enable Nagle algorithm
    //     keepAlive: false, //default is false
    //     initialDelay: 0 // for keepAlive. default is 0
    //   }
    // }

    // var net = new WebTCP('localhost', 9999);

    // var socket = net.createSocket(host, port);

    // // On connection callback
    // socket.on('connect', function(){
    //   console.log('connected');
    // })

    // // This gets called every time new data for this socket is received
    // // socket.on('data', function(data) {
    // //   console.log("received: " + data);

    // //   if (!self.proceedToParseEventData(data)) return;

    // //   self.parseData(data);
    // //   self.fireEvents();
    // // });

    // socket.on('end', function(data) {
    //   console.log("socket is closed ");
    // });

    // // Open connection to SmartTouch server
    // // Send data to the server
    // socket.write("open"); 
  },

  rfidPresent: function(data) {

    console.log(data)
    // ignore carriage return 
    if (data=='\\r') {
      console.log('empty RFID data');
      return;
    }

    // get unique index
    if (!_.contains(GameWorld.colors,data)) {
      GameWorld.colors.push(data);
      console.log('new color:'+data);
    }

    var colorIndex = GameWorld.colors.indexOf(data);

    console.log(GameWorld.colors);
    console.log('colorIndex: '+colorIndex);

    if (GameWorld.stage) {
      GameWorld.changeBackgroundColor(colorIndex);
    }
  },

  touchesFromBuffer: function(data) {

    this.buffer += data;

    var endOfPacket = false;
    // indexOf test

    // all messages have been returning complete packets
    // TODO handle incomplete packet
    endOfPacket = true;

    if (endOfPacket) {
      var packet = JSON.parse(this.buffer);
      //return packet.points;
      return packet;
    } else {
      return false;
    }
  },

  proceedToParseEventData: function(data) {

    // check if data is a signal, not (partial) event data
    var signals = ['hi','open'];

    return  !(_.contains(signals,data));
  },

  parseData: function(data) {

    console.log("parseData",data, this);
    
    

    // check for incomplete packet
    var touches = this.touchesFromBuffer(data);
    
    if (!touches) return;
    this.buffer = '';

    console.log("parseData",touches);

    if (touches.length==0) {
    // all touches ended

      _.forIn(this.touches,function(touch){
        touch.end();
      });

      return;
    }

    // other
    _.each(touches, function(touch){

      console.log('touch data:',touch);
      console.log(_.keys(this.touches));

      // if id in touches, update touch
      // keys are strings
      if (_.contains(_.keys(this.touches),touch.id+'')) {
        console.log('UPDATE TOUCH');
        this.updateTouch(touch.id, touch.x, touch.y);
      // else new touch
      } else {
        console.log('NEW TOUCH');
        this.touches[touch.id] = new SmartTouch(touch.id, touch.x, touch.y);
      }

      // clean touches were not in packet, so they have ended
      _.each(this.touches, function(touch){
        
        if (touch.clean) {
          touch.end();
        }
      }, this);

    }, this);

    console.log(this.touches);
  },

  updateTouch: function(id, x, y) {
    var touch = this.touches[id];

    if (touch.x!==x && touch.y!==y) {
      touch.x = x;
      touch.y = y;
      touch.state = touch.States.moved;
    } else {
      touch.state = touch.States.fixed;
    }

    touch.clean = false;
  },

  fireEvents: function(){
    _.each(this.touches, this.fireEvent, this);
  },

  fireEvent: function(touch){
    switch (touch.state) {
      case touch.States.began:
        console.log('touchesBegan',touch);
        // this.delegate.windowEvent('touchesBegan',touch);
        // this.delegate.event('touchesBegan',touch);
        touch.clean = true;
        break;
      case touch.States.moved:
        console.log('touchesMoved',touch);
        // this.delegate.windowEvent('touchesMoved',touch);
        // this.delegate.event('touchesMoved',touch);
        touch.clean = true;
        break;
      case touch.States.ended:
        console.log('touchesEnded',touch);
        // this.delegate.windowEvent('touchesEnded',touch);
        // this.delegate.event('touchesEnded',touch);
        this.touches = _.omit(this.touches, touch);
        break;
    }
  }
};

SmartTouchDelegate = {
  target: null,
  interactionManager: null,
  init: function(target, interactionManager){

    this.target = target;
    this.interactionManager = interactionManager;

    //target.view.addEventListener("touchstart", this.onTouchStart.bind(this), true);
    //target.view.addEventListener("touchend", this.onTouchEnd.bind(this), true);
    //target.view.addEventListener("touchmove", this.onTouchMove.bind(this), true);
  },

  // Emulate Touch Events into entire browser window

  windowEvent: function(state, touch) {
    if (this.interactionManager!=null) return;



  },

  // Emulate Touch Events into PixiJS view
  // http://hammerjs.github.io/touch-emulator/
  event: function(state, touch) {

    if (this.interactionManager==null) return;

    // wrap event as mobile touch event
    // http://www.goodboydigital.com/pixijs/docs/files/pixi_InteractionManager.js.html
    var event = {
      preventDefault: function(){},
      changedTouches: [
        {identifier: touch.id, clientX: touch.x, clientY: touch.y}
      ]
    };

    switch (state) {
      case touch.States.began:
        this.interactionManager.onTouchStart.apply(this.interactionManager,event);
        break;
      case touch.States.moved:
        this.interactionManager.onTouchMove.apply(this.interactionManager,event);
        break;
      case touch.States.ended:
        this.interactionManager.onTouchEnd.apply(this.interactionManager,event);
        break;
    }
    

  }
}


// TODO automatically discover and cache SmartTouch server IP address...???
//var smartTouchHost = "10.0.1.23"; // NETWORK: Apple Network Base
//var smartTouchHost = "192.168.2.40"; // NETWORK: Mom
//var smartTouchHost = "192.168.1.123"; // NETWORK: LinkSys
var smartTouchHost = "127.0.0.1";

//var smartTouchPort = 1337;
var smartTouchPort = 8080;

var smartTouchClient = new SmartTouchClient();

smartTouchClient.bindToServer(smartTouchHost,smartTouchPort);
