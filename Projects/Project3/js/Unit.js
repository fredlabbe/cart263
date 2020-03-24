// Class Unit
//
//The parent class for units in the RTS game
class Unit extends Phaser.GameObjects.Sprite{

  // scene = null;
  //  hp = 100;

   constructor(scene,x,y,texture) {
     super(scene,x,y,texture);
     scene.add.existing(this);
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
     this.scene.add.sprite(this.x, this.y, this.image).setInteractive();
   }
}
