//import { Scene } from 'Phaser'

class Menu extends Phaser.Scene{

  constructor(){
    super('Menu');
  }

  preload(){

  }

  create(){
    this.input.on('pointerdown', () => this.scene.start('Game')); 
  }
}
//export default Menu
