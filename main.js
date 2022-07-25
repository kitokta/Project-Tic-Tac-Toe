//GAMEBOARD MODULE
const gameBoard = (() => {
  const create = () => {
    const board = document.getElementsByClassName("board-square");
    return board;
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
}

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
          square.style.borderColor = "#0680FF";
          square.style.borderWidth = "2.2px";
        }
        human.winner = true;
      }
    }

    if (human.winner == true) {
      const winMessage = document.createElement("h1");
      winMessage.textContent = `Congratulations! ${human.name} have won!`;
      winMessage.style.paddingBottom = "65px";
      winMessage.style.color = "#0680FF";
      const contentBody = document.querySelector(".content");
      return (
        contentBody.prepend(winMessage),
        setTimeout("location.reload(true);", 5000)
      );
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
          square.style.borderColor = "#FF0018";
          square.style.borderWidth = "2.2px";
        }
        IA.winner = true;
      }
    }

    if (IA.winner == true) {
      const winMessage = document.createElement("h1");
      winMessage.textContent = `Im Sorry! The ${IA.name} has won!`;
      winMessage.style.color = "#C73E1D";
      winMessage.style.paddingBottom = "65px";
      const contentBody = document.querySelector(".content");
      return (
        contentBody.prepend(winMessage),
        setTimeout("location.reload(true);", 5000)
      );
    }

    //Checking if its a tie
    let checktie = IA.numberOfPlays + human.numberOfPlays;
    if (checktie == 9) {
      human.winner = true;
      IA.winner = true;
      const winMessage = document.createElement("h1");
      winMessage.textContent = `ITS A TIE! BETTER LUCK NEXT TIME!`;
      winMessage.style.color = "#FF9EAA";
      winMessage.style.paddingBottom = "65px";
      const contentBody = document.querySelector(".content");
      return (
        contentBody.prepend(winMessage),
        setTimeout("location.reload(true);", 5000)
      );
    }
  };

  return { create, checkFields, winConditions };
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

  easyPlay(IA, board) {
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
        return (board[easyPlay].innerText = `${IA.marker}`);
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
          return (board[winCon[2]].innerText = `${IA.marker}`);
        }
      } else if (iaIndex.includes(winCon[0]) && iaIndex.includes(winCon[2])) {
        if (board[winCon[1]].innerText == "") {
          IA.played[winCon[1]] = "1";
          IA.numberOfPlays++;
          return (board[winCon[1]].innerText = `${IA.marker}`);
        }
      } else if (iaIndex.includes(winCon[1]) && iaIndex.includes(winCon[2])) {
        if (board[winCon[0]].innerText == "") {
          IA.played[winCon[0]] = "1";
          IA.numberOfPlays++;
          return (board[winCon[0]].innerText = `${IA.marker}`);
        }
      }
    }
    for (const winCon of winCons) {
      //Human possibilities of win check:
      if (humanIndex.includes(winCon[0]) && humanIndex.includes(winCon[1])) {
        if (board[winCon[2]].innerText == "") {
          IA.played[winCon[2]] = "1";
          IA.numberOfPlays++;
          return (board[winCon[2]].innerText = `${IA.marker}`);
        }
      } else if (
        humanIndex.includes(winCon[0]) &&
        humanIndex.includes(winCon[2])
      ) {
        if (board[winCon[1]].innerText == "") {
          IA.played[winCon[1]] = "1";
          IA.numberOfPlays++;
          return (board[winCon[1]].innerText = `${IA.marker}`);
        }
      } else if (
        humanIndex.includes(winCon[1]) &&
        humanIndex.includes(winCon[2])
      ) {
        if (board[winCon[0]].innerText == "") {
          IA.played[winCon[0]] = "1";
          IA.numberOfPlays++;
          return (board[winCon[0]].innerText = `${IA.marker}`);
        }
      }
    }
    return IA.easyPlay(IA, board);
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
          //Timeout to show player and IA inputs before testing the fields for wincons or tie!
          //Testing if there isnt already a winner
          if (human.winner != true && IA.winner != true)
            setTimeout(gameBoard.checkFields, 300, human, IA);
        });
      }
    } else {
      setTimeout(IA.hardPlay(IA, human, board), 300, IA, board);
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
          //Timeout to show player and IA inputs before testing the fields for wincons or tie!
          //Testing if there isnt already a winner
          if (human.winner != true && IA.winner != true)
            setTimeout(gameBoard.checkFields, 300, human, IA);
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

  static getPlayerName() {
    //Human value inputs
    const name = prompt("What's your name?");
    if (name == "") {
      const nameWarning = document.createElement("h1");
      const contentBox = document.querySelector(".content");
      nameWarning.innerText =
        "Please insert a name!\nThe AI needs to know it to read your mind!";
      nameWarning.classList.add("heading");
      nameWarning.classList.add("show");
      nameWarning.setAttribute("id", "name-warning");
      contentBox.prepend(nameWarning);
      setTimeout("location.reload(true);", 5000);
    }
    return name;
  }

  static remove() {
    for (let i = 0; i < arguments.length; i++) {
      arguments[i].remove();
    }
  }
}

//EVENTS: START GAME
const markerButtonX = document.getElementById("x");
const markerButtonO = document.getElementById("o");

//Marker Button X
markerButtonX.addEventListener("click", () => {
  //remove html from screen
  const markerWarning = document.getElementById("marker-warning");
  uiTask.remove(markerButtonO, markerButtonX, markerWarning);
  //Ask human for name input
  const name = uiTask.getPlayerName();
  const human = new Player(name, "X");
  //IA player inputs
  const IA = new Player("machine", "O");
  //Starting Game
  //Cheking if the human inserted name
  if (human.name != "") uiTask.display(human, IA);
});

//Marker Button O
markerButtonO.addEventListener("click", () => {
  //remove html from screen
  const markerWarning = document.getElementById("marker-warning");
  uiTask.remove(markerButtonO, markerButtonX, markerWarning);

  //Ask human for name input
  const name = uiTask.getPlayerName();
  const human = new Player(name, "O");
  //IA player inputs
  const IA = new Player("machine", "X");

  //Starting Game
  if (human.name != "") uiTask.display(human, IA);
});
