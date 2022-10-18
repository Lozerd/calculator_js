import "../css/Calculator.css";
import React, {useEffect, useReducer, useState} from "react";
import CalculatorInput from "./CalculatorInput";
import CalculatorButton from "./CalculatorButton";


enum ActionType {
    EMPTY = "",
    ADD = "+",
    SUBSTRACT = "-",
    DIVIDE = "/",
    MULTIPLY = "*",
    DECIMAL = ".",
    NUMBER = "number"
}

type Action = {
    type: ActionType
    value: string
}

type CalculatorState = {
    firstOperand: number | string,
    operator: ActionType,
    secondOperand: number | string,
}

function calculatorReducer(state: CalculatorState, action: Action): CalculatorState {
    function assign_proper_operand(): CalculatorState {
        console.log(action.type, action.value, Object.values(ActionType).includes(action.type));
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
    case ActionType.SUBSTRACT:
        return assign_proper_operand();
    case ActionType.DIVIDE:
        return assign_proper_operand();
    case ActionType.MULTIPLY:
        return assign_proper_operand();
    case ActionType.DECIMAL:
        return assign_proper_operand();
    case ActionType.NUMBER:
        return assign_proper_operand();
    default:
        return state;
    }
}

const Calculator = () => {
    const initialCalculatorState: CalculatorState = {firstOperand: "", operator: ActionType.EMPTY, secondOperand: ""};
    const [state, dispatch] = useReducer(calculatorReducer, initialCalculatorState);

    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        console.log();
        setDisplayedText(Object.values(state).join(" "));
    }, [state]);

    const debug = true;

    return (
        <div className="main">
            <CalculatorInput text={displayedText}/>
            <div className="buttons">
                <div className="buttons__row">
                    <CalculatorButton symbol={7} onClick={symbol => dispatch({type: ActionType.NUMBER, value: symbol.toString()})}/>
                    <CalculatorButton symbol={8} onClick={symbol => dispatch({type: ActionType.NUMBER, value: symbol.toString()})}/>
                    <CalculatorButton symbol={9} onClick={symbol => dispatch({type: ActionType.NUMBER, value: symbol.toString()})}/>
                    <CalculatorButton symbol={ActionType.ADD} onClick={symbol => dispatch({type: ActionType.ADD, value: symbol.toString()})}/>
                </div>
            </div>
            {debug ? <span>{state.firstOperand}|{state.operator}|{state.secondOperand}</span> : null}
        </div>
    );
};

export default Calculator;