var questions = [

    {
        question: "Wie was Ibn Fadlan?",
        answers: [
            { text: "Voetballer", correct: false },
            { text: "Ondernemer", correct: false },
            { text: "Reiziger", correct: true },
            { text: "Basketbalspeler", correct: false },
        ]
    },
    {
        question: "Wie is Cristiano Ronaldo?",
        answers: [
            { text: "Voetballer", correct: true },
            { text: "Golfspeler", correct: false },
            { text: "Hockeyspeler", correct: false },
            { text: "Basketbalspeler", correct: false },
        ]
    },
    {
        question: "Wie is Tiger Woods?",
        answers: [
            { text: "Voetballer", correct: false },
            { text: "Bokser", correct: false },
            { text: "Hockeyspeler", correct: false },
            { text: "Golfspeler", correct: true },
        ]
    },
    {
        question: "Wie was Michael Jackson?",
        answers: [
            { text: "Voetballer", correct: false },
            { text: "Zanger", correct: true },
            { text: "Gevangenisbewaarder", correct: false },
            { text: "Basketbalspeler", correct: false },
        ]
    },
    {
        question: "Wie is Mike Tyson?",
        answers: [
            { text: "Voetballer", correct: false },
            { text: "Bokser", correct: true },
            { text: "Tennisser", correct: false },
            { text: "Basketbalspeler", correct: false },
        ]
    },
    {
        question: "Wie is Lionel Messi?",
        answers: [
            { text: "Voetballer", correct: true },
            { text: "Golfer", correct: false },
            { text: "Tennisser", correct: false },
            { text: "Basketbalspeler", correct: false },
        ]
    },
    {
        question: "Wie is Neymar?",
        answers: [
            { text: "Voetballer", correct: true },
            { text: "Golfer", correct: false },
            { text: "Tennisser", correct: false },
            { text: "Basketbalspeler", correct: false },
        ]
    },
    {
        question: "Wie was Muhammed Ali?",
        answers: [
            { text: "Voetballer", correct: false },
            { text: "Bokser", correct: true },
            { text: "Tennisser", correct: false },
            { text: "Basketbalspeler", correct: false },
        ]
    },
    {
        question: "Wie was Albert Einstein?",
        answers: [
            { text: "Wiskundige", correct: true },
            { text: "Schilder", correct: false },
            { text: "Zanger", correct: false },
            { text: "Acteur", correct: false },
        ]
    },
    {
        question: "Wie was Isaac Newton?",
        answers: [
            { text: "Wiskundige", correct: true },
            { text: "Schilder", correct: false },
            { text: "Zanger", correct: false },
            { text: "Acteur", correct: false },
        ]
    }
];


var questionElement = document.getElementById("question");
var answerButtons = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0; // Index begint vanaf 0
let score = 0;

function startQuiz() { // wanneer we de quiz starten
    currentQuestionIndex = 0; // Reset de huidige vraag naar 0
    score = 0; // Score is ook 0
    nextButton.innerHTML = "Volgende"; // wanneer de quiz opnieuw wordt gestart, moeten de knoppen 'Volgende' zijn
    ShowQuestion(); // Toon de vragen
}

function ShowQuestion() {
    resetState(); // Zal de vorige vraag en antwoord resetten
    let currentQuestion = questions[currentQuestionIndex]; // laat currentQuestion gelijk zijn aan currentQuestionIndex
    let questionNo = currentQuestionIndex + 1; // Als de index 0 is, wordt het vraagnummer 1 en als de index 1 is, wordt het vraagnummer 2
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct; // Het zal true of false toevoegen in deze dataset correct
        }
        button.addEventListener("click", selectAnswer); // Wanneer er op de antwoordknop wordt geklikt, zal het de functie selecteerAntwoord aanroepen
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
        /* Het zal alle vorige antwoorden verwijderen */
    }
}

function selectAnswer(e) { // Wanneer er op deze knop wordt geklikt
    var selectedbtn = e.target; // Het zal het geselecteerde knopelement toevoegen
    var isCorrect = selectedbtn.dataset.correct === "true"; // Zal de geselecteerde knop dataset true controleren
    if (isCorrect) { // Als het waar is
        selectedbtn.classList.add("correct"); // Het zal de klasse correct toevoegen
        score++; // Het zal de score met 1 verhogen
    } else { // Als het niet waar is
        selectedbtn.classList.add("incorrect"); // Het zal de klasse toevoegen
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
        nextButton.style.display = "block";
    });
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Je hebt ${score} van de ${questions.length} goed!`;
    nextButton.innerHTML = "Opnieuw spelen";
    nextButton.style.display = "block";
    nextButton.removeEventListener("click", handleNextButton);
    nextButton.addEventListener("click", startQuiz); // Verander de event listener om startQuiz() in plaats van handleNextButton() aan te roepen
}

function handleNextButton() {
    currentQuestionIndex++; // Het zal de currentQuestionIndex met 1 verhogen.
    if (currentQuestionIndex < questions.length) {
        ShowQuestion(); // Als er nog een vraag is, zal het een andere vraag weergeven
    } else { // Als dat niet het geval is
        showScore(); // Dan zal dit worden weergegeven
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) { // Controleer de huidige index. Als de huidige index kleiner is dan de lengte van de vragen, betekent dit dat de lengte van de vragen 4 is
        handleNextButton();
    } else {
        startQuiz();
    }
});
startQuiz(); // Het zal de huidige index 0, score 0 instellen en de knoptekst 'Volgende' instellen en vervolgens de ShowQuestions aanroepen
