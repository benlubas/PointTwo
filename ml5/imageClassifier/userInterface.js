const cellWidth = 10;
const cWidth = 28 * cellWidth;
const cHeight = cWidth;
const takeInput = () => {
  console.log("Take Input");
  createCanvas(cWidth, cHeight);
  background(255);

  let previous;
  const drawLoop = setInterval(() => {
    if (mouseIsPressed) {
      if (previous !== undefined) {
        stroke(0);
        strokeWeight(6);
        line(previous.x, previous.y, mouseX, mouseY);
      }
      fill(0);
      strokeWeight(0);
      circle(mouseX, mouseY, 3);
      previous = { x: mouseX, y: mouseY };
    } else {
      previous = undefined;
    }
  }, 1000 / 60);
};
function setup() {}
function keyPressed() {
  if (keyCode == 67) {
    //clear the canvas
    background(255); //c
  } else if (keyCode == 80) {
    take_a_guess(); //p
  } else if (keyCode == 84) {
    let testResults = testData(); //t
    console.log(testResults);
  }
}
function take_a_guess() {
  let img = get();
  img.resize(28, 28);
  img.loadPixels();
  let arr = [];
  for (let i = 0; i < img.pixels.length; i += 4) {
    arr.push(255 - img.pixels[i]);
  }
  net.classify(arr, (err, res) => {
    if (err !== undefined) {
      throw err;
    } else {
      $node = $("<div></div>");
      $node.html(
        "<p>Prediction: " +
          res[0].label +
          "</p><p>Confidence: " +
          res[0].confidence +
          " </p>"
      );
      $(".results").html($node);
    }
  });
}
