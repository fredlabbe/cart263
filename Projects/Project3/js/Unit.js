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
    this.scene = scene;

    this.currentTree = null;
    //setting the unit interactive so it can be clicked
    this.setInteractive();
    //setting the scale of the unit down because if not it will be way too big
    this.setScale(0.05);

    //managing the overlap between the units and the trees so the player collects wood
    this.scene.physics.add.overlap(this, this.trees, this.collectWood, null, scene);


    //when the user clicks on the unit, it sets its tint to be a little darker
    //so we know it's selected and sets the current unit selected to this one
    this.on('pointerdown', (pointer) => {
      if(this.scene.isCurrentUnit === false){
        this.scene.isCurrentUnit = true;
      console.log("clicking on the unit works");
      //setting the tint to be a little darker
      this.setTint(0xc1c1c1);
      this.isClicked = true;
      //setting the current unit selected to this one
      this.scene.currentUnit = this;
    }
    });
  }
  update(){
    // let healthSize;
    // healthSize = map(this.health, 0, this.maxHealth, 0, 50);
    // push();
    // //centering the rectangle
    // rectMode(CENTER);
    // //dark red color
    // fill(125, 37, 32);
    // //creating the red rectangle
    // rect(this.barX, this.barY, 50, 10);
    // //the green color
    // fill(60, 94, 55);
    // //creating the rectangle that is mapped, the green one, the life
    // rect(this.barX, this.barY, healthSize, 10);
    // pop();
  }

  // collectWood()
  //
  //Called when a unit overlaps a tree. When it does,  it takes a certain amount
  //of time before the wood is collected and the tree disappears.

  collectWood(tree) {
    console.log("in collectWood");
    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
      this.currentTree = tree;
      tree.resourceAmt -= this.scene.CHOP_AMT;
      this.scene.chopSFX.play();
      console.log("chop chop");
    }
    if (tree.resourceAmt <= 0) {
      this.scene.wood += this.scene.WOOD_COLLECT;
      this.scene.woodText.setText(`Wood: ${this.scene.wood}`);
      tree.destroy();
      this.scene.chopSFX.pause();
      this.currentTree = null;
    }
    //checking if the unit is killed while chopping wood
    if (this.health <= 0) {
      console.log("dead");
      //pausing the chopping sound
      this.scene.chopSFX.pause();
    }

  }
}
