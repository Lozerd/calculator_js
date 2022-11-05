import React, {MouseEvent, useRef} from "react";
import CalculatorButton from "./CalculatorButton";
import {ActionType} from "../common/enums";
import {CalculatorButtonsProps} from "../common/types";
import "../css/CalculatorButtons.css";


const CalculatorButtons = ({onClickDispatcher}: CalculatorButtonsProps) => {
    const calculatorButtonsRef = useRef<HTMLDivElement>(null);
    function mouseHandler(event: MouseEvent<HTMLDivElement>) {

        if (calculatorButtonsRef.current !== null) {
            calculatorButtonsRef.current.childNodes.forEach((btn) => {
                let btnElement = btn as HTMLButtonElement;
                const rect = btnElement.getBoundingClientRect();

                btnElement.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
                btnElement.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
            });
        }
    }

    return <div ref={calculatorButtonsRef} onMouseMove={(e) => mouseHandler(e)} className="calculator__buttons">
        <CalculatorButton symbol={7} onClick={symbol => onClickDispatcher({type: ActionType.NUMBER, value: symbol.toString()})}/>
        <CalculatorButton symbol={7} onClick={symbol => onClickDispatcher({type: ActionType.NUMBER, value: symbol.toString()})}/>
        <CalculatorButton symbol={7} onClick={symbol => onClickDispatcher({type: ActionType.NUMBER, value: symbol.toString()})}/>
        <CalculatorButton symbol={7} onClick={symbol => onClickDispatcher({type: ActionType.NUMBER, value: symbol.toString()})}/>
        <CalculatorButton symbol={7} onClick={symbol => onClickDispatcher({type: ActionType.NUMBER, value: symbol.toString()})}/>
        <CalculatorButton symbol={8} onClick={symbol => onClickDispatcher({type: ActionType.NUMBER, value: symbol.toString()})}/>
        <CalculatorButton symbol={9} onClick={symbol => onClickDispatcher({type: ActionType.NUMBER, value: symbol.toString()})}/>
        <CalculatorButton symbol={ActionType.MULTIPLY} onClick={symbol => onClickDispatcher({type: ActionType.MULTIPLY, value: symbol.toString()})}/>
        <CalculatorButton symbol={4} onClick={symbol => onClickDispatcher({type: ActionType.NUMBER, value: symbol.toString()})}/>
        <CalculatorButton symbol={5} onClick={symbol => onClickDispatcher({type: ActionType.NUMBER, value: symbol.toString()})}/>
        <CalculatorButton symbol={6} onClick={symbol => onClickDispatcher({type: ActionType.NUMBER, value: symbol.toString()})}/>
        <CalculatorButton symbol={ActionType.SUBTRACT} onClick={symbol => onClickDispatcher({type: ActionType.SUBTRACT, value: symbol.toString()})}/>
        <CalculatorButton symbol={1} onClick={symbol => onClickDispatcher({type: ActionType.NUMBER, value: symbol.toString()})}/>
        <CalculatorButton symbol={2} onClick={symbol => onClickDispatcher({type: ActionType.NUMBER, value: symbol.toString()})}/>
        <CalculatorButton symbol={3} onClick={symbol => onClickDispatcher({type: ActionType.NUMBER, value: symbol.toString()})}/>
        <CalculatorButton symbol={ActionType.ADD} onClick={symbol => onClickDispatcher({type: ActionType.ADD, value: symbol.toString()})}/>
        <CalculatorButton symbol={ActionType.NEGATE} onClick={symbol => onClickDispatcher({type: ActionType.NEGATE, value: symbol.toString()})} classNameOverride={"button number"}/>
        <CalculatorButton symbol={0} onClick={symbol => onClickDispatcher({type: ActionType.ADD, value: symbol.toString()})}/>
        <CalculatorButton symbol={ActionType.DECIMAL} onClick={symbol => onClickDispatcher({type: ActionType.DECIMAL, value: symbol.toString()})} classNameOverride={"button number"}/>
        <CalculatorButton symbol={ActionType.CALCULATE} onClick={symbol => onClickDispatcher({type: ActionType.CALCULATE, value: ""})} classNameOverride={"button calculate"}/>
    </div>;
};

export default CalculatorButtons;