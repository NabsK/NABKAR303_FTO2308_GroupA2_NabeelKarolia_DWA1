// Initialize counter
let counter = 0;

// Function to increase counter
function addHandler() {
  counter++;
  document.querySelector(".counter_value").value = counter;
}

// Function to decrease counter
function subtractHandler() {
  counter--;
  document.querySelector(".counter_value").value = counter;
}

// Attach event listeners to buttons
document.querySelector("[data-key=add]").addEventListener("click", addHandler);
document.querySelector("[data-key=subtract]").addEventListener("click", subtractHandler);

// Function to reset counter
function resetHandler() {
  counter = 0;
  document.querySelector(".counter_value").value = counter;
}

// Attach event listener to reset button
document.querySelector("[data-key=reset]").addEventListener("click", resetHandler);

// Function to reset counter
function resetHandler() {
  counter = 0;
  document.querySelector(".counter_value").value = counter;
  alert("The counter has been reset to 0."); // Display confirmation message
}
