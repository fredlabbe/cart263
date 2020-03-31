// Class Unit
//
//The parent class for units in the RTS game
class Worker extends Phaser.Physics.Arcade.Sprite{

  // scene = null;
  //  hp = 100;

   constructor(scene,x,y,texture) {
     super(scene,x,y,texture);
     scene.add.existing(this);
     scene.physics.world.enableBody(this);
     console.log("constructor works");
     this.isClicked = false;
     this.health = 100;
     this.scene = scene;
     this.setInteractive();



     this.on('pointerdown', (pointer) =>  {
       console.log("clicking on the unit works");

         this.setTint(0xc1c1c1);
         this.isClicked = true;
         this.scene.currentUnit = this;


     });
     // this.x = x;
     // this.y = y;
     // this.size = size;
     // this.image = texture;
     //Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);
     //this.setOrigin(0.5, 0.5);
   }
   create(){
     console.log("works");
     //not working
     this.scene.add.sprite(this.x, this.y, this.texture).setInteractive();
   }

}
