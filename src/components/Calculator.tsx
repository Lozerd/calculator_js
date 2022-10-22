import "../css/Calculator.css";
import {useEffect, useReducer, useState} from "react";
import CalculatorInput from "./CalculatorInput";
import {Action, CalculatorState} from "../common/types";
import {ActionType, CalculatorNavigationType} from "../common/enums";
import CalculatorButtons from "./CalculatorButtons";
import {DEBUG} from "../App";
import CalculatorNavigation from "./CalculatorNavigation";


function calculatorReducer(state: CalculatorState, action: Action): CalculatorState {
    function assign_proper_operand(): CalculatorState {
        if (Object.values(ActionType).includes(action.type) && isNaN(Number(action.value))) { // operations
            return {...state, operator: action.type};
        } else {
            if (state.operator !== ActionType.EMPTY) {
                return {...state, secondOperand: "" + state.secondOperand + action.value};
            } else {
                return {...state, firstOperand: "" + state.firstOperand + action.value};
            }
        }
    }

    switch (action.type) {
    case ActionType.EMPTY:
        return assign_proper_operand();
    case ActionType.ADD:
        return assign_proper_operand();
    case ActionType.SUBTRACT:
        return assign_proper_operand();
    case ActionType.DIVIDE:
        return assign_proper_operand();
    case ActionType.MULTIPLY:
        return assign_proper_operand();
    case ActionType.DECIMAL:
        return assign_proper_operand();
    case ActionType.NUMBER:
        return assign_proper_operand();
    case ActionType.SQUARE:
        return state;
    case ActionType.NAVIGATE:
        return state;
    default:
        return state;
    }
}

const Calculator = () => {
    const initialCalculatorState: CalculatorState = {
        firstOperand: "",
        operator: ActionType.EMPTY,
        secondOperand: "",
        type: CalculatorNavigationType.REGULAR
    };

    const [displayedText, setDisplayedText] = useState("");

    const [calculatorState, calculatorStateDispatch] = useReducer(calculatorReducer, initialCalculatorState);

    useEffect(() => {
        setDisplayedText(Object.values(calculatorState).join(" "));
    }, [calculatorState]);

    return (
        <div className="calculator">
            <CalculatorNavigation
                calculatorNavigationType={calculatorState.type}
                onBurgerChoiceClick={(type: CalculatorNavigationType) => calculatorStateDispatch({
                    type: ActionType.NAVIGATE,
                    value: type
                })}/>
            <CalculatorInput text={displayedText}/>
            <CalculatorButtons onClickDispatcher={obj => calculatorStateDispatch(obj)}/>
            {DEBUG ? <span>{calculatorState.firstOperand}|{calculatorState.operator}|{calculatorState.secondOperand}</span> : null}
        </div>
    );
};

export default Calculator;