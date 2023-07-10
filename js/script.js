const quizQuestions = [
    {
        question: "Which HTML attribute is used to specify the width of an image?",
        options: [
            {text:"width", correct: true},
            {text:"size", correct: false},
            {text:"scale",correct: false},
            {text:"length", correct: false}
        ],
    
    },
    {
        question: "What is the concept of inheritance in JavaScript?",
        options: [
            {text:"Inheritance is the process of creating a new object from an existing object", correct: false},
            {text:".Inheritance is a way to implement multiple interfaces in JavaScript", correct: false},
            {text:"Inheritance is the process of extending the functionality of a class by inheriting properties and methods from a parent class",correct: true},
            {text:"Inheritance is a way to encapsulate data and behavior into a single entity in JavaScript", correct: false}
        ],
    },
    {
        question: "What is the purpose of the command 'git clone'?",
        options: [
            {text:"To create a new Git repository", correct: false},
            {text:"To create a new branch in the current repository", correct: false},
            {text:"To download a copy of a remote repository to your local machine",correct: true},
            {text:"To merge changes from one branch into another branch", correct: false}
        ],
    },
    {
        question: "What is the purpose of the JavaScript method 'setTimeout()'?",
        options: [
            {text:"To pause the execution of the script for a specific time", correct: true},
            {text:"To set a recurring timer for executing a function", correct: false},
            {text:"To measure the time taken by a function to execute",correct: false},
            {text:"To stop the execution of a JavaScript program", correct: false}
        ],
    },
    {
        question: "What does the term 'pull request' mean in the context of Github?",
        options: [
            {text:"A request to retrieve the latest changes from a remote repository", correct: true},
            {text:"A request to merge changes from one branch to another", correct: false},
            {text:"A request to revert a commit in a Git repository",correct: false},
            {text:"A request to delete a repository", correct: false}
        ],
    },
    {
        question: "What is the significance of the JavaScript keyword 'this'?",
        options: [
            {text:"It refers to the current HTML document", correct: false},
            {text:"It refers to the object on which the method is invoked", correct: true},
            {text:"It refers to the global object in which the function is executed",correct: false},
            {text:"It refers to the parent object of the current object", correct: false}
        ],
    },
    {
        question: "WWhich HTML tag is used to create a drop-down list in a form?",
        options: [
            {text:"width", correct: true},
            {text:"size", correct: false},
            {text:"scale",correct: false},
            {text:"length", correct: false}
        ],
    },
    {
        question: "Which HTML attribute is used to specify the width of an image?",
        options: [
            {text:"<option>", correct: false},
            {text:"<select>", correct: true},
            {text:"<form>",correct: false},
            {text:"<input>", correct: false}
        ],
    },
    {
        question: "Which type of CSS is included in a separate file with a .css extension and linked to the HTML file using the <link> tag?",
        options: [
            {text:"Internal CSS", correct: false},
            {text:"Inline CSS", correct: false},
            {text:"External CSS",correct: true},
            {text:"Import CSS", correct: false}
        ],
    },
    {
        question: "WWhat is Git used for?",
        options: [
            {text:"To manage databases", correct: false},
            {text:"To create websites", correct: false},
            {text:"To design user interfaces",correct: false},
            {text:"To track changes in files", correct: true}
        ],
    }
];


class Quiz {
    constructor(questions, timer) {
      this.questions = questions;
      this.timer = timer;

    }


    startTimeout() {
      let totalTime = this.timer; // Timer duration in seconds
      let minutes = 0;
      let seconds = 0;
      let counter = 0;
  
      let timer = setInterval(() => {
        counter++;
        minutes = Math.floor((totalTime - counter) / 60);
        seconds = totalTime - minutes * 60 - counter;
  
        const timerBox = document.querySelector('.timerBox');
        timerBox.textContent = `Time Left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  if (currentQuestionIndex < quiz.length) {
    displayQuestion();
  } else {
    showResults();
  }
});

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

// Select DOM elements
let questionElement = document.querySelector('.questionBox');
let optionBoxs = document.querySelector('.optionBox');
let nextButton = document.getElementById('nextButton');
let answerButtons = document.getElementById('answerButtons');

// Function to start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

// Function to display the current question and options
function showQuestion() {
  resetState();
  let currentQuestion = quiz[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // Create buttons for each option
  currentQuestion.options.forEach((option, index) => {
    let button = document.createElement("button");
    button.innerHTML = option;
    button.classList.add("btn");
    button.dataset.index = index; // Assign a dataset index for each button
    answerButtons.appendChild(button);
    button.addEventListener("click", selectAnswer);
  });
}

// Function to reset the state of the answer buttons
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Function to handle answer selection
function selectAnswer(e) {
  let selectedBtn = e.target;
  let selectedIndex = selectedBtn.dataset.index;
  let currentQuestion = quiz[currentQuestionIndex];

  // Check if the selected answer is correct
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

// Function to display the final score
function showScore() {
  resetState();
  questionElement.innerHTML = `Your score is ${score} out of ${quiz.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

// Function to handle the next button click
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quiz.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// Event listener for the next button click
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < quiz.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

// Start the quiz
startQuiz();