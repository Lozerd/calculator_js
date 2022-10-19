import React, {forwardRef, Ref} from "react";
import CalculatorButton from "./CalculatorButton";
import {ActionType} from "../common/enums";
import {CalculatorButtonsProps} from "../common/types";


const CalculatorButtons = forwardRef(({onClickDispatcher}: CalculatorButtonsProps, ref: Ref<HTMLDivElement>) => {
    return <div ref={ref} className="buttons">
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
    </div>;
});

export default CalculatorButtons;