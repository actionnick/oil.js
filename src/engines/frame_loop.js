var Base = require('./base');

/**
 * This engine will run object.update(delta) on frame loops. Simple way to add
 * time base functionality to your entities.
 */ 
class FrameLoop extends Base {
  constructor() {
    super();
    this.entities = new Set();
  }

  add(entity) {
    if (!entity.update) throw "Entity must implement update method";
    this.entities.add(entity);
  }

  remove(entity) {
    this.entities.delete(entity);
  }

  run(delta, tree) {
    this.entities.forEach(entity => entity.update(delta));
  }
}

module.exports = new FrameLoop();
