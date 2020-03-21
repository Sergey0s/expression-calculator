function eval() {
  // Do not use eval!!!
  return;
}

// Input: String, that contain (, ), +, -, *, / and space. Brackets can have any nasting depth

function expressionCalculator(expr) {
  let numbersStack = [];
  let operatorsStack = [];
  let operatorPrecedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2
  };

  // console.log(expr.split("(").length)
  // console.log(expr.split(")").length)

  if (expr.split("(").length - 1 !== expr.split(")").length - 1) {
    throw new Error("ExpressionError: Brackets must be paired");
  }

  // let expressionArray = [...expr].filter(e => {
  //   return e.length > 0 && e !== " ";
  // });

  let expressionArray = expr.split("+").join(" + ")
      .split("-").join(" - ")
      .split("*").join(" * ")
      .split("/").join(" / ")
      .split("(").join(" ( ")
      .split(")").join(" ) ")
      .split(" ").filter(e => e.length > 0);

  // console.log(expressionArray);

  function countExpression() {
      // console.log('operStack', operatorsStack);
      // console.log('numStack', numbersStack);
    let operator = operatorsStack.pop();
    let lastValue = +numbersStack.pop();
    let previousValue = +numbersStack.pop();
    let newNumber = null;

    if (operator === "+") {
      newNumber = previousValue + lastValue;
    }

    if (operator === "-") {
      newNumber = previousValue - lastValue;
    }

    if (operator === "*") {
      newNumber = previousValue * lastValue;
    }

    if (operator === "/") {
      if (lastValue === 0) {
        throw new Error("TypeError: Division by zero.");
      } else {
        newNumber = previousValue / lastValue;
      }
    }

    numbersStack.push(newNumber);
  }

  function getLastStackValue(array) {
    return array[array.length - 1];
  }

  for (let i = 0; i < expressionArray.length; i++) {
      // console.log(expressionArray[i]);
    if (expressionArray[i] === "(") {
      operatorsStack.push(expressionArray[i]);
    } else if (expressionArray[i] === ")") {
      for (let j = operatorsStack.length; j > 0; j--) {
        if (getLastStackValue(operatorsStack) === "(") {
          operatorsStack.pop();
          break;
        }
        countExpression();
      }
    } else if (!isNaN(expressionArray[i])) {
      numbersStack.push(expressionArray[i]);
    } else if (
      getLastStackValue(operatorsStack) === "(" ||
      operatorPrecedence[expressionArray[i]] >
        operatorPrecedence[getLastStackValue(operatorsStack)]
    ) {
      operatorsStack.push(expressionArray[i]);
    } else {
      for (let j = operatorsStack.length - 1; j >= 0; j--) {
        if (getLastStackValue(operatorsStack) === "(") {
          break;
        }

        if (
          operatorPrecedence[getLastStackValue(operatorsStack)] >=
          operatorPrecedence[expressionArray[i]]
        ) {
          countExpression();
        }
      }
      operatorsStack.push(expressionArray[i]);
    }
  }
  // console.log(numbersStack);

  numbersStack.map(item => countExpression());

  return +numbersStack[0];
}

module.exports = {
    expressionCalculator
};

// console.log(expressionCalculator("49 * 63 / 58 * 36"))
