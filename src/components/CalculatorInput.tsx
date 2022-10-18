import React from "react";

interface ICalculatorInputProps {
    text: string | undefined
}

const CalculatorInput = ({text}: ICalculatorInputProps) => {
    return <div>
        {text !== null && <span>{text}</span>}
    </div>;
};

export default CalculatorInput;