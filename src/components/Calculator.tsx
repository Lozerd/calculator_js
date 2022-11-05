import "../css/Calculator.css";
import React, {useEffect, useReducer, useState} from "react";
import CalculatorInput from "./CalculatorInput";
import {Action, CalculatorState} from "../common/types";
import {ActionType, CalculatorNavigationType} from "../common/enums";
import CalculatorButtons from "./CalculatorButtons";
import CalculatorNavigation from "./CalculatorNavigation";
import {isNumber, toNumber} from "../common/util";
import CalculatorHeader from "./CalculatorHeader";
import CalculatorBody from "./CalculatorBody";
import Debug from "./Debug";


function calculatorReducer(state: CalculatorState, action: Action): CalculatorState {
    function assign_proper_operand(): CalculatorState {
        if (Object.values(ActionType).includes(action.type) && !isNumber(action.value)) { // operations
            if (state.firstOperand !== ActionType.EMPTY && state.secondOperand === ActionType.EMPTY) {
                if (state.firstOperand.toString().slice(-1) === ActionType.DECIMAL) {
                    state.firstOperand = state.firstOperand + "0";
                }
                return {...state, operator: action.type};
            } else {
                return calculate();
            }
        } else {
            if (state.operator !== ActionType.EMPTY) {
                return {...state, secondOperand: ActionType.EMPTY + state.secondOperand + action.value};
            } else {
                return {...state, firstOperand: ActionType.EMPTY + state.firstOperand + action.value};
            }
        }
    }

    function negateCurrentOperand(): CalculatorState {
        if (state.operator !== ActionType.EMPTY) {
            if (state.secondOperand.toString().includes("-")) {
                return {...state, secondOperand: state.secondOperand.toString().replace("\D+", ActionType.EMPTY)}; // eslint-disable-line
            }
            return {...state, secondOperand: "(-" + state.secondOperand};
        } else {
            if (state.firstOperand.toString().includes("-")) {
                return {...state, firstOperand: state.firstOperand.toString().replace("-", ActionType.EMPTY)};
            }
            return {...state, firstOperand: "-" + state.firstOperand};
        }
    }

    function calculate(): CalculatorState {
        switch (state.operator) {
        case ActionType.ADD:
            console.log(toNumber(state.firstOperand), toNumber(state.secondOperand));
            return {
                firstOperand: toNumber(state.firstOperand) + toNumber(state.secondOperand),
                secondOperand: ActionType.EMPTY,
                operator: ActionType.EMPTY,
                type: state.type
            };
        case ActionType.SUBTRACT:
            return {
                firstOperand: toNumber(state.firstOperand) - toNumber(state.secondOperand),
                secondOperand: ActionType.EMPTY,
                operator: ActionType.EMPTY,
                type: state.type
            };
        case ActionType.DIVIDE:
            return {
                firstOperand: toNumber(state.firstOperand) / toNumber(state.secondOperand),
                secondOperand: ActionType.EMPTY,
                operator: ActionType.EMPTY,
                type: state.type
            };
        case ActionType.MULTIPLY:
            return {
                firstOperand: toNumber(state.firstOperand) * toNumber(state.secondOperand),
                secondOperand: ActionType.EMPTY,
                operator: ActionType.EMPTY,
                type: state.type
            };
        case ActionType.DECIMAL:
            return state;
        case ActionType.SQUARE:
            return {
                firstOperand: toNumber(state.firstOperand) ** 2,
                secondOperand: ActionType.EMPTY,
                operator: ActionType.EMPTY,
                type: state.type
            };
        default:
            return state;
        }
    }

    function applyDecimalPoint(): CalculatorState {
        if (state.operator !== ActionType.EMPTY && state.secondOperand !== ActionType.EMPTY && !state.secondOperand.toString().includes(ActionType.DECIMAL)) {
            return {...state, secondOperand: state.secondOperand + ActionType.DECIMAL};
        } else if (state.operator === ActionType.EMPTY && state.firstOperand !== ActionType.EMPTY && !state.firstOperand.toString().includes(ActionType.DECIMAL)) {
            return {...state, firstOperand: state.firstOperand + ActionType.DECIMAL};
        }
        return state;
    }

    function remove_symbol(only_operands: boolean = false): CalculatorState {
        if (state.secondOperand !== ActionType.EMPTY) {
            return {...state, secondOperand: state.secondOperand.toString().slice(0, -1)};
        } else if (state.operator !== ActionType.EMPTY && !only_operands) {
            return {...state, operator: ActionType.EMPTY};
        } else if (state.operator === ActionType.EMPTY && only_operands) {
            return {...state, firstOperand: state.firstOperand.toString().slice(0, -1)};
        }
        return state;
    }

    function apply_inverse_degree(): CalculatorState {
        if (state.operator !== ActionType.EMPTY && state.secondOperand !== "") {
            return {...state, secondOperand: 1 / toNumber(state.secondOperand)};
        } else if (state.firstOperand !== ActionType.EMPTY) {
            return {...state, firstOperand: 1 / toNumber(state.firstOperand)};
        }
        return state;
    }

    function apply_square_to_number(is_square_root: boolean = false): CalculatorState {
        if (state.operator !== ActionType.EMPTY && state.secondOperand !== ActionType.EMPTY) {
            if (is_square_root) {
                return {...state, secondOperand: Math.sqrt(toNumber(state.secondOperand))};
            } else {
                return {...state, secondOperand: Math.pow(toNumber(state.secondOperand), 2)};
            }
        } else if (state.firstOperand !== ActionType.EMPTY) {
            if (is_square_root) {
                return {...state, firstOperand: Math.sqrt(toNumber(state.firstOperand))};
            } else {
                return {...state, firstOperand: Math.pow(toNumber(state.firstOperand), 2)};
            }
        }
        return state;
    }

    function actionSwitch(type: ActionType): CalculatorState {
        switch (type) {
        case ActionType.NEGATE:
            return negateCurrentOperand();
        case ActionType.DECIMAL:
            return applyDecimalPoint();
        case ActionType.CALCULATE:
            if (state.secondOperand !== ActionType.EMPTY) {
                return calculate();
            } else {
                return state;
            }
        case ActionType.NUMBER:
            return assign_proper_operand();
        case ActionType.ADD:
            return assign_proper_operand();
        case ActionType.SUBTRACT:
            return assign_proper_operand();
        case ActionType.MULTIPLY:
            return assign_proper_operand();
        case ActionType.INVERSE_DEGREE:
            return apply_inverse_degree();
        case ActionType.SQUARE:
            return apply_square_to_number();
        case ActionType.SQUARE_ROOT:
            return apply_square_to_number(true);
        case ActionType.DIVIDE:
            return assign_proper_operand();
        case ActionType.PERCENT:
            return state;
        case ActionType.REMOVE_OPERAND:
            return remove_symbol(true);
        case ActionType.CLEAR:
            return {
                ...state,
                firstOperand: ActionType.EMPTY,
                operator: ActionType.EMPTY,
                secondOperand: ActionType.EMPTY
            };
        case ActionType.REMOVE:
            return remove_symbol();
        case ActionType.NAVIGATE:
            return state;
        case ActionType.EMPTY:
            return state;
        default:
            return state;
        }
    }

    return actionSwitch(action.type);
}

const Calculator = () => {
    const initialCalculatorState: CalculatorState = {
        firstOperand: ActionType.EMPTY,
        operator: ActionType.EMPTY,
        secondOperand: ActionType.EMPTY,
        type: CalculatorNavigationType.REGULAR
    };

    const [displayedText, setDisplayedText] = useState(ActionType.EMPTY.valueOf());

    const [calculatorState, calculatorStateDispatch] = useReducer(calculatorReducer, initialCalculatorState);

    useEffect(() => {
        setDisplayedText([calculatorState.firstOperand, calculatorState.operator, calculatorState.secondOperand]
            .map(item => item.toString().slice(0, 17))
            .join(" "));
    }, [calculatorState]);

    return (
        <CalculatorBody>
            <CalculatorHeader/>
            <CalculatorNavigation
                calculatorNavigationType={calculatorState.type}
                onBurgerChoiceClick={(type: CalculatorNavigationType) => calculatorStateDispatch({
                    type: ActionType.NAVIGATE,
                    value: type
                })}/>
            <CalculatorInput text={displayedText}/>
            <CalculatorButtons onClickDispatcher={obj => calculatorStateDispatch(obj)}/>
            <Debug
                objectToDebug={`${calculatorState.firstOperand}|${calculatorState.operator}|${calculatorState.secondOperand}`}
                makeLogs={false}
            />
        </CalculatorBody>
    );
};

export default Calculator;