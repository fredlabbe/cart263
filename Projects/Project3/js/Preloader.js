//Class Preloader
//
//Preloads images

class Preloader extends Phaser.Scene {

  constructor() {
    super('Preloader');
  }

  preload() {
    this.load.image('map', 'assets/images/map.png');
    this.load.image('tree', 'assets/images/tree.png');
    this.load.image('knight', 'assets/images/knight.png');
    this.load.image('elf', 'assets/images/elf.png');
    this.load.image('menu', 'assets/images/menu.jpg');
    this.load.image('narrative', 'assets/images/narrative.jpg');
    this.load.image('castle', 'assets/images/castle.png');
  }

  //create()
  //
  // goes to the game once everything is loaded

  create() {
    this.scene.start('Menu');
  }
}
