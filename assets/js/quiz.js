var startBtn = document.getElementById("startBtn");
var submitBtn = document.querySelector("button.submitBtn")
// question length determines on the amount of questions
var secondsLeft = (questions.length * 30 / 2 - 5);
var timerElement = document.getElementById("timer");
var submitScoreElement = document.querySelector("#submit-score");
var userScoreElement = document.getElementById("user-score");
var userNameInput;
var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");
var countdown;
var questionNumber = -1;
var answer;
var quizElement = document.getElementById("quiz");


function startTimer() {

    document.getElementById("home").classList.add('d-none');
    document.getElementById("quiz").classList.remove('d-none');


    setTimer();


    makeQuestions();
}

function setTimer() {

    countdown = setInterval(function () {
        secondsLeft--;
        timerElement.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0 || questionNumber === questions.length) {
            clearInterval(countdown);
            setTimeout(displayScore, 500);
        }
    }, 1000);
}

function makeQuestions() {
    questionNumber++;
    if (questionNumber < questions.length) {

        answer = questions[questionNumber].answer

        questionHead.textContent = questions[questionNumber].title;
        answerChoices.innerHTML = "";

        var choices = questions[questionNumber].choices;

        for (var q = 0; q < choices.length; q++) {
            var nextChoice = document.createElement("button");

            nextChoice.textContent = choices[q]
            answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "choices p-3 m-1 btn btn-light btn-block");
        }
        var choices = document.querySelectorAll(".choices")
        for (let i = 0; i < choices.length; i++) {



            // when user select an answer there are two outcomes results 
          choices[i].addEventListener("click", function (event) {
                var pElement = document.getElementsByClassName("feedback")


                if (answer === event.target.textContent) {
                    pElement.innerHTML = "YES!";
                    showFeedback(); 
                    setTimeout(hideFeedback, 1225);
                }

                else {
                    pElement.innerHTML = "WRONG.";
                    showFeedback();
                    setTimeout(hideFeedback, 1225);
                    secondsLeft = secondsLeft - 7;
                  
                }
                makeQuestions();
            });

        }

    } else {
        clearInterval(countdown)
        submitScoreElement.classList.remove("d-none")
        quizElement.classList.add("d-none")
    }
}


function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("submit-score").classList.remove('d-none');
    userScoreElement.textContent = "FINAL SCORE: " + secondsLeft + ".";
}


startBtn.addEventListener("click", startTimer);
submitBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();

    window.location.href = 'assets/topscore.html'
});

function addScore() {
    userNameInput = document.getElementById("userName").value


    var newScore = {
        name: userNameInput,
        score: secondsLeft
    };

    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push(newScore)
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function hideFeedback() {
    var pElement = document.getElementsByClassName("feedback")[0]
    pElement.style.display = 'none'
    makeQuestions("")
}

function showFeedback() {
    var pElement = document.getElementsByClassName("feedback")[0]
    pElement.style.display = "block"
}

