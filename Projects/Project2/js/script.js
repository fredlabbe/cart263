"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
// In Phaser we create an object literal to store the configuration
// options we'll use to create the game. Each option is a property
// in the object.
let player
let platforms;
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
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// With the configuration set up we can create the game itself!
var game = new Phaser.Game(config);

// preload()
//
// Description of preload

function preload() {
  this.load.image('ground', 'assets/images/platform.png');
  this.load.spritesheet('character', 'assets/images/stickman.png', { frameWidth: 64, frameHeight: 64 });

}


// create()
//
// Sets up the game

function create() {
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  player = this.physics.add.sprite(100, 150, 'character');
  player.setBounce(1);
  player.setCollideWorldBounds(true);

  this.physics.add.collider(player, platforms);


}


// update()
//
//

function update() {


}
