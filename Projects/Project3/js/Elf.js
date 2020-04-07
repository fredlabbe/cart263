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
    console.log("constructor works");
    //this unit's health
    this.health = 100;
    //setting the scene
    this.scene = scene;
    //setting the scale of the unit down because if not it will be way too big
    //this.setScale(0.05);

  }




}
