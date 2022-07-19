//GAMEBOARD MODULE
const gameBoard = (() => {
    const create = () => {
        const board = document.getElementsByClassName('board-square');
        return board;
    }

    const checkBoard = () => {
        
    }
    return { create };
})(); 
     
//UI TASKS CLASS
class uiTask {
    static game(human, IA) {
        const board = gameBoard.create();
        const boardBox = document.getElementById('game-board');
        boardBox.classList.add("show");
        // for (const square of board) {
        //     square.addEventListener('click', (e) => {
        //         square.innerText = "O";
        //     });
        // }
        // ou
        for (let i = 0; i < board.length; i++) {
            board[i].addEventListener('click', () => {
                if(board[i].innerText==""){
                board[i].innerText = `${human.marker}`;
                human.played[i] = "1";
                }
            });
        }
    }
}



//PLAYER CLASS
class Player {
    constructor(name, marker) {
        this.name = name;
        this.marker = marker;
        this.played = ['', '', '', '', '', '', '', '', ''];
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

