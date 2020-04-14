//Class Menu
//
//The narration screen and when clicked, goes to game

class Narrative extends Phaser.Scene {

  constructor() {
    super('Narrative');
  }
  //nothing there
  preload() {

  }
  //creating the screen with an image and when the user clicks, switches scenes
  create() {
    this.add.sprite(420, 300, 'narrative');
    //when the mouse is clicked, the game starts
    this.input.on('pointerdown', () => this.scene.start('Game'));
  }
}
