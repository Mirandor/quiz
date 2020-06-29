// Quiz Questions
var questions = [
  {
    questionText: "How many Robin's has Batman trained?",
    questionChoices: ["2", "1", "17", "5"],
    correctAnswer: "5"
  },
  {
    questionText: "Who was the first Robin?",
    questionChoices: ["Tim Drake", "Dick Grayson", "Jason Todd", "Alfred Pennyworth"],
    correctAnswer: "Dick Grayson"
  },
  {
    questionText: "Which Robin was the first to die?",
    questionChoices: ["Jason Todd", "Tim Drake", "Stephanie Brown", "Damian Wayne"],
    correctAnswer: "Jason Todd"
  },
  {
    questionText: "Which Robin becomes Nightwing?",
    questionChoices: ["Tim Drake", "Damian Wayne", "Dick Grayson", "Jason Todd"],
    correctAnswer: "Dick Grayson"
  },
  {
    questionText: "Which Robin becomes Red Hood?",
    questionChoices: ["Tim Drake", "Dick Grayson", "Jason Todd", "Damian Wayne"],
    correctAnswer: "Jason Todd"
  }
];

var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;
 
var questionText = document.getElementById("question");
var quizQuestionContainer = document.getElementById("quizQuestions");
var timerEl = document.getElementById("seconds");
var choicesEl = document.getElementById("choices");
var submitScoreBtn = document.getElementById("submit");
var startQuizBtn = document.getElementById("start");
var nameEl = document.getElementById("myName");
var feedbackEl = document.getElementById("answeredQuestions");

function populateQuiz() {
  var quizStarted = document.getElementById("quizStart");
  quizStarted.setAttribute("class", "hide");

  quizQuestionContainer.removeAttribute("class");

    timerId = setInterval(timeStart, 1000);
    timerEl.textContent = time;

    getQuestion();
};

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  var titleEl = document.getElementById("question");
  titleEl.textContent = currentQuestion.questionText;

  choicesEl.innerHTML = "";

  currentQuestion.questionChoices.forEach(function(choice, i) {

    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("type", "button");
    choiceNode.setAttribute("class", "choices btn btn-secondary animate__backOutLeft");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = choice;

    choiceNode.onclick = questionClick;

    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {

  if (this.value !== questions[currentQuestionIndex].correctAnswer) {

    time -= 10;

    if (time < 0) {
      time = 0;
    }

    timerEl.textContent = time;

    feedbackEl.textContent = "Foiled Again!";
  } else {

    feedbackEl.textContent = "Correct!";
  }

  feedbackEl.setAttribute("class", "container");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "container hide");
  }, 1000);

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);

  var endScreenEl = document.getElementById("gameOver");
  endScreenEl.removeAttribute("class", "hide");

  var finalScoreEl = document.getElementById("myScore");
  finalScoreEl.textContent =  `Your score: ` + time;

  quizQuestionContainer.setAttribute("class", "hide");

}

function timeStart() {

  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}

function saveScore() {
  var name = nameEl.value.trim();
  if (name !== "") {
    var highscores = JSON.parse(window.localStorage.getItem("scoreList")) || [];

  var newScore = {
    score: time,
    name: myName
  };

  highscores.push(newScore);
  window.localStorage.setItem("scoreList", JSON.stringify(highscores));

  window.location.href = "topscores.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveScore();
  }
}

submitScoreBtn.onclick = saveScore;
startQuizBtn.onclick = populateQuiz;
nameEl.onkeypress = checkForEnter;