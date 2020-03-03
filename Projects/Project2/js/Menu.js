//
//
//The game menu

class Menu extends Phaser.Scene{

  constructor(){
    super('Menu');
  }

  preload(){

  }

  create(){
    this.add.sprite(400,300,'menu');
    //when the mouse is clicked, the game starts
    this.input.on('pointerdown', () => this.scene.start('Game'));
  }
}
