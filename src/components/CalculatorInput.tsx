import React from "react";
import "../css/CalculatorInput.css";

interface ICalculatorInputProps {
    text: string | undefined
}

const CalculatorInput = ({text}: ICalculatorInputProps) => {
    return (<div className="calculator__input">
        {text !== null ?
            <div className="calculator__input--text">{text}</div>
            : null}
    </div>);
};

export default CalculatorInput;