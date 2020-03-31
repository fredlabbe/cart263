// Class Unit
//
//The parent class for units in the RTS game
class Worker extends Phaser.GameObjects.Sprite{

  // scene = null;
  //  hp = 100;

   constructor(scene,x,y,texture) {
     super(scene,x,y,texture);
     scene.add.existing(this);
     console.log("constructor works");
     this.isClicked = false;
     this.health = 100;
     this.setInteractive();

     this.scene.input.on('pointerdown', function(pointer){
       console.log("works before if");
       if(this.isClicked === true && this.body.velocity.x === 0 && this.body.velocity.y === 0){
         console.log("works");
         let destination = this.scene.physics.add.sprite(pointer.x, pointer.y, '');
         //v = d/t => t = d/v
         let distance = Phaser.Math.Distance.Between(this.body.x, this.body.y, pointer.x, pointer.y);
         let velocity = 0.3;
         let time = distance/velocity; //(this.scene.player.body.velocity);
         this.scene.physics.moveToObject(this, pointer, 1000, time);
         console.log(time);
         setTimeout(() => {
           this.body.setVelocity(0,0);
           this.body.clearTint();
           this.isClicked = false;
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
