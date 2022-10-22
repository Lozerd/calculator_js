import React from "react";
import {isNumber} from "../common/util";

interface CalculatorButtonProps {
    symbol: string | number,
    onClick: (symbol: string | number) => void
}

const CalculatorButton = ({symbol, onClick}: CalculatorButtonProps) => {
    const buttonTypeClass = isNumber(symbol) ? "number" : "action";


    return (
        <div className="calculator__button">
            <div className="button__wrapper">
                <button className={["button", buttonTypeClass].join(" ")} onClick={() => onClick(symbol)}>
                    <span>{symbol}</span>
                </button>
            </div>
        </div>
    );
};

export default CalculatorButton;