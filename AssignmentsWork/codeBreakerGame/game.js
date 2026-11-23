
// Get the HTML elements
const startBtn = document.getElementById("start-btn");
const instructions = document.getElementById("instructions");
const gameArea = document.getElementById("game-area");
const vaultArea = document.getElementById("vault-area");


const question = document.getElementById("question");
const answer = document.getElementById("answer");
const submitBtn = document.getElementById("submit-btn");
const feedback = document.getElementById("feedback");


const scoreDisplay = document.getElementById("score");
const mistakesDisplay = document.getElementById("mistakes");
const progress = document.getElementById("progress");
const vaultCode = document.getElementById("vault-code");

const codeInput = document.getElementById("code-input");
const unlockBtn = document.getElementById("unlock-btn");
const vaultMessage = document.getElementById("vault-message");

const restartBtn = document.getElementById("restart-btn");

const securityLock = document.getElementById("security-lock");
const lockStatus = document.getElementById("lock-status");




// Game variables
let score = 100;
let mistakes = 0;
let currentChallenge = 0;
let secretCode = [];
let correctAnswer = 0;


function generateQuestion() {

    // randomly choose a math operation
    const operations = ["+", "-", "*", "/"];

    let operation = operations[
        Math.floor(Math.random() * operations.length)
    ];

    let num1;
    let num2;

    // Generate numbers based on the operation
    switch (operation) {

        case "+":
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * (10 - num1));
            correctAnswer = num1 + num2;
            break;

        case "-":
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * (num1 +1));
            correctAnswer = num1 - num2;
                break;

        case "*":
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * 10);

            while ( num1 * num2 > 9) {
                    num1 = Math.floor(Math.random() * 10);
                    num2 = Math.floor(Math.random() * 10);
                }

            correctAnswer = num1 * num2;
            break;

        case "/":
        // Generate division with whole-number answer
            num2 = Math.floor( Math.random() * 9) + 1;
            correctAnswer = Math.floor(Math.random() * 10);
            num1 = num2 * correctAnswer;
            break; 
    }

    // Display the question
    question.textContent =
        num1 + " " + operation + " " + num2 + " = ?";

}

function checkAnswer() {

    // Make sure the player entered the an answer
    if(answer.value.trim() === "") {
        feedback.textContent = "Please enter an answer!";
        return;
    }

    // Convert the player's input to a number
    let playerAnswer = Number(answer.value);

    // Check if the answer is correct
    if (playerAnswer === correctAnswer) {

        feedback.textContent = "Correct! Code digit revealed!";

        // Add points
        score += 20;
        scoreDisplay.textContent = score;

        // Store the correct answer as a code digit
        secretCode.push(correctAnswer);

        // Display the revealed digits
        let displayCode = [...secretCode];

        while (displayCode.length < 4) {
            displayCode.push("?");
        }

        vaultCode.textContent = displayCode.join(" ");

        // Move to the next challenge 
        currentChallenge++;
        console.log("Current challenge:", currentChallenge);

        if (currentChallenge < 4) {
            progress.textContent = 
            "Challenge " + (currentChallenge + 1) + " of 4";


            generateQuestion();
        } else {
            question.textContent = "All challenges completed!";
            progress.textContent = "Vault code discovered!";


            answer.disabled = true;
            submitBtn.disabled = true;

            // Display the vault keypad
            vaultArea.hidden = false;
        }

        // Clear the answer box
        answer.value = "";

    } else {

        // Incorrect answer
        mistakes++;
        score -= 10;

        mistakesDisplay.textContent = mistakes;
        scoreDisplay.textContent = score;

        feedback.textContent = "Incorrect! Try again.";
        answer.value = "";
    }
}

function unlockVault() {

    // Get the code entered by the player
    let enteredCode = codeInput.value.trim();

    // Convert the secret code array into a string
    let correctCode = secretCode.join("");

    // Make sure the player entered four digits
    if (!/^\d{4}$/.test(enteredCode)) {
        vaultMessage.textContent = "Please enter a 4-digit code!";
        return;
    }

    // Compare the entered code with the secret code
    if (enteredCode === correctCode) {

        securityLock.classList.add("unlocked");
        lockStatus.textContent = "ACCESS GRANTED";

        vaultMessage.textContent = "Vault Unlocked! Welcome to the Matrix, Neo!";

        // Bonus points for unlocking the vault
        score += 50;
        scoreDisplay.textContent = score;


        // Prevent repeated unlocking for bonus points
        unlockBtn.disabled = true;
        codeInput.disabled = true;
        restartBtn.hidden = false;

    } else {

        vaultMessage.textContent = "Incorrect code! Try again.";
        codeInput.value = "";
    }
}

restartBtn.addEventListener("click", function() {

    // Reset game variables
    score = 100;
    mistakes = 0;
    currentChallenge = 0;
    secretCode = [];

    // Reset Displays
    scoreDisplay.textContent = score;
    mistakesDisplay.textContent = mistakes;
    vaultCode.textContent = "? ? ? ?";
    progress.textContent = "Challenge 1 of 4";

    // Reset security Lock
    securityLock.classList.remove("unlocked");
    lockStatus.textContent = "SYSTEM LOCKED";
    
    // Clear input and message
    answer.value = "";
    codeInput.value = "";
    feedback.textContent = "";
    vaultMessage.textContent = "";

    // Enable buttons and inputs
    answer.disabled = false;
    submitBtn.disabled = false;
    codeInput.disabled = false;
    unlockBtn.disabled = false;

    // Hide vault section and restart button
    vaultArea.hidden = true;
    restartBtn.hidden = true;

    // Show math question
    gameArea.hidden = false;

    // Generate new question
    generateQuestion();
})

// Matrix-Style Binary Rain

// Find the Canvas in HTML
const rainCanvas = document.getElementById("matrix-rain");


// Create a 2D drawing context
const ctx = rainCanvas.getContext("2d");

// Size of the binary characters
const fontSize = 16;

// Track the position of each falling column
let drops = [];

// Set the Canvas size
function resizeRain() {
    rainCanvas.width = window.innerWidth;
    rainCanvas.height = window.innerHeight;

    // Calculate the number of columns
    const columns = Math.floor(rainCanvas.width / fontSize);


    // Start each column at a random position
    drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * 50;
    }
}

  // Draw the falling binary digits
  function drawRain() {

    // Draw overlay creates the fading trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, rainCanvas.width, rainCanvas.height);

    // Green binary digits
    ctx.fillStyle = "#00ff66";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {

        // Randomly choose 0 or 1
        const digit = Math.random() < 0.5 ? "0" : "1";

        // draw digit at its column position
        ctx.fillText(
            digit,
            i * fontSize,
            drops[i] * fontSize
        );

        // Rest the column after it falls off-screen
        if (
            drops[i] * fontSize > rainCanvas.height &&
            Math.random() > 0.975
        ) {
            drops[i] = 0;
        }

        // Move the digit down
        drops[i]++;
    }
  }

  // Set up the animation 
  resizeRain();

  // Adjust Canvas if Browser Window changes size
  window.addEventListener("resize", resizeRain);

  // Draw new frame every 50 millisecond
  setInterval(drawRain, 50);


unlockBtn.addEventListener("click", unlockVault);

submitBtn.addEventListener("click", checkAnswer);

//Start Game
startBtn.addEventListener("click", function() 
{

    // Hide instructions
    instructions.hidden = true;


    //Show the game area
    gameArea.hidden = false;

    //reset game variables
    score = 100;
    mistakes = 0;
    currentChallenge = 0;
    secretCode = [];
    
    // Update the screen
    scoreDisplay.textContent = score;
    mistakesDisplay.textContent = mistakes;
    vaultCode.textContent = "? ? ? ?";


    //Display a test question
    generateQuestion();

});