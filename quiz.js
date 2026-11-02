// quiz.js - IT 3203 Milestone 2 Quiz Logic
// Implements a 10-minute countdown, form evaluation, feedback breakdown, and state reset

// Total time limit: 10 minutes (600 seconds)
const TIME_LIMIT_SECONDS = 600;
let remainingTime = TIME_LIMIT_SECONDS;
let timerInterval = null;
let quizSubmitted = false;

// Master answer key matching the 10 SEO questions
const quizKey = {
    // Fill in the blank (string comparisons trimmed and lowercased)
    q1: ["search engine results page", "search engine results pages", "search engine result page"],
    q2: ["alt", "alt attribute", "alt text"],
    
    // Multiple Choice (single selection)
    q3: "301",
    q4: "head",
    q5: "1",
    
    // Multi-Selection (array of correct values)
    q6: ["meta_desc", "headings", "clean_urls"],
    q7: ["root", "advisory", "disallow"],
    q8: ["compress", "minify", "caching"],
    q9: ["stuffing", "cloaking", "hidden_text"],
    q10: ["roadmap", "metadata", "search_console"]
};

// Start timer when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    startCountdown();

    const submitBtn = document.getElementById("submitBtn");
    const resetBtn = document.getElementById("resetBtn");

    submitBtn.addEventListener("click", function () {
        if (!quizSubmitted) {
            evaluateQuiz();
        }
    });

    resetBtn.addEventListener("click", function () {
        resetQuiz();
    });
});

// Countdown timer handler
function startCountdown() {
    clearInterval(timerInterval);
    const display = document.getElementById("time-display");
    const timerBox = document.getElementById("timerBox");

    timerInterval = setInterval(function () {
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            display.textContent = "00:00";
            alert("Time is up! Submitting your assessment automatically.");
            evaluateQuiz();
            return;
        }

        remainingTime--;

        let minutes = Math.floor(remainingTime / 60);
        let seconds = remainingTime % 60;

        let formattedMin = minutes < 10 ? "0" + minutes : minutes;
        let formattedSec = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = formattedMin + ":" + formattedSec;

        // Visual alert when less than 2 minutes remain
        if (remainingTime <= 120) {
            timerBox.classList.add("warning");
        } else {
            timerBox.classList.remove("warning");
        }
    }, 1000);
}

// Calculate score, record time, and generate output
function evaluateQuiz() {
    quizSubmitted = true;
    clearInterval(timerInterval);

    // Compute elapsed time
    const timeSpentSeconds = TIME_LIMIT_SECONDS - remainingTime;
    const spentMinutes = Math.floor(timeSpentSeconds / 60);
    const spentSeconds = timeSpentSeconds % 60;
    const formattedSpentTime = spentMinutes + "m " + (spentSeconds < 10 ? "0" + spentSeconds : spentSeconds) + "s";

    let score = 0;
    let feedbackLog = [];

    // --- Q1 Check (Fill in blank) ---
    const q1Input = document.getElementById("q1").value.trim().toLowerCase();
    const q1Correct = quizKey.q1.includes(q1Input);
    if (q1Correct) score++;
    feedbackLog.push({
        num: 1,
        isCorrect: q1Correct,
        userAns: q1Input || "(No answer given)",
        correctAns: "Search Engine Results Page"
    });

    // --- Q2 Check (Fill in blank) ---
    const q2Input = document.getElementById("q2").value.trim().toLowerCase();
    const q2Correct = quizKey.q2.includes(q2Input);
    if (q2Correct) score++;
    feedbackLog.push({
        num: 2,
        isCorrect: q2Correct,
        userAns: q2Input || "(No answer given)",
        correctAns: "alt"
    });

    // --- Q3 Check (Single radio) ---
    const q3Elem = document.querySelector('input[name="q3"]:checked');
    const q3Ans = q3Elem ? q3Elem.value : "(No choice selected)";
    const q3Correct = (q3Ans === quizKey.q3);
    if (q3Correct) score++;
    feedbackLog.push({
        num: 3,
        isCorrect: q3Correct,
        userAns: q3Ans,
        correctAns: "301 Permanent Redirect"
    });

    // --- Q4 Check (Single radio) ---
    const q4Elem = document.querySelector('input[name="q4"]:checked');
    const q4Ans = q4Elem ? q4Elem.value : "(No choice selected)";
    const q4Correct = (q4Ans === quizKey.q4);
    if (q4Correct) score++;
    feedbackLog.push({
        num: 4,
        isCorrect: q4Correct,
        userAns: q4Ans,
        correctAns: "Inside the <head> element"
    });

    // --- Q5 Check (Single radio) ---
    const q5Elem = document.querySelector('input[name="q5"]:checked');
    const q5Ans = q5Elem ? q5Elem.value : "(No choice selected)";
    const q5Correct = (q5Ans === quizKey.q5);
    if (q5Correct) score++;
    feedbackLog.push({
        num: 5,
        isCorrect: q5Correct,
        userAns: q5Ans,
        correctAns: "1 single main heading per page"
    });

    // Helper function for checking multi-selection arrays
    function checkMultiSelection(name, keyArray) {
        const checkedNodes = document.querySelectorAll(`input[name="${name}"]:checked`);
        let selectedValues = [];
        checkedNodes.forEach(node => selectedValues.push(node.value));

        if (selectedValues.length !== keyArray.length) {
            return { isCorrect: false, userVals: selectedValues };
        }

        const match = keyArray.every(val => selectedValues.includes(val));
        return { isCorrect: match, userVals: selectedValues };
    }

    // --- Q6 Check (Multi-checkbox) ---
    const resQ6 = checkMultiSelection("q6", quizKey.q6);
    if (resQ6.isCorrect) score++;
    feedbackLog.push({
        num: 6,
        isCorrect: resQ6.isCorrect,
        userAns: resQ6.userVals.join(", ") || "(None selected)",
        correctAns: "meta_desc, headings, clean_urls"
    });

    // --- Q7 Check (Multi-checkbox) ---
    const resQ7 = checkMultiSelection("q7", quizKey.q7);
    if (resQ7.isCorrect) score++;
    feedbackLog.push({
        num: 7,
        isCorrect: resQ7.isCorrect,
        userAns: resQ7.userVals.join(", ") || "(None selected)",
        correctAns: "root, advisory, disallow"
    });

    // --- Q8 Check (Multi-checkbox) ---
    const resQ8 = checkMultiSelection("q8", quizKey.q8);
    if (resQ8.isCorrect) score++;
    feedbackLog.push({
        num: 8,
        isCorrect: resQ8.isCorrect,
        userAns: resQ8.userVals.join(", ") || "(None selected)",
        correctAns: "compress, minify, caching"
    });

    // --- Q9 Check (Multi-checkbox) ---
    const resQ9 = checkMultiSelection("q9", quizKey.q9);
    if (resQ9.isCorrect) score++;
    feedbackLog.push({
        num: 9,
        isCorrect: resQ9.isCorrect,
        userAns: resQ9.userVals.join(", ") || "(None selected)",
        correctAns: "stuffing, cloaking, hidden_text"
    });

    // --- Q10 Check (Multi-checkbox) ---
    const resQ10 = checkMultiSelection("q10", quizKey.q10);
    if (resQ10.isCorrect) score++;
    feedbackLog.push({
        num: 10,
        isCorrect: resQ10.isCorrect,
        userAns: resQ10.userVals.join(", ") || "(None selected)",
        correctAns: "roadmap, metadata, search_console"
    });

    // Render results
    renderResults(score, feedbackLog, formattedSpentTime);
}

// Display results banner and question breakdown
function renderResults(totalScore, feedbackList, duration) {
    const dashboard = document.getElementById("results-dashboard");
    const banner = document.getElementById("scoreBanner");
    const breakdownList = document.getElementById("breakdown-list");

    const percentage = (totalScore / 10) * 100;
    const passed = percentage >= 70; // 70% threshold

    // Status banner
    banner.className = "score-banner " + (passed ? "passed" : "failed");
    banner.innerHTML = `
        <h2>${passed ? "Assessment Passed!" : "Assessment Needs Review"}</h2>
        <p><strong>Score:</strong> ${totalScore} / 10 (${percentage}%)</p>
        <p><strong>Completion Time:</strong> ${duration}</p>
        <p><strong>Result:</strong> ${passed ? "PASS" : "FAIL"}</p>
    `;

    // Question-by-question breakdown
    breakdownList.innerHTML = "";
    feedbackList.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "question-feedback-item " + (item.isCorrect ? "feedback-correct" : "feedback-incorrect");

        itemDiv.innerHTML = `
            <p><strong>Question ${item.num}:</strong> ${item.isCorrect ? "Correct (+1)" : "Incorrect (0)"}</p>
            <p class="user-answer-text">Your Submission: <em>${escapeHTML(item.userAns)}</em></p>
            ${!item.isCorrect ? `<p class="correct-answer-text">Expected: ${escapeHTML(item.correctAns)}</p>` : ""}
        `;
        breakdownList.appendChild(itemDiv);
    });

    dashboard.style.display = "block";
    dashboard.scrollIntoView({ behavior: "smooth" });
}

// Reset the entire form and restart clock
function resetQuiz() {
    document.getElementById("seoQuizForm").reset();
    document.getElementById("results-dashboard").style.display = "none";
    document.getElementById("breakdown-list").innerHTML = "";

    // Reset clock state
    remainingTime = TIME_LIMIT_SECONDS;
    quizSubmitted = false;
    document.getElementById("time-display").textContent = "10:00";
    document.getElementById("timerBox").classList.remove("warning");

    startCountdown();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Basic helper to prevent HTML injection in display fields
function escapeHTML(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
