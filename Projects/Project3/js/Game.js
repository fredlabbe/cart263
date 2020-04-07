//Class Game
//The game scene where everything happens.
//


//Questions for pippin:
//1.
//2.
//3.

// function(n, start1, stop1, start2, stop2) {
//  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
///}

//
//
//



class Game extends Phaser.Scene {

  constructor() {
    super('Game');
    //the current unit selected so null now because no unit is selected
    this.currentUnit = null;
  }
  //init(data)
  //initializing all the data of this scene
  init(data) {
    this.background;
    this.mapLimit = 2000;
    this.base;
    this.units;
    this.UNIT_TIME = 2000;
    this.trees;
    this.numberOfTrees = 100;
    this.unitArray = [];
    //the wood the player has. It is acquired by making a worker cut trees
    this.wood = 0;
    //the amount of time it take before collecting wood
    this.WOOD_TIME = 2000;
    //the amount of wood collected after the set collecting time
    this.WOOD_COLLECT = 10;
    this.CHOP_AMT = 0.5;
    //the text displaying the wood
    this.woodText;

    //the total amount of coin the player has
    this.coin = 0;


  }

  // preload()
  //
  // Description of preload

  preload() {
  //see the preload class

  }


  // create()
  //
  // Sets up the game

  create() {
    //setting up a background
    this.background = this.add.sprite(0, 0, 'map');
    this.background.setScale(2);

    //creating the base
    this.base = this.add.sprite(200, 200, 'castle').setInteractive().setScale(0.2);
    this.base.on('pointerdown', function(pointer) {
      this.setTint(0xc1c1c1);
      setTimeout(() => {
        this.scene.base.setTint(0xffffff);
        let unit = new Worker(this.scene, 250, 250, 'knight');
        this.scene.unitArray.push(unit);
        this.scene.units.add(unit);

      }, this.UNIT_TIME);


    });

    this.trees = this.physics.add.group({});

    for(let i = 0; i < this.numberOfTrees; i++){
      let randX = this.mapLimit*Math.random();
      let randY = this.mapLimit*Math.random();
      // put if statement saying if it falls on the base, put elsewhere!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      let tree = new Tree(this, randX, randY, 'tree');
      this.trees.add(tree);
    }
    //When the player clicked on a unit and then somewhere else, genereate an
    //invisible object at the point where the user clicks where the unit will
    //move to
    this.input.on('pointerdown', (pointer) => {
      console.log(pointer);
      if (this.currentUnit === null) {
        return;
      }
      if (this.currentUnit.body.velocity.x === 0 && this.currentUnit.body.velocity.y === 0) {
        console.log("works");
        //let destination = this.physics.add.sprite(pointer.x, pointer.y, '');
        //v = d/t => t = d/v
        //calculating the distance between the current unit selected and the pointer
        let distance = Phaser.Math.Distance.Between(this.currentUnit.body.x, this.currentUnit.body.y, pointer.worldX, pointer.worldY);
        let velocity = 0.3;
        let time = distance / velocity;
        this.physics.moveTo(this.currentUnit, pointer.worldX, pointer.worldY, 1000, time);
        console.log(time);
        setTimeout(() => {
          this.currentUnit.body.setVelocity(0, 0);
          this.currentUnit.clearTint();
          this.currentUnit = null;
          //THERE WAS SOMETHING TO SOLVE HERE with the overlap or SOMETHING^^^^^^^^^^^^^????????????????????????????????????????????????????????????????????????????????????????????????

        }, time)
        // this.scene.physics.add.overlap(this.scene.player, destination, function (player, destination){
        //   //player.setVelocity(0,0);
        //   player.stop();
        //   //this.scene.playerClicked = false;
        //
        // }, null, this)
      }

    });

    // set bounds so the camera won't go outside the game world and sets the
    //limit of the world to scroll to
    this.cameras.main.setBounds(0, 0, this.mapLimit, this.mapLimit);

    this.cameras.main.startFollow(this.input.activePointer);

    //the text displaying the wood
    this.woodText = this.add.text(20, 20, `Wood: ${this.wood}`,{fontSize: '20px', fill: '#000'});
    this.woodText.setScrollFactor(0);

    this.units = this.physics.add.group({});

    //managing the overlap between the units and the trees so the player collects wood
    this.physics.add.overlap(this.units, this.trees, this.collectWood, null, this);

    // make the camera follow the pointer when it is moving
    // this.input.on('pointermove', function(pointer) {
    //
    //   //this.physics.moveToObject(this.player, pointer, 240);
    // }, this);
    //this.cameras.main.startFollow(pointer);
    //this.cameras.main.scrollX = pointer.x;
    //Setting up he collision between the game objects
    // this.physics.add.collider(this.player, this.platforms);
    // this.physics.add.collider(this.carrots, this.platforms);
    // this.physics.add.collider(this.player, this.spikes, this.hitSpikes, null, this);

    //collecting the carrots
    //this.physics.add.overlap(this.player, this.carrots, this.collectCarrots, null, this)

  }


  // update()
  //
  //
  //

  update() {
    for (let i = 0; i < this.unitArray.length; i++) {
      let element = this.unitArray[i];

    }
  }

  // collectWood()
  //
  //Called when a unit overlaps a tree. When it does,  it takes a certain amount
  //of time before the wood is collected and the tree disappears.

  collectWood(unit,tree){
    //tree.disableBody(false, false);

    if(unit.body.velocity.x === 0 && unit.body.velocity.x === 0){
    tree.resourceAmt -= unit.scene.CHOP_AMT;
    console.log("chop chop");
  }
    if(tree.resourceAmt <= 0) {
      console.log("collecting wood");
      unit.scene.wood += unit.scene.WOOD_COLLECT;
      unit.scene.woodText.setText(`Wood: ${unit.scene.wood}`);
      tree.destroy();

    }

  }

}
