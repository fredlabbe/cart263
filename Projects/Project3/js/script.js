"use strict";

/*****************

The Dusk of Conquests
Frederick Labbe

Revolt! Humans shall now rebell against the oppressing Elves occupying the realm
and enslaving humans.

A basic draft of an RTS game where the player has to gather resources to build
an army and kill the opponents. The game is won when all Elves have been
eradicated.

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
  scene: [Preloader, Menu, Narrative, Game, GameOver]
};

// creating the game itself
let game = new Phaser.Game(config);
