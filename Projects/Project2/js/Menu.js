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
    //when the mouse is clicked, the game starts
    this.input.on('pointerdown', () => this.scene.start('Game')); 
  }
}
