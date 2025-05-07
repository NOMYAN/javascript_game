const prompt = require('prompt-sync')({sigint: true});

// Constant Game Elements
const HAT = '^';
const HOLE = 'O';
const GRASS = '░';
const PLAYER = '*';

// Constants Game Scenarios (Messages)
const WIN = "Congratulations! You win!";                                    /* WIN */
const LOSE = "You lose!";                                                   /* LOSE */
const OUT_BOUND = "You are out of the field.";                              /* OUT OF BOUNDS */
const INTO_HOLE = "You fell into a hole";                                   /* FALLEN INTO HOLE */
const WELCOME = "Welcome to Find Your Hat game";                            /* START OF GAME WELCOME MESSAGE */
const DIRECTION = "Which direction, up(u), down(d), left(l) or right(r)?";  /* KEYBOARD DIRECTIONS */
const QUIT = "Press q or Q to quit the game.";                              /* KEYBOARD TO QUIT THE GAME */
const END_GAME = "Game Ended. Thank you.";                                  /* ENDED THE GAME */
const NOT_RECOGNISED = "Input not recognised.";                             /* INPUT NOT RECOGNISED */

class Field {
  
    // constructor
    constructor(rows, cols){
        this.rows = rows;                           /* property to set up the number of rows for the field */
        this.cols = cols;                           /* property to set up the number of cols for the field */
        this.field = new Array([]);                 /* property that represents the field for game */
        this.gamePlay = false;                      /* property to setup the game play */
    }

    // methods

    // Welcome Message
    static welcomeMsg(msg){
        console.log(
            "\n**********************************************\n" +
            msg
            + "\n**********************************************\n"
        );
    }

    //
    // !! FOR THE ASSESSMENT
    // TODO RANDOMISE THE FIELD WITH HAT, HOLE AND GRASS
    // * TODO THE NUMBER OF HOLES CREATED SHOULD PROVIDE SUFFICIENT CHALLENGE FOR THE GAME
    // * TODO THE HOLES SHOULD NOT BLOCK THE PLAYER FROM MOVING AT THE START OF THE GAME
    // Generate the game's field
    generateField() {
        // Generate empty field with grass
        for (let i = 0; i < this.rows; i++) {
            this.field[i] = new Array();
            for (let j = 0; j < this.cols; j++) {
                this.field[i][j] = GRASS;
            }
        }
    
        // Place hat at random position (not at start)
        let hatRow, hatCol;
        do {
            hatRow = Math.floor(Math.random() * this.rows);
            hatCol = Math.floor(Math.random() * this.cols);
        } while (hatRow === 0 && hatCol === 0);
        this.field[hatRow][hatCol] = HAT;
    
        // Place holes (about 20% of the field)
        const holeCount = Math.floor(this.rows * this.cols * 0.2);
        for (let i = 0; i < holeCount; i++) {
            let holeRow, holeCol;
            do {
                holeRow = Math.floor(Math.random() * this.rows);
                holeCol = Math.floor(Math.random() * this.cols);
            } while ((holeRow === 0 && holeCol === 0) || 
                     (holeRow === hatRow && holeCol === hatCol) ||
                     this.field[holeRow][holeCol] === HOLE);
            this.field[holeRow][holeCol] = HOLE;
        }
    }
    //

    // Print out the game field
    printField(){
        this.field.forEach((element) => {
            console.log(element.join(""));
        });
    }

    // Start game
    startGame(){                                                    /* Start the game */
        this.gamePlay = true;
        this.generateField(this.rows, this.cols);                   /* Generate the field first */
        this.field[0][0] = PLAYER;                                  /* Set the start position of the character */                                       
        this.printField();                                          /* Print the field once */
        this.updateGame();                                          /* Update the game once */
    }

    // Update game
    updateGame(){                                                   /* Update the game */

        // Obtain user input
        let userInput = "";
        
        // Get the user's direction
        do {
            console.log(DIRECTION.concat(" ", QUIT));               /* Request for the user's input */
            userInput = prompt();                                   /* Get the user's input */
            
            switch (userInput.toLowerCase()) {                      /* Update the position of the player */
                case "u":
                case "d":
                case "l":
                case "r":
                    this.updatePlayer(userInput.toLowerCase());     /* user has pressed "u", "d", "l", "R" */
                    break;
                case 'q':
                    this.endGame();                                 /* user has quit the game */
                    break;
                default:
                    console.log(NOT_RECOGNISED);                    /* input not recognised */
                    break;
            }            
            
            this.printField();                                      /* Print field */
            
        } while (userInput.toLowerCase() !== "q");                  /* Continue to loop if the player hasn't quit */
    }

    // End game
    endGame(){
        console.log(END_GAME);                                      /* Inform the user the game has ended */
        this.gamePlay = false;                                      /* set gamePlay to false */
        process.exit();                                             /* Quit the program */
    }

    // Update the player's movement and game condition
    updatePlayer(position){
        
        // !! FOR THE ASSESSMENT
        // TODO FIRST update the player's position in the field
        
        // TODO THEN check if the player has fallen into hole - if yes (LOSE) and endGame()
        // TODO THEN check if the player has gotten out of bounds - if yes (LOSE) and endGame()
        // TODO THEN check if the player has found the hat - if yes (WIN) and endGame()

    // Find current player position
    let currentRow, currentCol;
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            if (this.field[i][j] === PLAYER) {
                currentRow = i;
                currentCol = j;
                break;
            }
        }
    }

    // Calculate new position based on direction
    let newRow = currentRow;
    let newCol = currentCol;
    
    switch (position) {
        case 'u': newRow--; break;
        case 'd': newRow++; break;
        case 'l': newCol--; break;
        case 'r': newCol++; break;
    }

    // Check if new position is out of bounds
    if (newRow < 0 || newRow >= this.rows || newCol < 0 || newCol >= this.cols) {
        console.log(OUT_BOUND);
        console.log(LOSE);
        this.endGame();
        return;
    }

    // Check if new position is a hole
    if (this.field[newRow][newCol] === HOLE) {
        console.log(INTO_HOLE);
        console.log(LOSE);
        this.endGame();
        return;
    }

    // Check if new position is the hat
    if (this.field[newRow][newCol] === HAT) {
        console.log(WIN);
        this.endGame();
        return;
    }

    // Update player position
    this.field[currentRow][currentCol] = GRASS;
    this.field[newRow][newCol] = PLAYER;
}

        
    }

// Static method to welcome the player
Field.welcomeMsg(WELCOME);

const ROWS = 10;
const COLS = 10;
const field = new Field(ROWS, COLS);                                /* Declaring and creating an instance of Field class */
field.startGame();                                                  /* Start the game */