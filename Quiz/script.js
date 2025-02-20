const questions = [
    {
        question: "CSS stands for - ",
        answers:[
            {text: "Cascading Style Sheets", correct:true},
            {text: "Coloured Special Sheets", correct:false},
            {text: "Color and Style Sheets", correct:false},
            {text: "None of the above", correct:false},
        ]
    }, 

    {
        question: "Which Tag used to define an internal style??",
        answers:[
            {text: "<style>", correct:true},
            {text: '<link">', correct:false},
            {text: "<script>", correct:false},
            {text: "None of the above", correct:false},
        ]
    }, 

    {
        question: "The property in CSS used to change the background color of an element is -",
        answers:[
            {text: "bgcolor", correct:false},
            {text: "color", correct:false},
            {text: "background-color", correct:true},
            {text: "All of the above", correct:false},
        ]
    }, 

    {
        question: "The CSS property used to control the element's font-size is -",
        answers:[
            {text: "text-style", correct:false},
            {text: "text-size", correct:false},
            {text: "font-size", correct:true},
            {text: "None of the above", correct:false},
        ]
    }, 

    {
        question: "Which of the following is the correct syntax to make the background-color of all paragraph elements to yellow?",
        answers:[
            {text: "p {background-color : yellow;}", correct:true},
            {text: "p {background-color : #yellow;}", correct:false},
            {text: "all {background-color : yellow;}", correct:false},
            {text: "all p {background-color : #yellow;}", correct:false},
        ]
    }, 

    {
        question: "The CSS property used to make the text bold is -",
        answers:[
            {text: "font-weight : bold", correct:true},
            {text: "weight: bold", correct:false},
            {text: "font: bold", correct:false},
            {text: "style: bold", correct:false},
        ]
    }, 

    {
        question: "Which of the following syntax is correct in CSS to make each word of a sentence start with a capital letter??",
        answers:[
            {text: "text-style : capital;", correct:false},
            {text: "transform : capitalize;", correct:false},
            {text: "text-transform : capital;", correct:false},
            {text: "text-transform : capitalize;", correct:true},
        ]
    }, 

    {
        question: "Which of the following is the correct syntax to select the p siblings of a div element?",
        answers:[
            {text: "p", correct:false},
            {text: "div + p", correct:false},
            {text: "div p", correct:false},
            {text: "div ~ p", correct:true},
        ]
    }, 

    {
        question: "Which of the following CSS property is used to add shadows to the text?",
        answers:[
            {text: "text-shadow", correct:true},
            {text: "text-stroke", correct:false},
            {text: "text-overflow", correct:false},
            {text: "text-decoration", correct:false},
        ]
    }, 

    {
        question: "Which of the following is not a type of combinator?",
        answers:[
            {text: ">", correct:false},
            {text: "~", correct:false},
            {text: "+", correct:false},
            {text: "*", correct:true},
        ]
    },
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
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
    const currentQuestion = questions[currentQuestionIndex];;
    const questionNo = currentQuestionIndex + 1;
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
    });
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
    });
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
});

startQuiz();