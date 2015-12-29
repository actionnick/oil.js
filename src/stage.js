var DisplayObject = require('./display_object');

class Stage extends DisplayObject {
  constructor(canvas, opts) {
    super();
    this.canvas = canvas;

    this.setOptions(opts);
    this.setupCanvas();
    this.start();
  }

  setOptions(opts) {
    this.width = opts.width || 500;
    this.height = opts.height || 500;
    this.clearColor = opts.clearColor || opts.backgroundColor || "rgb(255,255,255)";
  }

  setupCanvas() {
    this.ctx = this.canvas.getContext('2d');
    this.drawRatio = window.devicePixelRatio || 1;
    this.canvas.width = this.width * this.drawRatio;
    this.canvas.height = this.height * this.drawRatio;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
  }

  start() {
    window.requestAnimationFrame(this.nextFrame);
  }

  get nextFrame() {
    if (!this._nextFrame) {
      this._nextFrame = timestamp => {
        if (!this.start) this.start = timestamp;
        var delta = timestamp - this.start;
        this.currentTree = this.tree();
        this.currentTree.forEach(object => object.update && object.update(delta));
        this.render();
        window.requestAnimationFrame(this.nextFrame);
      }
    }
    return this._nextFrame;
  }

  render() {
    var ctx = this.ctx;
    ctx.save();
    ctx.scale(this.drawRatio, this.drawRatio);
    this.clear();
    this.currentTree.forEach(object => object._draw && object._draw(ctx));
    ctx.restore();
  }

  clear() {
    this.ctx.save();
    this.ctx.fillStyle = this.clearColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }
}

module.exports = Stage;
