// Class Elf
//
//The class for the enemies in the rts game

class Elf extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    //adding it to the scene
    scene.add.existing(this);
    //enabling the physics
    scene.physics.world.enableBody(this);
    //this elf's health
    this.health = 100;
    //this elf's amount of damage
    this.damage = 0.5;
    //setting the scene
    this.scene = scene;
    //setting the scale of the unit down because if not it will be way too big
    this.setScale(0.25);

    //creating an area of detection centered around the elf to detect its own enemies
    this.detectionBox = this.scene.physics.add.sprite(this.body.x, this.body.y, '').setScale(8).setVisible(false);
    //this.detectionBox.alpha = 0.2;
    //saying that the detection box's elf is this one
    this.detectionBox.elf = this;

  }

  // update()
  //
  // pinning constantly the detection box of each elf to themsElves (got it? :'D)

  update() {
    this.detectionBox.x = this.x;
    this.detectionBox.y = this.y;

  }




}
