import React from "react";

interface ICalculatorInputProps {
    text: string | undefined
}

const CalculatorInput = ({text}: ICalculatorInputProps) => {
    return (<div className="calculator__input">
        {text !== null ?
            <span className="calculator__input--text">{text}</span>
            : null}
    </div>);
};

export default CalculatorInput;