import React from "react";

interface CalculatorButtonProps {
    symbol: string | number,
    onClick: (symbol: string | number) => void,
}

const CalculatorButton = ({symbol, onClick}: CalculatorButtonProps) => {
    return (
        <button onClick={() => onClick(symbol)}>
            <span>{symbol}</span>
        </button>
    );
};

export default CalculatorButton;