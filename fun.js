let randNum, userNum_str, userNum, counter, invalid;
let result, resultAlign, inputAlign;
let inputValid = false, trial = 0; game = true;

window.onload = function() {
    inputAlign  = document.getElementById('inputAlign');
    resultAlign = document.getElementById('resultAlign');

    input = document.getElementById('inputField');
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            document.getElementById('submit_btn').click();
        }
    });
    counter = document.getElementById('trialCounter');

    invalid           = document.createElement('div');
    invalid.id        = "invalid";
    invalid.className = "invalidStyle";
    inputAlign.appendChild(invalid);

    result           = document.createElement('div');
    result.id        = "result";
    result.className = 'result'

    count_trials(false,false);
    create_num();
}


function count_trials(up,reset) {
    if (up) {
        trial += 1;
    } else if (reset) {
        trial = 0;
        counter.style.color = "black";
    }
    if (trial == 6) {
        counter.style.color = "red";
    }
    counter.innerHTML = "Trials: " + trial + " / 7";
}


function create_num() {
    randNum = Math.floor(Math.random() * 100) + 1;
    console.log(randNum)
}

function checkInput() {
    let msg, invalid_state, result_state;

    userInput     = input.value;
    userNum       = parseFloat(userInput);

    intValid = Number.isInteger(userNum);

    if (isNaN(userNum) || !intValid) {
        inputValid = false;
        msg = "Give Integer!";
    } else if (intValid) {
        if (1 <= userNum && userNum <= 100) {
            inputValid = true;
        } else {
            inputValid = false;
            msg = "Give number between 1 & 100!";
        }
    } else {
        console.log("something unexpected happend in checkInput()");
    }

    if (inputValid) {
        invalid.innerHTML = " ";
    } else {
        invalid.innerHTML = msg;
        resultAlign.removeChild(result);
    }
}

function checkNumber() {
    if (trial < 7 & game) {
        count_trials(true,false);
        if (userNum == randNum) {
            game = false;
            result.innerHTML = "You win!";
            result.style.backgroundColor = "green";          
        } else if (trial < 7) {
            if (userNum < randNum) {
                result.innerHTML = "Too low!";
                result.style.backgroundColor = "red";
            } else if (userNum > randNum) {
                result.innerHTML = "Too high!";
                result.style.backgroundColor = "red";
            }
        } else if (trial == 7) {
            result.innerHTML = "GAME <br /> OVER";
            result.style.backgroundColor = "darkcyan";
        }
    }
}

function processInput() {
    checkInput();
    if (inputValid) {
        if (resultAlign.contains(result) == false) {
            resultAlign.appendChild(result);
        }
        checkNumber();
    }
}

function newNum() {
    count_trials(false,true);
    game = true;
    document.getElementById('inputField').value = " ";
    invalid.innerHTML = " ";
    resultAlign.removeChild(result)
    create_num();
}