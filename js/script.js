const quizQuestions = [
  {
    question: "Which HTML attribute is used to specify the width of an image?",
    options: [
      { text: "width", correct: true },
      { text: "size", correct: false },
      { text: "scale", correct: false },
      { text: "length", correct: false }
    ],
    answer: 0
  },
  {
    question: "What is the concept of inheritance in JavaScript?",
    options: [
      { text: "Inheritance is the process of creating a new object from an existing object", correct: false },
      { text: "Inheritance is a way to implement multiple interfaces in JavaScript", correct: false },
      { text: "Inheritance is the process of extending the functionality of a class by inheriting properties and methods from a parent class", correct: true },
      { text: "Inheritance is a way to encapsulate data and behavior into a single entity in JavaScript", correct: false }
    ],
    answer: 2
  },
  {
    question: "What is the purpose of the command 'git clone'?",
    options: [
        {text:"To create a new Git repository", correct: false},
        {text:"To create a new branch in the current repository", correct: false},
        {text:"To download a copy of a remote repository to your local machine",correct: true},
        {text:"To merge changes from one branch into another branch", correct: false}
    ],
    answer:
},
{
    question: "What is the purpose of the JavaScript method 'setTimeout()'?",
    options: [
        {text:"To pause the execution of the script for a specific time", correct: true},
        {text:"To set a recurring timer for executing a function", correct: false},
        {text:"To measure the time taken by a function to execute",correct: false},
        {text:"To stop the execution of a JavaScript program", correct: false}
    ],
    answer:0
},
{
    question: "What does the term 'pull request' mean in the context of Github?",
    options: [
        {text:"A request to retrieve the latest changes from a remote repository", correct: true},
        {text:"A request to merge changes from one branch to another", correct: false},
        {text:"A request to revert a commit in a Git repository",correct: false},
        {text:"A request to delete a repository", correct: false}
    ],
    answer:0
},
{
    question: "What is the significance of the JavaScript keyword 'this'?",
    options: [
        {text:"It refers to the current HTML document", correct: false},
        {text:"It refers to the object on which the method is invoked", correct: true},
        {text:"It refers to the global object in which the function is executed",correct: false},
        {text:"It refers to the parent object of the current object", correct: false}
    ],
    answer:1
},
{
    question:"Which HTML attribute is used to specify the width of an image?" ,
    options: [
        {text:"width", correct: true},
        {text:"size", correct: false},
        {text:"scale",correct: false},
        {text:"length", correct: false}
    ],
    answer:0
},
{
    question: "Which HTML tag is used to create a drop-down list in a form?",
    options: [
        {text:"<option>", correct: false},
        {text:"<select>", correct: true},
        {text:"<form>",correct: false},
        {text:"<input>", correct: false}
    ],
    answer:1
},
{
    question: "Which type of CSS is included in a separate file with a .css extension and linked to the HTML file using the <link> tag?",
    options: [
        {text:"Internal CSS", correct: false},
        {text:"Inline CSS", correct: false},
        {text:"External CSS",correct: true},
        {text:"Import CSS", correct: false}
    ],
    answer:2
},
{
    question: "WWhat is Git used for?",
    options: [
        {text:"To manage databases", correct: false},
        {text:"To create websites", correct: false},
        {text:"To design user interfaces",correct: false},
        {text:"To track changes in files", correct: true}
    ],
    answer:3
}
];


class Quiz {
  constructor(questions, timer) {
    this.questions = questions;
    this.timer = timer;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.timerInterval = null;
  }

  startTimeout() {
    let counter = 0;
    this.timerInterval = setInterval(() => {
      counter++;
      const minutes = Math.floor((this.timer - counter) / 60);
      const seconds = this.timer - minutes * 60 - counter;

      const timerBox = document.querySelector('.timerBox');
      timerBox.textContent = `Time Left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      if (counter >= this.timer) {
        clearInterval(this.timerInterval);
        this.showResults();
      }
    }, 1000);
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  checkAnswer(selectedIndex) {
    const currentQuestion = this.getCurrentQuestion();
    if (selectedIndex === currentQuestion.answer) {
      this.score++;
      return true;
    }
    return false;
  }

  showResults() {
    clearInterval(this.timerInterval);
    alert(`Quiz completed. Your score is ${this.score} out of ${this.questions.length}.`);
    restartButton.style.display = 'block';
    nextButton.style.display = 'none';
  }
}

const quiz = new Quiz(quizQuestions, 120);

// Select DOM elements
const questionText = document.getElementById('questionText');
const optionElements = document.querySelectorAll('input[name="option"]');
const nextButton = document.getElementById('nextButton');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const restartButton = document.getElementById('restartButton');

// Function to display the current question and options
function displayQuestion() {
  const currentQuestion = quiz.getCurrentQuestion();

  // Update question text
  questionText.textContent = currentQuestion.question;

  // Update options
  currentQuestion.options.forEach((option, index) => {
    const optionElement = optionElements[index];
    optionElement.value = index;
    optionElement.nextElementSibling.textContent = option.text;
    optionElement.checked = false;
    optionElement.parentElement.classList.remove('correct', 'incorrect');
    optionElement.disabled = false;
  });

  // Update score
  scoreElement.textContent = quiz.score;
}

// Function to handle answer selection
function selectAnswer() {
  const selectedOptionIndex = parseInt(this.value);
  const isCorrect = quiz.checkAnswer(selectedOptionIndex);

  // Disable all options after selecting an answer
  optionElements.forEach((optionElement) => {
    optionElement.disabled = true;
  });

  // Highlight the selected answer
  const selectedOptionLabel = optionElements[selectedOptionIndex].parentElement;
  selectedOptionLabel.classList.add(isCorrect ? 'correct' : 'incorrect');

  // Highlight the correct answer
  const currentQuestion = quiz.getCurrentQuestion();
  const correctOptionLabel = optionElements[currentQuestion.answer].parentElement;
  correctOptionLabel.classList.add('correct');

  // Enable the Next button
  nextButton.disabled = false;
}

// Event listener for answer selection
optionElements.forEach((optionElement) => {
  optionElement.addEventListener('change', selectAnswer);
});

// Function to handle the Next button click
function handleNextButtonClick() {
  quiz.currentQuestionIndex++;

  if (quiz.currentQuestionIndex < quiz.questions.length) {
    displayQuestion();
    nextButton.disabled = true;
    restartButton.style.display = 'none';
  } else {
    quiz.showResults();
  }
}

// Event listener for the Next button click
nextButton.addEventListener('click', handleNextButtonClick);

// Function to restart the quiz
function restartQuiz() {
  quiz.currentQuestionIndex = 0;
  quiz.score = 0;
  displayQuestion();
  nextButton.disabled = true;
  optionElements.forEach((optionElement) => {
    optionElement.disabled = false;
    optionElement.checked = false;
  });
  restartButton.style.display = 'none';
  quiz.startTimeout();
}

// Event listener for the restart button click
restartButton.addEventListener('click', restartQuiz);

// Start the quiz
displayQuestion();
quiz.startTimeout();

