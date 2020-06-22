import React, {
  useEffect,
} from 'react';
import { createStore } from 'redux';
import {
  connect,
  Provider,
} from 'react-redux';
import styled from 'styled-components';

const CalculatorContainer = styled.div`
  background: #000;
  display: grid;
  font-family: Arial, Helvetica,
    sans-serif;
  margin: 80px auto 0 auto;
  max-width: 500px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    'display display display display'
    'clear clear divide multiply'
    'seven eight nine minus'
    'four five six plus'
    'one two three equals'
    'zero zero dot equals';
  button {
    cursor: pointer;
    font-size: 16px;
    min-height: 50px;
  }
  #display {
    color: white;
    grid-area: display;
    font-size: 24px;
    margin: 2px;
    padding: 12px 8px;
    text-align: right;
  }

  #clear {
    grid-area: clear;
  }
  #divide {
    grid-area: divide;
  }
  #multiply {
    grid-area: multiply;
  }
  #seven {
    grid-area: seven;
  }
  #eight {
    grid-area: eight;
  }
  #nine {
    grid-area: nine;
  }
  #subtract {
    grid-area: minus;
  }
  #four {
    grid-area: four;
  }
  #five {
    grid-area: five;
  }
  #six {
    grid-area: six;
  }
  #add {
    grid-area: plus;
  }
  #one {
    grid-area: one;
  }
  #two {
    grid-area: two;
  }
  #three {
    grid-area: three;
  }
  #zero {
    grid-area: zero;
  }
  #decimal {
    grid-area: dot;
  }
  #equals {
    grid-area: equals;
  }
`;

// Action
const CLEAR_ALL = 'CLEAR_ALL';
const DIGIT_ADD = 'ADD';
const DIGIT_DIVIDE = 'DIGIT_DIVIDE';
const DIGIT_MULTIPLY = 'DIGIT_MULTIPLY';
const DIGIT_SUBTRACT = 'DIGIT_SUBTRACT';
const EQUALS = 'EQUALS';
const DISPLAY_ADD = 'DISPLAY_ADD';

const defaultState = {
  type: DISPLAY_ADD,
  firstSum: 0,
  secondSum: 0,
  operation_count: 0,
  currentNum: 0,
  showDisplay: 0,
  decimalAdded: false,
  result: 0,
};

// Action creator for clearing everything and reseting to 0
const clearData = () => {
  return {
    type: CLEAR_ALL,
  };
};

// Action Creator for adding up numbers
const addOperation = op => {
  switch (op) {
    case 'divide':
      return {
        type: DIGIT_DIVIDE,
        operation: 'divide',
      };
    case 'multiply':
      return {
        type: DIGIT_MULTIPLY,
        operation: 'multiply',
      };
    case 'subtract':
      return {
        type: DIGIT_SUBTRACT,
        operation: 'subtract',
      };
    case 'add':
      return {
        type: DIGIT_ADD,
        operation: 'add',
      };
    case 'equals':
      return {
        type: EQUALS,
      };
    case 'decimal':
      return {
        type: 'DECIMAL',
      };
  }
};

// Action creator For adding any digit to the display
const displayAdd = num => {
  return {
    type: DISPLAY_ADD,
    currentNum: num,
  };
};

// Reducer - handles actions
const calculatorReducer = (
  prevState = defaultState,
  action
) => {
  switch (action.type) {
    case CLEAR_ALL:
      return {
        firstSum: 0,
        secondSum: 0,
        operation_count: 0,
        showDisplay: 0,
        decimalAdded: false,
        result: 0,
      };
    case DIGIT_DIVIDE:
      const currentFormula4 =
        prevState.showDisplay;
      const previousItemAdded4 = currentFormula4
        .toString()
        .slice(-1);
      let newSum4 = '';

      if (
        isNaN(previousItemAdded4) &&
        previousItemAdded4 != '-'
      ) {
        newSum4 =
          currentFormula4.substring(
            0,
            currentFormula4.length - 1
          ) + '/';
      } else {
        newSum4 = currentFormula4 + '/';
      }

      return {
        operation_count: 1,
        firstSum: prevState.firstSum,
        secondSum: prevState.secondSum,
        showDisplay: newSum4,
        operation: action.operation,
        decimalAdded: false,
      };
    case DIGIT_MULTIPLY:
      const currentFormula3 =
        prevState.showDisplay;
      const previousItemAdded3 = currentFormula3
        .toString()
        .slice(-1);
      let newSum3 = '';

      if (
        isNaN(previousItemAdded3) &&
        previousItemAdded3 != '-'
      ) {
        newSum3 =
          currentFormula3.substring(
            0,
            currentFormula3.length - 1
          ) + '*';
      } else {
        newSum3 = currentFormula3 + '*';
      }

      return {
        operation_count: 1,
        firstSum: prevState.firstSum,
        secondSum: prevState.secondSum,
        showDisplay: newSum3,
        operation: action.operation,
        decimalAdded: false,
      };
    case DIGIT_SUBTRACT:
      const currentFormula =
        prevState.showDisplay;
      let newSum = '';

      newSum = currentFormula + '-';

      return {
        operation_count: 1,
        firstSum: prevState.firstSum,
        secondSum: prevState.secondSum,
        showDisplay: newSum,
        operation: action.operation,
        decimalAdded: false,
      };
    case DIGIT_ADD:
      const currentFormula2 =
        prevState.showDisplay;
      const previousItemAdded2 = currentFormula2
        .toString()
        .slice(-1);
      let newSum2 = '';

      if (
        isNaN(previousItemAdded2) &&
        previousItemAdded2 != '-'
      ) {
        newSum2 =
          currentFormula2.substring(
            0,
            currentFormula2.length - 1
          ) + '+';
      } else {
        newSum2 = currentFormula2 + '+';
      }

      return {
        operation_count: 1,
        firstSum: prevState.firstSum,
        secondSum: prevState.secondSum,
        showDisplay: newSum2,
        operation: action.operation,
        decimalAdded: false,
      };
    case EQUALS:
      // 1. Check to see if last operator was a minus

      const strArray = prevState.showDisplay.split(
        ''
      );
      let found = -1;
      let updatedSum =
        prevState.showDisplay;

      for (
        var i = strArray.length - 1;
        i >= 0;
        i--
      ) {
        if (strArray[i] == '-') {
          found = i;
        }
      }

      if (found >= 0) {
        if (
          strArray[found + 1] &&
          isNaN(strArray[found + 1]) &&
          strArray[found + 1] != '-'
        ) {
          updatedSum =
            prevState.firstSum +
            strArray[found + 1] +
            prevState.secondSum;
        } else {
          updatedSum =
            prevState.showDisplay;
        }
      }

      return {
        showDisplay: eval(updatedSum),
        operation_count: 1,
        firstSum: prevState.firstSum,
        secondSum: prevState.secondSum,
        operation: action.operation,
        result: 1,
      };
    case 'DECIMAL':
      if (!prevState.operation_count) {
        if (!prevState.decimalAdded) {
          return {
            decimalAdded: true,
            firstSum:
              prevState.firstSum + '.',
            secondSum:
              prevState.secondSum,
            showDisplay:
              prevState.showDisplay +
              '.',
          };
        } else {
          return {
            decimalAdded: true,
            firstSum:
              prevState.firstSum,
            secondSum:
              prevState.secondSum,
            showDisplay:
              prevState.showDisplay,
          };
        }
      } else {
        if (!prevState.decimalAdded) {
          return {
            decimalAdded: true,
            firstSum:
              prevState.firstSum,
            secondSum:
              prevState.secondSum + '.',
            showDisplay:
              prevState.showDisplay +
              '.',
            operation_count: 1,
          };
        } else {
          return {
            decimalAdded: true,
            firstSum:
              prevState.firstSum,
            secondSum:
              prevState.secondSum,
            showDisplay:
              prevState.showDisplay,
            operation_count: 1,
          };
        }
      }

    case DISPLAY_ADD:
      if (!prevState.operation_count) {
        console.log('first part');
        return {
          operation_count: 0,
          firstSum:
            prevState.firstSum != 0
              ? prevState.firstSum +
                action.currentNum
              : action.currentNum,
          secondSum: 0,
          showDisplay:
            prevState.firstSum != 0
              ? prevState.firstSum +
                action.currentNum
              : action.currentNum,
          operation:
            prevState.operation,
          decimalAdded:
            prevState.decimalAdded,
        };
      } else {
        console.log('second part');
        return {
          operation_count:
            prevState.operation_count,
          firstSum: prevState.firstSum,
          secondSum:
            prevState.secondSum != 0
              ? prevState.secondSum +
                action.currentNum
              : action.currentNum,
          showDisplay:
            prevState.showDisplay +
            action.currentNum,
          operation:
            prevState.operation,
          decimalAdded:
            prevState.decimalAdded,
        };
      }

    default:
      return prevState;
  }
};

// Makes state available as props passed to components available
const mapStateToProps = state => {
  return {
    firstSum: state.firstSum,
    secondSum: state.secondSum,
    operation: state.operation,
    showDisplay: state.showDisplay,
  };
};

// Makes dispatching as props from components available
// = also a embbedded bound action creator
const mapDispatchToProps = dispatch => {
  return {
    clearAll: () => {
      dispatch(clearData());
    },
    runOperation: op => {
      dispatch(addOperation(op));
    },
    addToDisplay: num => {
      dispatch(displayAdd(num));
    },
  };
};

const MainStuff = ({
  showDisplay,
  addToDisplay,
  runOperation,
  clearAll,
}) => {
  function handleNumButtonClick(e) {
    const currentNumber =
      e.currentTarget.attributes.value
        .value;

    if (
      showDisplay === 0 &&
      currentNumber === 0
    )
      return;

    addToDisplay(currentNumber);
  }

  function handleOpButtonClick(e) {
    const currentOperation =
      e.currentTarget.attributes.id
        .value;
    runOperation(currentOperation);
  }

  useEffect(() => {
    const allOpButtons = document.querySelectorAll(
      '.op'
    );
    const allDigButtons = document.querySelectorAll(
      '.num'
    );

    for (const btn of allDigButtons) {
      btn.addEventListener(
        'click',
        handleNumButtonClick
      );
    }

    for (const btn of allOpButtons) {
      btn.addEventListener(
        'click',
        handleOpButtonClick
      );
    }

    return () => {
      allDigButtons.forEach(btn =>
        btn.removeEventListener(
          'click',
          handleNumButtonClick
        )
      );
      allOpButtons.forEach(btn =>
        btn.removeEventListener(
          'click',
          handleOpButtonClick
        )
      );
    };
  }, []);

  return (
    <CalculatorContainer id="calculator">
      <p id="display">{showDisplay}</p>
      <button
        id="clear"
        value="ac"
        onClick={clearAll}
      >
        AC
      </button>
      <button
        className="num"
        id="zero"
        value="0"
      >
        0
      </button>
      <button
        className="num"
        id="one"
        value="1"
      >
        1
      </button>
      <button
        className="num"
        id="two"
        value="2"
      >
        2
      </button>
      <button
        className="num"
        id="three"
        value="3"
      >
        3
      </button>
      <button
        className="num"
        id="four"
        value="4"
      >
        4
      </button>
      <button
        className="num"
        id="five"
        value="5"
      >
        5
      </button>
      <button
        className="num"
        id="six"
        value="6"
      >
        6
      </button>
      <button
        className="num"
        id="seven"
        value="7"
      >
        7
      </button>
      <button
        className="num"
        id="eight"
        value="8"
      >
        8
      </button>
      <button
        className="num"
        id="nine"
        value="9"
      >
        9
      </button>
      <button
        id="add"
        value="+"
        className="op"
      >
        +
      </button>
      <button
        className="op"
        id="subtract"
        value="-"
      >
        -
      </button>
      <button
        className="op"
        id="multiply"
        value="*"
      >
        *
      </button>
      <button
        className="op"
        id="divide"
        value="/"
      >
        /
      </button>
      <button
        className="op"
        id="equals"
        value="="
      >
        =
      </button>
      <button
        className="op"
        id="decimal"
        value="."
      >
        .
      </button>
    </CalculatorContainer>
  );
};

/**
 * Create Redux store with the reducer to handle the actions passed
 * This also includes the redux dev tools extension enablers
 */

const store = createStore(
  calculatorReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

/**
 * Connect up the mapping of state and dispatching to the main
 * application component - MainStuff
 */
const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainStuff);

const IndexPage = () => {
  return (
    <Provider store={store}>
      <ConnectedComponent />
    </Provider>
  );
};

export default IndexPage;
