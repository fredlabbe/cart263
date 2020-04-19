//Class Game
//The game scene where everything happens.
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
    //the background image empty for now
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
    //the constant for the area the elves randomly appear in
    this.ELVES_AREA = 200;
    //the x and y values for the area in which the elves will be clustered
    this.elvesClusterY = 600;
    this.elvesClusterX = this.elvesClusterY + this.ELVES_AREA;
    //the time it takes for a unit to appear in ms
    this.UNIT_TIME = 2000;
    //the total number of trees in the map
    this.numberOfTrees = 55;
    //the area where trees fall in when they previously have fallen on the base
    this.TREE_AREA_X = 800;
    this.TREE_AREA_Y = 100;
    //the cost for creating a unit
    this.UNIT_COST = 10;
    //the number of unit created
    this.numberOfUnits = 0;
    //the wood the player has. It is acquired by making a worker cut trees
    this.wood = 30;
    //the text displaying the wood
    this.woodText;
    //boolean to know if it is the current unit
    this.isCurrentUnit = false;

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
    this.chopSFX.loop = true;
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
      //if there is enough wood
      if (this.scene.wood >= 10) {
        //substract the cost for 1 unit the the amount of wood the player has
        this.scene.wood -= this.scene.UNIT_COST;
        //updating the text
        this.scene.woodText.setText(`Wood: ${this.scene.wood}`);
        //darkening the base while it is creating the unit
        this.setTint(0xc1c1c1);
        //starting a timeout for the unit creation so it doesn't appear right away
        setTimeout(() => {
          //once the timer has reached the time for creating a unit:
          //setting back to normal the tint of the base
          this.scene.base.setTint(0xffffff);
          //creating the unit
          let unit = new Worker(this.scene, 250, 250, 'knight');
          //increasing by 1 the number of units created
          this.scene.numberOfUnits++;
          //adding this unit to the group of units
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
      if (randX < this.baseX + this.baseSize && randY < this.baseY + this.baseSize) {
        randX = this.TREE_AREA_X * Math.random();
        randY = this.TREE_AREA_Y * Math.random();
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
      let randX = this.ELVES_AREA * Math.random() + this.elvesClusterX;
      let randY = this.ELVES_AREA * Math.random() + this.elvesClusterY;
      //creating the elf
      let elf = new Elf(this, randX, randY, 'elf');
      //adding this elf to the group of elves
      this.elves.add(elf);
      //adding this elf's detection box to the group of boxes
      this.elfDetections.add(elf.detectionBox);
      //constraining the elf to the limits of the map
      elf.setCollideWorldBounds(true);
    }
    // the overlap of elves and units
    this.physics.add.overlap(this.units, this.elves, this.fight, null, this);


    //When the player clicked on a unit and then somewhere else, the unit moves there
    this.background.on('pointerdown', (pointer) => {
      this.moveUnit(pointer);
    });
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
    //https://www.html5gamedevs.com/topic/36580-best-way-to-apply-a-method-to-all-elements-in-a-group/
    this.elves.children.each(function(enemy) {
      enemy.update();
    }, this);

    this.units.children.each(function(ally) {
      ally.update();
    }, this);
    //if there are no more elves, game over
    if (this.numberOfElves <= 0) {
      this.scene.start('GameOver');
      this.chopSFX.pause();
    }
    //if there are no more units and no more wood to produce more, game over
    if (this.numberOfUnits <= 0 && this.wood < 0) {
      this.scene.start('GameOver');
      this.chopSFX.pause();
    }
  }

  // getTime(object, destination)
  //
  //v = d/t => t = d/v
  //calculating the distance between the current object selected and the destination
  //according to a given velocity and returns time

  getTime(object, destination, velocity) {
    let distance = Phaser.Math.Distance.Between(object.body.x, object.body.y, this.cameras.main.getWorldPoint(destination.x, destination.y).x, this.cameras.main.getWorldPoint(destination.x, destination.y).y);
    let time = distance / velocity;
    return time;
  }

  //fight(unit,elf)
  //
  //Gets called when a unit and elf overlap. Substracts the damage to the health
  //of the respecting character.

  fight(unit, elf) {
    //if the unit doesn't move, plays the sound
    if (unit.body.velocity.x === 0 && unit.body.velocity.y === 0 && !unit.scene.chopSFX.isPlaying) {
      //playing the fighting sound only when the unit stops moving, because it
      //cannot fight while fleeing or running
      this.fightSFX.play();
    }
    //substracting the health of the unit or the elf depending on the amount of
    //damage they each do
    unit.health -= elf.damage;
    elf.health -= unit.damage;
    //managing the elf or the unit when it is dying
    if (unit.health <= 0) {
      //stopping the elf
      elf.body.setVelocity(0, 0);
      //if there is a unit seleced, set it to no unit selected
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
      //decreasing the number of unit because this one is dead
      this.numberOfUnits--;
    }
    //if the elf's health is less than 0
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
      //decreasing the number of elves
      this.numberOfElves--;
    }
  }

  //moveUnit(pointer)
  //
  //called when a unit is already selected. Gets the time of the displacement
  //of the unit to the destination and moves it there. Once it is arrived,
  //it deselects the unit, stops it and puts its color back to normal

  moveUnit(pointer) {
    //in case no unit was selected
    if (this.currentUnit === null) {
      return;
    }
    //if there is a current unit
    if (this.isCurrentUnit === true) {
      //as long as it is not moving
      if (this.currentUnit.body.velocity.x === 0 && this.currentUnit.body.velocity.y === 0) {
        //getting the time for the displacement of the unit and for the timemout
        let t = this.getTime(this.currentUnit, pointer, this.UNIT_SPEED);
        //moving the object at the given time and speed
        this.physics.moveTo(this.currentUnit, pointer.worldX, pointer.worldY, this.scene.UNIT_SPEED, t);
        //when the unit has arrived
        setTimeout(() => {
          //in case the unit was kiled in between
          if (this.currentUnit === null) {
            return;
          }
          //setting the current unit to false because it has arrived
          this.isCurrentUnit = false;
          //stopping it from moving
          this.currentUnit.body.setVelocity(0, 0);
          //setting back the tint to the original one
          this.currentUnit.clearTint();
          //unselecting this unit
          this.currentUnit = null;
        }, t)
      }
    }
  }
}
