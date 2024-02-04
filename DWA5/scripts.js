const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  if (dividend.trim() === "" || divider.trim() === "") {
    result.innerText = "Division not performed. Both values are required in inputs. Try again";
  } else if (divider < 0) {
    result.innerText = "Division not performed. Invalid number provided. Try again";
    console.error("Error: Divider cannot be a negative number");
  } else {
    const quotient = dividend / divider;
    result.innerText = Number.isInteger(quotient) ? quotient : Math.floor(quotient);
  }

  if (isNaN(dividend) || isNaN(divider)) {
    console.error("Something critical went wrong. Please reload the page.");
    return;
  }
});
