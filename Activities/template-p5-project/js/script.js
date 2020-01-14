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
  e.target.style.backgroundColor = "white";
  setTimeout(resetPixel, delayToReset,e);
}
function resetPixel(e){
  e.target.style.backgroundColor = "black";
}
