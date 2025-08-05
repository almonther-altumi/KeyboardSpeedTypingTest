// Typing Speed Test App
// ---------------------
// This script manages the typing test logic, stats, and UI updates.
//todo: make the animations
//todo: linking the links 
//todo: smooth colors
//todo: responsive page
// todo: take a screenshot for a website
// todo: read the code again and fix the bugs 

let typing_content = document.getElementById("typing-content");
let typing_textbox = document.getElementById("typing-textbox");
let wpm_text = document.getElementById("word-per-second-minute");
let correct_words_text = document.getElementById("correct-words");
let wrong_words_text = document.getElementById("wrong-words");
let total_words_text = document.getElementById("total-words");
let timer_text = document.getElementById("timer-text");
let restart_btn = document.getElementById("restart-btn");

// Word list for random generation
let many_words = [
  "light",
  "how",
  "are",
  "you",
  "quick",
  "brown",
  "fox",
  "jumps",
  "over",
  "lazy",
  "dog",
  "keyboard",
  "speed",
  "test",
  "random",
  "words",
  "typing",
  "challenge",
  "practice",
  "skill",
  "improve",
  "javascript",
  "code",
  "function",
  "array",
  "object",
  "window",
  "event",
  "input",
  "timer",
  "score",
  "go",
  "went",
  "house",
  "leave",
  "left",
  "right",
  "top",
  "bottom",
  "button",
  "plus",
  "mines",
  "monkey",
  "donkey",
  "live",
  "car",
  "audi",
  "fan",
  "nice",
  "bad",
  "good",
  "work",
  "job",
  "doctor",
  "line",
  "arrive",
  "space",
  "console",
  "supermarket",
  "hello",
  "world",
  "speed",
  "typing",
  "welcome",
  "test",
  "park",
  "apple",
  "orange",
  "banana",
  "paper",
  "class",
  "glass",
  "teacher",
  "student",
  "dog",
  "cat",
  "horse",
  "cow",
  "enter",
  "shift",
  "house",
  "worker",
  "safe",
  "danger",
  "master",
  "chat",
  "in",
  "in",
  "to",
  "above",
];


let generatedWords = [];
let currentWordIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let timer = 30;
let intervalId = null;
let testActive = false;
let wordCount = 30;
let initialTimer = 30; // Used for WPM calculation

// Generate random words and reset stats
function text_typing_generator_func() {
  typing_content.innerHTML = "";
  generatedWords = [];
  for (let i = 0; i < wordCount; i++) {
    let randomIndex = Math.floor(Math.random() * many_words.length);
    generatedWords.push(many_words[randomIndex]);
  }
  typing_content.innerHTML = generatedWords
    .map((w, idx) => `<span id='word-${idx}'>${w}</span>`)
    .join(" ");
  currentWordIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  updateStats();
  typing_textbox.value = "";
  typing_textbox.disabled = false;
  testActive = true;
}

// Update stats display (WPM, correct, wrong, total, WPS)
function updateStats() {
  correct_words_text.textContent = `correct :${correctCount}`;
  wrong_words_text.textContent = `wrong :${wrongCount}`;
  total_words_text.textContent = `total :${wordCount}`;
  // Calculate WPM based on correct words and elapsed time
  let elapsedSeconds = initialTimer - timer;
  let wpm = elapsedSeconds > 0 ? Math.round((correctCount / elapsedSeconds) * 60) : 0;
  wpm_text.textContent = `wpm :${wpm}`;
  
 
}

// Timer logic
function startTimer() {
  timer_text.textContent = `time : ${timer}s`;
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => {
    timer--;
    timer_text.textContent = `time : ${timer}s`;
    updateStats();
    // Change color if time is low
    if (timer <= 15) {
      timer_text.style.color = "#ca4754";
    } else {
      timer_text.style.color = "#00bfff";
    }
    // End test if time runs out
    if (timer <= 0) {
      clearInterval(intervalId);
      timer_text.textContent = "Time's over";
      typing_textbox.disabled = true;
      testActive = false;
    }
  }, 1000);
}

// Initialize test
text_typing_generator_func();
todo: typing_textbox.focus();   

// Start timer on first focus
let timerStarted = false;
typing_textbox.addEventListener("focus", function () {
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }
});

// Handle word input and check correctness
typing_textbox.addEventListener("keydown", function (e) {
  if (!testActive) return;
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    let typed = typing_textbox.value.trim();
    let currentSpan = document.getElementById(`word-${currentWordIndex}`);
    if (!currentSpan) return;
    if (typed === generatedWords[currentWordIndex]) {
      currentSpan.classList.add("correct");
      correctCount++;
    } else {
      currentSpan.classList.add("incorrect");
      wrongCount++;
    }
    typing_textbox.value = "";
    currentWordIndex++;
    updateStats();
    // End test if all words are typed
    if (currentWordIndex >= generatedWords.length) {
      typing_textbox.disabled = true;
      testActive = false;
      clearInterval(intervalId);
      timer_text.textContent = "Test finished";
    }
  }
});

// Restart button resets everything
restart_btn.addEventListener("click", function () {
  timer = initialTimer;
  timerStarted = false;
  text_typing_generator_func();
  timer_text.textContent = `time : ${timer}s`;
  typing_textbox.focus();
});

// Timer click cycles timer duration and resets test
timer_text.addEventListener("click", function () {
  if (timer === 30) {
    timer = 45;
    initialTimer = 45;
  } else if (timer === 45) {
    timer = 60;
    initialTimer = 60;
  } else {
    timer = 30;
    initialTimer = 30;
  }
  timerStarted = false;
  text_typing_generator_func();
  timer_text.textContent = `time : ${timer}s`;
  typing_textbox.focus();
});

// Total words click cycles word count and resets test
total_words_text.addEventListener("click", function () {
  if (wordCount === 30) {
    wordCount = 45;
  } else if (wordCount === 45) {
    wordCount = 60;
  } else {
    wordCount = 30;
  }
  timerStarted = false;
  text_typing_generator_func();
  total_words_text.textContent = `total :${wordCount}`;
  typing_textbox.focus();
});

