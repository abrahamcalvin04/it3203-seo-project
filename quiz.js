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
    // clear any existing timer instance first
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

    // figure out time spent
    var timeSpent = 600 - totalSeconds;
    var spentMins = Math.floor(timeSpent / 60);
    var spentSecs = timeSpent % 60;
    var timeString = spentMins + " minute(s) and " + spentSecs + " second(s)";

    var score = 0;
    var detailsHTML = "";

    // Question 1: Fill in blank (SERP)
    var q1Field = document.getElementById("q1");
    var q1Val = q1Field ? q1Field.value.trim().toLowerCase() : "";
    if (q1Val === "search engine results page" || q1Val === "search engine results pages" || q1Val === "search engine result page") {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 1:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 1:</strong> Incorrect (0) - You wrote: '" + (q1Val || "blank") + "'. Correct answer: Search Engine Results Page</p>";
    }

    // Question 2: Fill in blank (alt)
    var q2Field = document.getElementById("q2");
    var q2Val = q2Field ? q2Field.value.trim().toLowerCase() : "";
    if (q2Val === "alt" || q2Val === "alt text" || q2Val === "alt attribute") {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 2:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 2:</strong> Incorrect (0) - You wrote: '" + (q2Val || "blank") + "'. Correct answer: alt</p>";
    }

    // Question 3: Radio (301)
    var q3Choice = document.querySelector('input[name="q3"]:checked');
    var q3Val = q3Choice ? q3Choice.value : "None";
    if (q3Val === "301") {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 3:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 3:</strong> Incorrect (0) - Selected: " + q3Val + ". Correct answer: 301</p>";
    }

    // Question 4: Radio (head)
    var q4Choice = document.querySelector('input[name="q4"]:checked');
    var q4Val = q4Choice ? q4Choice.value : "None";
    if (q4Val === "head") {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 4:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 4:</strong> Incorrect (0) - Selected: " + q4Val + ". Correct answer: Inside the &lt;head&gt; section</p>";
    }

    // Question 5: Radio (1)
    var q5Choice = document.querySelector('input[name="q5"]:checked');
    var q5Val = q5Choice ? q5Choice.value : "None";
    if (q5Val === "1") {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 5:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 5:</strong> Incorrect (0) - Selected: " + q5Val + ". Correct answer: 1 main heading</p>";
    }

    // Question 6: Checkboxes (meta, headings, urls)
    var q6Ans = getCheckedValues("q6");
    var q6Correct = ["meta", "headings", "urls"];
    if (arraysEqual(q6Ans, q6Correct)) {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 6:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 6:</strong> Incorrect (0) - Correct choices: Meta descriptions, Headings, and Short URL slugs</p>";
    }

    // Question 7: Checkboxes (root, guide, syntax)
    var q7Ans = getCheckedValues("q7");
    var q7Correct = ["root", "guide", "syntax"];
    if (arraysEqual(q7Ans, q7Correct)) {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 7:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 7:</strong> Incorrect (0) - Correct choices: Root directory, Guides crawlers, and Disallow/User-agent syntax</p>";
    }

    // Question 8: Checkboxes (compress, minify, cache)
    var q8Ans = getCheckedValues("q8");
    var q8Correct = ["compress", "minify", "cache"];
    if (arraysEqual(q8Ans, q8Correct)) {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 8:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 8:</strong> Incorrect (0) - Correct choices: Compress images, Minify files, and Browser caching</p>";
    }

    // Question 9: Checkboxes (cloaking, hidden, buying)
    var q9Ans = getCheckedValues("q9");
    var q9Correct = ["cloaking", "hidden", "buying"];
    if (arraysEqual(q9Ans, q9Correct)) {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 9:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 9:</strong> Incorrect (0) - Correct choices: Cloaking, Hidden text, and Buying spam links</p>";
    }

    // Question 10: Checkboxes (map, dates, gsc)
    var q10Ans = getCheckedValues("q10");
    var q10Correct = ["map", "dates", "gsc"];
    if (arraysEqual(q10Ans, q10Correct)) {
        score++;
        detailsHTML += "<p style='color: green;'><strong>Question 10:</strong> Correct! (+1)</p>";
    } else {
        detailsHTML += "<p style='color: red;'><strong>Question 10:</strong> Incorrect (0) - Correct choices: List of URLs, Last modified dates, and Submit in Search Console</p>";
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

    // Show the results container
    var resultsBox = document.getElementById("results");
    if (resultsBox) {
        resultsBox.style.display = "block";
    }
}

// reset quiz function
function resetAll() {
    // clear form inputs
    var form = document.getElementById("quizForm");
    if (form) {
        form.reset();
    }

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
}
