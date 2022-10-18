import React from "react";

interface CalculatorButtonProps {
    symbol: string,
    onClick: (symbol: string) => void,
}

const CalculatorButton = ({symbol, onClick}: CalculatorButtonProps) => {
    return (
        <button onClick={() => onClick(symbol)}>
            <span>{symbol}</span>
        </button>
    );
};

export default CalculatorButton;