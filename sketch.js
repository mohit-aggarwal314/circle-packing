// Change Image Source for your picture!
var imgSource = "data/albert-einstein-quotes-jpg.jpg";

var totalAttempts = 10000; //Number of attempts to add a circle before giving up
var circlePerUpdate = 10; //Every frame how many circles to add
var totalCircles = 2500; // 0 = infinity, Number = max circles

var circles;
var img;

function preload() {
  img = loadImage(imgSource);
}

function setup() {
  img.resize(700, 650);
  createCanvas(700, 650);
  var density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  circles = [];
}



function draw() {
  background(0);

  var count = 0;
  var attempts = 0;

  if (totalCircles == 0 || circles.length < totalCircles) {
    while (count < circlePerUpdate) {
      var newC = newCircle();
      if (newC !== null) {
        circles.push(newC);
        count++;
      }
      attempts++;
      if (attempts > totalAttempts) {
        noLoop();
        console.log("finished");
        break;
      }
    }
  }

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
          if (circle !== other) {
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;

            if (d - 1 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }

    circle.show();
    circle.grow();
  }
}

function newCircle() {
  var x = random(0, img.width);
  var y = random(0, img.height);

  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d - 2 < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    var index = (int(x) + int(y) * img.width) * 4;
    var r = img.pixels[index];
    var g = img.pixels[index + 1];
    var b = img.pixels[index + 2];
    var c = color(r, g, b);
    return new Circle(x, y, color(c));
  } else {
    return null;
  }
}
