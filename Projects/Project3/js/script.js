"use strict";

/*****************

Name of game
Frederick Labbe

Description of game

******************/
//setting up the configuration of the game
var config = {
  // The renderer to be used: CANVAS, WEBGL, AUTO)
  type: Phaser.AUTO,
  // Dimensions of the canvas
  width: 800,
  height: 600,
  // The physics options
  physics: {
    // The physics engine to use
    default: 'arcade',
    // Configuration properties for the arcade physics
    arcade: {
      // No debug
      debug: false
    }
  },
  //the scenes in the game
  scene: [Preloader, Menu, Game]
};

// creating the game itself
let game = new Phaser.Game(config);
