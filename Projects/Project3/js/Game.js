//Class Game
//The game scene where everything happens.
//


//Questions for pippin:
//2. Speed not okay for elf, something is wrong with the calculation of time speed and moveToObject
//5. can't stop the elf when it has killed
//6.problems with stopping the sounds

// function(n, start1, stop1, start2, stop2) {
//  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
///}

//IDEAS FOR DETECTING OVERLAPPING:
//https://jsfiddle.net/mhu42s7n/1/
//https://rexrainbow.github.io/phaser3-rex-notes/docs/site/arcade-world/
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
    //the bounds
    this.mapLimit = 2000;
    this.boundX = 1195;
    this.boundY = 900;
    //the base
    this.base;
    this.baseSize = 90;
    //base's x position
    this.baseX = 200;
    //base's y position
    this.baseY = 200;
    //the groups
    this.units;
    this.elves;
    this.elfDetections;
    this.trees;
    //the speeds of the characters
    this.ELF_SPEED = 0.05;
    this.UNIT_SPEED = 0.1;
    //the total number of elves in the game
    this.numberOfElves = 15;
    //the x and y values for the area in which the elves will be clustered
    this.elvesClusterY = 600;
    this.elvesClusterX = this.elvesClusterY + 200;
    //the time it takes for a unit to appear in ms
    this.UNIT_TIME = 2000;
    //the total number of trees in the map
    this.numberOfTrees = 55;
    //the array of units
    this.unitArray = [];
    //the cost for creating a unit
    this.UNIT_COST = 10;
    //the wood the player has. It is acquired by making a worker cut trees
    this.wood = 30;
    //the amount of time it take before collecting wood
    this.WOOD_TIME = 2000;
    //the amount of wood collected after the set collecting time
    this.WOOD_COLLECT = 10;
    //how many woods are chopping for every frame from the total ressourceAmt of the tree
    this.CHOP_AMT = 0.5;
    //the text displaying the wood
    this.woodText;

    this.isCurrentUnit = false;
    this.isOverlappingTree;

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
  // An empty genereic preload function

  preload() {
    //see the preload class

  }

  // create()
  //
  // Sets up the game

  create() {
    //setting the bounds of the world for the characters
    this.physics.world.setBounds(0, 0, this.boundX, this.boundY);

    //playing the music not too loud and looping it
    //this.musicSFX.play();
    this.musicSFX.volume = 0.1;
    this.musicSFX.loop = true;
    //lowering the volumes of certain sounds
    this.chopSFX.volume = 0.3;
    this.fightSFX.volume = 0.3;
    //setting up a background large enough
    this.background = this.add.sprite(0, 0, 'map');
    this.background.setInteractive();
    this.background.setScale(2);

    // set bounds so the camera won't go outside the game world and sets the
    //limit of the world to scroll to
    this.cameras.main.setBounds(0, 0, this.mapLimit, this.mapLimit);

    // make the camera follow the pointer when it is moving
    this.cameras.main.startFollow(this.input.activePointer);

    //creating the base
    this.base = this.add.sprite(this.baseX, this.baseY, 'castle').setInteractive().setScale(0.2);
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
          unit.setCollideWorldBounds(true);

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
      let randX = this.boundX * Math.random();
      let randY = this.boundY * Math.random();
      //if the random coordinates fall on the base, put elsewhere
      if(randX < this.baseX + this.baseSize && randY < this.baseY + this.baseSize){
        randX = 800 * Math.random();
        randY = 100 * Math.random();
      }
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
      //getting random values for x and y
      let randX = 200 * Math.random() + this.elvesClusterX;
      let randY = 200 * Math.random() + this.elvesClusterY;
      //creating the elf
      let elf = new Elf(this, randX, randY, 'elf');
      //adding this elf to the group of elves
      this.elves.add(elf);
      //adding this elf's detection box to the group of boxes
      this.elfDetections.add(elf.detectionBox);
      //constraining the elf to the limits of the map
      elf.setCollideWorldBounds(true);
    }
    //the overlaps of detection boxes and units and the one of elves and units
    this.physics.add.overlap(this.units, this.elfDetections, this.chaseUnits, null, this);
    this.physics.add.overlap(this.units, this.elves, this.fight, null, this);


    //When the player clicked on a unit and then somewhere else, the unit moves there
    this.background.on('pointerdown', (pointer) => {
      console.log(pointer.x,pointer.y);
      this.moveUnit(pointer);
    });
    //as long as a unit is clicked
    if (this.currentUnit = !null) {
      //going through each tree and when one is clicked, moves the unit there
      this.trees.children.each(function(tree) {
        tree.on('pointerdown', (pointer) => {
          this.moveUnit(pointer);
        });
      }, this);
      //going through each elf and when one is clicked, moves the unit there
      this.elves.children.each(function(elf) {
        elf.on('pointerdown', (pointer) => {
          this.moveUnit(pointer);
        });
      }, this);
    }


    //managing the overlap between the units and the trees so the player collects wood
    //this.physics.add.overlap(this.units, this.trees, this.collectWood, null, this);
    this.isOverlappingTree = this.physics.world.overlap(this.units, this.trees);

    //the text displaying the wood
    this.woodText = this.add.text(20, 20, `Wood: ${this.wood}`, {
      fontFamily: 'Garamond Bold',
      fontSize: '30px',
      fill: '#d4af37' //goldish color
    });
    //make the text follow the camera for some minimal UI
    this.woodText.setScrollFactor(0);
  }


  // update()
  //
  //updates the elves and the detection boxes

  update() {
    for (let i = 0; i < this.unitArray.length; i++) {
      let element = this.unitArray[i];

    }
    //https://www.html5gamedevs.com/topic/36580-best-way-to-apply-a-method-to-all-elements-in-a-group/
    this.elves.children.each(function(enemy) {
      enemy.update();
    }, this);

    console.log(this.isOverlappingTree);
    // this.units.children.each(function(ally) {
    //   ally.update();
    // }, this);

  }

  // collectWood()
  //
  //Called when a unit overlaps a tree. When it does,  it takes a certain amount
  //of time before the wood is collected and the tree disappears.

  // collectWood(unit, tree) {
  //
  //   if (unit.body.velocity.x === 0 && unit.body.velocity.y === 0) {
  //     //this.currentTree = tree;
  //     tree.resourceAmt -= unit.scene.CHOP_AMT;
  //     this.chopSFX.play();
  //     console.log("chop chop");
  //   }
  //   if (tree.resourceAmt <= 0) {
  //     unit.scene.wood += unit.scene.WOOD_COLLECT;
  //     unit.scene.woodText.setText(`Wood: ${unit.scene.wood}`);
  //     tree.destroy();
  //     this.chopSFX.pause();
  //     //this.currentTree = null;
  //   }
  //   //checking if the unit is killed while chopping wood
  //   if (unit.health <= 0) {
  //     console.log("dead");
  //     //pausing the chopping sound
  //     this.chopSFX.pause();
  //   }
  //
  // }

  // getTime(object, destination)
  //
  //v = d/t => t = d/v
  //calculating the distance between the current object selected and the destination
  //according to a given velocity and returns time

  getTime(object, destination, velocity) {
    let distance = Phaser.Math.Distance.Between(object.body.x, object.body.y, this.cameras.main.getWorldPoint(destination.x, destination.y).x, this.cameras.main.getWorldPoint(destination.x, destination.y).y);
    //console.log(object.body.x, object.body.y, destination.worldX, destination.worldY);
    let time = distance / velocity;
    //console.log("getTime: " + time, distance, velocity);
    return time;
  }

  // chaseUnits(unit,box)
  //
  // moves the elf according to the unit when it has been in the detection box

  chaseUnits(unit, box) {
    //console.log(unit, box);
    if (box.elf.health > 0 && unit.health > 0) {
      //reusing the code because of worldX and worldY not working for an object instead of a pointer
      let distance = Phaser.Math.Distance.Between(box.elf.body.x, box.elf.body.y, unit.x, unit.y);
      let time = distance / unit.scene.ELF_SPEED;
      //console.log("time inside chaseUnits: " + time);

      let t = this.getTime(box.elf, unit, unit.scene.ELF_SPEED);
      unit.scene.physics.moveToObject(box.elf, unit, unit.scene.ELF_SPEED, t);
      //console.log(unit.scene.ELF_SPEED, t);
      //console.log("time inside getTime: " + t);
    }
    if (unit.health < 0) {
      box.elf.setVelocity(0, 0);
    }
  }

  //fight(unit,elf)
  //
  //Gets called when a unit and elf overlap. Substracts the damage to the health
  //of the respecting character.

  fight(unit, elf) {
    //playing the fighting sound
    this.fightSFX.play();
    //substracting the health of the unit or the elf depending on the amount of
    //damage they each do
    unit.health -= elf.damage;
    elf.health -= unit.damage;
    //managing the elf or the unit when it is dying
    if (unit.health <= 0) {
      //stopping the elf
      elf.body.setVelocity(0, 0);
      if (this.currentUnit !== null) {
        this.currentUnit = null
        this.isCurrentUnit = false;
      }
      //removing this unit from its group and getting destroying it
      this.units.remove(unit);
      unit.destroy();
      //pausing the sound in case it was already playing
      this.friendlyScreamSFX.pause();
      //playing the sound
      this.friendlyScreamSFX.play();
      //stopping the fight sound because the unit is dead
      this.fightSFX.pause();
    }
    if (elf.health <= 0) {
      //resetting the elf's body
      elf.body.reset();
      //destroying the detection box and the elf
      elf.detectionBox.destroy();
      elf.destroy();
      //pausing in case the sound was already playing and playing the elf's dying sound
      this.elfScreamSFX.pause();
      this.elfScreamSFX.play();
      //stopping the fight sound because the elf is dead
      this.fightSFX.pause();
    }
  }

  //moveUnit(pointer)
  //
  //called when a unit is already selected. Gets the time of the displacement
  //of the unit to the destination and moves it there. Once it is arrived,
  //it deselects the unit, stops it and puts its color back to normal

  moveUnit(pointer) {
    //console.log(pointer);
    if (this.currentUnit === null) { //supposed to solve the error saying that cannot read property velocity of undefined of 3 lines below!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      console.log("in null");
      return;
    }
    if (this.isCurrentUnit === true) {
      if (this.currentUnit.body.velocity.x === 0 && this.currentUnit.body.velocity.y === 0) {
        //getting the time for the displacement of the unit and for the tiemout
        let t = this.getTime(this.currentUnit, pointer, this.UNIT_SPEED);
        //moving the object at the given time and speed
        this.physics.moveTo(this.currentUnit, pointer.worldX, pointer.worldY, this.scene.UNIT_SPEED, t); //need to solve the speed here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log(this.UNIT_SPEED, t)
        //when the unit has arrived
        setTimeout(() => {
          if (this.currentUnit === null) {
            return;
          }
          this.isCurrentUnit = false;
          this.currentUnit.body.setVelocity(0, 0);
          this.currentUnit.clearTint();
          this.currentUnit = null;
          //THERE WAS SOMETHING TO SOLVE HERE with the overlap or SOMETHING^^^^^^^^^^^^^????????????????????????????????????????????????????????????????????????????????????????????????
        }, t)
      }
    }
  }
}
