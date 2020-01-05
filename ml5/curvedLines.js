const canvasWidth = 400;
const canvasHeight = 400;
createCanvas(canvasWidth, canvasHeight);
let con = getCon();
const options = {
  inputs: ["x", "y"],
  outputs: 1,
  type: "regression"
};
const net = ml5.neuralNetwork(options);

const solution = function(x, y) {
  return 1 * (y > f(x));
};
const check = (net, actual) => {
  if ((net > 0.5 && actual > 0.5) || (net < 0.5 && actual < 0.5)) {
    return true;
  }
  return false;
};
const f = function(x) {
  let a = 0.005;
  let b = 200;
  let c = 150;
  return a * Math.pow(x - b, 2) + c;
};

const drawGraph = () => {
  let previous = new Point(0, f(0));
  for (let x = 0; x < 400; x++) {
    previous.lineTo(new Point(x, f(x)));
    previous = new Point(x, f(x));
  }
};
for (let i = 0; i < 500000; i++) {
  let d = [ran(0, canvasWidth), ran(0, canvasHeight)];
  net.data.addData(d, [solution(...d)]);
}
background("black");
drawGraph(0);
net.data.normalize();
console.log("Training");
net.train(() => {
  console.log("Done Training");
  const trainedLoop = setInterval(() => {
    let pt = new Point(ran(0, canvasWidth), ran(0, canvasHeight));
    net.predict([pt.x, pt.y], (err, res) => {
      begin();
      con.arc(pt.x, pt.y, 2, 0, Math.PI * 2, true);
      fill(check(res[0].value, solution(pt.x, pt.y)) ? "green" : "red");
      end();
    });
  }, 1000 / 60);
});
