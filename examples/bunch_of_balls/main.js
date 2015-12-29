// var ReGame = require('re-game');
// var Circle = require('re-game/shapes').Circle
// var Physics = require('../../src/physics');
var DisplayObject = require('../../src/display_object');
var Stage = require('../../src/stage');

var canvas = document.getElementById("main-canvas");

var A = new DisplayObject('A');
var B = new DisplayObject('B');
var C = new DisplayObject('C');
var D = new DisplayObject('D');
var E = new DisplayObject('E');
var F = new DisplayObject('F');
var G = new DisplayObject('G');
var H = new DisplayObject('H');
var I = new DisplayObject('I');

A.addChild(B);
A.addChild(C);
B.addChild(D);
B.addChild(E);
E.addChild(F);
E.addChild(G);
C.addChild(H);
C.addChild(I);

var stage = new Stage(canvas, {
  width: 1600,
  height: 500,
  clearColor: "rgb(100,100,0)"
});

// var scene = new Scene();

// var circle = new Circle({
//   radius: 10
//   x: 10,
//   y: 10,
//   physics: Physics.SIMPLE_COLLISION
// });

// scene.add(circle);
// ReGame.attachStage(stage);
// stage.attachScene(scene);
