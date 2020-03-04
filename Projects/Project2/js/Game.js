//Class Game
//The game scene where everything happens.
//
class Game extends Phaser.Scene {

  constructor() {
    super('Game');
  }
  //init(data)
  //initializing all the data of this scene
  init(data) {
    //objects
    this.player;
    this.platforms;
    this.spikes;
    this.carrots;
    //the controls
    this.cursors;
    //the background
    this.background;
    //variable to check if the player is dying
    this.isDying = false;
    //the emitter for the blood
    this.emitter;
    // The specific voice we want the computer to use
    this.voice = 'UK English Female';
    // The screaming in pain sound
    this.screamSFX = new Audio("assets/sounds/scream.wav");
    //the music
    this.musicSFX = new Audio("assets/sounds/happyLoop.wav");
    //the horror sound
    this.horrorSFX = new Audio("assets/sounds/horrorSound.wav");
    //the chewing sound when the carrots are picked up sound
    this.chewSFX = new Audio("assets/sounds/chew.wav");

    // The parameters for the voice in an object
    this.voiceParameters = {
      pitch: 2,
      rate: 0.6,
      volume: 1
    }
  }

  // preload()
  //
  // Description of preload

  preload() {

  }


  // create()
  //
  // Sets up the game

  create() {
    //playing the music not too loud
    this.musicSFX.play();
    this.musicSFX.volume = 0.2;
    this.musicSFX.loop = true;

    //setting up the cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    //setting up a background that follows the player
    this.background = this.add.sprite(400, 300, 'sky');
    this.background.setScrollFactor(0);

    //the platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(550, 400, 'ground').refreshBody();
    this.platforms.create(1100, 450, 'ground').refreshBody();
    this.platforms.create(1600, 270, 'ground').refreshBody();
    this.platforms.create(2300, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(2500, 200, 'ground').setScale(1.2).refreshBody();
    this.platforms.create(3000, 300, 'ground').setScale(0.8).refreshBody();
    this.platforms.create(2600, 400, 'ground').setScale(0.8).refreshBody();
    this.platforms.create(3150, 90, 'ground').setScale(0.8).refreshBody();
    this.platforms.create(3800, 400, 'ground').setScale(1.4).refreshBody();
    this.platforms.create(4500, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(5000, 380, 'ground').setScale(1.5).refreshBody();
    this.platforms.create(5500, 200, 'ground').setScale(0.8).refreshBody();
    this.platforms.create(6400, 500, 'ground').setScale(0.8).refreshBody();

    //the carrots
    this.carrots = this.physics.add.group({
      key: 'carrot',
      repeat: 20,
      setXY: {
        x: 12,
        y: 0,
        stepX: 750
      }
    });

    //the spikes
    this.spikes = this.physics.add.staticGroup();
    this.spikes.create(1400, 580, 'spikes').setScale(0.4).refreshBody();
    this.spikes.create(1957, 510, 'spikes').setScale(0.4).refreshBody();
    this.spikes.create(2061, 510, 'spikes').setScale(0.4).refreshBody();
    this.spikes.create(3800, 354, 'spikes').setScale(0.4).refreshBody();
    this.spikes.create(3600, 354, 'spikes').setScale(0.4).refreshBody();
    this.spikes.create(4150, 510, 'spikes').setScale(0.4).refreshBody();
    this.spikes.create(4000, 354, 'spikes').setScale(0.4).refreshBody();
    this.spikes.create(4350, 510, 'spikes').setScale(0.4).refreshBody();
    this.spikes.create(4900, 330, 'spikes').setScale(0.4).refreshBody();
    this.spikes.create(5000, 330, 'spikes').setScale(0.4).refreshBody();
    this.spikes.create(5900, 580, 'spikes').setScale(0.4).refreshBody();
    this.spikes.create(6000, 580, 'spikes').setScale(0.4).refreshBody();
    this.spikes.create(6100, 580, 'spikes').setScale(0.4).refreshBody();
    this.spikes.create(6200, 580, 'spikes').setScale(0.4).refreshBody();
    //the player
    this.player = this.physics.add.sprite(100, 500, 'character');
    //increasing the size of the sprite a bit
    this.player.setScale(1.5);
    //bounces a bit like a bunny
    this.player.setBounce(0.2);

    //creating the cursors
    this.cursors = this.input.keyboard.createCursorKeys();
    //the camera
    // set bounds so the camera won't go outside the game world and sets the
    //limit of the world to scroll to
    this.cameras.main.setBounds(0, 0, 8000, 600);

    // make the camera follow the player
    this.cameras.main.startFollow(this.player);
    //Setting up he collision between the game objects
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.carrots, this.platforms);
    this.physics.add.collider(this.player, this.spikes, this.hitSpikes, null, this);

    //collecting the carrots
    this.physics.add.overlap(this.player, this.carrots, this.collectCarrots, null, this)

    //Saying to find al the carrots in a creepy high pitched voice
    setTimeout(this.say, 2000, "I... must find all the carrots...", this.voice, this.voiceParameters);
  }


  // update()
  //
  //keeping track of the user input and if the player falls off the game space (restarts).
  //

  update() {
    //checking the user input and make the bunny move accordingly
    if (this.cursors.left.isDown) {
      //left cursor down, so negative velocity
      this.player.setVelocityX(-160);
      // playing the corresponding animation
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      // going right means positive velocity and the corresponding animation again
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);

    } else {
      //if not pressing any arrow key, bunny faces forward
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    //checking if the up key is pressed and if the body is touching something to
    //jump
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
    //restarting the game if the player falls off.. not gore yet!
    if (this.player.x < 0 || this.player.y > 600) {
      //start by pausing the game so it does not become chaotic
      this.musicSFX.pause();
      this.scene.restart();
    }
    //changing the background to be darker as the player advances in the game and
    //saying messages along the way
    if (this.player.x > 800 && this.player.x < 1386) {
      this.say("I must be careful ... not to fall on the spikes", this.voice, this.voiceParameters);
      this.background.setTint(0xe2e2e2);
    } else if (this.player.x > 1386 && this.player.x < 3000) {
      this.background.setTint(0xc4c4c4);
    } else if (this.player.x > 3000 && this.player.x < 4000) {
      this.say("ooh... that was close", this.voice, this.voiceParameters);
      this.background.setTint(0x7a7a7a);
    } else if (this.player.x > 4000 && this.player.x < 4800) {
      this.background.setTint(0x595959);
    } else if (this.player.x > 4800 && this.player.x < 5000) {
      this.background.setTint(0x444444);
      this.say("Now... I need to get the last ...succulent... carrot", this.voice, this.voiceParameters);
    }
    //checking if the player is dead, put the background red
    if (this.isDying === true) {
      //setting the sky red
      this.background.setTint(0xff0000);
    }
  }
  // hitSpikes(player,spikes)
  //
  // Function called if the player collides with a spikes. Automatically passed
  //the player and the spikes. Blood spits everywhere because of the emitter.
  //the sky becomes red and horrible sounds are heard
  hitSpikes() {
    //disabling the player's movement because dead
    this.input.enabled = false;
    //pausing the physics so the player cannot move anymore
    this.physics.pause();
    //only starting the process if the player is dying
    if (this.isDying === false) {
      //replaing the happy music by a horrible sound.. ooouuuhhh..
      this.musicSFX.pause();
      this.horrorSFX.play();
      //painful screams
      this.screamSFX.play();
      //respawning and resetting the scene after 8 seconds
      setTimeout(() => {
        //re-enabling the player movement
        this.input.keyboard.enabled = true;
        this.horrorSFX.pause();
        this.scene.restart();
      }, 8000);
      //adding the blood as an emitter that emits several times the same image
      let particles = this.add.particles('blood');
      this.emitter = particles.createEmitter();
      this.emitter.setPosition(this.player.x, this.player.y);
      this.emitter.setSpeed(50);
      this.isDying = true;
    }
  }

  // say(text,voice,params)
  //
  // Speaks the text given with the parameters determined at the top of the script.
  say(text, voice, params) {
    responsiveVoice.speak(text, voice, params);
  }
  // collectCarrots
  //
  // This function is called when the player and a carrot overlap. If yes, the
  //carrot disappears from the game
  collectCarrots(player, carrot) {
    //pausing previous eaten carrot just in case
    this.chewSFX.pause();
    //taking the carrot out of the screen
    carrot.disableBody(true, true);
    //playing the chewing sound when the carrot is picked up
    this.chewSFX.play();
  }
}
