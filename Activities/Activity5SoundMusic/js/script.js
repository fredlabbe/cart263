"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let frequencies = [
  //B1
  61.74,
  //D1
  73.42,
  //E1
  82.41,
  //F1
  87.31,
  //F#1
  92.50,
  //A1
  110.00,
];
let highFrequencies = [
  //B4
  493.88,
  //D5
  587.33,
  //E5
  659.25,
  //F5
  698.46,
  //F#5
  739.99
];
let synth= new Pizzicato.Sound({
  source: 'wave'
  });
  let bassSynth= new Pizzicato.Sound({
    source: 'wave'
    });
let pattern = ["x","","o","","x","x*","","*o"];
let snare;
let kick;
let hihat;
let beat = 0;
let symbol;

function setup() {
  snare = new Pizzicato.Sound('./assets/sounds/snare.wav', function() {
    // Sound loaded!
    console.log("snare loaded");
});
kick = new Pizzicato.Sound('./assets/sounds/kick.wav', function() {
  // Sound loaded!
  console.log("kick loaded");
});
hihat = new Pizzicato.Sound('./assets/sounds/hihat.wav', function() {
  // Sound loaded!
  console.log("hihat loaded");
});


}
//
//
//
function mousePressed() {
  setInterval(playBassNote,500,frequencies);
  setInterval(playNote,250,highFrequencies);
  setInterval(playDrum,250);
}
//
//
//
function playNote(instrument){
  let randomNote = random(instrument);
  synth.frequency = randomNote;
  synth.play();
}
function playBassNote(instrument){
  let randomNote = random(instrument);
  bassSynth.frequency = randomNote;
  bassSynth.play();
}
// playDrum()
//
// Checks the string representing the drums for the current beat
// and plays the appropriate sounds
function playDrum() {
  // Get the symbols for the current beat in the pattern
  let symbols = pattern[beat];

  // If there's an 'x' in there, play the kick
  if (symbols.includes('x')) {
    kick.play();
  }
  // If there's an 'o' in there, play the snare
  if (symbols.includes('o')) {
    snare.play();
  }
  // If there's an '*' in there, play the hihat
  if (symbols.includes('*')) {
    hihat.play();
  }
  // Advance the pattern by a beat
  beat = (beat + 1) % pattern.length;
}
