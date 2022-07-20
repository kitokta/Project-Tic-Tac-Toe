//GAMEBOARD MODULE
const gameBoard = (() => {
    const create = () => {
        const board = document.getElementsByClassName('board-square');
        return board;
    }

    const checkScores = (arr, values) => {
        return values.every(value => {
            return arr.includes(value);
          });
    }
    
    const checkFields = (human, IA) => {
        //Wincons
        const winCons = [[0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6]];

        //Human
        let humanIndex = [];
        //For each cell that was played by the human player we push its index to another array so we can test all win cons later
        human.played.forEach((cell, index) => {
            if (cell === '1') {
                humanIndex.push(index);
            }
        });
            for(let i=0; i<winCons.length; i++) {
                if(checkScores(humanIndex, winCons[i])){
                    for(let c=0; c <winCons[i].length; c++){
                        const square = document.getElementById(`${winCons[i][c]}`);
                        square.style.borderColor = "#0680FF"
                        square.style.borderWidth = "2.2px"
                    }
                    human.winner = true;
                }
            }

            if(human.winner == true) {
                    const winMessage = document.createElement('h1');
                    winMessage.textContent = `Congratulations! ${human.name} have won!`
                    winMessage.style.paddingBottom = "65px"
                    winMessage.style.color = "#0680FF"
                    const contentBody = document.getElementById('content');
                    return contentBody.prepend(winMessage), setTimeout("location.reload(true);",5000);
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
        for(let i=0; i<8; i++) {
            if (checkScores(iaIndex, winCons[i])) {
                for(let c=0; c <winCons[i].length; c++){
                    const square = document.getElementById(`${winCons[i][c]}`);
                    square.style.borderColor = "#C73E1D"
                    square.style.borderWidth= "2.2px"
                }
                IA.winner = true;
            }
        }

        if(IA.winner == true) {
            const winMessage = document.createElement('h1');
            winMessage.textContent = `Im Sorry! The ${IA.name} has won!`
            winMessage.style.color = "#C73E1D"
            winMessage.style.paddingBottom = "65px"
            const contentBody = document.getElementById('content');
            return contentBody.prepend(winMessage), setTimeout("location.reload(true);",5000);
        }
        
        //Checking if its a tie
        let checktie = IA.numberOfPlays+human.numberOfPlays
        if(checktie == 9) {
            human.winner = true;
            IA.winner = true;
            const winMessage = document.createElement('h1');
            winMessage.textContent = `ITS A TIE! BETTER LUCK NEXT TIME!`
            winMessage.style.color = "#FF9EAA"
            winMessage.style.paddingBottom = "65px"
            const contentBody = document.getElementById('content');
            return contentBody.prepend(winMessage), setTimeout("location.reload(true);",5000);
        }
    }

    return { create, checkFields };
})(); 

//PLAYER CLASS
class Player {
    constructor(name, marker) {
        this.name = name;
        this.marker = marker;
        this.played = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        this.numberOfPlays = 0;
        this.winner = false
    }
}


//UI TASKS CLASS
class uiTask {
    static game(human, IA) {
        const board = gameBoard.create();
        const boardBox = document.getElementById('game-board');
        boardBox.classList.add("show");
       
        if(human.marker=="X"){
            for (let i = 0; i < board.length; i++) {
                board[i].addEventListener('click', () => {
                    if(board[i].innerText==""){
                        //Human Play
                        board[i].innerText = `${human.marker}`;
                        human.played[i] = "1";
                        human.numberOfPlays++;
                        if(human.winner != true && IA.winner != true) gameBoard.checkFields(human, IA);
                        //IA only stop playing when finds a blank space to play.
                        //IA easyPlay
                        //IA only plays if there is not already a winner
                        if(human.winner != true && IA.winner != true){
                            for(let i=0; i< board.length; i++){
                                let easyPlay = Math.floor(Math.random() * board.length);
                                if(board[easyPlay].innerText==""){
                                    board[easyPlay].innerText = `${IA.marker}`;
                                    IA.played[easyPlay] = "1"
                                    IA.numberOfPlays++;
                                    i = board.length;
                                }
                            }
                        }
                    }
                    //Timeout to show player and IA inputs before testing the fields for wincons or tie!
                    //Testing if there isnt already a winner
                    if(human.winner != true && IA.winner != true) setTimeout(gameBoard.checkFields, 300, human, IA);
                });
            }
        }

        else {
            setTimeout(uiTask.firstPlay, 300, IA, board);
            for (let i = 0; i < board.length; i++) {
                board[i].addEventListener('click', () => {
                    if(board[i].innerText==""){
                        //Human Play
                        board[i].innerText = `${human.marker}`;
                        human.played[i] = "1";
                        human.numberOfPlays++;
                        if(human.winner != true && IA.winner != true) gameBoard.checkFields(human, IA);
                            //IA only stop playing when finds a blank space to play.
                            //IA easyPlay
                            //IA only plays if there is not already a winner
                        if(human.winner != true && IA.winner != true){
                            for(let i=0; i< board.length; i++){
                                let easyPlay = Math.floor(Math.random() * board.length);
                                if(board[easyPlay].innerText==""){
                                    board[easyPlay].innerText = `${IA.marker}`;
                                    IA.played[easyPlay] = "1"
                                    IA.numberOfPlays++;
                                    i = board.length;
                                }
                            }
                        }
                    }
                    //Timeout to show player and IA inputs before testing the fields for wincons or tie!
                    //Testing if there isnt already a winner
                    if(human.winner != true && IA.winner != true) setTimeout(gameBoard.checkFields, 300, human, IA);
                });
            }
        }
    }

    static firstPlay(IA, board) {
        //IA easyPlay
        let easyPlay = Math.floor(Math.random() * board.length);
        if(board[easyPlay].innerText==""){
            board[easyPlay].innerText = `${IA.marker}`;
            IA.played[easyPlay] = "1"
            IA.numberOfPlays++;
        }
    }
}



//EVENTS: START GAME
const button = document.querySelector('button');
const contentBox = document.querySelector('content');
button.addEventListener('click', () => {
    button.remove();

    //Human value inputs
    let name = prompt("What's your name?")
    if(name=="") {
        alert("Please insert a valid name!");
        setTimeout("location.reload(true);",1);
    }
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

