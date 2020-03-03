//import { Scene } from 'Phaser'

class Game extends Phaser.Scene{

  constructor(){
    super('Game');
  }
  init(data){
    this.player;
    this.platforms;
    this.spikes;
    this.cursors;
    this.background;
    this.isDying = false;
    this.emitter;

    // The specific voice we want the computer to use
    this.voice = 'UK English Female';
    // The screaming in pain sound
    this.screamSFX = new Audio("assets/sounds/scream.wav");
    this.musicSFX = new Audio("assets/sounds/happyLoop.wav");

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
    this.musicSFX.play();
    this.musicSFX.volume = 0.2;
    this.musicSFX.loop = true;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.background = this.add.sprite(400,300,'sky');
    this.background.setScrollFactor(0);


    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(450, 400,'ground').refreshBody();
    this.platforms.create(1100, 450,'ground').refreshBody();
    this.platforms.create(1600, 270,'ground').refreshBody();

    //the spikes
    this.spikes = this.physics.add.staticGroup();
    this.spikes.create(1400, 580, 'spikes').setScale(0.4).refreshBody();

    this.player = this.physics.add.sprite(100, 150, 'character');
    this.player.setScale(1.5);
    this.player.setBounce(0.2);
    //player.setCollideWorldBounds(true);


   this.cursors = this.input.keyboard.createCursorKeys();
   //the camera
   // set bounds so the camera won't go outside the game world
   this.cameras.main.setBounds(0, 0, 10000, 600);

   // make the camera follow the player
   this.cameras.main.startFollow(this.player);

   this.physics.add.collider(this.player, this.platforms);
   this.physics.add.collider(this.player, this.spikes, this.hitSpikes, null, this);

  //Saying to find al the carrots in a creepy high pitched voice
   setTimeout(this.say, 2000,"I... must find all the carrots...",this.voice,this.voiceParameters);
  }


  // update()
  //
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
    }
    else if (this.cursors.right.isDown) {
      // Similarly for right
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);

    }
    else {
      // If neither left nor right is pressed the player should stop
      // so we set its velocity to 0 and turn it to face the front
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    // Slightly more fancy for jumping
    // We check if the up key is down
    // And we also check on the player's 'body' property (its physics body)
    // whether it is touching something in the dowards direction.
    // This means it will only jump if it is standing on something. Nice!
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      // Jumping just means setting an upward velocity.
      // Remember we set up gravity right at the beginning, so that will cause
      // the player to fall appropriately.
      this.player.setVelocityY(-330);
    }

  }
  // hitSpikes(player,spikes)
  //
  // Function called if the player collides with a spikes. Automatically passed the player and the spikes.
  hitSpikes(){
    this.musicSFX.pause();
    this.player.setTint(0xff0000);
    if(this.isDying === false){
      this.input.enable = false;
      this.screamSFX.play();
      setTimeout(() => {
        this.scene.restart();
      },8000);
      //adding the blood
      let particles = this.add.particles('blood');
      this.emitter = particles.createEmitter();
      this.emitter.setPosition(this.player.x,this.player.y);
      this.emitter.setSpeed(50);
      this.input.keyboard.enabled = false;
      this.isDying = true;
      //particleBurst(player);
    }
  }

  // say(text)
  //
  // Speaks the text given with the parameters determined at the top of the script.
  say(text,voice,params) {
    responsiveVoice.speak(text,voice,params);
  }

  // function restart(){
  //   screamSFX.pause();
  //   isDying = false;
  //   // this.cameras.main.fade(500, 0, 0, 0);
  //   // this.cameras.main.shake(250, 0.01);
  //
  // }
  // particleBurst(player){
  //   emitter.x = player.x;
  //   emitter.y = player.y;
  //
  //   emitter.start(true, 2000, null, 10);
  //
  // }

}
