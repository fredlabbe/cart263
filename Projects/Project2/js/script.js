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
    // The physics engine to use (Phaser has multiple)
    default: 'arcade',
    // Configuration properties for the arcade physics
    arcade: {
      // Set up a constant force of gravity
      gravity: { y: 300 },
      // No debug information (set it to true and check it out!)
      debug: false
    }
  },
  // Scene refers to the functions that will be used to run  the game
  // (More complex versions with multiple scenes are possible!)
  scene: [Preloader,Menu,Game]
  // {
  //   preload: preload,
  //   create: create,
  //   update: update
  // }
};

// With the configuration set up we can create the game itself!
let game = new Phaser.Game(config);
