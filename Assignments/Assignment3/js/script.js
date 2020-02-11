"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
$(document).ready(setup);
let correctAnimal;
let animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];
let answers = [];
const NUM_OPTIONS = 4;
let backwardsText;
let options;

function setup() {
  $(document).one("click",newRound);
  // Make sure annyang is available...
 if (annyang) {
   console.log("supported");
   // Add the commands to annyang. That is it should listen
   // for "I am..." or "I'm..." followed by some number of words.
   // In annyang's commands an asterisk (*) followed by a
   // variable names means that annyang will call the function
   // specified with EVERYTHING it heard from that point on...
   var command = {
     "*I give up": handleGivingUp,
     "*Say it again": handleSayAgain
     "I think it's *"
   };

   // Now we've defined the commands we give them to annyang
   // by using its .addCommands() function.
   annyang.addCommands(command);

   // Finally we tell annyang to start listening with its
   // .start() function
   annyang.start();


}
}
//addButton
//
//
function addButton(label) {
  let $div = $('<div></div>');
  $div.text(label);
  $div.addClass("guess");
  $div.button();
  $('body').append($div);
  $div.on("click",handleGuess);


}
//newRound
//
//
function newRound(){
  $("div").remove();
  answers = [];
  for(let i = 0; i < NUM_OPTIONS; i++){
    let randomNumber = Math.floor(Math.random()*animals.length);
    let randomAnimal = animals[randomNumber];
    addButton(randomAnimal);
    answers.push(randomAnimal);
  }
  correctAnimal = answers[Math.floor(Math.random()*answers.length)];
  sayBackwards(correctAnimal);
}
//handleGuess
//
//
function handleGuess(){
  if($(this).text() === correctAnimal){
    $(".guess").remove();
    setTimeout(newRound,3000);
  }
  else{
    $(this).effect('shake');
    responsiveVoice.speak(backwardsText,"UK English Male", options);
}
}
//sayBackwards
//
//
function sayBackwards(text){
  backwardsText = text.split('').reverse().join('');
  options = {
    rate: Math.random(),

    pitch: Math.random()
  };
  responsiveVoice.speak(backwardsText,"UK English Male", options);
}
//
//
//
function handleGivingUp(){
  $("div").each(function(){
    if($(this).text() === correctAnimal){
    $(this).effect('shake');
    newRound();
    }
  });
}
//
//
//
function handleSayAgain(){
  console.log("works");
  responsiveVoice.speak(backwardsText,"UK English Male", options);
}
