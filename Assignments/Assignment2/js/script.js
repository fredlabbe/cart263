"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
let $spans;
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
  $spans = $('span')
  $spans.on("click",spanClicked);
  $secrets = $(".secrets")
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
function mouseOver(){

}
