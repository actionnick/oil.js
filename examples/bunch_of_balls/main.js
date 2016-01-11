var DisplayObject = require('../../src/display_object');
var FrameLoop = require('../../src/engines/frame_loop');
var Stage = require('../../src/stage');
var Circle = require('../../src/circle');
var vec2 = require('gl-matrix-vec2');

var canvas = document.getElementById("main-canvas");

var width = 1400;
var height = 650  ;

var stage = new Stage(canvas, {
  width: width,
  height: height,
  backgroundColor: "rgb(200,255,255)"
});

stage.registerEngine(FrameLoop);

class MovingCircle extends Circle {
  constructor() {
    super();

    FrameLoop.add(this);

    this.radius = Math.random() * 30;
    this.x = Math.random() * stage.width;
    this.y = Math.random() * stage.height;
    this.color = `rgba(255, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.random()})`;
  
    this.speed = Math.random() * 1;
    this.direction = vec2.create();
    var xDir = -1 + (Math.random() * 2);
    var yDir = -1 + (Math.random() * 2);
    vec2.normalize(this.direction, [xDir, yDir]);
  }

  update() {
    if (this.x > width || this.x < 0) {
      this.direction[0] *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.direction[1] *= -1;
    }

    this.x += this.direction[0] * this.speed;
    this.y += this.direction[1] * this.speed; 
  }
}

// var scene = new Scene();
for (var i = 0; i < 1000; i++) {
  var circle = new MovingCircle();
  stage.addChild(circle);
}
