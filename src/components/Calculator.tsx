import "../css/Calculator.css";
import {MouseEvent, useEffect, useReducer, useRef, useState} from "react";
import CalculatorInput from "./CalculatorInput";
import {Action, CalculatorState, MousePosition, ShadowHoverState} from "../common/types";
import {ActionType, CalculatorNavigationType, MouseState} from "../common/enums";
import CalculatorButtons from "./CalculatorButtons";
import {DEBUG} from "../App";
import {calculatorShadowOnHoverSpreadRadius} from "../common/constants";
import CalculatorNavigation from "./CalculatorNavigation";
import ShadowWrapper from "./ShadowWrapper";


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
    default:
        return state;
    }
}

function shadowHoverReducer(shadowHoverState: ShadowHoverState, action: MousePosition): ShadowHoverState {
    const {x, y, type} = action;
    switch (type) {
    case MouseState.MOVE:
        return {
            boxShadow:
                    `0px 0px 200px ${calculatorShadowOnHoverSpreadRadius}px rgba(43, 43, 43, 0.55), 
                     0px 0px 200px 0px rgba(41, 41, 41, 1)`,
            left: x,
            top: y
        };
    case MouseState.LEAVE:
        return {...shadowHoverState, boxShadow: "none"};
    }
}


const Calculator = () => {
    const initialCalculatorState: CalculatorState = {
        firstOperand: "",
        operator: ActionType.EMPTY,
        secondOperand: "",
        type: CalculatorNavigationType.REGULAR
    };
    const shadowHoverInitialState: ShadowHoverState = {boxShadow: "none", left: 0, top: 0};

    const [displayedText, setDisplayedText] = useState("");

    const [calculatorState, calculatorStateDispatch] = useReducer(calculatorReducer, initialCalculatorState);
    const [shadowHoverState, shadowHoverDispatcher] = useReducer(shadowHoverReducer, shadowHoverInitialState);

    const shadowWrapperRef = useRef<HTMLDivElement>(null);
    const calculatorButtonsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setDisplayedText(Object.values(calculatorState).join(" "));
    }, [calculatorState]);

    function mouseHandler(event: MouseEvent<HTMLDivElement>) {
        if (shadowWrapperRef.current !== null) {
            const {offsetLeft, offsetTop} = shadowWrapperRef.current;
            shadowHoverDispatcher({
                x: event.nativeEvent.pageX - offsetLeft,
                y: event.nativeEvent.pageY - offsetTop,
                type: event.type as MouseState
            });
        }
    }

    return (
        <div className="calculator">
            <CalculatorNavigation
                calculatorNavigationType={calculatorState.type}
                onBurgerChoiceClick={(type: CalculatorNavigationType) => calculatorStateDispatch({
                    type: ActionType.NAVIGATE,
                    value: type
                })}/>
            <ShadowWrapper
                ref={shadowWrapperRef}
                mouseHandler={(event) => mouseHandler(event)}
            >
                <CalculatorInput text={displayedText}/>
                <div className="shadow__box" style={{...shadowHoverState}}/>
                <CalculatorButtons
                    ref={calculatorButtonsRef}
                    onClickDispatcher={obj => calculatorStateDispatch(obj)}
                />
                {DEBUG ?
                    <span>{calculatorState.firstOperand}|{calculatorState.operator}|{calculatorState.secondOperand}</span> : null}
            </ShadowWrapper>
        </div>
    );
};

export default Calculator;