/*****************

JavaScript Self-portrait (Exercise0)
Frederick Labbe

This code applies the concepts seen in class to do a simple self-portrait
made of ellipses and retangles.

******************/

// preload()
//
// Description of preload
"use strict";

window.onload = setup;
const pixelNumber = 1000;
const delayToReset = 1000;
let rotation = 0;

document.addEventListener("keydown",rotate);

function setup() {
  console.log("Document loaded");
  for (let i = 0; i < pixelNumber; i++) {
    let pixel = document.createElement("div");
    pixel.setAttribute("class", "pixel");
    pixel.addEventListener("mouseover", paint);
    document.addEventListener("click",remove);
    document.body.appendChild(pixel);

  }
}
function paint(e){
  //having random rbg values for the colors by taking A NUMBER BETWEEN 0 and 1
  //and multiplying it to the max range which is 255
  let r = 255*Math.random();
  let g = 255*Math.random();
  let b = 255*Math.random();
  e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
  setTimeout(resetPixel, delayToReset,e);
}
function resetPixel(e){
  e.target.style.backgroundColor = "black";
}
function remove(e){
e.target.style.opacity = "0";
}
function rotate(e){
  //left arrow down to rotate left by 1px
  if(e.keyCode === 37){
    let pixels = document.querySelectorAll('.pixel');
    for(let i = 0; i < pixels.length; i++){
      let
      let currentAngle = document.
      pixels[i].style.transform
    }
  }
  //right arrow down to rotate right by 1px
  if(e.keyCode === 39){

  }

}
