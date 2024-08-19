let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let selectedAnswers = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://7pmymt-8080.csb.app/questions")
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      shuffleArray(questions);
    });

  document.getElementById("start-btn").addEventListener("click", () => {
    document.getElementById("start-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    showQuestion();
  });

  document.getElementById("confirm-btn").addEventListener("click", () => {
    checkAnswer();
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      document.getElementById("quiz-container").innerHTML = `
                <h2>Hoàn thành</h2>
                <p>Điểm của bạn là: ${score}</p>
                <button onclick="location.reload()">Chơi lại</button>
            `;
    }
  });
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  document.getElementById("question").innerText = `${
    currentQuestionIndex + 1
  }/${questions.length}: ${currentQuestion.question}`;

  let answers = [...currentQuestion.answers];
  shuffleArray(answers);

  answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("btn");
    button.addEventListener("click", () =>
      selectAnswer(index, answer, currentQuestion.answers)
    );
    document.getElementById("answers").appendChild(button);
  });
  document.getElementById("confirm-btn").style.display = "block";
}

function resetState() {
  selectedAnswers = [];
  document.getElementById("confirm-btn").style.display = "none";
  document.getElementById("next-btn").style.display = "none";
  while (document.getElementById("answers").firstChild) {
    document
      .getElementById("answers")
      .removeChild(document.getElementById("answers").firstChild);
  }
}

function selectAnswer(selectedIndex, answerText, originalAnswers) {
  const buttons = document.querySelectorAll("#answers button");
  buttons.forEach((button) => button.classList.remove("selected"));
  buttons[selectedIndex].classList.add("selected");

  const originalIndex = originalAnswers.indexOf(answerText);
  selectedAnswers = [originalIndex + 1];
}

function checkAnswer() {
  const correctAnswerIndex = questions[currentQuestionIndex].correct;
  const buttons = document.querySelectorAll("#answers button");

  if (Array.isArray(correctAnswerIndex)) {
    const isCorrect =
      correctAnswerIndex.every((val) => selectedAnswers.includes(val)) &&
      selectedAnswers.length === correctAnswerIndex.length;
    buttons.forEach((button, index) => {
      const answerText = button.innerText;
      const originalIndex =
        questions[currentQuestionIndex].answers.indexOf(answerText);
      if (correctAnswerIndex.includes(originalIndex + 1)) {
        button.classList.add("correct");
      } else if (selectedAnswers.includes(originalIndex + 1)) {
        button.classList.add("wrong");
      }
    });
    if (isCorrect) score += 100;
  } else {
    buttons.forEach((button, index) => {
      const answerText = button.innerText;
      const originalIndex =
        questions[currentQuestionIndex].answers.indexOf(answerText);
      if (originalIndex + 1 === correctAnswerIndex) {
        button.classList.add("correct");
      } else if (selectedAnswers.includes(originalIndex + 1)) {
        button.classList.add("wrong");
      }
    });
    if (selectedAnswers.includes(correctAnswerIndex)) score += 100;
  }

  document.getElementById("score").innerText = score;
  document.getElementById("confirm-btn").style.display = "none";
  document.getElementById("next-btn").style.display = "block";
}
