//Class Game
//The game scene where everything happens.
//


//Questions for pippin:
//1. The math for time
//2. adapting the code so can create unit via unit class because of playerClicked must be property of each carrots
//3. moveToObject



class Game extends Phaser.Scene {

  constructor() {
    super('Game');
  }
  //init(data)
  //initializing all the data of this scene
  init(data) {
  this.base;
  this.player;
  this.playerClicked = false;
  this.unitArray = [];

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
        let unit = new Worker(this.scene,250,250,'carrot');
        //unit.create();//NOT A FUNCTION???????????????????????????????????????????????????????
        //this.add.existing(unit);
        //let unit = this.scene.add.sprite(400, 400, 'carrot').setInteractive();
        this.scene.unitArray.push(unit);

    });
    //this.player = this.physics.add.sprite(300, 300, 'carrot').setInteractive();
    for(let i = 0; i < this.unitArray.length; i++){
      let element = this.unitArray[i];
      element.on('pointerdown', function (pointer) {

          this.setTint(0xc1c1c1);
          this.scene.playerClicked = true;


      });
    }
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


    //creating the cursors
    //this.cursors = this.input.keyboard.createCursorKeys();
    //the camera
    // set bounds so the camera won't go outside the game world and sets the
    //limit of the world to scroll to
    //this.cameras.main.setBounds(0, 0, 8000, 600);

    // make the camera follow the player
    //this.cameras.main.startFollow(this.player);
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
    // if(this.playerClicked === true){
    //   console.log("works");
    //   this.physics.moveToObject(this.player, pointer, 240);
    //
    // }

  }
  //
  //
  //
  buildingClicked(){
    console.log("unit");
  }


}
