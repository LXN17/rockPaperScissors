let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

function updateScore() {
  document.querySelector(
    ".scoreString"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

updateScore();

document.querySelector(".js-rock-btn").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-btn").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-btn").addEventListener("click", () => {
  playGame("scissors");
});
document.querySelector(".autoPlayButton").addEventListener("click", () => {
  autoPlay();
});
document.querySelector(".resetButton").addEventListener("click", () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScore();
});

document.body.addEventListener("keydown", (e) => {
  if (e.key === "1") {
    playGame("rock");
  } else if (e.key === "2") {
    playGame("paper");
  } else if (e.key === "3") {
    playGame("scissors");
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You lose";
    } else if (computerMove === "scissors") {
      result = "You win";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "You lose";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose";
    } else if (computerMove === "paper") {
      result = "You win";
    } else if (computerMove === "scissors") {
      result = "Tie";
    }
  }

  if (result === "You win") {
    score.wins += 1;
  } else if (result === "You lose") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScore();

  document.querySelector(".resultString").innerHTML = `${result}`;

  document.querySelector(
    ".gameMovesString"
  ).innerHTML = `You <img src="images/${playerMove}-emoji.png" style="height: 70px" alt="" />
      <img src="images/${computerMove}-emoji.png" style="height: 70px" alt="" />
      Computer`;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    document.querySelector(".autoPlayButton").innerHTML = "Stop game";
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    document.querySelector(".autoPlayButton").innerHTML = "Auto play";
    isAutoPlaying = false;
  }
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}
