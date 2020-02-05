"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
let charIncrement = 100;
let charPosX = 0;
let $character;
let mushX;
let dialogue;
let isTripping = false;

$(document).ready(setup);
//setup()
//
//Setting up the program
function setup(){
  $character = $("#character");
  //$character.on("click",move);
  $(document).on("keypress",move);
  mushX = parseInt($("#mushroom").css("left"))- 100;



}//move()
//
//moves the character towards the right by the amount charIncrement
//initialized at the top of the program
function move(){
  //console.log($("#mushroom").css("left"));
  if(charPosX < mushX){
  increment();
  animateCharacter();
  $character.animate({left: `${charPosX}`},1000,createDialog);
}
}

function increment(){
  charPosX += charIncrement;
  console.log(charPosX);
}

function animateCharacter(){
    if($character.attr('src') === 'assets/images/charWalking1.png'){
      $character.attr('src', 'assets/images/charWalking0.png');
    }
    else if($character.attr('src') === 'assets/images/charWalking0.png'){
      $character.attr('src','assets/images/charWalking1.png');
    }
}
//createDialog
//
//
function createDialog(){
  if(charPosX >= mushX && !isTripping){
    console.log("works");
    isTripping = true;
    dialogue = document.createElement("div");
    $(dialogue).text("Ohh, a mushroom. Maybe this time will be different, I will not have a badtrip");
    $(dialogue).dialog({
      buttons: [  {
        text: "Take the mushroom",
        click: trip
      }
      ]
    });

  }

}
//trip()
//
//
function trip(){
  console.log("AHH TRIPPING");
  setInterval(shootCircles,100);
  $(".sober").hide();
  $(".tripping").show();
  $(dialogue).dialog("close");


}

function shootCircles(){
  //random rgb values for random colors of the circles
  let r = Math.random()*255;
  let g = Math.random()*255;
  let b = Math.random()*255;
  //random X and Y values for the position of the circles
  let randX = Math.random()*1000;
  let randY = Math.random()*900;
  //creating the circle of the class .circle with the random border color
  let circle = $(`<div class ='circles' style="border-color:rgb(${r},${g},${b});"></div>`);
  console.log(circle);
  //adding the child to the parent
  $(".tripping").append(circle);
  //adding the position to the css
  // circle.css("top",`${randY}px`);
  // circle.css("left",`${randX}px`);
  // $("div").animate({left: 500},100);
  setTimeout(reset,5500);


}
function reset(){
  location.reload();
  charPosX = 0
  $(".tripping").hide();
  $(".sober").show();
  isTripping = false;
  //$character.animate({right: 800},10);
  //setTimeout(setup,5000);

}
