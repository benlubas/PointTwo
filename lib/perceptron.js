class Neuron {
  weights = [];
  c = .005;

  constructor(n) {
    for (let i = 0; i < n; i++) {
      this.weights[i] = random(-1, 1);
    }
  }
  //this works for the single perceptron.
  static activate(n) {
    return -1 + (n < 0) * 2;
  }
  

  feedForward(inputs) {
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      // console.log("Weights:" + this.weights[i], "Inputs: " + inputs[i]);
      sum += this.weights[i] * inputs[i];
    }
    // console.log("SUM:" + sum);
    return Neuron.activate(sum);
  }

  train(inputs, desired) {
    let guess = this.feedForward(inputs);
    let error = guess - desired;
    console.log(error);
    for (let i = 0; i < this.weights.length - 1; i++) {
      this.weights[i] += (error * this.c * inputs[i]);
    }
    return guess;
  }
  printInfo() {
    console.log(this)
  }

}
