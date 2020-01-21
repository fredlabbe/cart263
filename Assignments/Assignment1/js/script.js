/*****************

JavaScript Self-portrait (Exercise0)
Frederick Labbe

This is a quick painter

******************/

// preload()
//
// Description of preload
"use strict";
//seting up the program
window.onload = setup;
//the amount of pixels
const pixelNumber = 1000;
//the time before resetting the pixel color to black
const delayToReset = 1000;
//the angle of the squares to no angle at start
let rotation = 0;

document.addEventListener("keydown",rotate);
//setup()
//
//setting up the program
function setup() {
  console.log("Document loaded");
  //for all pixels, paint when the mouse is over and remove when clicked
  for (let i = 0; i < pixelNumber; i++) {
    let pixel = document.createElement("div");
    pixel.setAttribute("class", "pixel");
    pixel.addEventListener("mouseover", paint);
    document.addEventListener("click",remove);
    document.body.appendChild(pixel);

  }
}
//paint()
//
//painting the black squares with random colors
function paint(e){
  //having random rbg values for the colors by taking A NUMBER BETWEEN 0 and 1
  //and multiplying it to the max range which is 255
  let r = 255*Math.random();
  let g = 255*Math.random();
  let b = 255*Math.random();
  e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
  setTimeout(resetPixel, delayToReset,e);
}
//resetPixel()
//
//Putting the pixel back to black
function resetPixel(e){
  e.target.style.backgroundColor = "black";
}
//remove()
//
//removing the clicked square by putting its opacity to 0
function remove(e){
e.target.style.opacity = "0";
}
//rotate()
//
//rotating by 1 degree left or right depending on the key pressed by the user
function rotate(e){
  let pixels = document.querySelectorAll('.pixel');
  //left arrow down to rotate left by 1px
  if(e.keyCode === 37){
    rotation -= 1;
    for(let i = 0; i < pixels.length; i++){
      pixels[i].style.transform = `rotate(${rotation}deg)`;
    }
  }
  //right arrow down to rotate right by 1px
  if(e.keyCode === 39){
    rotation += 1;
    for(let i = 0; i < pixels.length; i++){
      pixels[i].style.transform = `rotate(${rotation}deg)`;
    }
  }

}
