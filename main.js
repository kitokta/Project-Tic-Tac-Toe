//GAMEBOARD MODULE
const gameBoard = (() => {
  const create = () => {
    const board = document.getElementsByClassName("board-square");
    return board;
  };

  const reset = () => {
    const board = document.getElementsByClassName("board-square");
    for (let i = 0; i < board.length; i++) {
      board[i].innerText = "";
      board[i].classList.remove("lose");
      board[i].classList.remove("win");
    }
  };

  const checkScores = (arr, values) => {
    return values.every((value) => {
      return arr.includes(value);
    });
  };

  const winConditions = () => {
    return [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  };

  const checkFields = (human, IA) => {
    //Wincons
    const winCons = winConditions();

    //Human
    let humanIndex = [];
    //For each cell that was played by the human player we push its index to another array so we can test all win cons later
    human.played.forEach((cell, index) => {
      if (cell === "1") {
        humanIndex.push(index);
      }
    });
    for (let i = 0; i < winCons.length; i++) {
      if (checkScores(humanIndex, winCons[i])) {
        for (let c = 0; c < winCons[i].length; c++) {
          const square = document.getElementById(`${winCons[i][c]}`);
          square.classList.add("win");
        }
        human.winner = true;
      }
    }

    //IF human wins, show modal
    if (human.winner == true) {
      const winMessage = document.createElement("h1");
      const modal = document.getElementById("modal");
      winMessage.textContent = `Congratulations! ${human.name} have won!`;
      winMessage.classList.add("win-color");
      winMessage.classList.add("win-message");
      const contentBody = document.querySelector(".content");
      contentBody.prepend(winMessage);
      uiTask.displayModal(winMessage, modal, human, IA);
    }

    //IA
    let iaIndex = [];
    //For each cell that was played by the IA player we push its index to another array so we can test all win cons later
    IA.played.forEach((cell, index) => {
      if (cell === "1") {
        iaIndex.push(index);
      }
    });
    //Checking every possibility of IA win
    for (let i = 0; i < 8; i++) {
      if (checkScores(iaIndex, winCons[i])) {
        for (let c = 0; c < winCons[i].length; c++) {
          const square = document.getElementById(`${winCons[i][c]}`);
          square.classList.add("lose");
        }
        IA.winner = true;
      }
    }

    if (IA.winner == true) {
      const winMessage = document.createElement("h1");
      winMessage.textContent = `Im Sorry! The ${IA.name} has won!`;
      winMessage.classList.add("win-message");
      winMessage.classList.add("lose-color");
      const contentBody = document.querySelector(".content");
      contentBody.prepend(winMessage);
      uiTask.displayModal(winMessage, modal, human, IA);
    }

    //Checking if its a tie
    let checktie = IA.numberOfPlays + human.numberOfPlays;
    if (checktie == 9) {
      human.winner = true;
      IA.winner = true;
      const winMessage = document.createElement("h1");
      winMessage.textContent = `It's a Tie! Better luck next time!`;
      winMessage.classList.add("win-message");
      winMessage.classList.add("lose-color");
      const contentBody = document.querySelector(".content");
      contentBody.prepend(winMessage);
      uiTask.displayModal(winMessage, modal, human, IA);
    }
  };
  return { create, checkFields, winConditions, reset };
})();

//PLAYER CLASS
class Player {
  constructor(name, marker) {
    this.name = name;
    this.marker = marker;
    this.played = ["0", "0", "0", "0", "0", "0", "0", "0", "0"];
    this.numberOfPlays = 0;
    this.winner = false;
  }

  reset() {
    this.played = ["0", "0", "0", "0", "0", "0", "0", "0", "0"];
    this.numberOfPlays = 0;
    this.winner = false;
  }

  easyPlay(IA, human, board) {
    //IA only stop playing when finds a blank space to play.
    //IA easyPlay
    //IA only plays if there is not already a winner
    let hasPlayed = false;
    while (hasPlayed != true) {
      let easyPlay = Math.floor(Math.random() * board.length);
      if (board[easyPlay].innerText == "") {
        IA.played[easyPlay] = "1";
        IA.numberOfPlays++;
        hasPlayed = true;
        return (board[easyPlay].innerText = `${IA.marker}`, gameBoard.checkFields(human, IA));
      }
    }
  }

  hardPlay(IA, human, board) {
    //Receives the winCons array from checkFields;
    const winCons = gameBoard.winConditions();
    let iaIndex = [];
    let humanIndex = [];
    //For each cell that was played by the AIplayer we push its index to another array so we can test all win cons later
    human.played.forEach((cell, index) => {
      if (cell === "1") {
        humanIndex.push(index);
      }
    });

    IA.played.forEach((cell, index) => {
      if (cell === "1") {
        iaIndex.push(index);
      }
    });

    for (const winCon of winCons) {
      //AI possibilities of win check:
      if (iaIndex.includes(winCon[0]) && iaIndex.includes(winCon[1])) {
        if (board[winCon[2]].innerText == "") {
          IA.played[winCon[2]] = "1";
          IA.numberOfPlays++;
          return (board[winCon[2]].innerText = `${IA.marker}`, gameBoard.checkFields(human, IA));
        }
      } else if (iaIndex.includes(winCon[0]) && iaIndex.includes(winCon[2])) {
        if (board[winCon[1]].innerText == "") {
          IA.played[winCon[1]] = "1";
          IA.numberOfPlays++;
          return (board[winCon[1]].innerText = `${IA.marker}`, gameBoard.checkFields(human, IA));
        }
      } else if (iaIndex.includes(winCon[1]) && iaIndex.includes(winCon[2])) {
        if (board[winCon[0]].innerText == "") {
          IA.played[winCon[0]] = "1";
          IA.numberOfPlays++;
          return (board[winCon[0]].innerText = `${IA.marker}`, gameBoard.checkFields(human, IA));
        }
      }
    }
    for (const winCon of winCons) {
      //Human possibilities of win check:
      if (humanIndex.includes(winCon[0]) && humanIndex.includes(winCon[1])) {
        if (board[winCon[2]].innerText == "") {
          IA.played[winCon[2]] = "1";
          IA.numberOfPlays++;
          return (board[winCon[2]].innerText = `${IA.marker}`, gameBoard.checkFields(human, IA));
        }
      } else if (
        humanIndex.includes(winCon[0]) &&
        humanIndex.includes(winCon[2])
      ) {
        if (board[winCon[1]].innerText == "") {
          IA.played[winCon[1]] = "1";
          IA.numberOfPlays++;
          return (board[winCon[1]].innerText = `${IA.marker}`, gameBoard.checkFields(human, IA));
        }
      } else if (
        humanIndex.includes(winCon[1]) &&
        humanIndex.includes(winCon[2])
      ) {
        if (board[winCon[0]].innerText == "") {
          IA.played[winCon[0]] = "1";
          IA.numberOfPlays++;
          return (board[winCon[0]].innerText = `${IA.marker}`, gameBoard.checkFields(human, IA));
        }
      }
    }
    return IA.easyPlay(IA, human, board);
  }
}

class Game {
  static gameController(human, IA, board) {
    if (human.marker == "X") {
      for (let i = 0; i < board.length; i++) {
        board[i].addEventListener("click", () => {
          if (board[i].innerText == "") {
            //Human Play
            board[i].innerText = `${human.marker}`;
            human.played[i] = "1";
            human.numberOfPlays++;
            if (human.winner != true && IA.winner != true)
              gameBoard.checkFields(human, IA);
            if (human.winner != true && IA.winner != true)
              IA.hardPlay(IA, human, board);
          }
        });
      }
    } else {
      //Impedindo que jogue toda vez que passar por aqui
      if (IA.numberOfPlays<1) setTimeout(IA.hardPlay(IA, human, board), 300, IA, board);
      for (let i = 0; i < board.length; i++) {
        board[i].addEventListener("click", () => {
          if (board[i].innerText == "") {
            //Human Play
            board[i].innerText = `${human.marker}`;
            human.played[i] = "1";
            human.numberOfPlays++;
            if (human.winner != true && IA.winner != true)
              gameBoard.checkFields(human, IA);
            if (human.winner != true && IA.winner != true)
              IA.hardPlay(IA, human, board);
          }
        });
      }
    }
  }
}

//UI TASKS CLASS
class uiTask {
  static display(human, IA) {
    const board = gameBoard.create();
    const boardBox = document.getElementById("game-board");
    boardBox.classList.add("show");
    Game.gameController(human, IA, board);
  }

  static getPlayerName(nameInput) {
    //Human value inputs
    const name = nameInput.value;
    if (name == "") {
      const nameWarning = document.createElement("h1");
      const contentBox = document.querySelector(".content");
      nameWarning.innerText =
        "Please insert a name!\nThe AI needs to know it to read your mind!";
      nameWarning.classList.add("heading");
      nameWarning.classList.add("show");
      nameWarning.setAttribute("id", "name-warning");
      contentBox.prepend(nameWarning);
      setTimeout(()=> {
        const markerWarning = document.getElementById("marker-warning");
        contentBox.removeChild(nameWarning);
        uiTask.show(nameInput, markerButtonO, markerButtonX, markerWarning);
      }, 4000)
    }
    else return name;
  }

  static displayModal(winMessage, modal, human, IA) {
    setTimeout(() => {
      modal.classList.add("show");
      gameBoard.reset(); //gameBoard reset
      winMessage.remove();
    }, 2000);
    //MODAL LISTENER
    const btnYes = document.getElementById("yes");
    const btnNo = document.getElementById("no");

    //Continue button
    btnYes.addEventListener("click", () => {
      human.reset();
      //Prevents from IA playing two times after some continue attempts
      if (IA.numberOfPlays!=1) IA.reset();
      uiTask.display(human, IA);
      modal.classList.remove("show");
    });

    //No continue button
    btnNo.addEventListener("click", () => {
      location.reload(true);
    });
  }

  static remove() {
    for (let i = 0; i < arguments.length; i++) {
      arguments[i].classList.remove("show");
      arguments[i].style.display = "none";
    }
  }

  static show() {
    for (let i = 0; i < arguments.length; i++) {
      arguments[i].classList.add("show");
      arguments[i].style.removeProperty("display");
    }
  }
}

//EVENTS: START GAME
const markerButtonX = document.getElementById("x");
const markerButtonO = document.getElementById("o");
const nameInput = document.getElementById("name");

//Marker Button X
markerButtonX.addEventListener("click", () => {
  //remove html from screen
  const markerWarning = document.getElementById("marker-warning");
  uiTask.remove(markerButtonO, markerButtonX, markerWarning, nameInput);
  //Ask human for name input
  const name = uiTask.getPlayerName(nameInput);
  const human = new Player(name, "X");
  //IA player inputs
  const IA = new Player("machine", "O");
  //Starting Game
  //Cheking if the human inserted name
  if (human.name != "" && human.name != undefined) uiTask.display(human, IA);
});

//Marker Button O
markerButtonO.addEventListener("click", () => {
  //remove html from screen
  const markerWarning = document.getElementById("marker-warning");
  uiTask.remove(markerButtonO, markerButtonX, markerWarning, nameInput);

  //Ask human for name input
  const name = uiTask.getPlayerName(nameInput);
  const human = new Player(name, "O");
  //IA player inputs
  const IA = new Player("machine", "X");

  //Starting Game
  if (human.name != "" && human.name != undefined) uiTask.display(human, IA);
});
