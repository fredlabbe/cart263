// Class Worker
//
//The parent class for units in the RTS game
class Worker extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    //adding it to the scene
    scene.add.existing(this);
    //enabling the physics
    scene.physics.world.enableBody(this);
    console.log("constructor works");
    this.isClicked = false;
    //this unit's health
    this.health = 100;
    //setting the scene
    this.scene = scene;
    //setting the unit interactive so it can be clicked
    this.setInteractive();
    //setting the scale of the unit down because if not it will be way too big
    this.setScale(0.05);


    //when the user clicks on the unit, it sets its tint to be a little darker
    //so we know it's selected and sets the current unit selected to this one
    this.on('pointerdown', (pointer) => {
      console.log("clicking on the unit works");
      //setting the tint ro be a little darker
      this.setTint(0xc1c1c1);
      this.isClicked = true;
      this.scene.currentUnit = this;
    });
  }




}
