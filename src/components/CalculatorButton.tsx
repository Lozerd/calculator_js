import React from "react";
import {isNumber} from "../common/util";

interface CalculatorButtonProps {
    symbol: string | number,
    onClick: (symbol: string | number) => void
}


const CalculatorButton = ({symbol, onClick}: CalculatorButtonProps) => {
    const className = [
        "button",
        isNumber(symbol) ? "number" : "action",
    ].join(" ");

    return (
        <button className={className} onClick={() => onClick(symbol)}>
            <span>{symbol}</span>
        </button>
    );
};

export default CalculatorButton;