var shoeSize = 0;
var footSizeInInches = 0;
var widthInSteps = 0;
var heightInSteps = 0;
var widthInInches = 0;
var heightInInches = 0;
var widthInFeet = 0;
var heightInFeet = 0;

// get inputs function upon the "calculate" click event
  // get shoe size by id
  // get total width steps by id
  // get total height steps by id
function getInputs(){
  shoeSize = document.getElementById('shoe-size').value;
  widthInSteps = document.getElementById('width').value;
  heightInSteps = document.getElementById('height').value;
  console.log('shoe size is ' + shoeSize + ' width is ' + widthInSteps + ' and height is ' + heightInSteps);
  footSizeToInches();
  totalStepsToFeetMeasurment();
}

// convert foot size into actual inches
function footSizeToInches(){
  if(shoeSize == 6){
    footSizeInInches = 9.25;
  }else if(shoeSize == 6.5){
    footSizeInInches = 9.5;
  }else if(shoeSize == 7){
    footSizeInInches = 9.625;
  }else if(shoeSize == 7.5){
    footSizeInInches = 9.75;
  }else if(shoeSize == 8){
    footSizeInInches = 9.9375;
  }else if(shoeSize == 8.5){
    footSizeInInches = 10.125;
  }else if(shoeSize == 9){
    footSizeInInches = 10.25;
  }else if(shoeSize == 9.5){
    footSizeInInches = 10.4375;
  }else if(shoeSize == 10){
    footSizeInInches = 10.5625;
  }else if(shoeSize == 10.5){
    footSizeInInches = 10.75;
  }else if(shoeSize == 11){
    footSizeInInches = 10.9375;
  }else if(shoeSize == 11.5){
    footSizeInInches = 11.125;
  }else if(shoeSize == 12){
    footSizeInInches = 11.25;
  }else if(shoeSize == 13){
    footSizeInInches = 11.5625;
  }else if(shoeSize == 14){
    footSizeInInches = 11.875;
  }else if(shoeSize == 15){
    footSizeInInches = 12.1875;
  }else if(shoeSize == 16){
    footSizeInInches = 12.5;
  }
  console.log("the length of the bare foot is " + footSizeInInches);
}

// convert steps to size in feet i.e. 4.5 feet
function totalStepsToFeetMeasurment(){
  widthInFeet = Math.round(widthInSteps * footSizeInInches) / 12;
  heightInFeet = Math.round(heightInSteps * footSizeInInches) / 12;
  console.log('width is ' + widthInFeet + ' and height is ' + heightInFeet);
  feetToInches();
}

// convert feet to inches
function feetToInches(){
  widthInInches = widthInFeet * 12;
  heightInInches = heightInFeet * 12;
}

// calculate area/square foot function
function calcSquareFootage(){
  var squareFootage = widthInFeet * heightInFeet;
  return squareFootage;
}

// calculate hypotonuse diagonal length function

// calculate Circumference function

// convert feet into pixels

// update style for final ratio div based on size calculated in pixels function
