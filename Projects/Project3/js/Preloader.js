class Preloader extends Phaser.Scene {

  constructor() {
    super('Preloader');
  }

  preload() {
    this.load.image('map', 'assets/images/map.png');
    this.load.image('tree', 'assets/images/tree.png');
    this.load.image('knight', 'assets/images/knight.png');
    this.load.image('elf', 'assets/images/elf.png');
    this.load.image('menu', 'assets/images/MenuImage.jpg');
    this.load.image('castle', 'assets/images/castle.png');
    this.load.image('blood', 'assets/images/blood.png');
    this.load.spritesheet('character', 'assets/images/bunny.png', {
      frameWidth: 31,
      frameHeight: 28
    });
  }

  create() {
    // First a walking animation. We use this.anims.create to create animations, passing an object
    // literal with the options
    this.anims.create({
      // As with all these kinds of things we give it a key (a name)
      key: 'left',
      // We specify the frames as an array, but we use generateFrameNumbers() to take care of it for us
      // It will generate frames between the start and end numbers for the specified key
      frames: this.anims.generateFrameNumbers('character', {
        start: 0,
        end: 2
      }),
      frameRate: 10,
      // looping infinitely
      repeat: -1
    });

    // The turn animation is when the "dude" is facing forwards
    this.anims.create({
      key: 'turn',
      // Here we can see an example of a non-generated frame - just the one frame object with a key and frame
      frames: [{
        key: 'character',
        frame: 3
      }],
      frameRate: 20
    });

    // And the rightward walking animation is similar to the leftward one
    // Note that in this case the left and right walking animations are two separate sets of images
    // in the spritesheet. Often you would see just one set and using other techniques to flip
    // the image in the opposite direction to create the other set.
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('character', {
        start: 4,
        end: 6
      }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.start('Menu');
  }
}
