const inputdata = document.querySelectorAll('.btn');
const result = document.getElementById("result");
let expression = "";

const isOperator = (char) => ['+', '-', '*', '/', '%'].includes(char);

function updateDisplay() {
    result.innerText = expression || "0";
}

inputdata.forEach(button => {
    button.addEventListener("click", function () {
        const value = this.innerText || this.getAttribute("value");

        handleInput(value);
    });
});

function handleInput(value) {
    if (value === 'AC') {
        expression = "";
    } else if (value === 'DEL') {
        expression = expression.slice(0, -1);
    } else if (value === '=') {
        try {
            expression = eval(expression).toString();
        } catch (error) {
            expression = "Error";
        }
    } else {
        if (isOperator(value) && isOperator(expression.slice(-1))) {
            return;
        }
        expression += value;
    }
    updateDisplay();
}

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key) || key === '.' || isOperator(key)) {
        handleInput(key);
    } else if (key === 'Enter') {
        handleInput('=');
    } else if (key === 'Backspace') {
        handleInput('DEL');
    } else if (key.toLowerCase() === 'c') {
        handleInput('AC');
    }
});
