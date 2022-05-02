/* query selectors for DOM*/
const generateBtn = document.querySelector("#generate");
const slider = document.getElementById("my-range");
const output = document.getElementById("value");
const chooseLower = document.getElementById("lowercase");
const chooseUpper = document.getElementById("uppercase");
const chooseSpecial = document.getElementById("special");
const chooseNumber = document.getElementById("number");
const required = document.getElementById("required");
const selectors = document.querySelectorAll("radio-radio");

/** Arrays needed for password */
let password = [];
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const alphaUpper = alphabet.map((letter) => letter.toUpperCase());
const specialArr = ["!", "@", "#", "%", "?", "&"];
const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrOfAll = [alphabet, alphaUpper, specialArr, numArr];

/**-------------FUNCTIONS---------------------*/

/** function to create array of user critera selections */

const createUserChoiceArr = () => {
  let userChoice = [];
  if (chooseLower.checked) {
    userChoice.push(0);
  }
  if (chooseUpper.checked) {
    userChoice.push(1);
  }
  if (chooseSpecial.checked) {
    userChoice.push(2);
  }
  if (chooseNumber.checked) {
    userChoice.push(3);
  }
  return userChoice;
};

/** create main array from user selection to choose password characters */

const pushToArrForPassword = () => {
  let arrForPassword = [];
  let userChoiceValue = createUserChoiceArr();
  for (i = 0; i < userChoiceValue.length; i++) {
    arrForPassword.push(arrOfAll[userChoiceValue[i]]);
  }
  return arrForPassword.flat();
};
/** Function to get random index from an Array */
const getRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

/** Durstenfeld Shuffle to shuffle array */
const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

/** function to generate minimum character requirement for user selections */
const passwordGenerateAll = () => {
  if (chooseLower.checked) {
    password.push(getRandom(alphabet));
  }
  if (chooseUpper.checked) {
    password.push(getRandom(alphabet).toUpperCase());
  }
  if (chooseSpecial.checked) {
    password.push(getRandom(specialArr));
  }
  if (chooseNumber.checked) {
    password.push(getRandom(numArr));
  }
  return password;
};

/** fill remains spots in the password array */
const remainingPasswordAll = () => {
  passwordGenerateAll();

  while (password.length < slider.value) {
    password.push(getRandom(pushToArrForPassword()));
  }
  return password;
};

/** Generates final password and shuffles it */
const generatePassword = () => {
  remainingPasswordAll();

  shuffleArray(password);

  return password;
};

/** --------User Selection functionality ------------ */

// /** slider to choose password length */

output.innerHTML = slider.value;
slider.oninput = function () {
  output.innerHTML = this.value;
  slider.addEventListener("input", function () {
    let x = (slider.value - 4) * 0.78;

    var color = `linear-gradient(90deg, hsl(360, 91%, 36%) ${x}%, lightgray ${x}%)`;
    slider.style.background = color;
  });
};

// Write password to the #password input
function writePassword() {
  password = [];
  //validate if user has chosen at least one
  if (
    chooseLower.checked ||
    chooseUpper.checked ||
    chooseSpecial.checked ||
    chooseNumber.checked
  ) {
    password = generatePassword();
    let passwordText = document.querySelector("#password");
    passwordText.value = password.join("");
  } else {
    //show error validation
    required.classList.remove("hidden");
  }
}

function isChecked() {
  if (
    chooseLower.checked ||
    chooseUpper.checked ||
    chooseSpecial.checked ||
    chooseNumber.checked
  ) {
    required.classList.add("hidden");
  }
}
//remove error validation
chooseLower.addEventListener("click", isChecked);
chooseUpper.addEventListener("click", isChecked);
chooseSpecial.addEventListener("click", isChecked);
chooseNumber.addEventListener("click", isChecked);

// // Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
