fillmaindiv(16, 16); //called on start to create the default grid
var newgrid = document.getElementById("newgrid");
newgrid.addEventListener("click", reset);

function reset() {
  //the function tied to the reset button
  let re_onlynums = new RegExp("^[0-9]+$"); //regex to check only for the numbers between 0 and 9
  let re_onlynumsandx = new RegExp("^[0-9x]+$"); //regex to check for the numbers between 0 and 9 and character x
  let dimensions = prompt(
    "Please enter the new dimensions. Example: 5, 6x6, 12x6"
  ); //creates the prompt for the dimensions and the var to store them
  if (re_onlynums.test(dimensions)) {
    //checks if dimensions is only a numbers
    if (dimensions > 64) {
      dimensions = 64;
    } //to stop the browser from crashing
    fillmaindiv(dimensions, dimensions);
  } else if (re_onlynumsandx.test(dimensions)) {
    //checks if the dimensions contain the character x
    var arrnewdims = dimensions.split("x");
    if (arrnewdims[0] === "" || arrnewdims[1] === "") {
      //if the user enters only x then an error is thrown
      alert("Please eneter valid dimensions");
    } else {
      if (arrnewdims[0] == 64) {
        arrnewdims[0] = 64;
      } //to stop the browser from crashing
      if (arrnewdims[1] == 64) {
        arrnewdims[1] = 64;
      } //to stop the browser from crashing
      fillmaindiv(arrnewdims[0], arrnewdims[1]);
    }
  } else {
    alert("Please eneter valid dimensions"); //if the user eneterd anything else an error is thrown
  }
}

function fillmaindiv(cols, rows) {
  //the main function that creates and fills the grid
  $(".container-div") //we select the container div with jQuery
    .empty() //clear all elements
    .css("grid-template-columns", `repeat(${cols}, 1fr)`) //add as many cols and rows as the user wants
    .css("grid-template-rows", `repeat(${rows}, 1fr)`);
  for (i = 0; i < cols; i++) {
    //loop through all of them
    for (j = 0; j < rows; j++) {
      var newdiv = $("<div class='grid-div'></div>") //a new element to be added to the cointer div is created
        .css("grid-area", `${i},${i},${j},${j}`) //using css we set where it will reside in the grid
        .css("border", "1px solid black") //give it border
        .on("mouseover", function() {
          //an event and function is added to the new element
          $(this).css(
            "background-color",
            `rgb(${rnd0255()}, ${rnd0255()}, ${rnd0255()})`
          ); //on mouseover the background color will change
        })
        .on("mouseleave", function() {
          //a new event is added
          $(this).off("mouseover  ");
          //upon the mouse leaving the div the funciton to chnage its color is disabled making it stay that color until a refresh or a new grid is added
        });
      $(".container-div").append(newdiv); //the new element is added to the container div
    }
    j = 0; //the second iterator is reset so the newxt row can be added
  }
}

function rnd0255() {
  //genrates a random number between 0 and 255
  return Math.floor(Math.random() * 256);
}
