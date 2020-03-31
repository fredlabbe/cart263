//Class Game
//The game scene where everything happens.
//


//Questions for pippin:
//1.
//2.
//3. 



class Game extends Phaser.Scene {

  constructor() {
    super('Game');
    //the current unit selected so null now because no unit is selected
    this.currentUnit = null;
  }
  //init(data)
  //initializing all the data of this scene
  init(data) {
    this.base;
    this.unitArray = [];
    //the wood the player has. It is acquired by making a worker cut trees
    this.wood = 0;
    //the total amount of coin the player has
    this.coin = 0;


  }

  // preload()
  //
  // Description of preload

  preload() {

  }


  // create()
  //
  // Sets up the game

  create() {

    //game.input.mouse.capture = true;
    this.base = this.add.sprite(200, 200, 'castle').setInteractive().setScale(0.2);
    this.base.on('pointerdown', function(pointer) {

      this.setTint(0xc1c1c1);
      let unit = new Worker(this.scene, 250, 250, 'carrot');
      //unit.create();//NOT A FUNCTION???????????????????????????????????????????????????????
      //this.add.existing(unit);
      //let unit = this.scene.add.sprite(400, 400, 'carrot').setInteractive();
      this.scene.unitArray.push(unit);

    });
    //this.player = this.physics.add.sprite(300, 300, 'carrot').setInteractive();

    //When the player clicked on a unit and then somewhere else, genereate an
    //invisible object at the point where the user clicks where the unit will
    //move to

    this.input.on('pointerdown', (pointer) => {
      console.log(this.currentUnit);
      if (this.currentUnit === null) {
        return;
      }
      if (this.currentUnit.body.velocity.x === 0 && this.currentUnit.body.velocity.y === 0) {
        console.log("works");
        //let destination = this.physics.add.sprite(pointer.x, pointer.y, '');
        //v = d/t => t = d/v
        //calculating the distance between the current unit selected and the pointer
        let distance = Phaser.Math.Distance.Between(this.currentUnit.body.x, this.currentUnit.body.y, pointer.x, pointer.y);
        let velocity = 0.3;
        let time = distance / velocity; //(this.scene.player.body.velocity);
        this.physics.moveToObject(this.currentUnit, pointer, 1000, time); //is it moving to destination or to the pointer?????????????????????????????
        console.log(time);
        setTimeout(() => {
          this.currentUnit.body.setVelocity(0, 0);
          this.currentUnit.clearTint();
          //this.isClicked = false;
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


    // this.player.on('pointerdown', function (pointer) {
    //
    //     this.setTint(0xc1c1c1);
    //     this.scene.playerClicked = true;
    //
    //
    // });

    //setting up a background that follows the player
    //this.background = this.add.sprite(400, 300, 'sky');
    //this.background.setScrollFactor(0);




    // set bounds so the camera won't go outside the game world and sets the
    //limit of the world to scroll to
    this.cameras.main.setBounds(0, 0, 2000, 2000);

    // make the camera follow the pointer when it is moving
    this.input.on('pointermove', function(pointer) {
      this.cameras.main.startFollow(pointer);
      //this.physics.moveToObject(this.player, pointer, 240);
    }, this);
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
  //keeping track of the user input and if the player falls off the game space (restarts).
  //

  update() {
    for (let i = 0; i < this.unitArray.length; i++) {
      let element = this.unitArray[i];
    }
  }

}
