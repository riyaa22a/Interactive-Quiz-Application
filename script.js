const questions = [
    {
        question: "what does IOT stands for?",
        answers: [
            { text: "Internet Of Things", correct: true },
            { text: "Internet of technology", correct: false },
            { text: "Internet of telecommunication", correct: false },
            { text: "Internet of terminal", correct: false },
        ]
    },
    {
        question: "Which of the following is a common application of iot in smart homes?",
        answers: [
            { text: "supply chain management", correct: false },
            { text: "traffic management", correct: false },
            { text: "smart lighting control", correct: true },
            { text: "crop monitoring", correct: false },
        ]
    },
    {
        question: "what is the primary function of sensor in iot system?",
        answers: [
            { text: "to actuate devices", correct: false },
            { text: "to collect data from enviroment", correct: true },
            { text: "to process data", correct: false },
            { text: "to provide network connectivity", correct: false },
        ]
    },
    {
        question: "Which protocol is commonly used for communication between iot devices?",
        answers: [
            { text: "HTTP", correct: false },
            { text: "MQTT", correct: true },
            { text: "FTP", correct: false },
            { text: "SSH", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}


function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
