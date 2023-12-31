

const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");
const calculator = document.querySelector(".calculator");
const btnClear = document.querySelector(".clear");

let displayValue = "0";
let operator = null;
let firstValue = null;
let waitingSecondValue = false;
let isShowed = false; 

function updateDisplay() {
    display.value = displayValue;
}
keys.addEventListener("click", function (e) {
    const element = e.target;
    const value = element.value;

    switch (value) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
            handleOperator(value);
            break;
        case ".":
            inputDecimal();
            break;
        case "clear":
            clearDisplay();
            break;
        case undefined:
            break;
        default:
            inputNumber(value);
            break;
    }
    updateDisplay();
});

// operatöre basılıncı display input tarafı sıfırlanır yeni yazılan sayı gösterilir ilk operatör hafizada tutulur 
// 2. operatör girildiğinde ilk işlem gerçekleşip ilk sayı olarak tutulur
function handleOperator(nextOperator) {

    let value = parseFloat(displayValue);
    displayValue = "0";
    // if (operator && waitingSecondValue) {
    //     operator = nextOperator;
    //     return;
    // }
    if (firstValue == null) {
        firstValue = value;
    } else {
        const result = calculate(firstValue, operator, value);
        if (Number.isInteger(result)) {
            displayValue = result.toString();
            firstValue = result;
        }
        else {
            displayValue = result.toPrecision(10).toString();
            firstValue = result;
        }
        isShowed=true;
    }
    waitingSecondValue = true;
    operator = nextOperator;
}
function calculate(firstNumber, op, secondNumber) {
    switch (op) {
        case "+":
            return firstNumber + secondNumber;
        case "-":
            return firstNumber - secondNumber;
        case "*":
            return firstNumber * secondNumber;
        case "/":
            return firstNumber / secondNumber;
        default:
            return secondNumber;
    }
}
function inputDecimal() {
    if (!displayValue.includes(".")) {
        displayValue = displayValue + ".";
    }
}
function clearDisplay() {
    displayValue = "0";
}
function inputNumber(num) {
    if (waitingSecondValue) {
        displayValue = num;
        waitingSecondValue = false;
    } else {
        displayValue = displayValue == "0" ? num : displayValue + num;
    }
}
// klavyeden rakam girilince yapılanlar
calculator.addEventListener("keydown", function (e) {
    if(isShowed){
        displayValue = "0";
        updateDisplay();
        isShowed=false;
    }
    const operators = "/*-+";
    const numbers = "0123456789";
    if(e.key == "0" && displayValue == "0"){
        displayValue = "0";
    }
    else if(numbers.includes(e.key)){
        displayValue = displayValue == "0" ? e.key : displayValue + e.key;
    }
    else if(operators.includes(e.key)){
        handleOperator(e.key);
    }
    else if(e.key == "."){
        inputDecimal();
    }
    updateDisplay();

});


updateDisplay();
btnClear.focus();

