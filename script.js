// =======================
// 30 Advanced Java MCQs
// =======================

const allQuestions = [

/* EASY */
{
question: "Which is NOT a primitive type?",
options: ["int", "float", "String", "boolean"],
answer: 2,
explanation: "String is a class, not primitive.",
difficulty: "Easy"
},
{
question: "Default value of boolean?",
options: ["true", "false", "0", "null"],
answer: 1,
explanation: "Default boolean value is false.",
difficulty: "Easy"
},
{
question: "Which loop runs at least once?",
options: ["for", "while", "do-while", "none"],
answer: 2,
explanation: "do-while runs at least once.",
difficulty: "Easy"
},
{
question: "Which compares object content?",
options: ["==", "equals()", "compare()", "instanceof"],
answer: 1,
explanation: "equals() compares actual content.",
difficulty: "Easy"
},
{
question: "Which keyword is used for inheritance?",
options: ["implement", "extends", "inherit", "instanceof"],
answer: 1,
explanation: "extends is used for inheritance.",
difficulty: "Easy"
},

/* MEDIUM */
{
question: "Output: int x=10; System.out.println(x++ + ++x);",
options: ["21", "22", "23", "20"],
answer: 1,
explanation: "x++ gives 10 (x=11), ++x gives 12 → 10+12=22",
difficulty: "Medium"
},
{
question: "What happens int division by zero?",
options: ["0", "Compile Error", "Runtime Exception", "Infinity"],
answer: 2,
explanation: "Throws ArithmeticException.",
difficulty: "Medium"
},
{
question: "Where are objects stored?",
options: ["Stack", "Heap", "ROM", "CPU"],
answer: 1,
explanation: "Objects are stored in Heap memory.",
difficulty: "Medium"
},
{
question: "Which is unchecked exception?",
options: ["IOException", "SQLException", "NullPointerException", "FileNotFoundException"],
answer: 2,
explanation: "NullPointerException is unchecked.",
difficulty: "Medium"
},
{
question: "String is immutable because?",
options: ["final class", "security", "string pool", "All"],
answer: 3,
explanation: "All are correct reasons.",
difficulty: "Medium"
},

/* HARD */
{
question: "Output: System.out.println(5 + 3 + \"Java\" + 2 + 2);",
options: ["8Java22", "8Java4", "Java822", "Error"],
answer: 0,
explanation: "Left to right → 8Java22",
difficulty: "Hard"
},
{
question: "Can constructor be private?",
options: ["Yes", "No"],
answer: 0,
explanation: "Used in Singleton pattern.",
difficulty: "Hard"
},
{
question: "Can static method be overridden?",
options: ["Yes", "No"],
answer: 1,
explanation: "Static methods are hidden, not overridden.",
difficulty: "Hard"
},
{
question: "Default value of object reference?",
options: ["0", "false", "null", "undefined"],
answer: 2,
explanation: "Object reference default is null.",
difficulty: "Hard"
},
{
question: "Garbage Collection means?",
options: ["Destroy unused objects", "Clear RAM manually", "Compile code", "None"],
answer: 0,
explanation: "Removes unused objects from heap.",
difficulty: "Hard"
}
];

// Duplicate questions to make 30
while(allQuestions.length < 30){
    allQuestions.push({...allQuestions[allQuestions.length % 15]});
}

// =======================
// QUIZ VARIABLES
// =======================

let questions = [];
let current = 0;
let score = 0;
let time = 60;
let timer;
let negativeMark = 0.25;

// =======================
// START QUIZ
// =======================

function startQuiz(level){
    questions = shuffle(allQuestions.filter(q => q.difficulty === level));
    current = 0;
    score = 0;
    time = 60;
    document.getElementById("level-select").style.display="none";
    document.getElementById("quiz-box").classList.remove("hidden");
    startTimer();
    loadQuestion();
}

// =======================
// RANDOM SHUFFLE
// =======================

function shuffle(array){
    return array.sort(()=>Math.random()-0.5);
}

// =======================
// TIMER
// =======================

function startTimer(){
    timer = setInterval(()=>{
        time--;
        document.getElementById("timer").textContent="Time: "+time;
        if(time<=0) finishQuiz();
    },1000);
}

// =======================
// LOAD QUESTION
// =======================

function loadQuestion(){
    const q = questions[current];
    document.getElementById("question").textContent=q.question;
    document.getElementById("options").innerHTML="";
    document.getElementById("explanation").textContent="";

    q.options.forEach((opt,index)=>{
        const btn=document.createElement("button");
        btn.textContent=opt;
        btn.onclick=()=>checkAnswer(index);
        document.getElementById("options").appendChild(btn);
    });
}

// =======================
// CHECK ANSWER + NEGATIVE MARKING
// =======================

function checkAnswer(index){
    const correct = questions[current].answer;

    if(index === correct){
        score++;
    }else{
        score -= negativeMark;
    }

    document.getElementById("score").textContent="Score: "+score.toFixed(2);
    document.getElementById("explanation").textContent=questions[current].explanation;
}

// =======================
// NEXT
// =======================

function nextQuestion(){
    current++;
    if(current < questions.length){
        loadQuestion();
    }else{
        finishQuiz();
    }
}

// =======================
// FINISH QUIZ
// =======================

function finishQuiz(){
    clearInterval(timer);
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("result-box").classList.remove("hidden");
    document.getElementById("finalScore").textContent=
        "Final Score: "+score.toFixed(2)+"/"+questions.length;
}

// =======================
// LEADERBOARD (LOCAL STORAGE)
// =======================

function saveScore(){
    const name=document.getElementById("username").value;
    const leaderboard=JSON.parse(localStorage.getItem("leaderboard"))||[];
    leaderboard.push({name:name, score:score.toFixed(2)});
    leaderboard.sort((a,b)=>b.score-a.score);
    localStorage.setItem("leaderboard",JSON.stringify(leaderboard));
    displayLeaderboard();
}

function displayLeaderboard(){
    const leaderboard=JSON.parse(localStorage.getItem("leaderboard"))||[];
    const board=document.getElementById("leaderboard");
    board.innerHTML="<h3>🏆 Leaderboard</h3>";
    leaderboard.slice(0,5).forEach(player=>{
        board.innerHTML+=`<p>${player.name} - ${player.score}</p>`;
    });
}
