var DisplayObject = require('./display_object');

class Circle extends DisplayObject {
  constructor(opts) {
    super();
    this.setOptions(opts);
  }

  setOptions(opts) {
    this.radius = opts.radius || 20;
    this.x = opts.x || 10;
    this.y = opts.y || 10;
    this.color = opts.color || "rgba(255,0,0,1.0)"
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.radius, this.radius, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

module.exports = Circle;
