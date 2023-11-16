let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;
const quizArray = [
    {
        id: "0",
        question: "What is the distance to the moon from Earth",
        options: ['238,900 miles', '500,000 miles', '20 miles', '509,523 miles'],
        correct: "238,900 miles",
    },
    {
        id: "1",
        question: "What type of volcanoes are on the surface of the moon Titan?",
        options: ['Lava Domes', 'Cryo Volcano', 'composite volcanoes', 'shield volcanoes'],
        correct: "Cryo Volcano",
    },
    {
        id: "2",
        question: "What is the distance to Pluto from Earth",
        options: ['200.53 billion miles', '50.8 million miles', '3.1259 billion miles', '500 trillion miles'],
        correct: "3.1259 billion miles",
    },
    {
        id: "3",
        question: "How many days will it take to get to the Sun from Earth?",
        options: ['19 years', '4 days', '12 years' , '16 years'],
        correct: "19 years",
    },
    {
        id: "4",
        question: "How many Planets are in our Solar System",
        options: [12, 8 , 9, 7],
        correct: 8,
    },
    {
        id: "5",
        question: "What is the distance from the Earth to Venus",
        options: ['162 millon miles', '102 million miles', '204 million miles', '64 million miles'],
        correct: "162 million miles",
    }, {
        id: "6",
        question: "When was the last time the U.S. went to the moon",
        options: ['Jan 6th 1974', 'Oct 12th, 1982' , 'December 14, 1972' , 'June 4th, 1969'],
        correct: "December 14, 1972",
    },
    {
        id: "7",
        question: "'what is the farthest Planet from the sun",
        options: ['Pluto' , 'Neptune' , 'Saturn' , 'Mars'],
        correct: "Neptune",
    },
    {
        id: "8",
        question: "What is the biggest dump in space?",
        options: ['Earth', 'Jupiter', 'The Sun', 'The Moon'],
        correct: "Earth",
    },
    {
        id: "9",
        question: "what is the cost of  NASA space suit?",
        options: ['$8,000,000' , '$46,000,000' , '$79,000,000' , '$12,000,000'],
        correct: "$12,000,000",
    },
];

restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        questionCount += 1;
        if (questionCount == quizArray.length) {
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
   
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
   
    quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {
    
    quizArray.sort(() => Math.random() - 0.5);
    
    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }
    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};