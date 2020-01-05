function Snake(x, y, len) {
  this.x = x;
  this.y = y;
  this.len = len;
  this.xDir = 1;
  this.yDir = 0;
  this.moving = [1, 0];
  this.growPer = gamerule.lengthGain;
  this.growing = 0;
  this.positions = [];
}
Snake.prototype.synth = function(move) {
  this.yDir = move.y;
  this.xDir = move.x;
};

Snake.prototype.move = function() {
  if (k.w && (this.moving[1] != 1 || this.len == 1)) {
    this.yDir = -1;
    this.xDir = 0;
  }
  if (k.a && (this.moving[0] != 1 || this.len == 1)) {
    this.xDir = -1;
    this.yDir = 0;
  }
  if (k.s && (this.moving[1] != -1 || this.len == 1)) {
    this.yDir = 1;
    this.xDir = 0;
  }
  if (k.d && (this.moving[0] != -1 || this.len == 1)) {
    this.xDir = 1;
    this.yDir = 0;
  }
  // console.log(this.xDir);
  // console.log(this.yDir);
};
Snake.prototype.update = function(foodPos) {
  this.positions.push(new Point(this.x + this.xDir, this.y + this.yDir));
  this.x += this.xDir;
  this.y += this.yDir;
  this.moving = [this.xDir, this.yDir];
  // console.log(this.positions);
  // if the head is on some food.
  if (this.positions.includesPoint(foodPos)) {
    this.growing = this.growPer.random();
    this.len++;
    foodExists = false;
  }

  if (this.growing <= 0) this.positions.splice(0, 1);
  else {
    this.growing--;
  }
};
