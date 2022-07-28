let showCard = document.querySelector(".card .card2");
let monthsly_payment = document.querySelector(".card .card2 .monthsly_payment");
let total_payment = document.querySelector(".card .card2 .total_payment");
let button = document.querySelector("button");
let error = document.querySelector(".error p");
let reset = document.querySelector(".reset");
let done = document.querySelector(".done");

let loan = document.getElementById("loan");
let interest = document.getElementById("interest");
let salary = document.getElementById("salary");
let months = document.getElementById("months");

if (sessionStorage.getItem("loan")) {
  loan.setAttribute("value", window.sessionStorage.getItem("loan"));
  interest.setAttribute("value", window.sessionStorage.getItem("interest"));
  salary.setAttribute("value", window.sessionStorage.getItem("salary"));
  months.setAttribute("value", window.sessionStorage.getItem("months"));
}

button.onclick = () => {
  let loanI = loan.value;
  let interestI = interest.value / 100;
  let salaryI = salary.value;
  let monthsI = months.value;

  window.sessionStorage.setItem("loan", loanI);
  window.sessionStorage.setItem("interest", interest.value);
  window.sessionStorage.setItem("salary", salaryI);
  window.sessionStorage.setItem("months", monthsI);
  resultIs(loanI, interestI, salaryI, monthsI);
};

function resultIs(l, i, s, d) {
  let payTotal = l - i * l;
  let payPerMonth = payTotal / d;
  let numOfMonths = payTotal / s + 1;
  if (
    l == "" ||
    l == null ||
    i == "" ||
    i == null ||
    l == "" ||
    l == null ||
    s == "" ||
    s == null ||
    d == "" ||
    s == null
  ) {
    error.innerHTML = "Please Fill The Emty Requestes!";
    showCard.classList.remove("show");
  } else if (payPerMonth >= s) {
    showCard.classList.remove("show");
    error.innerHTML = `The Minumam Monthly Payment Should Be ${numOfMonths.toFixed(
      0
    )}`;
  } else if (l <= 0 && i <= 0 && s <= 0 && d <= 0 && i >= 100 && d > 1000) {
    error.innerHTML = "Please Enter A Valid Numbers!";
    showCard.classList.remove("show");
  } else if (i > 0.99) {
    error.innerHTML = "The Interest Shouldn't Be Above 99%";
    showCard.classList.remove("show");
  } else {
    error.innerHTML = "";
    showCard.classList.add("show");
    monthsly_payment.innerHTML = `${payPerMonth.toFixed(2)}$`;
    total_payment.innerHTML = `${payTotal.toFixed(2)}$`;
  }
}

reset.addEventListener("click", () => {
  window.sessionStorage.clear();
  showCard.classList.remove("show");
  loan.value = "";
  interest.value = "";
  salary.value = "";
  months.value = "";
});
done.addEventListener("click", () => {
  window.close();
});
