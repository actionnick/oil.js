var DisplayObject = require('./display_object');

class Stage extends DisplayObject {
  constructor(canvas, opts) {
    super();
    this.canvas = canvas;

    this.setOptions(opts);
    this.setupCanvas();
    this.engines = new Set();
    this.start();
  }

  setOptions(opts) {
    this.width = opts.width || 500;
    this.height = opts.height || 500;
    this.clearColor = opts.clearColor || opts.backgroundColor || "rgb(255,255,255)";
    this.fullScreen = opts.fullScreen || false;
  }

  registerEngine(engine) {
    this.engines.add(engine);
  }

  removeEngine(engine) {
    this.engines.delete(engine);
  }

  setupCanvas() {
    this.ctx = this.canvas.getContext('2d');
    this.drawRatio = window.devicePixelRatio || 1;
    this.canvas.width = this.width * this.drawRatio;
    this.canvas.height = this.height * this.drawRatio;

    if (this.fullScreen) {
      this.canvas.style.maxWidth = "100%";
      this.canvas.style.maxHeight = "100%";
    } else {
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;
    } 
  }

  start() {
    window.requestAnimationFrame(this.nextFrame);
  }

  get nextFrame() {
    if (!this._nextFrame) {
      this._nextFrame = timestamp => {
        if (!this.lastTime) this.lastTime = timestamp;
        var delta = timestamp - this.lastTime;
        this.lastTime = timestamp;

        var tree = this.tree();

        this.engines.forEach(engine => {
          engine.run(delta, tree);
        });

        this.render(tree);
        window.requestAnimationFrame(this.nextFrame);
      }
    }
    return this._nextFrame;
  }

  render(tree) {
    var ctx = this.ctx;
    ctx.save();
    ctx.scale(this.drawRatio, this.drawRatio);

    this.clear();
    tree.forEach(object => object._draw && object._draw(ctx));

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
