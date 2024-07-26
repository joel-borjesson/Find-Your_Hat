const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
const currentPos = "@";
let move;
let gameOver = false;

class Field {
  constructor(fieldArr) {
    this.field = fieldArr;
    this._currentX = 0;
    this._currentY = 0;
  }

  get currentX() {
    return this._currentX;
  }

  set currentX(move) {
    this._currentX = move;
  }

  set currentY(move) {
    this._currentY = move;
  }

  get currentY() {
    return this._currentY;
  }

  print() {
    let j = 0;
    for (j; j < this.field.length; j++) {
      console.log(this.field[j].join(""));
    }
  }

  clear() {
    let lines = process.stdout.getWindowSize()[1];
    for (let i=0; i < lines; i++) {
    console.log('\r\n');
    }
  }

  play() {
    while (!gameOver) {
    this.clear();
    this.print();
    this.move(prompt('Which way? (w, a, s, d) '));
    gameOver = this.testLocation();
    }
    this.print();
  }

  move(move) {
    this.field[this.currentY][this.currentX] = pathCharacter;
    switch (move) {
      case 'w':
        this.currentY--;
        break;
      case 'a':
        this.currentX--;
        break;
      case 's':
        this.currentY++;
        break;
      case 'd':
        this.currentX++;
        break;
    };
  }

  testLocation() {
    if (this.currentY < 0 || this.currentY > this.field.length-1 ||
    this.currentX < 0 || this.currentX > this.field.length-1) {
      this.clear();
      console.log('Edge of flat earth found. Welcome to the void.')
      return true;
    }
    else {
      switch (this.field[this.currentY][this.currentX]) {
        case hole:
          this.clear();
          console.log('And we break our neck over here.')
          this.field[this.currentY][this.currentX] = currentPos;
          return true;
          break;
        case hat:
          this.clear();
          console.log('Got yer hat!')
          this.field[this.currentY][this.currentX] = currentPos;
          return true;
          break;
      }
      this.field[this.currentY][this.currentX] = currentPos;
    }
    return false;
  }

  static generateField(rows, columns, holeRatio) {
    const fieldArray = [];
    // rows * columns = total cells
    // holeRatio = total * 0.x

    // use buffer to fill with field characters first
    // if holes > 0 then random number to insert hole
    // after field is generated, use random x, y to insert hat, insert charposition at [0][0]
    
    // outter for loop to create a row

    // inner for loop to fill row with columns
  }
};

const myField = new Field([
  ["@", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);
myField.play();
