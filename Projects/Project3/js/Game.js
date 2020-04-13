//Class Game
//The game scene where everything happens.
//


//Questions for pippin:
//1. getTime no work for elf probably because of worldX worldY
//2. Speed not okay for elf, something is wrong with the calculation of time speed and moveToObject
//3. How to limit characters to edge of map
//4. problem when a unit is clicked and try to click another one, the previous one starts to go away
//5. can't stop the elf when it has killed

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
    this.elves;
    this.ELF_SPEED = 0.075;
    this.UNIT_SPEED = 0.1;
    this.numberOfElves = 5;
    this.elvesClusterY = 600;
    this.elvesClusterX = this.elvesClusterY +200;
    this.elfDetections;
    this.UNIT_TIME = 2000;
    this.trees;
    this.numberOfTrees = 125;
    this.unitArray = [];
    this.UNIT_COST = 10;
    //the wood the player has. It is acquired by making a worker cut trees
    this.wood = 30;
    //the amount of time it take before collecting wood
    this.WOOD_TIME = 2000;
    //the amount of wood collected after the set collecting time
    this.WOOD_COLLECT = 10;
    this.CHOP_AMT = 0.5;
    //the text displaying the wood
    this.woodText;

    //the total amount of coin the player has
    this.coin = 0;

    // The screaming in pain sound for when friendly unit dies
    this.friendlyScreamSFX = new Audio("assets/sounds/scream.mp3");
    //the sound of an elf dying
    this.elfScreamSFX = new Audio("assets/sounds/die.wav");
    //the wood chopping sound
    this.chopSFX = new Audio("assets/sounds/chop.wav");
    //sound of swords clashing when units fight
    this.fightSFX = new Audio("assets/sounds/fight.mp3");
    //the music
    this.musicSFX = new Audio("assets/sounds/celticMusic.mp3");


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
    //playing the music not too loud
    this.musicSFX.play();
    this.musicSFX.volume = 0.1;
    this.musicSFX.loop = true;
    //lowering the volumes of certain sounds
    this.chopSFX.volume = 0.3;
    this.fightSFX.volume = 0.3;
    //setting up a background
    this.background = this.add.sprite(0, 0, 'map');
    this.background.setScale(2);

    // set bounds so the camera won't go outside the game world and sets the
    //limit of the world to scroll to
    this.cameras.main.setBounds(0, 0, this.mapLimit, this.mapLimit);

    // make the camera follow the pointer when it is moving
    this.cameras.main.startFollow(this.input.activePointer);

    //the text displaying the wood
    this.woodText = this.add.text(20, 20, `Wood: ${this.wood}`, {
      fontFamily: 'Garamont',
      fontSize: '30px',
      fill: '#d4af37'
    });
    this.woodText.setScrollFactor(0);

    //creating the base
    this.base = this.add.sprite(200, 200, 'castle').setInteractive().setScale(0.2);
    this.base.on('pointerdown', function(pointer) {

      if (this.scene.wood >= 10) {
        this.scene.wood -= this.scene.UNIT_COST;
        this.scene.woodText.setText(`Wood: ${this.scene.wood}`);
        console.log("works in if");
        this.setTint(0xc1c1c1);
        setTimeout(() => {
          this.scene.base.setTint(0xffffff);
          let unit = new Worker(this.scene, 250, 250, 'knight');
          this.scene.unitArray.push(unit);
          this.scene.units.add(unit);
          //constraining the elf to the limits of the map
          //unit.setCollideWorldBounds(true);

        }, this.UNIT_TIME);
      }

    });
    //grouping the units together
    this.units = this.physics.add.group({});

    //grouping the trees together
    this.trees = this.physics.add.group({});
    //creating and distributing randomly a bunch of trees on the map and adding
    //them to the group
    for (let i = 0; i < this.numberOfTrees; i++) {
      let randX = this.mapLimit * Math.random();
      let randY = this.mapLimit * Math.random();
      // put if statement saying if it falls on the base, put elsewhere!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      let tree = new Tree(this, randX, randY, 'tree');
      this.trees.add(tree);
    }
    //grouping the detection boxes of the elves together
    this.elfDetections = this.physics.add.group({});
    //grouping the elves together
    this.elves = this.physics.add.group({});
    //displaying the elves randomly but together in a definite area and adding
    //them to the elves group along with the detection boxes
    for (let i = 0; i < this.numberOfElves; i++) {
      let randX = 200 * Math.random() + this.elvesClusterX;
      let randY = 200 * Math.random() + this.elvesClusterY;
      let elf = new Elf(this, randX, randY, 'elf');
      this.elves.add(elf);
      this.elfDetections.add(elf.detectionBox);
      //constraining the elf to the limits of the map
      //elf.setCollideWorldBounds(true);
    }
    //the overlaps of detection boxes and units and the one of elves and units
    this.physics.add.overlap(this.units, this.elfDetections, this.chaseUnits, null, this);
    this.physics.add.overlap(this.units, this.elves, this.fight, null, this);


    //When the player clicked on a unit and then somewhere else, genereate an
    //invisible object at the point where the user clicks where the unit will
    //move to
    this.input.on('pointerdown', (pointer) => {
      //console.log(pointer);
      if (this.currentUnit === null) { //supposed to solve the error saying that cannot read property velocity of undefined of 3 lines below
        return;
      }
      if (this.currentUnit.body.velocity.x === 0 && this.currentUnit.body.velocity.y === 0) {
        let t = this.getTime(this.currentUnit, pointer, this.UNIT_SPEED);
        this.physics.moveTo(this.currentUnit, pointer.worldX, pointer.worldY, this.scene.UNIT_SPEED, t); //need to solve the speed here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log(this.UNIT_SPEED,t)
        setTimeout(() => {
          this.currentUnit.body.setVelocity(0, 0);
          this.currentUnit.clearTint();
          this.currentUnit = null;
          //THERE WAS SOMETHING TO SOLVE HERE with the overlap or SOMETHING^^^^^^^^^^^^^????????????????????????????????????????????????????????????????????????????????????????????????

        }, t)
        // this.scene.physics.add.overlap(this.scene.player, destination, function (player, destination){
        //   //player.setVelocity(0,0);
        //   player.stop();
        //   //this.scene.playerClicked = false;
        //
        // }, null, this)
      }

    });

    //managing the overlap between the units and the trees so the player collects wood
    this.physics.add.overlap(this.units, this.trees, this.collectWood, null, this);



    //Setting up he collision between the game objects
    // this.physics.add.collider(this.player, this.platforms);
    // this.physics.add.collider(this.carrots, this.platforms);
    // this.physics.add.collider(this.player, this.spikes, this.hitSpikes, null, this);

  }


  // update()
  //
  //
  //

  update() {
    for (let i = 0; i < this.unitArray.length; i++) {
      let element = this.unitArray[i];

    }
    //https://www.html5gamedevs.com/topic/36580-best-way-to-apply-a-method-to-all-elements-in-a-group/
    this.elves.children.each(function(enemy) {
      enemy.update();
    }, this);
  }

  // getTime(object, destination)
  //
  //v = d/t => t = d/v
  //calculating the distance between the current object selected and the destination
  //according to a given velocity

  getTime(object, destination, velocity) {
    let distance = Phaser.Math.Distance.Between(object.body.x, object.body.y, destination.worldX, destination.worldY);
    let time = distance / velocity;
    console.log("getTime: " + time, distance, velocity);
    return time;
  }

  // collectWood()
  //
  //Called when a unit overlaps a tree. When it does,  it takes a certain amount
  //of time before the wood is collected and the tree disappears.

  collectWood(unit, tree) {
    //tree.disableBody(false, false);

    if (unit.body.velocity.x === 0 && unit.body.velocity.x === 0) {
      tree.resourceAmt -= unit.scene.CHOP_AMT;
      console.log("chop chop");
      this.chopSFX.play();
    }
    if (tree.resourceAmt <= 0) {
      console.log("collecting wood");
      unit.scene.wood += unit.scene.WOOD_COLLECT;
      unit.scene.woodText.setText(`Wood: ${unit.scene.wood}`);
      tree.destroy();
      this.chopSFX.pause();
    }
    //checking if the unit is killed while chopping wood
    if(unit.health <= 0){
      console.log("dead");
      //pausing the chopping sound
      this.chopSFX.pause();
    }

  }

  // chaseUnits(unit,box)
  //
  // moves the elf according to the unit when it has been in the detection box

  chaseUnits(unit, box) {
    //console.log(unit, box);
    if (box.elf.health > 0 && unit.health > 0) {
      let distance = Phaser.Math.Distance.Between(box.elf.body.x, box.elf.body.y, unit.x, unit.y);
      let time = distance / unit.scene.ELF_SPEED;
      console.log("time inside chaseUnits: " + time);

      let t = this.getTime(box.elf, unit, unit.scene.ELF_SPEED);
      unit.scene.physics.moveToObject(box.elf, unit, unit.scene.ELF_SPEED, time);
      console.log(unit.scene.ELF_SPEED, t);
      console.log("time inside getTime: " + t);
    }
    //if(unit.health)
  }

  //fight(unit,elf)
  //
  //Gets called when a unit and elf overlap. Substracts

  fight(unit, elf) {
    //playing the fighting sound
    this.fightSFX.play();
    //substracting the health of the unit or the elf depending on the amount of
    //damage they each do
    unit.health -= elf.damage;
    elf.health -= unit.damage;
    //managing the elf or the unit when it is dying
    if (unit.health <= 0) {
      elf.body.setVelocity(0,0);
      this.units.remove(unit);
      unit.destroy();
      this.friendlyScreamSFX.pause();
      this.friendlyScreamSFX.play();
      this.fightSFX.pause();
    }
    if (elf.health <= 0) {
      elf.body.reset();
      elf.detectionBox.destroy();
      elf.destroy();
      this.elfScreamSFX.pause();
      this.elfScreamSFX.play();
    }
  }

}
