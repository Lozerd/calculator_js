import "../css/Calculator.css";
import {MouseEvent, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState} from "react";
import CalculatorInput from "./CalculatorInput";
import {Action, CalculatorState, MousePosition, ShadowHoverState} from "../common/types";
import {ActionType, MouseState} from "../common/enums";
import CalculatorButtons from "./CalculatorButtons";
import {DEBUG} from "../App";
import {calculatorShadowOnHoverSpreadRadius} from "../common/constants";


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
        return {boxShadow: `0px 0px 78px ${calculatorShadowOnHoverSpreadRadius} rgba(43, 43, 43, 0.55)`, mouseX: x, mouseY: y};
    case MouseState.LEAVE:
        return {...shadowHoverState, boxShadow: "none"};
    }
}


const Calculator = () => {
    const initialCalculatorState: CalculatorState = {firstOperand: "", operator: ActionType.EMPTY, secondOperand: ""};
    const shadowHoverInitialState: ShadowHoverState = {boxShadow: "none", mouseX: 0, mouseY: 0};

    const [displayedText, setDisplayedText] = useState("");

    const [state, calculatorDispatch] = useReducer(calculatorReducer, initialCalculatorState);
    const [shadowHoverState, shadowHoverDispatcher] = useReducer(shadowHoverReducer, shadowHoverInitialState);

    const shadowWrapperRef = useRef<HTMLDivElement>(null);
    const calculatorButtonsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setDisplayedText(Object.values(state).join(" "));
    }, [state]);

    useEffect(() => {
        if (calculatorButtonsRef.current !== null) {
            calculatorButtonsRef.current.childNodes.forEach((button, index) => {
                // [75, 75, 75]
                // [41,41,41]
                // linear-gradient(90deg, rgba(75,75,75,1) 0%, rgba(41,41,41,1) 100%)

                // @ts-ignore
                // button.style.border = "1px solid rgb(58, 58, 58)";
                // console.log(1);

                // @ts-ignore
                // let {top, bottom, left, right} = button.getBoundingClientRect();
                // let {mouseX, mouseY} = Object.assign(shadowHoverState);

                // let boundingBoxMouseX = mouseX + calculatorShadowOnHoverSpreadRadius;
                // let boundingBoxMouseY = mouseY + calculatorShadowOnHoverSpreadRadius;


                // const tempStyle = "1px solid rgb(58, 58, 58)";

                // if (mouseY + calculatorShadowOnHoverSpreadRadius >= bottom || mouseY - calculatorShadowOnHoverSpreadRadius <= bottom){
                //     @ts-ignore
                // button.style.borderBottom = tempStyle;
                // }
                // if (mouseY + calculatorShadowOnHoverSpreadRadius >= top || mouseY - calculatorShadowOnHoverSpreadRadius <= top) {
                //     @ts-ignore
                // button.style.borderTop = tempStyle;
                // }
                // if (mouseX + calculatorShadowOnHoverSpreadRadius >= left || mouseX - calculatorShadowOnHoverSpreadRadius <= left) {
                //     @ts-ignore
                // button.style.borderLeft = tempStyle;
                // }
                // if (mouseX + calculatorShadowOnHoverSpreadRadius >= right || mouseX - calculatorShadowOnHoverSpreadRadius <= right) {
                //     @ts-ignore
                // button.style.borderRight = tempStyle;
                // }
                //
                // console.log(top, right, bottom, left, mouseX, mouseY);
            });
        }
    }, [shadowHoverState.mouseX, shadowHoverState.mouseY]);

    function mouseHandler(event: MouseEvent<HTMLDivElement>) {
        if (shadowWrapperRef.current !== null) {
            const {offsetLeft, offsetTop} = shadowWrapperRef.current;
            shadowHoverDispatcher({x: event.nativeEvent.pageX - offsetLeft, y: event.nativeEvent.pageY - offsetTop, type: event.type as MouseState});
        }
    }

    return (
        <div className="calculator">
            <div ref={shadowWrapperRef} className="shadow__wrapper" onMouseMove={mouseHandler} onMouseLeave={mouseHandler}>
                <div className="shadow__box" style={{...shadowHoverState}}></div>
                <CalculatorInput text={displayedText}/>
                <CalculatorButtons ref={calculatorButtonsRef} onClickDispatcher={obj => calculatorDispatch(obj)}/>

                {DEBUG ? <span>{state.firstOperand}|{state.operator}|{state.secondOperand}</span> : null}
            </div>
        </div>
    );
};

export default Calculator;