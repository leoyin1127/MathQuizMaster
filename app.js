let problems = [];
let currentProblemIndex = 0;
let score = 0;
let totalQuestions = 0;

function startQuiz() {
    const quizType = document.getElementById('quizType').value;
    totalQuestions = parseInt(document.getElementById('totalQuestions').value);
    problems = [];
    for (let i = 0; i < totalQuestions; i++) {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const answer = quizType === 'multiply' ? num1 * num2 : num1 / num2;
        problems.push({ num1, num2, answer, type: quizType, userAnswer: null });
    }
    currentProblemIndex = 0;
    score = 0;
    document.getElementById('quizType').style.display = 'none';
    document.getElementById('totalQuestions').style.display = 'none';
    document.querySelector('button').style.display = 'none';  // Hides the Start button
    document.getElementById('answer').style.display = 'block';
    document.querySelector('button[onclick="submitAnswer()"]').style.display = 'block';
    displayNextProblem();
}

function displayNextProblem() {
    if (currentProblemIndex >= totalQuestions) {
        completeQuiz();
        return;
    }
    const problem = problems[currentProblemIndex];
    const operation = problem.type === 'multiply' ? '*' : '/';
    document.getElementById('question').textContent = `Question ${currentProblemIndex + 1}/${totalQuestions}: What is ${problem.num1} ${operation} ${problem.num2}?`;
    document.getElementById('answer').value = '';
    document.getElementById('feedback').textContent = '';
}

function submitAnswer() {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    const problem = problems[currentProblemIndex];
    problem.userAnswer = userAnswer;  // Store user answer in the problem object

    if (userAnswer === problem.answer) {
        score++;
        if (currentProblemIndex < problems.length - 1) {
            document.getElementById('feedback').textContent = 'Correct!';
        }
    } else {
        if (currentProblemIndex < problems.length - 1) {
            document.getElementById('feedback').textContent = `Wrong, correct answer was ${problem.answer}`;
        }
    }
    currentProblemIndex++;
    displayNextProblem();
}

function completeQuiz() {
    document.getElementById('question').textContent = '';
    document.getElementById('answer').style.display = 'none';
    document.querySelector('button[onclick="submitAnswer()"]').style.display = 'none';
    document.getElementById('score').textContent = `Quiz completed! Your score: ${score}/${totalQuestions}`;
    showSummary();
}

function showSummary() {
    let summaryHtml = 'Answer Summary:<br>';
    problems.forEach((problem, index) => {
        const correct = problem.userAnswer === problem.answer;
        summaryHtml += `Q${index + 1}: ${problem.num1} ${problem.type === 'multiply' ? '*' : '/'} ${problem.num2} = `;
        summaryHtml += `${problem.userAnswer} (Your Answer) - ${correct ? 'Correct' : 'Wrong, correct answer was ' + problem.answer}<br>`;
    });
    document.getElementById('summary').innerHTML = summaryHtml;
}