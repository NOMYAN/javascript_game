const prompt = require("prompt-sync")({singint:true});

let input = null;

while(input !=="q"){
    console.log("(w)up, (s)down, (a)left, (d)right, (q)uit.");
    input = prompt("which way would you like to move");
    
    //use switch
    switch (input){
        case "w":
            console.log("You moved up.\n");
            break;
        case "s":
            console.log("You moved down.\n");
            break;
        case "a":
            console.log("You moved left.\n");
            break;
        case "d":
            console.log("You moved right.\n");
            break;
        case "q":
            console.log("Thank you for playing");
            process.exit();
            break;
        default:
            console.log("Unrecognised Input! \n ");
            break;

    }
}
