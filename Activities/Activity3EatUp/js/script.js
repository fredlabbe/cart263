"use strict";

/********************************************************************

Eat-up
Frederick Labbe

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/
let $mouth;
let $fly;

// Sound effects for the experience
let buzzSFX = new Audio("assets/sounds/buzz.mp3");
let crunchSFX = new Audio("assets/sounds/crunch.wav");

$(document).ready(setup);

function setup(){
  $mouth = $("#mouth");
  $fly = $("#fly");

  $fly.draggable();
  $mouth.droppable({
    drop: onDrop
  });
//looping the buzz sound but not playing it yet
  buzzSFX.loop = true;

  // We'll start the fly buzzing on the first mouse interaction
  $fly.on('mousedown', function() {
    buzzSFX.play();
  });
  // We'll stop the fly buzzing if it is let go
  $fly.on('mouseup', function() {
    buzzSFX.pause();
  });
}
function onDrop(event,ui){
  ui.draggable.remove();

  setInterval(chew,250);
  buzzSFX.pause();
}
function chew(){
  if($mouth.attr('src') === 'assets/images/mouth-open.png'){
    $mouth.attr('src', 'assets/images/mouth-closed.png');
    crunchSFX.currentTime = 0;
    crunchSFX.play();
  }
  else{
    $mouth.attr('src','assets/images/mouth-open.png');
  }
}
