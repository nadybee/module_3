// Get references to the #generate element
var generateBtn = document.querySelector("#generate");
let passwordLength = 128;
let special= true;
let upper = true;
let shouldNum = true;



/** Arrays needed for password */
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
const alphaUpper = alphabet.map((letter) => {
  return letter.toUpperCase();
});
const specialArr = ["!", "@", "#", "%", "?", "&"];
const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const allCharArr = [...alphabet, ...alphaUpper, ...specialArr, ...numArr];
const noUpper = [...alphabet, ...specialArr, ...numArr]
const noSpecial = [...alphabet, ...alphaUpper, ...numArr]
const noNum= [...alphabet, ...alphaUpper,...specialArr]


let password = [];
let lengthRequired = 128;

/** Get something random from an Array */
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
/** function to generate minimum 8 char password with all char */
const passwordGenerate8All = () => {
  while (password.length < 6) {
    password.push(
      getRandom(alphabet),
      getRandom(alphabet).toUpperCase(),
      getRandom(specialArr),
      getRandom(numArr),
   
    );
  
    }
  return password;
};

const remainingPasswordAll = () => {
  passwordGenerate8All();
  while (password.length < passwordLength) {
    password.push(getRandom(allCharArr));
  }

  return password;
};


const generatePassword = () => {
  remainingPasswordAll();
  shuffleArray(password);
  return password;
};

generatePassword()
console.log(password.join(""));
console.log(password.length);


// /** slider functionality */


/** advanced selectors for dom */
const slider = document.getElementById("my-range");
const output = document.getElementById("value");


output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
  slider.addEventListener("input", function () {
    let x = slider.value *.78;
    var color =`linear-gradient(90deg, hsl(360, 91%, 36%) ${x}%, lightgray ${x}%)`;
      slider.style.background=color;
  });
};

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password.join("");
  // passwordLength = parseInt(window.prompt('length of password'))

}

// // Add event listener to generate button
generateBtn.addEventListener("click", writePassword);