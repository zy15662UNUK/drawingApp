// code structure:
// declare variables:
  // paintingErasing(bool),
  // painting(T) or erasing(F),
  // get the canvas and context,
  // get the canvas container(HTML for mouse event)
  // mousePosition
// Onload load saved workfrom local storage
// set drawing parameters(lineWidth, lineHeight,lineCap)
// click inside container
// Move the mouse while holding mouse key
// Mouse up -> Not painting or erasing any more
// Leave container->Not paint any more
// Click reset button
// click save button
// click erase button
// change clolor input
// change lineWidth with slider
// functions


function init(){
  var
  paintingErasing = false,
  paintOrNot = false,
  mousePosition= [0,0],
  lineWidth = 1,
  lineColor = "#ff0000",
  lineCap,
  lineJoin,
  canvas,
  context;
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  if(localStorage.getItem("imgCanvas") != null){
		window .alert("x is there and it is equal to"+localStorage.getItem("imgCanvas"));
		var img = new Image();
		// img constructor

		img.onload = function(){
			context.drawImage(img,0,0);
		};
		//when img finishing loading, draw it on the canvas

		img.src = localStorage.getItem("imgCanvas");
		// Set the source of the img
	}
  // change lineWidth with slider
  $("#slider").slider({
    min: 1,
    max: 30,
    slide: function(e,ui){
      $(".size-example").width(ui.value);
      $(".size-example").height(ui.value);
      lineWidth = ui.value;
      console.log(lineWidth);
    }
  });
  // change color input
  $("#color-input").change(function(event) {
    lineColor = $("#color-input").val();
    console.log(lineColor);
  });
  $(".pen").click(function(event) {
    paintOrNot = true;
  });

  // click erase button
  $(".rubber").click(function(event) {
    paintOrNot = false;
  });

  // Move the mouse while holding mouse key
  $(".canvas-container").mousedown(function(event) {
    paintingErasing = true;
    mousePosition = [event.pageX-this.offsetLeft, event.pageY-this.offsetTop];
  // initiate drawing
    context.beginPath();

  // define the starting point
    context.moveTo(mousePosition[0]/5,mousePosition[1]/3.5);
  });

  // Mouse up -> Not painting or erasing any more
  $(".canvas-container").mouseup(function(event) {
    paintingErasing = false;
  });
  $(".canvas-container").mousemove(function(event) {
    if(paintingErasing){
      mousePosition = [event.pageX-this.offsetLeft, event.pageY-this.offsetTop];
      context.lineCap = "round";
      context.lineJoin = "round";
      if(paintOrNot){
        context.strokeStyle = lineColor;
        context.lineWidth = lineWidth;
      }
      else{
        context.strokeStyle = "white";
        context.lineWidth = 30;
      }
      // event.pageX-this.offsetLeft is to
      // get the mouse distance to the container border
      context.lineTo(mousePosition[0]/5,mousePosition[1]/3.5);
      // For some unknown reasons, the change in mousePosition
      // is much faster than the actual chang in cursor
      // By try&error, I found the denominator value to
      // which makes them move in roughly the same speed
      context.stroke();
    }
  });
  // Reset button
  $('.reset').click(function(){
  	context.clearRect(0,0,canvas.width,canvas.height);
  	//0, 0 is the top left, canvas.width,canvas.height is the left bottom
  	paintOrNot = true;
  });

  //Save button
  $(".save").click(function(){
  	if(typeof(localStorage) != null){
  	localStorage.setItem("imgCanvas",canvas.toDataURL());
  	// "imgCanvas" will be our variable, canvas.toDataURL() is the value we store in variable "imgCanvas";

  	window.alert(localStorage.getItem("imgCanvas"));
  	// return url message of the graphical information

  	}else{
  	window.alert("your browser does not support local storage");
  	//in case doesnot support the local storage
  	}
  });
}
init();
