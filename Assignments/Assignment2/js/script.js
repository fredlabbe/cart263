"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
let $spans;
const intervalValue = 500;
let probability = 0.1;
$(document).ready(setup);

function setup(){
  setInterval(update,intervalValue);
  $spans = $('span')
  $spans.on("click",spanClicked);
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
