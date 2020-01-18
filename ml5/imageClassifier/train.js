// laptops and sharks
let myData = {
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

const countObjAttrs = obj => {
  let count = 0;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      count++;
    }
  }
  return count;
};
const NUM_LABELS = countObjAttrs(myData);

function prepData(epochs) {
  for (let key in myData) {
    const byteData = loadBytes(`./data/${key}${loadedImages}.bin`);
    setTimeout(() => {
      //Okay, so because of this line below not loading on time,
      //I needed to put this on a set timeout. 1500ms seems to work consistantly.
      myData[key].all = byteData.bytes;
      for (let i = 0; i < loadedImages; i++) {
        let c = myData[key].all.subarray(i * TOTAL_PX, i * TOTAL_PX + TOTAL_PX);
        //* testing purposes
        // if (checkInput(c)) {
        if (i < trainingSampleSize) {
          myData[key].training.push([...c]);
        } else {
          myData[key].testing.push([...c]);
        }
        // } else {
        //   console.log("Bad Data");
        //   console.log(myData[key].label);
        // }
      }
    }, 1500);
  }
  // console.log(myData);
  //hate that I have to do it like this. But... oh well.
  // setTimeout(feedData(epochs), 1500 * NUM_LABELS);
  setTimeout(testData(), 1500 * NUM_LABELS);
}

function feedData(epochs) {
  //these two should make all of the possible mins and maxs 0 and 255;
  //without this, the normalized values for some pixles are from 0 to 0, and
  //that results in NaN. Unfortunately, ml5 does not handle this for you.
  myData.triangles.training.push(new Array(TOTAL_PX).fill(0));
  myData.triangles.training.push(new Array(TOTAL_PX).fill(255));
  setTimeout(() => {
    for (let key in myData) {
      let trainingData = myData[key].training;
      for (let i = 0; i < trainingData.length; i++) {
        net.data.addData([...trainingData[i]], [myData[key].label]);
      }
    }
    train(epochs);
  }, 1500);
}
function train(epochs) {
  net.normalizeData();
  net.train({ epochs: epochs }, null, () => {
    // testSomeShit();
    console.log("Model Trained");
  });
}

let correct = 0;
let confidence = 0;
let total = 0;

function testData() {
  console.log(myData);
  setTimeout(() => {
    for (key in myData) {
      let testData = myData[key].testing;
      console.log(testData);
      for (let i = 0; i < testData.length; i++) {
        net.classify(testData[i], (err, res) => {
          if (err !== undefined) {
            throw err;
          } else {
            if (res[0].label === myData[key].label) {
              correct += 1;
            }
            confidence += res[0].confidence;
            total++;
          }
        });
      }
    }
    logTestResults();
  }, 1500);
}
function logTestResults() {
  results = {
    correct: correct,
    total: total,
    avgCorrect: correct / total,
    avgConfidence: confidence / total
  };
  console.log(results);
}
//* This is also only for testing.
// function testSomeShit() {
//   for (let key in myData) {
//     for (let i = 0; i < 10; i++) {
//       net.classify(myData[key].testing[i], (err, res) => {
//         if (err === undefined) {
//           console.log(res[0]);
//         }
//       });
//     }
//   }
// }

//* this is for testing only.
// function checkInput(array) {
//   let notAll0 = false;
//   let clean = true;
//   for (let i = 0; i < array.length; i++) {
//     if (!Number.isInteger(array[0])) {
//       clean = false;
//       console.log("Unclean Data: ", array[0]);
//       break;
//     }
//     if (array[i] !== 0) {
//       // return true;
//       notAll0 = true;
//     }
//   }
//   return clean && notAll0;
//   // return false;
// }

//this should just be called from the console.
function saveModel(name) {
  net.save(name);
}
