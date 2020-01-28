"use strict";

/********************************************************************

The Secret Elven Texts
Author Name

In the text, an ancient elven message is hidden. To translate it, one must
go to an online elven translator from LOTR

*********************************************************************/
let $spans;
let $secrets;
//the variable storing the values for the secrets
let secretsFound;
let secretsTotal = 4;
//the constant storing the value at which the interval will repeat
const INTERVAL_VALUE = 500;
//the probability of when to remove the class 10%
let probability = 0.1;
$(document).ready(setup);
//setup()
//
//Setting up the program
function setup(){
  setInterval(update,INTERVAL_VALUE);
  $spans = $('span').not(".secret,#foundSecrets,#totalSecrets");
  $spans.on("click",spanClicked);
  $secrets = $(".secret");
  secretsTotal = $secrets.length;
  $secrets.on("mouseover",mouseOver);
}
//update()
//
//
function update(){
  console.log("update!");
  $spans.each(updateSpan);
}
//updateSpan()
//
//
function updateSpan(){
  console.log("update span!");
  let r = Math.random();
  if (r < probability){
    $(this).removeClass("redacted");
    $(this).addClass("revealed");
  }
}
//spanClicked()
//
//
function spanClicked(){
  console.log("span clicked");
  $(this).removeClass("revealed");
  $(this).addClass("redacted");


}

//mouseOver()
//
//
function mouseOver(e){
  console.log("works");
  $(this).addClass("foundSecrets");
  $(this).off();
}
