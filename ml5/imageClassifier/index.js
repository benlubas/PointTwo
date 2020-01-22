//! NEED TO RUN ON LIVE SERVER

// // TODO: Load the model so we don't have to wait
// // TODO: Take User input and feed it into the network
// //  TODO: get a shit ton of data from the quickdraw site (processing in processing).
//TODO: Train it with that shit ton of data
//TODO: Make the website look nicer so I can present with it.

const size = 28;
const TOTAL_PX = size ** 2;
let fileNum = 5000; 
const loadedImages = 2000;
const trainingSampleSize = 1800;
const testingSampleSize = 200;

const options = {
  inputs: TOTAL_PX,
  outputs: ["Label"],
  task: "classification",
  debug: "on",
  epochs: 10
};
let net = ml5.neuralNetwork(options);
function load_the_model(name) {
  const files = {
    model: `./models/${name}/model.json`,
    metadata: `./models/${name}/model_meta.json`,
    weights: `./models/${name}/model.weights.bin`
  };
  net.load(files, loaded);
}
function loadData() {
  net.loadData("./data/showcaseData.json", dataLoaded())
}
function dataLoaded() {
  console.log("Data Loaded");
  prepData(10);
}
function loaded() {
  console.log("Model Loaded");
  takeInput();
}
// beginTraining();
