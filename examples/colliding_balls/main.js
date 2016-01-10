var DisplayObject = require('../../src/display_object');
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

// var scene = new Scene();
for (var i = 0; i < 1000; i++) {
  var circle = new Circle({
    radius: Math.random() * 30,
    x: Math.random() * stage.width,
    y: Math.random() * stage.height,
    color: `rgba(255, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.random()})`
  });

  circle.update = function(delta) {
    if (!this.speed) {
      this.speed = Math.random() * 1;
    }
    if (!this.direction) {
      this.direction = vec2.create();
      var xDir = -1 + (Math.random() * 2);
      var yDir = -1 + (Math.random() * 2);
      vec2.normalize(this.direction, [xDir, yDir]);
    }

    if (this.x > width || this.x < 0) {
      this.direction[0] *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.direction[1] *= -1;
    }

    this.x += this.direction[0] * this.speed;
    this.y += this.direction[1] * this.speed; 
  }.bind(circle);

  stage.addChild(circle);
}
