//GAMEBOARD MODULE
const gameBoard = (() => {
    const create = () => {
        const board = document.getElementsByClassName('board-square');
        return board;
    }

    const checkFields = (human, IA) => {
       //Human
        let humanIndex = [];
        //For each cell that was played by the human player we push its index to another array so we can test all win cons later
        human.played.forEach((cell, index) => {
            if (cell === '1') {
                humanIndex.push(index);
            }
        });
            //Checking every possibility of Human win
            if ((humanIndex[0] === 0 && humanIndex[1] === 3 && humanIndex[2] === 6)|| (humanIndex[0] === 1 && humanIndex[1] === 4 && humanIndex[2] === 7) || (humanIndex[0] === 2 && humanIndex[1] === 5 && humanIndex[2] === 8) || (humanIndex[0] === 0 && humanIndex[1] === 1 && humanIndex[2] === 2) || (humanIndex[0] === 3 && humanIndex[1] === 4 && humanIndex[2] === 5) || (humanIndex[0] === 6 && humanIndex[1] === 7 && humanIndex[2] === 8) || (humanIndex[0] === 0 && humanIndex[1] === 4 && humanIndex[2] === 8) || (humanIndex[0] === 2 && humanIndex[1] === 4 && humanIndex[2] === 6)) {
                return setTimeout(alert(`${human.name} WINS! CONGRATULATIONS!`), 5),
                setTimeout("location.reload(true);",1);
            }

        //IA
        let iaIndex = [];
        //For each cell that was played by the IA player we push its index to another array so we can test all win cons later
        IA.played.forEach((cell, index) => {
        if (cell === '1') {
            iaIndex.push(index);
        }
        });
            //Checking every possibility of IA win
            if ((iaIndex[0] === 0 && iaIndex[1] === 3 && iaIndex[2] === 6)|| (iaIndex[0] === 1 && iaIndex[1] === 4 && iaIndex[2] === 7) || (iaIndex[0] === 2 && iaIndex[1] === 5 && iaIndex[2] === 8) || (iaIndex[0] === 0 && iaIndex[1] === 1 && iaIndex[2] === 2) || (iaIndex[0] === 3 && iaIndex[1] === 4 && iaIndex[2] === 5) || (iaIndex[0] === 6 && iaIndex[1] === 7 && iaIndex[2] === 8) || (iaIndex[0] === 0 && iaIndex[1] === 4 && iaIndex[2] === 8) || (iaIndex[0] === 2 && iaIndex[1] === 4 && iaIndex[2] === 6)) {
                return setTimeout(alert("THE MACHINE WON! TRY AGAIN!"), 5),
                setTimeout("location.reload(true);",1);
            }
            
        
    }

    return { create, checkFields };
})(); 
     
//UI TASKS CLASS
class uiTask {
    static game(human, IA) {
        const board = gameBoard.create();
        const boardBox = document.getElementById('game-board');
        boardBox.classList.add("show");
       
        for (let i = 0; i < board.length; i++) {
            board[i].addEventListener('click', () => {
                if(board[i].innerText==""){
                    //Human Play
                    board[i].innerText = `${human.marker}`;
                    human.played[i] = "1";
                    human.numberOfPlays++;

                    //IA only stop playing when finds a blank space to play.
                    while(IA.numberOfPlays<human.numberOfPlays){
                        //IA easyPlay
                        let easyPlay = Math.floor((Math.random() * board.length) + 1);
                        if(board[easyPlay].innerText==""){
                            board[easyPlay].innerText = `${IA.marker}`;
                            IA.played[easyPlay] = "1"
                            IA.numberOfPlays++;
                        }
                    }
                }
                setTimeout(gameBoard.checkFields(human, IA), 1000);
            });
        }
    }
}

//PLAYER CLASS
class Player {
    constructor(name, marker) {
        this.name = name;
        this.marker = marker;
        this.played = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        this.numberOfPlays = 0;
    }
}


//EVENTS: START GAME
const button = document.querySelector('button');
const contentBox = document.querySelector('content');
button.addEventListener('click', () => {
    button.remove();

    //Human value inputs
    let name = prompt("What's your name?")
    let marker = prompt("Choose a marker: X or O")
    marker = marker.toUpperCase();
    if(marker!="X" && marker!="O") {
        alert("Please insert a valid marker!");
        setTimeout("location.reload(true);",1);
    }
    const human = new Player(name,marker);

    //IA player inputs
    let iaMarker = "";
    if(marker=="X") iaMarker = "O";
    else  iaMarker = "X";
    const IA = new Player('machine', iaMarker);

    //Starting Game
    uiTask.game(human, IA);
})

