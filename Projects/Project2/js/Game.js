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
    this.platforms.create(450, 400, 'ground').refreshBody();
    this.platforms.create(1100, 450, 'ground').refreshBody();
    this.platforms.create(1600, 270, 'ground').refreshBody();
    this.platforms.create(2300, 568, 'ground').setScale(2).refreshBody();

    //the carrots
    this.carrots = this.physics.add.group({
      key: 'carrot',
      repeat: 14,
      setXY: {
        x: 12,
        y: 0,
        stepX: 300
      }
    });

    //the spikes
    this.spikes = this.physics.add.staticGroup();
    this.spikes.create(1400, 580, 'spikes').setScale(0.4).refreshBody();
    this.spikes.create(1957, 510, 'spikes').setScale(0.4).refreshBody();
    //the player
    this.player = this.physics.add.sprite(1500, 150, 'character');
    this.player.setScale(1.5);
    this.player.setBounce(0.2);

    //creating the cursors
    this.cursors = this.input.keyboard.createCursorKeys();
    //the camera
    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, 10000, 600);

    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

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
    // Now we can check the cursors keys to see if they're down one by one
    // In each case we set the appropriate velocity and play the appropriate animation
    if (this.cursors.left.isDown) {
      // setVelocityX will start the player moving at that number of pixels per second
      // We don't need to do anything more than this
      this.player.setVelocityX(-160);
      // We play an animation using the sprite's anims property and giving it the appropriate animation key
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      // Similarly for right
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);

    } else {
      // If neither left nor right is pressed the player should stop
      // so we set its velocity to 0 and turn it to face the front
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
      this.scene.restart();
    }
    //changing the background to be darker as the player advances in the game
    else if (this.player.x > 800 && this.player.x < 1386) {
      this.background.setTint(0xc4c4c4);
    }
    else if (this.player.x > 1386 && this.player.x < 2000) {
      this.background.setTint(0x8e8e8e);
    }
    else if(this.isDead === true){
      //setting the sky red
      this.background.setTint(0xff0000);
    }
    console.log(this.player.x);
    console.log(this.player.y);

  }
  // hitSpikes(player,spikes)
  //
  // Function called if the player collides with a spikes. Automatically passed
  //the player and the spikes. Blood spits everywhere because of the emitter.
  //the sky becomes red and horrible sounds are heard
  hitSpikes() {
    //disabling the player's movement because dead
    this.input.enabled = false;
    this.player.body.velocity.x = 0;
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

  // say(text)
  //
  // Speaks the text given with the parameters determined at the top of the script.
  say(text, voice, params) {
    responsiveVoice.speak(text, voice, params);
  }
  // collectCarrots
  //
  // This function is called when the player and a star overlap. It will automatically
  // receive arguments containing the player and the specific carrot they touched.
  collectCarrots(player, carrot) {
    //pausing previous eaten carrot just in case
    this.chewSFX.pause();
    //taking the carrot out of the screen
    carrot.disableBody(true, true);
    //playing the chewing sound when the carrot is picked up
    this.chewSFX.play();
  }
}
