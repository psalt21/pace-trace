// desired functionality:
  // -DONE- 1. rework conversion from shoesize to foot length to be simple equation
  // -DONE- 2. Add female option
  // 2a. Add option to input custom length but only as decimal.
  // 3. Add option to bare foot vs wearing shoes and add maybe 2.5" to foot length
  // 4. Do I want to clear out previous steps when clear is clicked or just results?
  // 5. Click on specific result for individual representation on final ratio shape-result
  // 6. (CSS specific) Mobile optimize CSS layout and make more dynamic for browser window resizing
  // 7. if height or width is 0 then return "0 feet" for diagonal length
  // 8. Add "?"  marks next to each output that you can click (or hover over) to have window pop-up explaining the results
  // 9. an explanation or link to explanation of purpose of application and how to use it
  // 10. hit "enter" while in width or height fields to calculate instead of clicking button
  // 11. onclick and hover response for buttons (color change etc.)
  // 12. add option to flip width and height
  // 13. rescale shape bigger if it is under a certain size so it won't end up being 1px x 1px
  // 14. do not allow letters in width or height field

// get inputs function upon the "calculate" click event
function getInputs(){
  var shoeSize = document.getElementById('shoe-size').value;
  var widthInSteps = document.getElementById('width').value;
  var heightInSteps = document.getElementById('height').value;
  var currentGender = determineGender();
  calcuInputs(shoeSize, widthInSteps, heightInSteps, currentGender);
}

function determineGender(){
  if(document.getElementById('gender-male').checked) {
    return('male');
  }else if(document.getElementById('gender-female').checked) {
    return('female');
  }
}

function calcuInputs(shoeSize, widthInSteps, heightInSteps, currentGender){
  // male footlendght at size 6 is 9.25" and increase rate is .17 per half shoeSize
  // female footlength at size 6 is 8.875" and increase rate is .17 per half shoeSize
  var startingFootLength = null;
    if(currentGender === 'male'){
      startingFootLength = 9.25;
    }else if(currentGender === 'female'){
      startingFootLength = 8.875;
    }
  var currentFootLength =  footSizeToInchesCalc(shoeSize, startingFootLength, 0.17);
  var widthInFeet = Math.round((widthInSteps * currentFootLength) / 12);
  var heightInFeet = Math.round((heightInSteps * currentFootLength) / 12);
  calcuOutputs(widthInFeet, heightInFeet);
}

function calcuOutputs(width, height){
  var squareFootage = Math.round(width * height);
  var hypotenuse = Math.round(Math.sqrt(width*width + height*height));
  var circumference = Math.round(2 * (width + height));
  publishResults(width, height, squareFootage, hypotenuse, circumference);
}

function publishResults(width, height, squareFootage, hypotenuse, circumference){
  var widthLocation = document.getElementById('width-result').innerHTML = (width + ' feet');
  var heightLocation = document.getElementById('height-result').innerHTML = (height + ' feet');
  var sqrFootLocation = document.getElementById('area-result').innerHTML = (squareFootage + ' feet');
  var hypotLocation = document.getElementById('hypot-result').innerHTML = (hypotenuse + ' feet');
  var circumLocation = document.getElementById('circum-result').innerHTML = (circumference + ' feet');
  var multiplyRate = determineMultiplyRate(width, height);
  var renderedWidth = convWidthToPixels(width, multiplyRate, 'final-shape');
  var renderedHeight = convHeightToPixels(height, multiplyRate, 'final-shape');
}

// convert feet into pixels
function convWidthToPixels(shapeSize, multiplyRate, destinationId){
  var convertedSize = shapeSize * multiplyRate;
  document.getElementById(destinationId).style.width = (convertedSize + 'px');
  document.getElementById(destinationId).style.backgroundColor = '#94b4dc';
}

function convHeightToPixels(shapeSize, multiplyRate, destinationId){
  var convertedSize = shapeSize * multiplyRate;
  document.getElementById(destinationId).style.height = (convertedSize + 'px');
}

function determineMultiplyRate(width, height){
  var multiplyRate = 10;
  var convertedWidthSize = width * multiplyRate;
  var convertedHeightSize = height * multiplyRate;
  while(convertedWidthSize > 430 || convertedHeightSize > 250){
    multiplyRate = multiplyRate / 2;
    convertedWidthSize = width * multiplyRate;
    convertedHeightSize = height * multiplyRate;
  }
  return multiplyRate;
}

// convert feet to inches
function ConvertFeetToInches(feet){
  return feet * 12;
}

function footSizeToInchesCalc(shoeSize, startingFootLength, increaseRate){
  // smallest size is 6 which is 9.25" foot length.
    // if shoeSize minus 6 is greater than 0, then add increaseRate for every .5 over 0.
  var sizeDif = shoeSize - 6;
  if(sizeDif > 0){
    for(i = sizeDif; i > 0; i = i - 0.5){
      startingFootLength = startingFootLength + increaseRate;
    }
  }
  return startingFootLength;
}

function resetAll(){
  calcuOutputs(0, 0);
}
