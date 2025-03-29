let questions = []
let currentQuestionIndex = 0
let score = 0
let selectedLevel = ""

function startGame(level) {
  selectedLevel = level
  document.getElementById("level-selection").style.display = "none"
  document.getElementById("game-container").style.display = "block"
  document.getElementById(
    "difficulty"
  ).textContent = `Level: ${level.toUpperCase()}`
  fetchQuestions(level)
}

function fetchQuestions(level) {
  fetch(`questions.json`)
    .then((response) => response.json())
    .then((data) => {
      questions = data[level]
      updateQuestionCounter()
      nextQuestion()
    })
}

function nextQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endGame()
    return
  }

  let question = questions[currentQuestionIndex]
  document.getElementById("expression").textContent = question.expr
  document.getElementById("result").textContent = ""
  document.getElementById("explanation").textContent = ""
  document.getElementById("userInput").value = ""

  updateQuestionCounter()
}

function checkAnswer() {
  let userAnswer = document.getElementById("userInput").value.trim()
  let question = questions[currentQuestionIndex]

  if (userAnswer === question.result) {
    document.getElementById("result").textContent = "Correct! 🎉"
    document.getElementById("result").style.color = "green"
    score++
  } else {
    document.getElementById(
      "result"
    ).textContent = `Wrong! The correct answer is ${question.result}`
    document.getElementById("result").style.color = "red"
  }

  document.getElementById(
    "explanation"
  ).textContent = `Explanation: ${question.explanation}`
  document.getElementById("score").textContent = score

  currentQuestionIndex++
  updateQuestionCounter()
}

function updateQuestionCounter() {
  document.getElementById("question-counter").textContent = `Question ${
    currentQuestionIndex + 1
  } / ${questions.length}`
}

function endGame() {
  document.getElementById("game-container").style.display = "none"
  document.getElementById("game-over").style.display = "block"
  document.getElementById("final-score").textContent = score
}

function restartGame() {
  score = 0
  currentQuestionIndex = 0
  document.getElementById("game-over").style.display = "none"
  document.getElementById("level-selection").style.display = "block"
}


function convertOctalToDecimal(octal){
    const octalString = String(octal)
    let decimal = 0
    for(let i=0; i<octalString.length;i++){
      const power = octalString.length - 1 - i;
      decimal += Number(octalString[i]) * Math.pow(8, power)
    }
    return decimal;
}