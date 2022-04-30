/* query selectors for DOM*/
const generateBtn = document.querySelector("#generate");
const slider = document.getElementById("my-range");
const output = document.getElementById("value");
const chooseLower = document.getElementById('lowercase')
const chooseUpper = document.getElementById('uppercase')
const chooseSpecial = document.getElementById ('special')
const chooseNumber =document.getElementById('number')


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
const alphaUpper = alphabet.map((letter) => {
  return letter.toUpperCase();
});
const specialArr = ["!", "@", "#", "%", "?", "&"];
const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const allCharArr = [...alphabet, ...alphaUpper, ...specialArr, ...numArr];
const arrOfAll = [alphabet, alphaUpper, specialArr, numArr];

// const noUpper = [...alphabet, ...specialArr, ...numArr]
// const noSpecial = [...alphabet, ...alphaUpper, ...numArr]
// const noNum= [...alphabet, ...alphaUpper,...specialArr]

/** function to identify what the user wants */
let userChoice = []
const createUserChoiceArr = () =>{
if (chooseLower.checked) {
  userChoice.push(0)
}
if (chooseUpper.checked){
  userChoice.push(1)
}
if (chooseSpecial.checked){
  userChoice.push(2)
}
if (chooseNumber.checked){
  userChoice.push(3)
}
return userChoice
}

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

/** create main array for for random characters */

let arrForPassword = []

const pushToArrForPassword = () => {
  createUserChoiceArr()
  for (i=0 ; i<userChoice.length; i++){
   arrForPassword.push(arrOfAll[userChoice[i]])
  } 
  return arrForPassword.flat()
 }

/** function to generate minimum 8 char password with all char */
const passwordGenerate8All = () => {

  if (chooseLower.checked){
    
    password.push(getRandom(alphabet));
  }
  if (chooseUpper.checked){
    password.push (getRandom(alphabet).toUpperCase())
  }
  if (chooseSpecial.checked){
    password.push (getRandom(specialArr))
  }
  if (chooseNumber.checked){
    password.push (getRandom(numArr))
  }

  return password;
};

/** fill remains spots in the password array */

const remainingPasswordAll = () => {
passwordGenerate8All()
  while (password.length < slider.value) {
    password.push(getRandom(pushToArrForPassword()));
  }
  
  return password;
};


const generatePassword = () => {
remainingPasswordAll()

  shuffleArray(password);

  return password;
 
};

// generatePassword()
console.log(password.join(""));
console.log(password.length);


// /** slider functionality */


/** advanced selectors for dom */


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

/** function to add or remove checked status on radio button */

function uncheck(button){
  if (button.checked) {
    button.checked = false
  }

}

// // Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

/** Event listeners to check and uncheck selections */
chooseLower.addEventListener ('change',uncheck(chooseLower))

