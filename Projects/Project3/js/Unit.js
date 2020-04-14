// Class Worker
//
//The class for workers in the game
class Worker extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    //adding it to the scene
    scene.add.existing(this);
    //enabling the physics
    scene.physics.world.enableBody(this);
    //knowing when this unit is clicked
    this.isClicked = false;
    //this unit's health
    this.health = 100;
    //this unit's damage
    this.damage = 0.25;
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
      //setting the tint to be a little darker
      this.setTint(0xc1c1c1);
      this.isClicked = true;
      //setting the current unit selected to this one
      this.scene.currentUnit = this;
    });
  }
}
