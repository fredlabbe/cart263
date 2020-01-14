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

function setup() {
  console.log("Document loaded");
  for (let i = 0; i < pixelNumber; i++) {
    let pixel = document.createElement("div");
    pixel.setAttribute("class", "pixel");
    document.addEventListener("mouseover", paint);
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
