const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
const currentPos = "@";

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
    let gameOver = false;
    while (!gameOver) {
    this.clear();
    this.print();
    let answer = prompt('Which way? (w, a, s, d) ');
    while (answer !== 'w' && answer !== 'a' && answer !== 's' && answer !== 'd') {
      this.clear();
      this.print();
      console.log('Please enter w, a, s, or d');
      answer = prompt('Which way? (w, a, s, d) ');
    }
    this.move(answer);
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
      default:
        console.log('Please choose w, a, s, or d');
    };
  }

  testLocation() {
    if (this.currentY < 0 || this.currentY > fieldRows-1 ||
    this.currentX < 0 || this.currentX > fieldColumns-1) {
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
    let numHoles;
    let total = rows * columns;
    switch (holeRatio) {
      case 'easy':
        numHoles = total * 0.1;
        break;
      case 'med':
        numHoles = total * 0.25;
        break;
      case 'hard':
        numHoles = total * 0.4;
        break;
      default:
        numHoles = total * 0.25;
    };
    for (let i = 0; i < rows; i++) {
      fieldArray.push(Array(Number(columns)).fill(fieldCharacter));
    };
    fieldArray[0][0] = currentPos;
    // if numHoles > 0 then random number to insert hole
    while (Math.round(numHoles) > 0) {
      let column = Math.floor(Math.random()*columns);
      let row = Math.floor(Math.random()*rows);
      //console.log(`column: ${column}, row: ${row}`)
      if (fieldArray[row][column] !== hole && fieldArray[row][column] !== currentPos) {
        fieldArray[row][column] = hole;
        numHoles--;
      }
    };
    // use random x, y to insert hat if a hole isn't already there
    
    let hatExists = false;
    while (!hatExists) {
      let column = Math.floor(Math.random()*columns);
      let row = Math.floor(Math.random()*rows);
      if (fieldArray[row][column] !== hole && fieldArray[row][column] !== currentPos) {
        fieldArray[row][column] = hat;
        hatExists = true;
      };
    };

    return fieldArray;
  }
};

// limit rows and columns to 30>x>3
let fieldRows = prompt('Please input number of rows: ');
let fieldColumns = prompt('Please input number of columns: ');
let holeRatio = prompt('Please input difficulty (easy, med, hard): ');

//console.log(`rows: ${fieldRows}, columns: ${fieldColumns}, difficulty: ${holeRatio}`);

const randomField = Field.generateField(fieldRows, fieldColumns, holeRatio);
//console.log(randomField);

const myField = new Field(randomField);

/*
const myField = new Field([
  ["@", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);
*/
myField.play();
