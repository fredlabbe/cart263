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

let player
let platforms;
let spikes;
let cursors;
let background;
let isDying = false;

// The specific voice we want the computer to use
let voice = 'UK English Female';
// The screaming in pain sound
let screamSFX = new Audio("assets/sounds/scream.wav");

// The parameters for the voice in an object
let voiceParameters = {
  pitch: 2,
  rate: 0.6,
  volume: 1
}
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
  this.load.image('sky', 'assets/images/sky.png');
  this.load.image('ground', 'assets/images/platform.png');
  this.load.image('spikes', 'assets/images/spikes.png');
  this.load.spritesheet('character', 'assets/images/bunny.png', { frameWidth: 31, frameHeight: 28 });

}


// create()
//
// Sets up the game

function create() {
  cursors = this.input.keyboard.createCursorKeys();
  background = this.add.sprite(400,300,'sky');
  background.immovable = true;


  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(450, 400,'ground').refreshBody();
  platforms.create(1100, 450,'ground').refreshBody();
  platforms.create(1600, 270,'ground').refreshBody();

  //the spikes
  spikes = this.physics.add.staticGroup();
  spikes.create(1400, 580, 'spikes').setScale(0.4).refreshBody();

  player = this.physics.add.sprite(100, 150, 'character');
  player.setScale(1.5);
  player.setBounce(0.2);
  //player.setCollideWorldBounds(true);


  // First a walking animation. We use this.anims.create to create animations, passing an object
 // literal with the options
 this.anims.create({
   // As with all these kinds of things we give it a key (a name)
   key: 'left',
   // We specify the frames as an array, but we use generateFrameNumbers() to take care of it for us
   // It will generate frames between the start and end numbers for the specified key
   frames: this.anims.generateFrameNumbers('character', { start: 0, end: 2 }),
   // How fast it should play
   frameRate: 10,
   // How many times it should repeat after finishing (-1 means loop infinitely)
   repeat: -1
 });

 // The turn animation is when the "dude" is facing forwards
 this.anims.create({
   key: 'turn',
   // Here we can see an example of a non-generated frame - just the one frame object with a key and frame
   frames: [ { key: 'character', frame: 3 } ],
   frameRate: 20
 });

 // And the rightward walking animation is similar to the leftward one
 // Note that in this case the left and right walking animations are two separate sets of images
 // in the spritesheet. Often you would see just one set and using other techniques to flip
 // the image in the opposite direction to create the other set.
 this.anims.create({
   key: 'right',
   frames: this.anims.generateFrameNumbers('character', { start: 4, end: 6 }),
   frameRate: 10,
   repeat: -1
 });

 cursors = this.input.keyboard.createCursorKeys();
 //the camera
 // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, 10000, 600);

 // make the camera follow the player
    this.cameras.main.startFollow(player);

 this.physics.add.collider(player, platforms);
 this.physics.add.collider(player, spikes, hitSpikes, null, this);

//Saying to find al the carrots in a creepy high pitched voice
 setTimeout(say("I... must find all the carrots..."), 2000);


}


// update()
//
//

function update() {
  // Now we can check the cursors keys to see if they're down one by one
  // In each case we set the appropriate velocity and play the appropriate animation
  if (cursors.left.isDown) {
    // setVelocityX will start the player moving at that number of pixels per second
    // We don't need to do anything more than this
    player.setVelocityX(-160);
    // We play an animation using the sprite's anims property and giving it the appropriate animation key
    player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
    // Similarly for right
    player.setVelocityX(160);
    player.anims.play('right', true);

  }
  else {
    // If neither left nor right is pressed the player should stop
    // so we set its velocity to 0 and turn it to face the front
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  // Slightly more fancy for jumping
  // We check if the up key is down
  // And we also check on the player's 'body' property (its physics body)
  // whether it is touching something in the dowards direction.
  // This means it will only jump if it is standing on something. Nice!
  if (cursors.up.isDown && player.body.touching.down) {
    // Jumping just means setting an upward velocity.
    // Remember we set up gravity right at the beginning, so that will cause
    // the player to fall appropriately.
    player.setVelocityY(-330);
  }

}
// hitSpikes(player,spikes)
//
// Function called if the player collides with a spikes. Automatically passed the player and the spikes.
function hitSpikes(){
  isDying = true;
  player.setTint(0xff0000);
  if(isDying === true){
    this.input.enable = false;
    screamSFX.play();
    setTimeout(restart,8000);
  }
}

// say(text)
//
// Speaks the text given with the parameters determined at the top of the script.
function say(text) {
  responsiveVoice.speak(text,voice,voiceParameters);
}

function restart(){
  screamSFX.pause();
  isDying = false;
  // this.cameras.main.fade(500, 0, 0, 0);
  // this.cameras.main.shake(250, 0.01);

}
