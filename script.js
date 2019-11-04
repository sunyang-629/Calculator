
var initial = {
    countDecimal:0,
    primaryNumber:null,
    lastOperator:null,
    displayNumber:0,
    pressEqual:0,
    lastNumber:0,
    operator:0,       ///////////////////////////////////in order to check last press whether is a operator
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
        else if (className === "clock"){
            handleClock();
        }
        else{
            if(initial.pressEqual){
                handleClear();
                if(!initial.operator){
                    initial.lastOperator = null; 
                }
            }
            updateDisplay(value);
        }
    })
}

function handleClock(){
    var myDate = new Date();
    var time = myDate.toLocaleTimeString();
    $( ".calculator-screen" ).val(time);
    setTimeout(function() {
        $( ".calculator-screen" ).val(initial.displayNumber);
      }, 3000);
}

function updateDisplay(value){
    if(!isNaN(Number(value)) || (value === "." && !initial.countDecimal)){      //(input a number) || (input first dot)
        if(value === "."){                                                      //input a dot
            initial.countDecimal++;
            if(initial.displayNumber == "0"){                            //input a dot when displaying 0
                initial.displayNumber = "0."
                return $( ".calculator-screen" ).val(initial.displayNumber);
            }
        }
        handleDigit(value);
        $( ".calculator-screen" ).val(initial.displayNumber);
    }
    // console.log(Number($( ".calculator-screen" ).val()),countDecimal)
}

function handleDigit(value){
    if(initial.displayNumber == '0'){    //if display is NaN or equal to 0;
        initial.displayNumber = value;
        // console.log(initial.displayNumber);
    }
    else if (initial.operator){    
        initial.displayNumber = value;        
        // initial.operator = 0;             
    } 
    else{
        initial.displayNumber += value;
    }
    initial.operator = 0;
}


function ini(){
    initial.primaryNumber = null;
    initial.lastOperator = null;
    initial.operator = 0;
    handleClear();
}

function handleClear(){
    initial.displayNumber = 0;
    initial.countDecimal = 0;
    initial.pressEqual = 0;
    $( ".calculator-screen" ).val(initial.displayNumber);
}

function handleOperator(operator){
    console.log("operator-in",initial.lastOperator,initial.operator);
    if (!initial.lastOperator || initial.pressEqual){ 
        initial.primaryNumber = initial.displayNumber;
        initial.countDecimal = 0;    
        initial.pressEqual = 0;       
    }
    else if(initial.lastOperator && !initial.operator) {
        console.log("object");
        handleEqual();
        initial.primaryNumber = initial.displayNumber;
    }
    initial.lastOperator = operator;
    initial.operator = 1; 
    console.log("operator-out",initial.lastOperator,initial.operator);
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
    initial.operator = 0;
    $( ".calculator-screen" ).val(initial.displayNumber);
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