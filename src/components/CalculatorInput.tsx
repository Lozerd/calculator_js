import React from "react";

interface ICalculatorInputProps {
    text: string | undefined
}

const CalculatorInput = ({text}: ICalculatorInputProps) => {
    return <div className="calculator__input">
        {text !== null && <span>{text}</span>}
    </div>;
};

export default CalculatorInput;