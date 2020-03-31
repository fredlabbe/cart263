//
//
//The game menu

class Menu extends Phaser.Scene {

  constructor() {
    super('Menu');
  }
//nothing there
  preload() {

  }
  //creating the menu with an image and when the user clicks, switches scenes
  create() {
    this.add.sprite(400, 300, '');
    //when the mouse is clicked, the game starts
    this.input.on('pointerdown', () => this.scene.start('Game'));
  }
}
