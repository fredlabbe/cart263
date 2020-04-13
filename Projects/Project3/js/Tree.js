// Class Tree
//
//The parent class for units in the RTS game
class Tree extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    //adding it to the scene
    scene.add.existing(this);
    //enabling the physics
    scene.physics.world.enableBody(this);
    //this unit's health
    this.resourceAmt = 200;
    //setting the scene
    this.scene = scene;
    //setting the unit interactive so it can be clicked
    this.setInteractive();
    //scaling down the size of the tree
    this.setScale(0.1);

  }



}
