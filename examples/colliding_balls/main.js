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

    // differentials
    this.d = new Vec2();
    this.dv = new Vec2();
  }

  update(delta) {
    var dv = this.dv, v = this.v, d = this.d, a = this.a;

    dv.x = a.x * delta;
    dv.y = a.y * delta;

    v.add(dv);

    d.x = v.x * delta;
    d.y = v.y * delta;

    this.x += d.x;
    this.y += d.y;
  }
}

var ball = new Ball();
ball.x = 100;
ball.y = 0;
stage.addChild(ball);
