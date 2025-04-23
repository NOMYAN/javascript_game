const prompt = require("prompt-sync")();

const GRASS = "░";
const HOLE = "0";
const HAT = "^";
const PLAYER = "*";

const rows = 20;
const cols= 20;
//the initialisation

const field = []; //Create an array for the game field

/*  populate the game field as as 2D array - using Math.random()
 via nested loops 
 Note: Math.random() generates random numbers ranging from 0 - 0.999999
 */


for(let i=0; i<rows; i++){
    field[i] =[];                  // same as field = new Array();
    for(let j=0; j<cols; j++){  //popuate the columns in each field's row
        field[i][j] = Math.random() > 0.2 ? GRASS: HOLE;
    }
}

field[0][0] = PLAYER;          //populate PLAYER at the start of the game

for (let row of field){
    console.log (row.join(""));
}