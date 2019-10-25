class Neuron {
  weights = [];
  c = .005;

  constructor(n) {
    for (let i = 0; i < n; i++) {
      this.weights[i] = random(-1, 1);
    }
  }
  static activate(n) {
    return -1 + (n < 0) * 2;
  }

  feedForward(inputs) {
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      sum += this.weights[i] * inputs[i];
    }
    console.log("SUM:" + sum);
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


class DeepNetwork {
  input = [];
  hidden = [];
  output = [];

  constructor(i, h, o) {
    for (let x = 0; x < i; x++) {
      this.input.push(new Neuron(1)); // input layers have one input each. 
    }
    //hidden layers
    for (let x = 0; x < h; x++) {
      this.hidden.push(new Neuron(this.input.length + 1));
    }
    // output layers
    for (let x = 0; x < o; x++) {
      this.output.push(new Neuron(this.hidden.length + 1));
    }
  }

  draw(pos) {
    let radius = 15;
    let largestH = Math.max(this.hidden.length, Math.max(this.input.length, this.output.length)) * radius * 3;

    let iy = largestH / 2 - this.input.length * radius * 1.5; 
    let hy = largestH / 2 - this.hidden.length * radius * 1.5; 
    let oy = largestH / 2 - this.output.length * radius * 1.5; 
    
    for (let i = 0; i < this.input.length; i++) {
      circle(false, pos.x, pos.y + iy + i * radius * 3, radius, 'black', 1);
      for(let j = 0; j < this.hidden.length; j++){

      }
    }
    for (let i = 0; i < this.hidden.length; i++) {
      circle(false, pos.x + radius * 4, pos.y + hy + i * radius * 3, radius, 'black', 1);
    }
    for (let i = 0; i < this.output.length; i++) {
      circle(false, pos.x + radius * 8, pos.y + oy + i * radius * 3, radius, 'black', 1);
    }
  }
}