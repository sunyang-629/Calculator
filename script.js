

var initial = {
    countDecimal:0,
    primaryNumber:null,
    lastOperator:null,
    displayNumber:0,
    pressEqual:0,
    lastNumber:0,
};


function bindKeyPress(){
    $( ".calculator-keys" ).click(function(event){
        var value = event.target.value;
        var className = event.target.className;
        if (className === "clear"){
            ini();
        }
        else if (className === "operator"){
            handleOperator(value);
        }
        else if (className === "equal"){
            handleEqual();
        }
        else{
            if(initial.pressEqual){
                handleClear();
                initial.lastOperator = null; 
            }
            updateDisplay(value);
        }
    })
}


function updateDisplay(value){
    if(!isNaN(Number(value)) || (value === "." && !initial.countDecimal)){
        handleDigit(value);
        $( ".calculator-screen" ).val(initial.displayNumber);
        if(value === "."){
            initial.countDecimal++;
        }
    }
    // console.log(Number($( ".calculator-screen" ).val()),countDecimal)
}

function handleDigit(value){
    if(initial.displayNumber == '0'){    //if display is NaN or equal to 0;
        initial.displayNumber = value;
        console.log(initial.displayNumber);
    }
    else{
        initial.displayNumber += value;
    }
}


function ini(){
    initial.primaryNumber = null;
    initial.lastOperator = null;
    handleClear();
}

function handleClear(){
    initial.displayNumber = 0;
    initial.countDecimal = 0;
    initial.pressEqual = 0;
    $( ".calculator-screen" ).val(initial.displayNumber);
}

function handleOperator(operator){
    if (!initial.lastOperator || initial.pressEqual){ 
        initial.primaryNumber = initial.displayNumber;
        handleClear();
        // $( ".calculator-screen" ).val(operator);
        // initial.lastOperator = operator;
    }
    // if(initial.lastOperator){
    //     initial.lastOperator = operator;
    //     handleEqual();
    //     console.log(initial.lastOperator);
    // }                                           ////////////////////////////////////
    // handleClear();
    // $( ".calculator-screen" ).val(operator);
    $( ".calculator-screen" ).val(operator);
    initial.lastOperator = operator;
    console.log(initial.lastOperator);
    // console.log("initial.primaryNumber:"+initial.primaryNumber, initial.lastOperator);
}

function handleEqual(){
    if (!initial.pressEqual){
        var primaryNumber = parseFloat(initial.primaryNumber);
        var currentNumber = parseFloat(initial.displayNumber);
        initial.lastNumber = +currentNumber;
    } else {
        var primaryNumber = parseFloat(initial.displayNumber);
        var currentNumber = parseFloat(initial.lastNumber);
    }
    console.log(primaryNumber,initial.lastOperator,currentNumber,initial.displayNumber);
    initial.pressEqual = 1;      //in order to clear the result when retyping a new number
    calculate(primaryNumber,currentNumber,initial.lastOperator)
    // console.log(initial.displayNumber);
    initial.displayNumber += "";
    $( ".calculator-screen" ).val(initial.displayNumber);
    // primaryNumber = initial.displayNumber;
}

function calculate(primaryNumber,currentNumber,operator){
    switch(operator){
        case "+": 
            initial.displayNumber = primaryNumber + currentNumber;
            break;
        case "-": 
            initial.displayNumber = primaryNumber - currentNumber;
            break;
        case "*": 
            initial.displayNumber = primaryNumber * currentNumber;
            break;
        case "/": 
            initial.displayNumber= primaryNumber / currentNumber;
            break;
        default:
            return;
    }
}

bindKeyPress();