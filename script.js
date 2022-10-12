function addClass(element, attr) {
  element.classList.add(attr);
}
function removeClass(element, attr) {
  element.classList.remove(attr);
}
const fullName = document.getElementById("full-name");
const cardNumber = document.getElementById("card-number");
const monthNumber = document.getElementById("date");
const yearNumber = document.getElementById("date1");
const cvc = document.getElementById("cvc");
const form = document.querySelector(".form");
const span1El = document.querySelector(".set1");
const span2El = document.querySelector(".set2");
const span3El = document.querySelector(".set3");
const span4El = document.querySelector(".set4");
const CardHolderEl = document.querySelector(".card-holder");
const expiryDateEl = document.querySelector(".exp-date");
const cvcEl = document.querySelector(".cvr");
const thankYouPage = document.querySelector(".thank-you-page");
const continueBtn = document.querySelector("div.thank-you-page button");
fullName.addEventListener("input", () => {
  const regexPattern = /^[A-Z]{1}[a-z]+\s[A-Z]{1}[a-z]+/;
  //console.log(regexPattern.test("Alao Ajibola");
  const cardHolder = fullName.value;
  CardHolderEl.innerHTML = cardHolder;
  if (regexPattern.test(cardHolder)) {
    addClass(fullName, "correct");
    removeClass(fullName, "wrong");
  } else {
    //fullName.style.borderColor = "hsl(0, 100%, 66%)";
    addClass(fullName, "wrong");
    removeClass(fullName, "correct");
  }
});
cardNumber.addEventListener("input", () => {
  const regexPattern = /[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}/;
  //console.log(regexPattern.test("0000 0000 0000 0000"))
  const cardDigit = cardNumber.value;
  const cardDigitLength = cardDigit.length;
  //console.log(typeof cardDigitLength)
  if (cardDigitLength <= 19) {
    if (/^[0-9]{4}/.test(cardDigit))
      span1El.innerHTML = cardDigit.split(" ")[0];
    else span1El.innerHTML = "";
  }
  if (cardDigitLength <= 19) {
    if (/^[0-9]{4}\s/.test(cardDigit))
      span2El.innerHTML = cardDigit.split(" ")[1];
    else span2El.innerHTML = "";
  }
  if (cardDigitLength <= 19) {
    if (/^[0-9]{4}\s[0-9]{4}\s/.test(cardDigit))
      span3El.innerHTML = cardDigit.split(" ")[2];
    else span3El.innerHTML = "";
  }
  if (cardDigitLength <= 19) {
    if (/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s/.test(cardDigit)) {
      span4El.innerHTML = cardDigit.split(" ")[3];
    } else span4El.innerHTML = "";
  }
  /* changing color of border with input */
  if (regexPattern.test(cardDigit)) {
    addClass(cardNumber, "correct");
    removeClass(cardNumber, "wrong");
  } else {
    addClass(cardNumber, "wrong");
    removeClass(cardNumber, "correct");
  }
});
monthNumber.addEventListener("input", () => {
  const regexPattern = /[0-9]{2}/;
  const monthDigit = monthNumber.value;
  if (monthDigit.length == 1)
    expiryDateEl.innerHTML = "0" + monthNumber.value + "/" + yearNumber.value;
  else expiryDateEl.innerHTML = monthNumber.value + "/" + yearNumber.value;
  if (regexPattern.test(monthDigit)) {
    addClass(monthNumber, "correct");
    removeClass(monthNumber, "wrong");
  } else {
    addClass(monthNumber, "wrong");
    removeClass(monthNumber, "correct");
  }
});
yearNumber.addEventListener("input", () => {
  const regexPattern = /[0-9]{2}/;
  const yearDigit = yearNumber.value;
  if (expiryDateEl.innerHTML != "" && yearDigit.length > 0)
    expiryDateEl.innerHTML = monthNumber.value + "/" + yearDigit;
  else expiryDateEl.innerHTML = monthNumber.value + "/";
  /* changing the border color of yearNumber depending on it value*/
  if (regexPattern.test(yearDigit)) {
    addClass(yearNumber, "correct");
    removeClass(yearNumber, "wrong");
  } else {
    addClass(yearNumber, "wrong");
    removeClass(yearNumber, "correct");
  }
});
cvc.addEventListener("input", () => {
  const regexPattern = /[0-9]{3}/;
  const cvcDigit = cvc.value;
  cvcEl.innerHTML = cvcDigit;
  if (regexPattern.test(cvcDigit)) {
    addClass(cvc, "correct");
    removeClass(cvc, "wrong");
  } else {
    addClass(cvc, "wrong");
    removeClass(cvc, "correct");
  }
});
form.addEventListener("submit", (e) => {
  const blanks = document.querySelectorAll(".blank");
  e.preventDefault();
  const regexName = /^[A-Z]{1}[a-z]+\s[A-Z]{1}[a-z]+/;
  const regexDigit = /[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}/;
  const regexMonth = /[0-9]{2}/;
  const regexYear = /[0-9]{2}/;
  const regexCvc = /[0-9]{3}/;
  if (!regexName.test(fullName.value))
    fullName.nextElementSibling.style.display = "block";
  else fullName.nextElementSibling.style.display = "none";
  if (!regexDigit.test(cardNumber.value))
    cardNumber.nextElementSibling.style.display = "block";
  else cardNumber.nextElementSibling.style.display = "none";
  if (!regexMonth.test(monthNumber.value)) blanks[0].style.display = "block";
  else blanks[0].style.display = "none";
  if (!regexYear.test(yearNumber.value)) blanks[0].style.display = "block";
  else blanks[0].style.display = "none";
  if (!regexCvc.test(cvc.value)) blanks[1].style.display = "block";
  else blanks[1].style.display = "none";
  if (
    !regexDigit.test(cardNumber.value) ||
    !regexMonth.test(monthNumber.value) ||
    !regexName.test(fullName.value) ||
    !regexYear.test(yearNumber.value) ||
    !regexCvc.test(cvc.value)
  )
    return;
  form.style.display = "none";
  thankYouPage.style.display = "block";
});
continueBtn.addEventListener("click", () => {
  window.location.reload();
});

let allInput = document.querySelectorAll(".focus-mouse");

allInput.forEach((e) => {
  e.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const index = +[...allInput].indexOf(event.target);
      if (index === allInput.length - 1) {
        form.style.display = "none";
        thankYouPage.style.display = "block";
        return;
      }
      allInput[index + 1].focus();
    }
  });
});
