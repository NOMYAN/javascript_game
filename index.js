// const prompt = require('prompt-sync')({sigint: true});
import promptSync from "prompt-sync";
let prompt = new promptSync();


const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.playerX = 0;
    this.playerY = 0;
  }

  print() {
    this.field.forEach(row => console.log(row.join('')));
  }

  isInBounds(x, y) {
    return x >= 0 && y >= 0 && y < this.field.length && x < this.field[0].length;
  }

  isHat(x, y) {
    return this.field[y][x] === hat;
  }

  isHole(x, y) {
    return this.field[y][x] === hole;
  }

  play() {
    let playing = true;

    while (playing) {
      this.print();
      const move = prompt('Which way? (w/a/s/d): ');

      switch (move) {
        case 'w':
          this.playerY -= 1;
          break;
        case 's':
          this.playerY += 1;
          break;
        case 'a':
          this.playerX -= 1;
          break;
        case 'd':
          this.playerX += 1;
          break;
        default:
          console.log('Invalid input');
          continue;
      }

      if (!this.isInBounds(this.playerX, this.playerY)) {
        console.log('Out of bounds! Game over.');
        playing = false;
      } else if (this.isHole(this.playerX, this.playerY)) {
        console.log('You fell into a hole! Game over.');
        playing = false;
      } else if (this.isHat(this.playerX, this.playerY)) {
        console.log('You found your hat! You win!');
        playing = false;
      } else {
        this.field[this.playerY][this.playerX] = pathCharacter;
      }
    }
  }

  static generateField(height, width, holePercentage = 0.2) {
    const field = new Array(height).fill(0).map(() => new Array(width).fill(fieldCharacter));
    const totalCells = width * height;
    const numHoles = Math.floor(totalCells * holePercentage);

    for (let i = 0; i < numHoles; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * width);
        y = Math.floor(Math.random() * height);
      } while ((x === 0 && y === 0) || field[y][x] === hole);
      field[y][x] = hole;
    }

    let hatX, hatY;
    do {
      hatX = Math.floor(Math.random() * width);
      hatY = Math.floor(Math.random() * height);
    } while ((hatX === 0 && hatY === 0) || field[hatY][hatX] === hole);

    field[hatY][hatX] = hat;
    field[0][0] = pathCharacter;

    return field;
  }
}

const myField = new Field(Field.generateField(10, 10, 0.2));
myField.play();
