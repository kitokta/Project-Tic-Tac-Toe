

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



//PLAYER CLASS

//EVENTS: START GAME
const button = document.querySelector('button');
const contentBox = document.querySelector('content');
button.addEventListener('click', () => {
    button.remove();
    uiTask.displayBoard();
})

//