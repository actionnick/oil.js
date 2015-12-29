var mat2d = require("gl-matrix-mat2d");
var _ = require('lodash');

class DisplayObject {
  constructor(name) {
    this.children = new Set();
    this.mat = mat2d.create();
    this.width = 0;
    this.height = 0;
    this.name = name;
  }

  addChild(displayObject) {
    this.children.add(displayObject);
  }

  removeChild(displayObject) {
    this.children.delete(displayObject);
  }

  _draw(ctx) {
    ctx.save();
    ctx.transform.apply(ctx, this.mat);
    this.draw(ctx);
    ctx.restore();
  }

  /**
   * Subclasses implement.
   */ 
  draw() {

  }

  /**
   * Pre order traversal representation of this display object and its
   * descendants. 
   */ 
  tree() {
    var list = [this];
    this.children.forEach((child) => {
      list.push(child.tree());
    });
    
    return _.flatten(list);
  }

  move(x, y) {
    mat2d.translate(this.mat, this.mat, [x, y]);
  }

  moveX(x) {
    this.move(x, 0);
  }

  moveY(y) {
    this.move(0, y);
  }

  set x(val) {
    return this.mat[4] = val;
  }

  get x() {
    return this.mat[4];
  }

  set y(val) {
    return this.mat[5] = val;
  }

  get y() {
    return this.mat[5];
  }
}

module.exports = DisplayObject;
