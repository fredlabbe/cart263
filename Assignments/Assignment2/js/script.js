"use strict";

/********************************************************************

The Secret Elven Texts
Frederick Labbe

In the text, an ancient elven message is hidden. To translate it, one must
go to an online elven translator from LOTR

*********************************************************************/
//jQuery variables
let $spans;
let $secrets;
//the variable storing the values for the secrets
let foundSecrets = 0;
let totalSecrets = 4;
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
  //storing the spans in a variable but omitting the secret ones
  $spans = $('span').not(".secret,#foundSecrets,#totalSecrets");
  //when the span is clicked, calls the spanClicked function
  $spans.on("click",spanClicked);
  //storing the secrets in the variable
  $secrets = $(".secret");
  totalSecrets = $secrets.length;
  $('#totalSecrets').text(totalSecrets);
  $secrets.on("mouseover",mouseOver);
}
//update()
//
//updating the spans by calling the function updateSpan
function update(){
  console.log("update!");
  $spans.each(updateSpan);
}
//updateSpan()
//
//hiding the sentences only 10% of the time
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
//Hiding the sentences when clicked on the right ones
function spanClicked(){
  console.log("span clicked");
  $(this).removeClass("revealed");
  $(this).addClass("redacted");
  updateSecrets();
}
//updateSecrets()
//
//Incrementing the amount of secrets found  and printing the amount of secrets found
function updateSecrets(){

}

//mouseOver()
//
//when the mouse is over, highlighting the secret in yellow
function mouseOver(e){
  foundSecrets++;
  $('#foundSecrets').text(foundSecrets);
  console.log("works");
  $(this).addClass("foundSecrets");
  $(this).off("mouseover");
}
