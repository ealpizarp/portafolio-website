
const BASE_ROOT = "guest@ealpizarp.com:~$ "

const contentHook = document.getElementById("contentHook");

function processCommand(command) {
  command = command.trim();
  const args = command.split(" ");

  switch (args[0]) {
    case "ls":
      console.log("ls", args);
      // execute ls command
      break;
    case "cd":
      console.log("cd", args);
      // execute cd command
      break;
    case "mkdir":
      console.log("mkdir", args);
      // execute mkdir command
      break;
    case "rm":
      console.log("mkdir", args);
      // execute rm command
      break;
    default:
      renderLine(BASE_ROOT + command, "no-animation", 0);
      break;
  } 
}

/**
 * Listens to the "keydown" event of the "textAreaInput" element, and processes
 * the input command when the "Enter" key is pressed.
 * @param {KeyboardEvent} event - The event object for the "keydown" event.
 */

textAreaInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    processCommand(event.target.value);
    clearInput();
  }
});

/**
 * Adds a new line to the terminal output.
 * @param {string} text - The text to add.
 * @param {string} style - The CSS class to apply to the line.
 * @param {number} time - The delay in milliseconds before adding the line.
 */
function renderLine(text, style, time) {
  const formattedText = formatText(text);
  setTimeout(() => {
    const next = createLine(formattedText, style);
    insertLine(next, contentHook);
    scrollToBottom();
  }, time);
}

/**
 * Replaces multiple spaces in a string with double non-breaking spaces.
 * @param {string} text - The text to format.
 * @returns {string} The formatted text.
 */
function formatText(text) {
  const doubleSpace = "  ";
  const doubleNoBreakingSpace = "&nbsp;&nbsp;";

  return text.replaceAll(doubleSpace, doubleNoBreakingSpace);
}

/**
 * Creates a new line element with the given text and style.
 * @param {string} text - The text of the line.
 * @param {string} style - The CSS class to apply to the line.
 * @returns {HTMLElement} The new line element.
 */
function createLine(text, style) {
  const line = document.createElement("p");
  line.innerHTML = `<span class="${style}">${text}</span>`;
  return line;
}

/**
 * Inserts an element before a reference element.
 * @param {HTMLElement} element - The element to insert.
 * @param {HTMLElement} referenceElement - The element to insert the new element before.
 */
function insertLine(element, referenceElement) {
  referenceElement?.parentNode?.insertBefore(element, referenceElement);
}

/**
 * Scrolls the window to the bottom of the page.
 */
function scrollToBottom() {
  window.scrollTo(0, document.body.offsetHeight);
}

/**
 * Clears the input of the textarea
 */
function clearInput() {
  textAreaInput.value = "";
}
