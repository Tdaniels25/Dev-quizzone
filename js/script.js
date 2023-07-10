const quiz = [
    {
        question: "Which HTML attribute is used to specify the width of an image?",
        options: [
            "a.width",
            "b.size",
            "c.scale",
            "d.length"
        ],
        answer: "a"
    },
    {
        question: "Which CSS property is used to control the spacing between lines of text?",
        options: [
            "a.text-indent",
            "b.text-transform",
            "c.line-height",
            "d.letter-spacing"
        ],
        answer: "c"
    },
    {
        question: "What is the concept of inheritance in JavaScript?",
        options: [
            "a.Inheritance is the process of creating a new object from an existing object",
            "b.Inheritance is a way to implement multiple interfaces in JavaScript",
            "c.Inheritance is the process of extending the functionality of a class by inheriting properties and methods from a parent class",
            "d.Inheritance is a way to encapsulate data and behavior into a single entity in JavaScript"
        ],
        answer: "c"
    },
    {
        question: "What is the purpose of the command 'git clone'?",
        options: [
            "a.To create a new Git repository",
            "b.To create a new branch in the current repository",
            "c.To download a copy of a remote repository to your local machine",
            "d.To merge changes from one branch into another branch"
        ],
        answer: "c"
    },
    {
        question: "What is the purpose of the JavaScript method 'setTimeout()'?",
        options: [
            "a.To pause the execution of the script for a specific time",
            "b.To set a recurring timer for executing a function",
            "c.To measure the time taken by a function to execute",
            "d.To stop the execution of a JavaScript program"
        ],
        answer: "a"
    },
    {
        question: "What does the term 'pull request' mean in the context of Github?",
        options: [
            "a.A request to retrieve the latest changes from a remote repository",
            "b.A request to merge changes from one branch to another",
            "c.A request to revert a commit in a Git repository",
            "d.A request to delete a repository"
        ],
        answer: "a"
    },
    {
        question: "What is the significance of the JavaScript keyword 'this'?",
        options: [
            "a.It refers to the current HTML document",
            "b.It refers to the object on which the method is invoked",
            "c.It refers to the global object in which the function is executed",
            "d.It refers to the parent object of the current object"
        ],
        answer: "b"
    },
    {
        question: "Which HTML tag is used to create a drop-down list in a form?",
        options: [
            "a.<option>",
            "b.<select>",
            "c.<form>",
            "d.<input>"
        ],
        answer: "b"
    },
    {
        question: "Which type of CSS is included in a separate file with a .css extension and linked to the HTML file using the <link> tag?",
        options: [
            "a.Internal CSS",
            "b.Inline CSS",
            "c.External CSS",
            "d.Import CSS"
        ],
        answer: "c"
    },
    {
        question: "What is Git used for?",
        options: [
            "a.To manage databases",
            "b.To create websites",
            "c.To design user interfaces",
            "d.To track changes in files"
        ],
        answer: "d"
    }
];


// Global variables
let currentQuestionIndex = 0;
let score = 0;

// DOM elements
const scoreBox = document.querySelector(".scoreBox");
const timerBox = document.querySelector(".timerBox");
const questionBox = document.querySelector(".questionBox");
const optionBox = document.querySelector(".optionBox");
const nextButton = document.getElementById("nextButton");

// Display question and options
function displayQuestion() {
  const currentQuestion = quiz[currentQuestionIndex];
  questionBox.textContent = currentQuestion.question;

  optionBox.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const optionElement = document.createElement("span");
    optionElement.textContent = option;
    optionElement.addEventListener("click", selectAnswer);
    optionBox.appendChild(optionElement);
  });
}

// Event listener for option selection
function selectAnswer() {
  const selectedOption = this.textContent;
  const currentQuestion = quiz[currentQuestionIndex];
  
  if (selectedOption === currentQuestion.answer) {
    score++;
  }

  currentQuestionIndex++;
  
  if (currentQuestionIndex < quiz.length) {
    displayQuestion();
  } else {
    showResults();
  }
}

// Event listener for "Next" button click
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < quiz.length) {
    alert("Please select an option.");
  }
});

// Function to show quiz results
function showResults() {
  alert(`Quiz completed. Your score is ${score} out of ${quiz.length}.`);
  // You can perform additional actions or redirect to another page here
}

// Initialize quiz
displayQuestion();


// Code to update the score of the quiz and to display the correct and incorrect answers

let questionElement = document.querySelector('.questionBox');
let optionBoxs = document.querySelector('.optionBox');
let nextButtons = document.getElementById('nextButton');
let answerButtons = document.getElementById('answerButtons');

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = quiz[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.options.forEach((option, index) => {
    let button = document.createElement("button");
    button.innerHTML = option;
    button.classList.add("btn");
    button.dataset.index = index; // Assign a dataset index for each button
    answerButtons.appendChild(button);
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  let selectedBtn = e.target;
  let selectedIndex = selectedBtn.dataset.index;
  let currentQuestion = quiz[currentQuestionIndex];

  if (selectedIndex == currentQuestion.answer) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
    // Highlight the correct answer as well
    let correctBtn = answerButtons.querySelector(`button[data-index="${currentQuestion.answer}"]`);
    correctBtn.classList.add("correct");
  }

  // Disable all the buttons after selecting an answer
  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
  });

  // Show the Next button
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Your score is ${score} out of ${quiz.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quiz.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < quiz.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
