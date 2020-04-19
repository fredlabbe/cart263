//Class GameOver
//
//The game over menu, when clicked, switches back to the menu

class GameOver extends Phaser.Scene {

  constructor() {
    super('GameOver');
  }
  //nothing there
  preload() {

  }
  //creating the menu with an image and when the user clicks, switches scenes
  create() {
    //the text displaying the Game over
    this.woodText = this.add.text(200, 200, `Game Over\nClick to restart`, {
      fontFamily: 'Garamond Bold',
      fontSize: '70px',
      fill: '#d4af37' //goldish color
    });
    //when the mouse is clicked, the menu screen appears
    this.input.on('pointerdown', () => this.scene.start('Menu'));
  }
}
