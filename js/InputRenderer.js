/**
 * @fileOverview This file manages the rendering of the text input for the terminal user interface.
 *
 * @module InputRenderer
 * @description This module contains methods for rendering user input in a terminal-like interface. These methods enable the user 
 * to interact with the interface by entering commands and viewing the output in real-time.
 * @version 1.0.0
 */


const MOVE_STEP = 10;

const cursor = document.getElementById("cursor");
const typerElement = document.getElementById("typer");
const textAreaInput = document.getElementById("texter");

window.onload = init;

function init() {
  cursor.style.left = "0px";
}


/**
 * Event listener for handling text input in the textarea and displaying the input value in a designated element.
 * @param {Event} event - The input event from the textarea.
 * @returns {void}
 */

textAreaInput.addEventListener("input", (event) => {
  typerElement.textContent = event.target.value;
});


/**
 * Focuses on the textarea element.
 * @returns {void}
 */

function focusOnTextArea() {
  textAreaInput.focus();
}

/**
 * Moves the cursor by a certain number of steps in response to a key event.
 *
 * @param {number} count - The number of steps to move the cursor.
 * @param {KeyboardEvent} event - The key event that triggered the cursor movement.
 * @param {number} [moveStep=MOVE_STEP] - The size of each step.
 */

function moveCursor(count, event, moveStep = MOVE_STEP) {
  const keyCode = event.key;

  if (!isArrowKey(keyCode)) {
    return;
  }

  const currentLeft = getCurrentLeftOffset(cursor);
  const newPosition = calculateCursorPosition(
    keyCode,
    currentLeft,
    count,
    moveStep
  );

  if (newPosition !== undefined) {
    cursor.style.left = newPosition + "px";
  }
}

/**
 * Gets the current left offset of an element.
 *
 * @param {HTMLElement} element - The element to get the left offset for.
 * @returns {number} - The current left offset of the element.
 */

function getCurrentLeftOffset(element) {
  return parseInt(element.style.left) || 0;
}

/**
 * Calculates the new cursor position based on the provided arrow key, current position, count and moveStep.
 *
 * @param {string} key - The arrow key that triggered the cursor movement.
 * @param {number} currentLeftOffset - The current left offset of the cursor.
 * @param {number} count - The number of steps to move the cursor.
 * @param {number} [moveStep=MOVE_STEP] - The distance (in pixels) between each cursor movement step.
 * @returns {number|undefined} - The new position of the cursor, or undefined if it cannot move in the given direction.
 */

function calculateCursorPosition(
  key,
  currentLeftOffset,
  count,
  moveStep = MOVE_STEP
) {
  if (isLeftArrow(key) && currentLeftOffset >= -((count - 1) * moveStep)) {
    return currentLeftOffset - moveStep;
  } else if (isRightArrow(key) && currentLeftOffset + moveStep <= 0) {
    return currentLeftOffset + moveStep;
  }
}

/**
 * Checks if the provided key is the right arrow key.
 *
 * @param {string} key - The key to check.
 * @returns {boolean} - True if the key is the right arrow key, false otherwise.
 */

function isRightArrow(key) {
  return key === "ArrowRight";
}

/**
 * Checks if the provided key is the left arrow key.
 *
 * @param {string} key - The key to check.
 * @returns {boolean} - True if the key is the left arrow key, false otherwise.
 */

function isLeftArrow(key) {
  return key === "ArrowLeft";
}

/**
 * Checks if the provided key is an arrow key.
 *
 * @param {string} key - The key to check.
 * @returns {boolean} - True if the key is an arrow key, false otherwise.
 */

function isArrowKey(key) {
  return key === "ArrowLeft" || key === "ArrowRight";
}

/**
 * Logs the provided message to the console.
 *
 * @param {string} txt - The message to log.
 */

function alert(txt) {
  console.log(txt);
}
