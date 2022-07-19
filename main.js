

//GAMEBOARD MODULE
const gameBoard = (() => {
    const create = () => {
        const board = document.getElementsByClassName('board-square')
        return board;
    }
    return {create}
    })() 
     
//UI TASKS CLASS
class uiTask {
    static displayBoard() {
        gameBoard.create;
        const boardBox = document.getElementById('game-board');
        boardBox.classList.add("show");
    }


}

//uiTask.displayBoard()

//PLAYER CLASS

//EVENT: START GAME

//