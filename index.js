const targetText = "The Marriott International Culture Week is a traditional annual event held in November at Marriott. MI Culture Week spans an entire week, during which associates come together to reflect, honor, and reaffirm the five core values: Put People First, Pursure Excellence, Act with Integrity, Embrace Change, and Serve Our World. These core values serve as the orientation for the actions, culture, and vision of Marriott International globally. This year, at Renaissance Riverside Hotel Saigon, MI Culture Week will take place from November 25 to November 29, 2024. The event will feature a series of engaging, enjoyable, and unique activities focused on wellness, talent, intellect, and care. MI Culture Week aims to strengthen the bonds among associates and collectively reinforce Marriott’s core values, with the primary goal of always putting people first and creating a positive working environment for associates at Marriott International."; // Text to type
let startTime = null; // Store the start time
let elapsedInterval = null; // Timer interval for updating elapsed time
let errors = 0; // Error counter

// DOM elements
const typingArea = document.getElementById("typing-area");
const elapsedTimeDisplay = document.getElementById("elapsed-time");
const errorsDisplay = document.getElementById("errors");
const highlightedText = document.getElementById("highlighted-text");

// Display the initial target text with no highlights
updateHighlight("");

// Listen for input
typingArea.addEventListener("input", handleTyping);

function handleTyping() {
  const typedText = typingArea.value;

  // Start timing when the first character is typed
  if (!startTime && typedText.length === 1) {
    startTime = new Date();
    startElapsedTimer();
  }

  // Update the highlighted text and check for errors
  updateHighlight(typedText);

  // Stop timing when the text matches the target text
  if (typedText === targetText) {
    stopElapsedTimer();
    typingArea.disabled = true; // Disable textarea after completion
    alert(`Typing Complete! Time Taken: ${elapsedTimeDisplay.textContent} seconds. Errors: ${errors}`);
  }
}

function startElapsedTimer() {
  elapsedInterval = setInterval(() => {
    const now = new Date();
    const elapsedSeconds = (now - startTime) / 1000; // Tính tổng giây đã trôi qua
    const minutes = Math.floor(elapsedSeconds / 60); // Tính số phút
    const seconds = (elapsedSeconds % 60).toFixed(2); // Tính số giây còn lại, làm tròn đến 2 chữ số thập phân
    elapsedTimeDisplay.textContent = `${minutes}:${seconds.padStart(5, '0')}`; // Hiển thị phút và giây
  }, 100); // Update every 100ms for smoo th display
}

function stopElapsedTimer() {
  clearInterval(elapsedInterval);
}

function updateHighlight(typedText) {
  let highlighted = ""; // Highlighted text to display
  errors = 0; // Reset errors

  for (let i = 0; i < targetText.length; i++) {
    if (i < typedText.length) {
      // Correct character
      if (typedText[i] === targetText[i]) {
        highlighted += `<span class="correct">${targetText[i]}</span>`;
      }
      // Incorrect character
      else {
        highlighted += `<span class="incorrect">${targetText[i]}</span>`;
        errors++;
      }
    } else {
      // Remaining characters
      highlighted += `<span>${targetText[i]}</span>`;
    }
  }

  highlightedText.innerHTML = highlighted; // Update the displayed highlighted text
  errorsDisplay.textContent = errors; // Update the error count
}

const textareaElement = document.querySelector('textarea');

textareaElement.addEventListener('input', () => {
  const inputText = textareaElement.value;
  let isCorrect = true;

  for (let i = 0; i < inputText.length; i++) {
    const expectedChar = 'MI Culture Week is a'[i];
    const currentChar = inputText[i];

    if (currentChar !== expectedChar) {
      isCorrect = false;
      break;
    }
  }

  const charElements = textareaElement.value.split('').map((char, index) => {
    const charElement = document.createElement('span');
    charElement.textContent = char;
    charElement.classList.add(isCorrect && 'MI Culture Week is a'[index] === char ? 'correct' : 'incorrect');
    return charElement;
  });

  textareaElement.innerHTML = '';
  charElements.forEach(charElement => {
    textareaElement.appendChild(charElement);
  });
});