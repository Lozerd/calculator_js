import React, {CSSProperties} from "react";
import {isNumber} from "../common/util";

interface CalculatorButtonProps {
    symbol: string | number,
    onClick: (symbol: string | number) => void,
    classNameOverride?: string
}

const CalculatorButton = ({symbol, onClick, classNameOverride}: CalculatorButtonProps) => {
    const buttonTypeClass = isNumber(symbol) ? "number" : "action";
    const className = classNameOverride === undefined ? ["button", buttonTypeClass].join(" ") : classNameOverride;


    return (
        <div className="calculator__button" onClick={() => onClick(symbol)}>
            <div className="button__wrapper">
                <button className={className}>
                    <span>{symbol}</span>
                </button>
            </div>
        </div>
    );
};

export default CalculatorButton;