// Class Worker
//
//The class for workers in the game
class Worker extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    //adding it to the scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    //enabling the physics
    scene.physics.world.enableBody(this);
    //knowing when this unit is clicked
    this.isClicked = false;
    //this unit's health
    this.maxHealth = 100;
    this.health = 100;
    //this unit's damage
    this.damage = 0.25;
    //setting the scene
    this.scene = scene;

    this.barX = this.x;
    this.barY = this.y - 20;

    //the amount of time it take before collecting wood
    this.WOOD_TIME = 2000;
    //the amount of wood collected after the set collecting time
    this.WOOD_COLLECT = 10;
    //how many woods are chopping for every frame from the total ressourceAmt of the tree
    this.CHOP_AMT = 0.5;
    //setting the unit interactive so it can be clicked
    this.setInteractive();
    //setting the scale of the unit down because if not it will be way too big
    this.setScale(0.05);
    //managing the overlap between the units and the trees so the player collects wood
    this.scene.physics.add.overlap(this, this.scene.trees, this.collectWood, null);

    //when the user clicks on the unit, it sets its tint to be a little darker
    //so we know it's selected and sets the current unit selected to this one
    this.on('pointerdown', (pointer) => {
      if (this.scene.isCurrentUnit === false) {
        this.scene.isCurrentUnit = true;
        //setting the tint to be a little darker
        this.setTint(0xc1c1c1);
        this.isClicked = true;
        //setting the current unit selected to this one
        this.scene.currentUnit = this;
      }
    });
  }

  //update()
  //
  //

  update() {

    //this.healthBar();
    // console.log(this.isOverlappingTree);
    // if(!this.isOverlappingTree && this.scene.chopSFX.isPlaying || this.health <= 0 && this.scene.chopSFX.isPlaying){
    //   this.scene.chopSFX.pause();
    // }

  }

  // collectWood()
  //
  //Called when a unit overlaps a tree. When it does,  it takes a certain amount
  //of time before the wood is collected and the tree disappears.

  collectWood(unit, tree) {
    //if the unit doesn't move, chops the wood and plays the sound
    if (unit.body.velocity.x === 0 && unit.body.velocity.y === 0) {
      tree.resourceAmt -= unit.CHOP_AMT;
      if (!unit.scene.chopSFX.isPlaying) {
        unit.scene.chopSFX.play();
      }
    }
    //if the unit is moving and overlapping the tree, pause the sound, so when
    //it has left, it will not be played anymore
    else {
      unit.scene.chopSFX.pause();
    }
    //if the tree is empty of resources, add 10 wood to current amount of wood
    //and stops playing the sound
    if (tree.resourceAmt <= 0) {
      unit.scene.wood += unit.WOOD_COLLECT;
      unit.scene.woodText.setText(`Wood: ${unit.scene.wood}`);
      unit.scene.trees.remove(tree);
      tree.destroy();
      unit.scene.chopSFX.pause();
    }
    //checking if the unit is killed while chopping wood,
    //stopping it right before being killed
    if (unit.health < 10) {
      console.log("dead");
      //pausing the chopping sound
      unit.scene.chopSFX.pause();
    }
  }

  healthBar() {
    let healthSize;
    healthSize = map(this.health, 0, this.maxHealth, 0, 50);
    push();
    //centering the rectangle
    rectMode(CENTER);
    //dark red color
    fill(125, 37, 32);
    //creating the red rectangle
    rect(this.barX, this.barY, 50, 10);
    //the green color
    fill(60, 94, 55);
    //creating the rectangle that is mapped, the green one, the life
    rect(this.barX, this.barY, healthSize, 10);
    pop();
  }
}
