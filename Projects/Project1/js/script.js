"use strict";

/********************************************************************

#While(Living) -> Badtripping
ny Frederick Labbe

This is a representation of the Sysiphus myth through a magic mushroom badtrip.
Once the player move close enough to the mushroom, a dialog appears with only
one option, take the mushroom. And then there is a bad trip. And then the player
badtrips. Over and over again.

*********************************************************************/
const CHARACTER_INCREMENT = 100;
let charPosX = 0;
let $character;
let mushX;
let dialogue;
let isTripping = false;

// Sound effects for the experience
let tranceSFX = new Audio("assets/sounds/psytrance.wav");

//getting the document ready
$(document).ready(setup);
//setup()
//
//Setting up the program and adding listeners to the key pressed to make the
//character move
function setup() {
  //putting the html id tag character in a js variable
  $character = $("#character");
  //when any key is pressed, the character  moves towards the mushroom
  $(document).on("keypress", move);
  //getting the css property of the x value of the mushroom and putting it
  //in a js variable. Minus the character increment so it pops out when close to it
  mushX = parseInt($("#mushroom").css("left")) - CHARACTER_INCREMENT;

  //looping the buzz sound but not playing it yet
  tranceSFX.loop = true;



} //move()
//
//moves the character towards the right by the amount CHARACTER_INCREMENT
//initialized at the top of the program
function move() {
  //console.log($("#mushroom").css("left"));
  if (charPosX < mushX) {
    increment();
    animateCharacter();
    //animating the character towards the right at 1 second per keypressed
    $character.animate({
      left: `${charPosX}`
    }, 1000, createDialog);
  }
}
//increment
//
//increments the constant to the position
function increment() {
  charPosX += CHARACTER_INCREMENT;
  console.log(charPosX);
}
// animateCharacter
//
//animating the character by varying between the two frames of the animation
function animateCharacter() {
  if ($character.attr('src') === 'assets/images/charWalking1.png') {
    $character.attr('src', 'assets/images/charWalking0.png');
  } else if ($character.attr('src') === 'assets/images/charWalking0.png') {
    $character.attr('src', 'assets/images/charWalking1.png');
  }
}
//createDialog
//
//As long as the character is close to the mushroom and he is not tripping,
//we show the dialog but when it does, we set isTripping to true
function createDialog() {
  if (charPosX >= mushX && !isTripping) {
    console.log("works");
    isTripping = true;
    dialogue = document.createElement("div");
    $(dialogue).text("Ohh, a mushroom. Maybe this time will be different, I will not have a badtrip");
    $(dialogue).dialog({
      buttons: [{
        text: "Take the mushroom",
        click: trip
      }]
    });

  }

}
//trip()
//
//launches the circles with a short interval and plays the psytrance music
function trip() {
  console.log("AHH TRIPPING");
  tranceSFX.play();
  setInterval(shootCircles, 100);
  $(".sober").hide();
  $(".tripping").show();
  $(dialogue).dialog("close");


}
//shootCircles
//
//displays the circles as a grid with random color for each circle
function shootCircles() {
  //random rgb values for random colors of the circles
  let r = Math.random() * 255;
  let g = Math.random() * 255;
  let b = Math.random() * 255;
  //creating the circle of the class .circle with the random border color
  let circle = $(`<div class ='circles' style="border-color:rgb(${r},${g},${b});"></div>`);
  console.log(circle);
  //adding the child to the parent
  $(".tripping").append(circle);
  //resetting the program avter 5 seconds of tripping
  setTimeout(reset, 5500);


}
//reset
//
//resets the values and reloads the page
function reset() {
  location.reload();
  charPosX = 0
  $(".tripping").hide();
  $(".sober").show();
  isTripping = false;

}
