const question = {
    text: "Which company developed Java?",
    options: {
        A: "Microsoft",
        B: "Sun Microsystems",
        C: "Google",
        D: "Apple"
    },
    answer: "B"
};

document.getElementById("question").innerHTML =
    question.text + "<br><br>" +
    "A: " + question.options.A + "<br>" +
    "B: " + question.options.B + "<br>" +
    "C: " + question.options.C + "<br>" +
    "D: " + question.options.D;

function checkAnswer(option) {
    if (option === question.answer) {
        document.getElementById("result").innerText = "✅ Correct!";
    } else {
        document.getElementById("result").innerText = "❌ Wrong! Try again.";
    }
}