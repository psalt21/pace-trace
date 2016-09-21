var reduceSize = false;


// get inputs function upon the "calculate" click event
  // get shoe size by id
  // get total width steps by id
  // get total height steps by id
function getInputs(){
  var shoeSize = getShoeSize();
  var widthInSteps = getWidthInSteps();
  var heightInSteps = getHeightInSteps();
  console.log('shoe size is ' + shoeSize + ' width is ' + widthInSteps + ' STEPS and height is ' + heightInSteps + ' STEPS.');
  calcuInputs(shoeSize, widthInSteps, heightInSteps);
}

function calcuInputs(shoeSize, widthInSteps, heightInSteps){
  var footSizeInInches = footSizeToInches(shoeSize);
  var widthInFeet = stepsToFeetMeasurment(widthInSteps, footSizeInInches);
  var heightInFeet = stepsToFeetMeasurment(heightInSteps, footSizeInInches);
  calcuOutputs(widthInFeet, heightInFeet);
  console.log('the total width is ' + widthInFeet + ' feet.');
  console.log('the total height is ' + heightInFeet + ' feet.');
}

function calcuOutputs(width, height){
  var squareFootage = calcSquareFootage(width, height);
  var hypotenuse = calcHypotenuse(width, height);
  var circumference = calcCircumference(width, height);
  console.log('the square footage is ' + squareFootage + ' feet.');
  console.log('the diagonal length is ' + hypotenuse + ' feet.');
  console.log('the circumference is ' + circumference + ' feet.');
  publishResults(width, height, squareFootage, hypotenuse, circumference);
}

function publishResults(width, height, squareFootage, hypotenuse, circumference){
  var widthLocation = applyOutputToDestination('width-result', width);
  var heightLocation = applyOutputToDestination('height-result', height);
  var sqrFootLocation = applyOutputToDestination('area-result', squareFootage);
  var hypotLocation = applyOutputToDestination('hypot-result', hypotenuse);
  var circumLocation = applyOutputToDestination('circum-result', circumference);
  determineIfSizeIsReduced(width);
  var renderedWidth = convWidthToPixels(width, 'final-shape');
  var renderedHeight = convHeightToPixels(height, 'final-shape');
}

function determineIfSizeIsReduced(width){
  if(width * 10 >= 600){
    reduceSize = true;
  }else{
    reduceSize = false;
  }
}

// convert feet into pixels
function convWidthToPixels(shapeSize, destinationId){
  var convertedSize = shapeSize * 10;
    if(reduceSize === true){
      convertedSize = (shapeSize * 10) / 2;
    }
  document.getElementById(destinationId).style.width = (convertedSize + 'px');
  document.getElementById(destinationId).style.backgroundColor = '#94b4dc';
  // document.getElementById('inputs-and-results').style.width = (convertedSize + 'px');
}

function convHeightToPixels(shapeSize, destinationId){
  var convertedSize = shapeSize * 10;
    if(reduceSize === true){
      convertedSize = (shapeSize * 10) / 2;
    }
  document.getElementById(destinationId).style.height = (convertedSize + 'px');
}

function applyOutputToDestination(outputID, outputValue){
  document.getElementById(outputID).innerHTML = (outputValue + ' feet');
}

// calculate area/square foot function
function calcSquareFootage(width, height){
  return Math.round(width * height);
}

// calculate hypotonuse diagonal length function
function calcHypotenuse(width, height){
  return Math.round(Math.sqrt(width*width + height*height));
}

// calculate Circumference function
function calcCircumference(width, height){
  return Math.round(2 * (width + height));
}

function getShoeSize(){
return document.getElementById('shoe-size').value;
}

function getWidthInSteps(){
  return document.getElementById('width').value;
}

function getHeightInSteps(){
  return document.getElementById('height').value;
}

// convert steps to size in feet i.e. 4.5 feet
function stepsToFeetMeasurment(steps, footSizeInInches){
  return Math.round((steps * footSizeInInches) / 12);
}

// convert feet to inches
function ConvertFeetToInches(feet){
  return feet * 12;
}

// convert foot size into actual inches
function footSizeToInches(shoeSize){
  var footSizeInInches = 0;
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
  console.log("the length of the bare foot is " + footSizeInInches + ' inches.');
  return footSizeInInches;
}

// update style for final ratio div based on size calculated in pixels function
