//! NEED TO RUN ON LIVE SERVER

const size = 28;
const TOTAL_PX = size ** 2;
const loadedImages = 1000;
const trainingSampleSize = 800;
const testingSampleSize = 200;

let myData = {
  pucks: {
    label: "Hockey Puck",
    all: [],
    training: [],
    testing: []
  },
  hexagons: {
    label: "Hexagon",
    all: [],
    training: [],
    testing: []
  },
  triangles: {
    label: "Triangle",
    all: [],
    training: [],
    testing: []
  },
  rackets: {
    label: "Tennis Racket",
    all: [],
    training: [],
    testing: []
  }
};
const NUM_LABELS = countObjAttrs(myData);

const options = {
  input: TOTAL_PX,
  output: ["Label"],
  type: "classification",
  debug: "on",
  epochs: 30
};
let net = ml5.neuralNetwork(options);

function preload() {
  for (let key in myData) {
    const byteData = loadBytes(`./data/${key}${loadedImages}.bin`);
    setTimeout(() => {
      //Okay, so because of this line below not loading on time,
      //I needed to put this on a set timeout. 1500ms seems to work consistantly.
      myData[key].all = byteData.bytes;
      for (let i = 0; i < loadedImages; i++) {
        if (i < trainingSampleSize) {
          myData[key].training.push(
            myData[key].all.subarray(i * TOTAL_PX, i * TOTAL_PX + TOTAL_PX)
          );
        } else {
          myData[key].testing.push(
            myData[key].all.subarray(i * TOTAL_PX, i * TOTAL_PX + TOTAL_PX)
          );
        }
      }
    }, 1500);
  }
  //hate that I have to do it like this. But... oh well.
  setTimeout(feedData(), 1500 * NUM_LABELS);
}
function setup() {}

function feedData() {
  setTimeout(() => {
    for (let key in myData) {
      let a = myData[key].training;
      for (let i = 0; i < myData[key].training.length; i++) {
        net.data.addData(a[i], [myData[key].label]);
      }
    }
    train();
  }, 1500);
}
function train() {
  net.normalizeData();
  net.train(() => {
    console.log("done");
  });
}
