var DisplayObject = require('../../src/display_object');
var Stage = require('../../src/stage');
var Circle = require('../../src/circle');
var Vec2 = require('../../src/util/vec2');
var FrameLoop = require('../../src/engines/frame_loop');

var canvas = document.getElementById("main-canvas");

var width = 1400;
var height = 650  ;

var stage = new Stage(canvas, {
  width: width,
  height: height,
  backgroundColor: "rgb(200,255,255)"
});

stage.registerEngine(FrameLoop);

class Ball extends Circle {
  constructor(opts = {}) {
    super();
    FrameLoop.add(this);
    this.v = new Vec2();
    this.a = new Vec2(0, 0.001);
    this.m = opts.m || 1;
    this.bounciness = opts.bounciness || 0.75;

    // differentials
    this.d = new Vec2();
    this.dv = new Vec2();
  }

  update(delta) {
    var dv = this.dv, v = this.v, d = this.d, a = this.a;
    var diameter = this.radius * 2;

    dv.x = a.x * delta;
    dv.y = a.y * delta;

    v.add(dv);

    d.x = v.x * delta;
    d.y = v.y * delta;

    if (this.y + diameter + d.y > stage.height) {
      this.y = stage.height - diameter;
      this.bounce();
    } else {
      this.y += d.y;
    }

    this.x += d.x;
  }

  bounce() {
    this.v.y *= -this.bounciness;
  }
}

for (var i = 0; i < 300; i++) {
  var ball = new Ball({
    bounciness: (Math.random() * 0.5) + 0.5
  });
  ball.color = `rgba(255, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.random()})`;
  ball.radius = (Math.random() * 25) + 5;
  ball.bounciness = Math.max((30 - ball.radius) / 30, 0.6);
  ball.x = Math.floor(Math.random() * stage.width);
  ball.y = Math.floor(Math.random() * (stage.height / 2));
  stage.addChild(ball);
}
