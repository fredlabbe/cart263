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

    //the overlaps of detection boxes and units
    this.scene.physics.add.overlap(this.detectionBox, this.scene.units, this.chaseUnits, null);
  }

  // update()
  //
  // pinning constantly the detection box of each elf to themsElves (got it? :'D)

  update() {
    this.detectionBox.x = this.x;
    this.detectionBox.y = this.y;
  }

  // chaseUnits(unit,box)
  //
  // moves the elf according to the unit when it has been in the detection box

  chaseUnits(box, unit) {
    //as long as both of them are still alive
    if (box.elf.health > 0 && unit.health > 0) {
      //getting the time to go there
      let t = unit.scene.getTime(box.elf, unit, unit.scene.ELF_SPEED);
      //moving the elf
      unit.scene.physics.moveToObject(box.elf, unit, unit.scene.ELF_SPEED, t);
    }
    //stopping the elves right before killing the unit (they will still have time
    //to kill it because the value is so small)
    if (unit.health < 5) {
      box.elf.setVelocity(0, 0);
    }
  }
}
