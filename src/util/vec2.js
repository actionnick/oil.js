var vec2 = require('gl-matrix-vec2');

class Vec2 {
  constructor(x=0, y=0) {
    this.vals = vec2.fromValues(x, y);
  }

  get x() {
    return this.vals[0];
  }

  set x(val) {
    return this.vals[0] = val;
  }

  get y() {
    return this.vals[1];
  }

  set y(val) {
    return this.vals[1] = val;
  }

  add(vec) {
    vec2.add(this.vals, this.vals, vec.vals);
  }

  scale(scale) {
    vec2.scale(this.vals, this.vals, scale);
  }
}

module.exports = Vec2;
