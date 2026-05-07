const apiKey = "b227e69009c9ec54978dc4b7";

const reverseBtn = document.querySelector(".reverse_btn");

const firstHiddenPart = document.querySelector(".first_hidden");
const secondHiddenPart = document.querySelector(".second_hidden");

const firstCurNumInput = document.getElementById("first_num");
firstCurNumInput.value = 0;
const secondCurNumInput = document.getElementById("second_num");
secondCurNumInput.value = 0;

const firstCurrencyInput = document.getElementById("first_cur");
const secondCurrencyInput = document.getElementById("second_cur");

const fCurSpan = document.querySelector(".f_cur_span");
const sCurSpan = document.querySelector(".s_cur_span");
const tCurSpan = document.querySelector(".t_cur_span");

let allRates = {};

async function getData() {
  const url = ` https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    allRates = data.conversion_rates;
    console.log(data.conversion_rates);

    firstHiddenPart.innerHTML = "";
    secondHiddenPart.innerHTML = "";

    Object.keys(allRates).forEach((name) => {
      const newDiv = document.createElement("div");
      const div = document.createElement("div");

      newDiv.textContent = name;
      div.textContent = name;

      firstHiddenPart.appendChild(newDiv);
      secondHiddenPart.appendChild(div);
    });
  } catch (error) {
    console.error("There was an error:", error);
  }
}

getData();

console.log(allRates);

firstHiddenPart.addEventListener("mousedown", (e) => {
  if (e.target !== e.currentTarget && e.target.tagName === "DIV") {
    firstCurrencyInput.value = e.target.textContent.trim();
    sCurSpan.textContent = e.target.textContent.trim();
    firstHiddenPart.style.display = "none";
    calculateFCur();
  }
});

secondHiddenPart.addEventListener("mousedown", (e) => {
  if (e.target !== e.currentTarget && e.target.tagName === "DIV") {
    secondCurrencyInput.value = e.target.textContent.trim();
    tCurSpan.textContent = e.target.textContent.trim();
    secondHiddenPart.style.display = "none";
    calculateFCur();
  }
});

firstCurrencyInput.addEventListener("focus", () => {
  firstHiddenPart.style.display = "block";
});

secondCurrencyInput.addEventListener("focus", () => {
  secondHiddenPart.style.display = "block";
});

firstCurrencyInput.addEventListener("blur", () => {
  firstHiddenPart.style.display = "none";
});

secondCurrencyInput.addEventListener("blur", () => {
  secondHiddenPart.style.display = "none";
});

reverseBtn.addEventListener("click", () => {
  let temp = firstCurrencyInput.value;
  let temp2 = sCurSpan.textContent;

  sCurSpan.textContent = tCurSpan.textContent;
  tCurSpan.textContent = temp2;

  firstCurrencyInput.value = secondCurrencyInput.value;

  secondCurrencyInput.value = temp;
  calculateFCur();
});

firstCurNumInput.addEventListener("input", calculateFCur);
secondCurNumInput.addEventListener("input", calculateSCur);

function calculateFCur() {
  const rate1 = allRates[firstCurrencyInput.value];
  const rate2 = allRates[secondCurrencyInput.value];

  if (!rate1 || !rate2) return;

  const val = parseFloat(firstCurNumInput.value) || 0;
  const result = rate2 / rate1;

  secondCurNumInput.value = (val * result).toFixed(2);

  if (firstCurrencyInput.value === secondCurrencyInput.value) {
    secondCurNumInput.value = val;
  }

  fCurSpan.textContent = val;
}

function calculateSCur() {
  const rate1 = allRates[firstCurrencyInput.value];
  const rate2 = allRates[secondCurrencyInput.value];

  if (!rate1 || !rate2) return;

  const val = parseFloat(secondCurNumInput.value) || 0;
  const result = rate1 / rate2;

  firstCurNumInput.value = (val * result).toFixed(2);

  if (firstCurrencyInput.value === secondCurrencyInput.value) {
    firstCurNumInput.value = val;
  }

  fCurSpan.textContent = firstCurNumInput.value;
}
