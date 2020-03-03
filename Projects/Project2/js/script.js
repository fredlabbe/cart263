"use strict";

/*****************

Title of Project
Frederick Labbe

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

//PARTICLES: https://phaser.io/examples/v2/particles/click-burst
//           https://phaser.io/examples/v3/search?search=particle

// platformer example: https://gamedevacademy.org/how-to-make-a-mario-style-platformer-with-phaser-3/
//

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
