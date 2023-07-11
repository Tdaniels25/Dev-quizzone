//Array of quiz questions
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
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.timerInterval = null;
    }
  
    startQuiz() {
      this.resetState();
      this.startTimeout();
      this.showQuestion();
    }
  
    startTimeout() {
      let totalTime = this.timer; // Timer duration in seconds
      let minutes = 0;
      let seconds = 0;
      let counter = 0;
  
      this.timerInterval = setInterval(() => {
        counter++;
        minutes = Math.floor((totalTime - counter) / 60);
        seconds = totalTime - minutes * 60 - counter;
  
        const timerElement = document.getElementById('timer');
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
        if (counter >= totalTime) {
          this.showScore();
        }
      }, 1000);
    }
  
    showQuestion() {
      const questionElement = document.getElementById('question');
      const options = document.getElementsByClassName('option');
  
      const currentQuestion = this.questions[this.currentQuestionIndex];
      questionElement.textContent = currentQuestion.question;
  
      for (let i = 0; i < options.length; i++) {
        const option = options[i];
        option.textContent = currentQuestion.options[i].text;
        option.classList.remove('correct', 'incorrect');
        option.disabled = false;
        option.addEventListener('click', this.selectAnswer.bind(this));
      }
    }
  
    resetState() {
      const scoreElement = document.getElementById('score');
      scoreElement.textContent = '0';
  
      clearInterval(this.timerInterval);
    }
  
    selectAnswer(event) {
      const selectedBtn = event.target;
      const selectedIndex = Array.from(selectedBtn.parentNode.children).indexOf(selectedBtn);
      const currentQuestion = this.questions[this.currentQuestionIndex];
  
      if (selectedIndex === currentQuestion.options.findIndex(option => option.correct)) {
        selectedBtn.classList.add('correct');
        this.score++;
      } else {
        selectedBtn.classList.add('incorrect');
        const correctBtn = Array.from(selectedBtn.parentNode.children).find(btn =>
          currentQuestion.options[Array.from(btn.parentNode.children).indexOf(btn)].correct
        );
        correctBtn.classList.add('correct');
      }
  
      Array.from(selectedBtn.parentNode.children).forEach(btn => {
        btn.disabled = true;
      });
  
      
      
      const scoreElement = document.getElementById('score');
      scoreElement.textContent = this.score.toString();
  
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.questions.length) {
        const nextButton = document.getElementById('nextButton');
        nextButton.style.display = 'block';
        nextButton.addEventListener('click', this.handleNextButton.bind(this));
      } else {
        this.showScore();
      }
    }
  
    handleNextButton() {
      const nextButton = document.getElementById('nextButton');
      nextButton.style.display = 'none';
  
      this.showQuestion();
    }
  
    showScore() {
      const questionElement = document.getElementById('question');
      const options = document.getElementsByClassName('option');
      const nextButton = document.getElementById('nextButton');
  
      questionElement.textContent = `Quiz completed. Your score is ${this.score} out of ${this.questions.length}.`;
      Array.from(options).forEach(option => {
        option.disabled = true;
      });
      nextButton.textContent = 'Play Again';
      nextButton.style.display = 'block';
      nextButton.addEventListener('click', this.startQuiz.bind(this));
    }
  }
  
  const quiz = new Quiz(quizQuestions, 300);
  quiz.startQuiz();