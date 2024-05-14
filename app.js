// Array to store the problems
let problems = [];
// Index of the current problem being displayed
let currentProblemIndex = 0;
// Variable to store the user's score
let score = 0;
// Variable to store the total number of questions
let totalQuestions = 0;

// Function to start the quiz
function startQuiz() {
    // Get the selected quiz type (Multiplication or Division)
    const quizType = document.getElementById('quizType').value;
    // Get the total number of questions entered by the user
    totalQuestions = parseInt(document.getElementById('totalQuestions').value);

    // Hide the quiz type dropdown and total questions input
    document.getElementById('quizType').style.display = 'none';
    document.getElementById('totalQuestions').style.display = 'none';
    // Hide the Start button
    document.querySelector('button').style.display = 'none';
    // Show the answer input and Submit Answer button
    document.getElementById('answer').style.display = 'block';
    document.querySelector('button[onclick="submitAnswer()"]').style.display = 'block';

    // Generate and evaluate problems based on the selected quiz type and total number of questions
    generateAndEvaluate(quizType, totalQuestions);
}

// Function to generate problems and evaluate answers
function generateAndEvaluate(quizType, totalQuestions) {
    // Reset the problems array
    problems = [];
    // Loop to generate the specified number of problems
    for (let i = 0; i < totalQuestions; i++) {
        // Generate two random numbers between 1 and 10
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        let answer;
        // Calculate the answer based on the quiz type
        if (quizType === 'multiply') {
            answer = num1 * num2;
        } else {
            answer = num1 / num2;
        }
        // Store the problem details in the problems array
        problems.push({ num1, num2, answer, type: quizType, userAnswer: null });
    }

    // Reset the current problem index and score
    currentProblemIndex = 0;
    score = 0;
    // Display the first problem
    displayNextProblem();
}

// Function to display the next problem
function displayNextProblem() {
    // Check if all problems have been displayed
    if (currentProblemIndex >= totalQuestions) {
        // Complete the quiz if all problems are done
        completeQuiz();
        return;
    }
    // Get the current problem
    const problem = problems[currentProblemIndex];
    let operation;
    // Determine the operation symbol based on the quiz type
    if (problem.type === 'multiply') {
        operation = '*';
    } else {
        operation = '/';
    }
    // Display the current problem
    document.getElementById('question').textContent = `Question ${currentProblemIndex + 1}/${totalQuestions}: What is ${problem.num1} ${operation} ${problem.num2}?`;
    // Clear the answer input and feedback
    document.getElementById('answer').value = '';
    document.getElementById('feedback').textContent = '';
}

// Function to submit the answer
function submitAnswer() {
    // Get the user's answer
    const userAnswer = parseFloat(document.getElementById('answer').value);
    // Get the current problem
    const problem = problems[currentProblemIndex];
    // Store the user's answer in the problem object
    problem.userAnswer = userAnswer;

    // Check if the user's answer is correct
    if (userAnswer === problem.answer) {
        // Increment the score for a correct answer
        score++;
        document.getElementById('feedback').textContent = 'Correct!';
    } else {
        // Provide feedback for an incorrect answer
        document.getElementById('feedback').textContent = `Wrong, correct answer was ${problem.answer}`;
    }

    // Move to the next problem
    currentProblemIndex++;
    // Display the next problem or complete the quiz if all problems are done
    if (currentProblemIndex < totalQuestions) {
        displayNextProblem();
    } else {
        completeQuiz();
    }
}

// Function to complete the quiz
function completeQuiz() {
    // Clear the question text
    document.getElementById('question').textContent = '';
    // Hide the answer input and Submit Answer button
    document.getElementById('answer').style.display = 'none';
    document.querySelector('button[onclick="submitAnswer()"]').style.display = 'none';
    // Display the user's score
    document.getElementById('score').textContent = `Quiz completed! Your score: ${score}/${totalQuestions}`;
    // Show a summary of the user's answers
    showSummary();
}

// Function to show a summary of the quiz
function showSummary() {
    // Initialize the summary HTML
    let summaryHtml = 'Answer Summary:<br>';
    // Loop through each problem to generate the summary
    problems.forEach((problem, index) => {
        summaryHtml += `Q${index + 1}: ${problem.num1} ${problem.type === 'multiply' ? '*' : '/'} ${problem.num2} = `;
        // Check if the user's answer was correct
        if (problem.userAnswer === problem.answer) {
            summaryHtml += `${problem.userAnswer} (Your Answer) - Correct<br>`;
        } else {
            summaryHtml += `${problem.userAnswer} (Your Answer) - Wrong, correct answer was ${problem.answer}<br>`;
        }
    });
    // Display the summary
    document.getElementById('summary').innerHTML = summaryHtml;
}
