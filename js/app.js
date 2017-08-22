var selectedColor = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var userMouseLocation;
var userIsDrawing = false;

//When clicking on control list items
$(".controls").on("click", "li", function() {
  //Deselect sibling elements
  $(this).siblings().removeClass("selected");
  //Select clicked element
  $(this).addClass("selected");
  //Cache current color
  selectedColor = $(this).css("background-color");
});

//When "New Color" button is pressed
$("#revealColorSelect").click(function() {
  //Show or hide color selecter
  changeColor();
  $("#colorSelect").toggle();
});

//Update the new color span
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
}

//When color sliders change
$("input[type=range]").change(changeColor);

//When "Add Color" button is pressed
$("#addNewColor").click(function() {
  //Append the color to the ul
  var $newAddedColor = $("<li></li>")
  $newAddedColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newAddedColor);
  //Select the new color
  $newAddedColor.click();
});

//NOTE: document.getElementsByTagName("canvas")[0]; is the same as: $("canvas")[0] aka var context;

//On mouse event on the canvas
$canvas.mousedown(function(coordinates) {
  userMouseLocation = coordinates;
  userIsDrawing = true;
}).mousemove(function(coordinates) {
  //Draw lines
  if(userIsDrawing) {
    context.beginPath();
    context.moveTo(userMouseLocation.offsetX, userMouseLocation.offsetY);
    context.lineTo(coordinates.offsetX, coordinates.offsetY);
    context.strokeStyle = selectedColor;
    context.stroke();
    userMouseLocation = coordinates;
  }
}).mouseup(function() {
  userIsDrawing = false;
}).mouseleave(function() {
  $canvas.mouseup();
});
