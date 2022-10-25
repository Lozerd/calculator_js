import "../css/Calculator.css";
import {useEffect, useReducer, useState} from "react";
import CalculatorInput from "./CalculatorInput";
import {Action, CalculatorState} from "../common/types";
import {ActionType, CalculatorNavigationType} from "../common/enums";
import CalculatorButtons from "./CalculatorButtons";
import {DEBUG} from "../App";
import CalculatorNavigation from "./CalculatorNavigation";
import {isNumber, toNumber} from "../common/util";


function calculatorReducer(state: CalculatorState, action: Action): CalculatorState {
    function assign_proper_operand(): CalculatorState {
        if (Object.values(ActionType).includes(action.type) && !isNumber(action.value)) { // operations
            if (state.firstOperand !== "" && state.secondOperand === "") {
                return {...state, operator: action.type};
            } else {
                return calculate();
            }
        } else {
            if (state.operator !== ActionType.EMPTY) {
                if (state.secondOperand.toString().includes("-")) {
                    return {...state, secondOperand: "" + state.secondOperand + action.value + ")"};

                } else {
                    return {...state, secondOperand: "" + state.secondOperand + action.value};
                }
            } else {
                if (state.firstOperand.toString().includes("-")) {
                    return {...state, firstOperand: "" + state.firstOperand + ")" + action.value};
                } else {
                    return {...state, firstOperand: "" + state.firstOperand + action.value};
                }
            }
        }
    }

    function tryEval(): CalculatorState {
        // eslint-disable-next-line no-eval
        let result = eval(state.firstOperand + state.operator + state.secondOperand);

        if (isNumber(result)) {
            return {firstOperand: result, operator: action.type, secondOperand: "", type: state.type};
        }
        return state;
    }

    function negateCurrentOperand(): CalculatorState {
        if (state.operator !== ActionType.EMPTY) {
            if (state.secondOperand.toString().includes("-")) {
                return {...state, secondOperand: state.secondOperand.toString().replace("\D+", "")}; // eslint-disable-line
            }
            return {...state, secondOperand: "(-" + state.secondOperand};
        } else {
            if (state.firstOperand.toString().includes("-")) {
                return {...state, firstOperand: state.firstOperand.toString().replace("-", "")};
            }
            return {...state, firstOperand: "-" + state.firstOperand};
        }
    }

    function calculate(): CalculatorState {
        console.log(state.operator);
        switch (state.operator) {
        case ActionType.ADD:
            return {
                firstOperand: toNumber(state.firstOperand) + toNumber(state.secondOperand),
                secondOperand: "",
                operator: ActionType.EMPTY,
                type: state.type
            };
        case ActionType.SUBTRACT:
            return {
                firstOperand: toNumber(state.firstOperand) - toNumber(state.secondOperand),
                secondOperand: "",
                operator: ActionType.EMPTY,
                type: state.type
            };
        case ActionType.DIVIDE:
            return {
                firstOperand: toNumber(state.firstOperand) / toNumber(state.secondOperand),
                secondOperand: "",
                operator: ActionType.EMPTY,
                type: state.type
            };
        case ActionType.MULTIPLY:
            return {
                firstOperand: toNumber(state.firstOperand) * toNumber(state.secondOperand),
                secondOperand: "",
                operator: ActionType.EMPTY,
                type: state.type
            };
        case ActionType.DECIMAL:
            return state;
        case ActionType.SQUARE:
            return {
                firstOperand: toNumber(state.firstOperand) ** 2,
                secondOperand: "",
                operator: ActionType.EMPTY,
                type: state.type
            };
        default:
            return state;

        }
    }

    function applyDecimalPoint(): CalculatorState {
        if (state.secondOperand !== "") {
            return {...state, secondOperand: state.secondOperand + ","};
        }
        return {...state, firstOperand: state.firstOperand + ","};
    }

    function actionSwitch(type: ActionType): CalculatorState {
        switch (type) {
        case ActionType.NEGATE:
            return negateCurrentOperand();
        case ActionType.CALCULATE:
            return calculate();
        case ActionType.EMPTY:
            return state;
        case ActionType.ADD:
            return assign_proper_operand();
        case ActionType.SUBTRACT:
            return assign_proper_operand();
        case ActionType.DIVIDE:
            return assign_proper_operand();
        case ActionType.MULTIPLY:
            return assign_proper_operand();
        case ActionType.DECIMAL:
            return applyDecimalPoint();
        case ActionType.NUMBER:
            return assign_proper_operand();
        case ActionType.SQUARE:
            return assign_proper_operand();
        case ActionType.NAVIGATE:
            return state;
        default:
            return state;
        }
    }

    return actionSwitch(action.type);
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
        setDisplayedText([calculatorState.firstOperand, calculatorState.operator, calculatorState.secondOperand].join(" "));
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
            {DEBUG ?
                <span>{calculatorState.firstOperand}|{calculatorState.operator}|{calculatorState.secondOperand}</span> : null}
        </div>
    );
};

export default Calculator;