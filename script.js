// desired functionality:
  // 2a. Add option to input custom length but only as decimal.
  // 7. if height or width is 0 then return "0 feet" for diagonal length
  // 8. Add "?"  marks next to each output that you can click (or hover over) to have window pop-up explaining the results
  // 9. an explanation or link to explanation of purpose of application and how to use it
  // 10. hit "enter" while in width or height fields to calculate instead of clicking button
  // 11. onclick and hover response for buttons (color change etc.)
  // 14. do not allow letters in width or height field

// get inputs function upon the "calculate" click event
function getInputs(){
  var shoeSize = document.getElementById('shoe-size').value;
  var widthInSteps = document.getElementById('width').value;
  var heightInSteps = document.getElementById('height').value;
  var currentGender = determineGender();
  calcuInputs(shoeSize, widthInSteps, heightInSteps, currentGender);
}

$(".tiptext").mouseover(function() {
    $(this).children(".description").show();
}).mouseout(function() {
    $(this).children(".description").hide();
});

$(".tiptext2").mouseover(function() {
    $(this).children(".description2").show();
}).mouseout(function() {
    $(this).children(".description2").hide();
});

function tog(v){return v?'addClass':'removeClass';}
$(document).on('input', '.clearable', function(){
    $(this)[tog(this.value)]('x');
}).on('mousemove', '.x', function( e ){
    $(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');
}).on('touchstart click', '.onX', function( ev ){
    ev.preventDefault();
    $(this).removeClass('x onX').val('').change();
});

function swapInputs(){
  var widthInSteps = document.getElementById('width').value;
  var heightInSteps = document.getElementById('height').value;
  document.getElementById('height').value = widthInSteps;
  document.getElementById('width').value = heightInSteps;
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
    // if(document.getElementById('yes-option').checked){
    //   startingFootLength += 2.5;
    // }
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
  document.getElementById('width-result').innerHTML = (width + '\'');
  document.getElementById('height-result').innerHTML = (height + '\'');
  document.getElementById('area-result').innerHTML = (squareFootage + '\'');
  document.getElementById('hypot-result').innerHTML = (hypotenuse + '\'');
  document.getElementById('circum-result').innerHTML = (circumference + '\'');
  var multiplyRate = determineMultiplyRate(width, height);
  convWidthToPixels(width, multiplyRate, 'final-shape');
  convHeightToPixels(height, multiplyRate, 'final-shape');
  $('.bottom-content').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
}

// convert feet into pixels
function convWidthToPixels(shapeSize, multiplyRate, destinationId){
  var convertedSize = shapeSize * multiplyRate;
  document.getElementById(destinationId).style.width = (convertedSize + 'px');
  document.getElementById(destinationId).style.backgroundColor = '#b5e2fa';
}

function convHeightToPixels(shapeSize, multiplyRate, destinationId){
  var convertedSize = shapeSize * multiplyRate;
  document.getElementById(destinationId).style.height = (convertedSize + 'px');
}

function determineMultiplyRate(width, height){
  var multiplyRate = 10;
  var convertedWidthSize = width * multiplyRate;
  var convertedHeightSize = height * multiplyRate;
  while(convertedHeightSize < 230){
    multiplyRate = multiplyRate * 2;
    convertedWidthSize = width * multiplyRate;
    convertedHeightSize = height * multiplyRate;
  }
  while(convertedWidthSize > 300 || convertedHeightSize > 150){
    multiplyRate = multiplyRate / 1.01;
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
  document.getElementById('width-result').innerHTML = ('0\'');
  document.getElementById('height-result').innerHTML = ('0\'');
  document.getElementById('area-result').innerHTML = ('0\'');
  document.getElementById('hypot-result').innerHTML = ('0\'');
  document.getElementById('circum-result').innerHTML = ('0\'');
  convWidthToPixels(0, 0, 'final-shape');
  convHeightToPixels(0, 0, 'final-shape');
  $('.bottom-content').css({"visibility":"hidden"});
}
