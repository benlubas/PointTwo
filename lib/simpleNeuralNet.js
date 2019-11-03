class Neuron {
  weights = [];
  c = .005;

  constructor(n) {
    for (let i = 0; i < n; i++) {
      this.weights[i] = random(-1, 1);
    }
  }
  //this works for the single perceptron.
  // static activate(n) {
  //   return -1 + (n < 0) * 2;
  // }
  //but we're upping our game and using a sigmoid function
  static activate(n){
    return 1/(1 + Math.pow(Math.E, -n))
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
  go(list){
    let bias = 1; 
    list.push(bias); 
    let r1 = []; 
    for(let i = 0; i < this.input.length; i ++){
      r1.push(this.input[i].feedForward(list[i])); 
    }
    r1.push(bias);
    let r2 = []; 
    for(let i = 0; i < this.hidden.length; i++){
      r2.push(this.hidden[i].feedForward(r1)); 
    }
    r2.push(bias);
    let r3 = []; 
    for(let i = 0; i < this.output.length; i++){
      r3.push(this.output[i].feedForward(r2)); 
    }

    return r3; 
  }

  

  draw(pos) {
    let radius = 15;
    let largestH = Math.max(this.hidden.length, Math.max(this.input.length, this.output.length)) * radius * 3;
    let iy = largestH / 2 - this.input.length * radius * 1.5; 
    let hy = largestH / 2 - this.hidden.length * radius * 1.5; 
    let oy = largestH / 2 - this.output.length * radius * 1.5; 
    
    for (let i = 0; i < this.input.length; i++) { // draw input layer circles
      circle(false, pos.x, pos.y + iy + i * radius * 3, radius, 'black', 1);
      for(let j = 0; j < this.hidden.length; j++){ // draw input to hidden connections
        new Point(pos.x + radius, pos.y + iy + i * radius * 3)
        .lineTo(new Point(pos.x + radius * 5, pos.y + hy + j * radius * 3), 
          this.hidden[j].weights[i] > 0 ? "#0000FF":"#FF0000",  //color of the line. 
          this.hidden[j].weights[i] //alpha value of the line. 
        )
        console.log(this.hidden[j].weights[i]); 
      }
    }
    for (let i = 0; i < this.hidden.length; i++) {
      circle(false, pos.x + radius * 6, pos.y + hy + i * radius * 3, radius, 'black', 1);
      for (let j = 0; j < this.output.length; j++) { // draw input to hidden connections
        new Point(pos.x + radius * 7, pos.y + hy + i * radius * 3)
        .lineTo(new Point(pos.x + radius * 11, pos.y + oy + j * radius * 3), 
        this.output[j].weights[i] > 0 ? "#0000FF":"#FF0000", //color of the line.
        this.output[j].weights[i]  //alpha value of the line
        )
      }
    }
    for (let i = 0; i < this.output.length; i++) {
      circle(false, pos.x + radius * 12, pos.y + oy + i * radius * 3, radius, 'black', 1);
    }
  }
}