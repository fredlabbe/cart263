"use strict";

/*****************

Assignment 3
Frederick Labbe

Guess the right animal with either your voice or by clicking.

******************/
//setting up the document
$(document).ready(setup);
//initializing the correct variable as being empty
let correctAnimal;
//the animal array
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
//empty answers array
let answers = [];
//a constant for the number of options available
const NUM_OPTIONS = 4;
//empty backwards text variable
let backwardsText;
let options;
//the score
let runningScore = 0;
//variable checking if the last one was right
let isLastRight = false;
//setup
//
//setting up the doc. When one clicks, it starts a new round.
function setup() {
  $(document).one("click", newRound);
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
      "*Say it again": handleSayAgain,
      "I think it's *animal": handleUserSpeech
    };

    // Now we've defined the commands we give them to annyang
    // by using its .addCommands() function.
    annyang.addCommands(command);

    // Finally we tell annyang to start listening with its
    // .start() function
    annyang.start();
    //displaying the score
    displayScore();
  }
}
//addButton
//
//adding a button with class guess and appending it to the body and calling
//handleguess function once clicked
function addButton(label) {
  let $div = $('<div></div>');
  $div.text(label);
  $div.addClass("guess");
  $div.button();
  $('body').append($div);
  $div.on("click", handleGuess);
}
//newRound
//
//removes everything and sets up a new round.
function newRound() {
  $("div").remove();
  //emptying the answers array
  answers = [];
  //Adding all buttons from random animals out of the animals array
  for (let i = 0; i < NUM_OPTIONS; i++) {
    let randomNumber = Math.floor(Math.random() * animals.length);
    let randomAnimal = animals[randomNumber];
    addButton(randomAnimal);
    answers.push(randomAnimal);
  }
  //Choosing a random animal out of the four to be the correct answer
  correctAnimal = answers[Math.floor(Math.random() * answers.length)];
  sayBackwards(correctAnimal);
}
//handleGuess
//
//If it is the right animal chosen, starts a new round and increases the score.
//If not, resets the score and say again and shakes the chosen button
function handleGuess() {
  if ($(this).text() === correctAnimal) {
    $(".guess").remove();
    setTimeout(newRound, 3000);
    runningScore++;
    //displaying the score
    displayScore();
  } else {
    $(this).effect('shake');
    responsiveVoice.speak(backwardsText, "UK English Male", options);
    runningScore = 0;
    //displaying the score
    displayScore();
  }
}
//sayBackwards
//
//Say the text backwards at random rate and pitch
function sayBackwards(text) {
  backwardsText = text.split('').reverse().join('');
  options = {
    rate: Math.random(),

    pitch: Math.random()
  };
  responsiveVoice.speak(backwardsText, "UK English Male", options);
}
//handleGivingUp
//
//when "I give up" is said, it starts a new round and resets the score
function handleGivingUp() {
  $("div").each(function() {
    if ($(this).text() === correctAnimal) {
      $(this).effect('shake');
      runningScore = 0;
      //displaying the score
      displayScore();
      newRound();
    }
  });
}
//handleSayAgain
//
//says the text again when it is asked
function handleSayAgain() {
  responsiveVoice.speak(backwardsText, "UK English Male", options);
}
// handleUserSpeech(phrase)
//
// Called by annyang when it hears a sentence of the form
// "I am X". 'phrase' will contain the X part.
// Checks whether the user said what they were supposed to say
// and reacts accordingly.
function handleUserSpeech(phrase) {

  // We check whether the user said what they were told to say
  // by comparing what annyang heard (phrase) with the
  // corectAnimal variable
  if (phrase === correctAnimal) {
    $(".guess").remove();
    setTimeout(newRound, 3000);
    runningScore++;
    //displaying the score
    displayScore();
  } else {
    // If they said the wrong thing, say the word again
    responsiveVoice.speak(backwardsText, "UK English Male", options);
    runningScore = 0;
    //displaying the score
    displayScore();
  }
}
//displayScore
//
//displays the score as a h1
function displayScore() {
  $("h1").text(`Score: ${runningScore}`);
}
