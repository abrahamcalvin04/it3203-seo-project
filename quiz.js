// quiz.js - IT 3203 Milestone 2 Quiz Logic

// 10 minute timer in seconds (10 * 60 = 600)
var totalSeconds = 600;
var timerVar = null;
var isSubmitted = false;

// ensure elements are accessible as soon as HTML parses
document.addEventListener("DOMContentLoaded", function() {
    startTimer();

    // submit button click
    var submitButton = document.getElementById("submitBtn");
    if (submitButton) {
        submitButton.addEventListener("click", function() {
            if (!isSubmitted) {
                gradeQuiz();
            }
        });
    }

    // reset button click
    var resetButton = document.getElementById("resetBtn");
    if (resetButton) {
        resetButton.addEventListener("click", function() {
            resetAll();
        });
    }
});

// countdown timer function
function startTimer() {
    if (timerVar !== null) {
        clearInterval(timerVar);
    }

    timerVar = setInterval(function() {
        if (totalSeconds <= 0) {
            clearInterval(timerVar);
            var timerEl = document.getElementById("timer");
            if (timerEl) {
                timerEl.innerHTML = "00:00";
            }
            alert("10 minutes is up! Submitting your answers now.");
            gradeQuiz();
            return;
        }

        totalSeconds--;

        var mins = Math.floor(totalSeconds / 60);
        var secs = totalSeconds % 60;

        // format with leading zeros
        var displayMins = mins < 10 ? "0" + mins : mins;
        var displaySecs = secs < 10 ? "0" + secs : secs;

        var timerEl = document.getElementById("timer");
        if (timerEl) {
            timerEl.innerHTML = displayMins + ":" + displaySecs;
        }
    }, 1000);
}

// helper to disable or enable all form inputs
function setInputsDisabled(status) {
    var inputs = document.getElementById("quizForm").getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = status;
    }
}

// helper to get checked values from a group of checkboxes
function getCheckedValues(name) {
    var checked = [];
    var boxes = document.getElementsByName(name);
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) {
            checked.push(boxes[i].value);
        }
    }
    return checked;
}

// helper to compare two arrays
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) {
        if (b.indexOf(a[i]) === -1) return false;
    }
    return true;
}

// function to calculate score and show output
function gradeQuiz() {
    isSubmitted = true;
    clearInterval(timerVar);

    // disable all form inputs after submission
    setInputsDisabled(true);

    // figure out time spent
    var timeSpent = 600 - totalSeconds;
    var spentMins = Math.floor(timeSpent / 60);
    var spentSecs = timeSpent % 60;
    var timeString = spentMins + " minute(s) and " + spentSecs + " second(s)";

    var score = 0;
    var detailsHTML = "";

    // Question 1: Easy - Fill in blank (SERP)
    var q1Field = document.getElementById("q1");
    var q1Val = q1Field ? q1Field.value.trim().toLowerCase() : "";
    if (q1Val === "search engine results page" || q1Val === "search engine results pages" || q1Val === "search engine result page") {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 1:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 1:</strong> Incorrect (0) - You wrote: '" + (q1Val || "blank") + "'. Correct answer: Search Engine Results Page</p>";
    }

    // Question 2: Easy - Fill in blank (Organic Search)
    var q2Field = document.getElementById("q2");
    var q2Val = q2Field ? q2Field.value.trim().toLowerCase() : "";
    if (q2Val === "organic search" || q2Val === "organic" || q2Val === "organic searches") {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 2:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 2:</strong> Incorrect (0) - You wrote: '" + (q2Val || "blank") + "'. Correct answer: Organic Search</p>";
    }

    // Question 3: Medium - Radio (head)
    var q3Choice = document.querySelector('input[name="q3"]:checked');
    var q3Val = q3Choice ? q3Choice.value : "None";
    if (q3Val === "head") {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 3:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 3:</strong> Incorrect (0) - Selected: " + q3Val + ". Correct answer: In the HTML &lt;head&gt;</p>";
    }

    // Question 4: Medium - Radio (investigational)
    var q4Choice = document.querySelector('input[name="q4"]:checked');
    var q4Val = q4Choice ? q4Choice.value : "None";
    if (q4Val === "investigational") {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 4:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 4:</strong> Incorrect (0) - Selected: " + q4Val + ". Correct answer: Investigational</p>";
    }

    // Question 5: Medium-Hard - Radio (inp)
    var q5Choice = document.querySelector('input[name="q5"]:checked');
    var q5Val = q5Choice ? q5Choice.value : "None";
    if (q5Val === "inp") {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 5:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 5:</strong> Incorrect (0) - Selected: " + q5Val + ". Correct answer: Interaction to Next Paint (INP)</p>";
    }

    // Question 6: Medium-Hard - Checkboxes (discovery, crawling, rendering, analysis)
    var q6Ans = getCheckedValues("q6");
    var q6Correct = ["discovery", "crawling", "rendering", "analysis"];
    if (arraysEqual(q6Ans, q6Correct)) {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 6:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 6:</strong> Incorrect (0) - Correct choices: Discovery, Crawling, Rendering, and Analysis</p>";
    }

    // Question 7: Medium-Hard - Checkboxes (nodes, edges, depth)
    var q7Ans = getCheckedValues("q7");
    var q7Correct = ["nodes", "edges", "depth"];
    if (arraysEqual(q7Ans, q7Correct)) {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 7:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 7:</strong> Incorrect (0) - Correct choices: Views webpages as nodes, Views hyperlinks as edges, and Internal linking minimizes click depth</p>";
    }

    // Question 8: Hard - Checkboxes (dimensions, splitting, deferring)
    var q8Ans = getCheckedValues("q8");
    var q8Correct = ["dimensions", "splitting", "deferring"];
    if (arraysEqual(q8Ans, q8Correct)) {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 8:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 8:</strong> Incorrect (0) - Correct choices: Declaring dimensions for CLS, Splitting JS tasks for INP, and Deferring non-essential scripts</p>";
    }

    // Question 9: Hard - Checkboxes (error404, redirect, filters, consolidation)
    var q9Ans = getCheckedValues("q9");
    var q9Correct = ["error404", "redirect", "filters", "consolidation"];
    if (arraysEqual(q9Ans, q9Correct)) {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 9:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 9:</strong> Incorrect (0) - Correct choices: All 4 choices apply to the automotive crawl budget case</p>";
    }

    // Question 10: Hard - Checkboxes (json, unstructured, knowledge, natural)
    var q10Ans = getCheckedValues("q10");
    var q10Correct = ["json", "unstructured", "knowledge", "natural"];
    if (arraysEqual(q10Ans, q10Correct)) {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 10:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 10:</strong> Incorrect (0) - Correct choices: Injects JSON into head, Car schema turns unstructured page into explicit attributes, Feeds knowledge graphs, and Eliminates natural language ambiguity</p>";
    }

    // Pass / Fail status (70% or 7/10)
    var passed = score >= 7;
    var statusColor = passed ? "green" : "red";
    var passText = passed ? "PASSED" : "FAILED (Needs Review)";

    // Summary output
    var summaryHTML = "<p><strong>Overall Result: </strong><span style='color: " + statusColor + "; font-size: 1.2em; font-weight: bold;'>" + passText + "</span></p>" +
                      "<p><strong>Total Score: </strong>" + score + " / 10 (" + (score * 10) + "%)</p>" +
                      "<p><strong>Time Taken: </strong>" + timeString + "</p>";

    document.getElementById("summary").innerHTML = summaryHTML;
    document.getElementById("details").innerHTML = detailsHTML;

    // Show the results container and scroll down smoothly
    var resultsBox = document.getElementById("results");
    if (resultsBox) {
        resultsBox.style.display = "block";
        resultsBox.scrollIntoView({ behavior: "smooth" });
    }
}

// reset quiz function
function resetAll() {
    // clear form inputs
    var form = document.getElementById("quizForm");
    if (form) {
        form.reset();
    }

    // re-enable form inputs
    setInputsDisabled(false);

    // hide and empty results
    var resultsBox = document.getElementById("results");
    if (resultsBox) {
        resultsBox.style.display = "none";
    }
    document.getElementById("summary").innerHTML = "";
    document.getElementById("details").innerHTML = "";

    // reset timer variables
    totalSeconds = 600;
    isSubmitted = false;
    var timerEl = document.getElementById("timer");
    if (timerEl) {
        timerEl.innerHTML = "10:00";
    }

    // restart clock
    startTimer();

    // scroll smoothly back to the top
    window.scrollTo({ top: 0, behavior: "smooth" });
}
