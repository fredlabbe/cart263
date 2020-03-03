"use strict";

/*****************

A Children Game?
Frederick Labbe

This is a platformer that looks all cute and nice at the beginning. The player
is immersed in a pink and cute world where the player is a rabbit that must
collect carrots. However, when the player falls on spikes, blood spits
everywhere and everything turns gore...

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
      // Set up a constant force of gravity
      gravity: { y: 300 },
      // No debug
      debug: false
    }
  },
  //the scenes in the game
  scene: [Preloader,Menu,Game]
};

// creating the game itself
let game = new Phaser.Game(config);
