//Class Menu
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
    this.add.sprite(478, 300, 'menu');
    //when the mouse is clicked, the narrative screen appears
    this.input.on('pointerdown', () => this.scene.start('Narrative'));
  }
}
