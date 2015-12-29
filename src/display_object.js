var mat2d = require("gl-matrix-mat2d");
var _ = require('lodash');

class DisplayObject {
  constructor(name) {
    this.children = new Set();
    this.matrix = mat2d.create();
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

}

module.exports = DisplayObject;
