// -- DOM Elements --
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol 
};

// -- Copy Password to Clipboard --
clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard !');
});

// -- Generate Event Listener --
generate.addEventListener('click', () => {
    // Below will show that datatype of length is String.
    // const length = lengthEl.value;
    // console.log(length);
    // console.log(typeof length);

    const length = +lengthEl.value; // Datatype of length is number
    // console.log(length);
    // console.log(typeof length);

    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    //console.log(hasUpper, hasLower, hasNumber, hasSymbol);
    
    resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
});

// -- Generate Password Function --
function generatePassword(upper, lower, number, symbol, length) {
    // 1. Initialize pw var
    // 2. Filter out unchecked types
    // 3. Loop over the length call generator function for each type
    // 4. Add final pw to the pw var and return

    let generatedPassword = '';
    const typesCount = upper + lower + number + symbol;
    // console.log('typesCount: ', typesCount);
    const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    // console.log('typesArr: ', typesArr);

    // If a user does not have a selected type
    if(typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i+= typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            //console.log('funcName: ', funcName);

            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

// --- Generator Functions ---
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

/* Displays 'a' since CharCode of 'a' is 97 */
// console.log(String.fromCharCode(97));

// console.log(getRandomLower());
// console.log(getRandomUpper());
// console.log(getRandomNumber());
// console.log(getRandomSymbol());
