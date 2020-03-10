/*

Condiments
Frederick Labbe

Chooses random words from local JSON data to fill out a sentence
describing a condiment based on cats and rooms... weird.

Uses:

Corpora
https://github.com/dariusk/corpora

*/
let dataJSON;
let vowels = ["a","e","i","o","u","y"];
let article;
$(document).ready(function() {

  // The first thing we need to do is load the data we're going
  // to use to get random words.
  //
  // For that we use jQuery's .getJSON() function, which we give
  // the location of the file, and a function to call when the data
  // is available...
  $.getJSON('data/data.json')
    .done(gotData)
    .fail(dataError);
});

// gotData (data)
//
// This function gets called by getJSON when the data has been loaded.
// The data itself will be in the 'data' argument as a JavaScript object.
function gotData(data) {
  dataJSON = data;
  setup();
  $(document).on('click',setup);
}

// dataError()
//
// Called if the JSON does not load for some reason.
// Reports the error to the console.
function dataError(request, text, error) {
  console.error(error);
}

// getRandomElement ()
//
// Returns a random element from the array provided
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
//
//
//
function setup(){
  //emptying the div even if it is already empty
  $('div').empty();
  // Now we select random elements from the three arrays inside
  // our JSON to get a random condiment, cat, and room. Then we add those
  // words onto our page by setting the text of the appropriate span.

  // First the condiment
  // Get a random condiment from the condiments array in the JSON
  let condiment = getRandomElement(dataJSON.condiments);
  // Assume it's singular
  let verb = 'is';
  // Check if the last latter of the condiment is an 's'
  if (condiment.charAt(condiment.length - 1) === 's') {
    // If so, assume it's plural (this is a flawed assumption)
    verb = 'are';
  }

  // Now the cat
  let cat = getRandomElement(dataJSON.cats);
  //if the first letter of the cat breed is a vowel, puts an instead of a
  if(vowels.includes(cat.charAt(0).toLowerCase())){
    article = "an";
  }
  else{
    article = "a";
  }

  // Same again for room
  let room = getRandomElement(dataJSON.rooms);

  //the name of the cat as a greek god name
  let name = getRandomElement(dataJSON.greek_gods);

  //the game the cat plays
  let game = getRandomElement(dataJSON.rpgs);

  // Now we can construct our description with a template string
  // We have the basic structure of a sentence and we substitute in the
  // values we've just calculated
  let description = `${condiment} ${verb} like ${article} ${cat} called ${name} who plays ${game} in some ${room}.`;

  // Finally, we add it to the page and hey presto!
  $('div').append(description)
}
