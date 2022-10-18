import "../css/Calculator.css";
import React, {useEffect, useRef, useState} from "react";
import CalculatorInput from "./CalculatorInput";
import CalculatorButton from "./CalculatorButton";


class CalculatorOperation {
    public operation: string;

    constructor(operation: string) {
        this.operation = operation;
    }

    static Add = class Add extends CalculatorOperation {
        operation = "+";
    };

    static Substract = class Substract extends CalculatorOperation {
        operation = "-";
    };
    static Divide = class Divide extends CalculatorOperation {
        operation = "/";
    };
    static Multiply = class Multiply extends CalculatorOperation {
        operation = "*";
    };
}

class CalculatorAction {
    private event

    static Clear;
    static Delete;
    static Calculate;
    static Decimal;
    static Negate = class Negate;
    static Operation = class Operation extends CalculatorOperation {
        constructor(calculatorOperation: CalculatorOperation) {
            super(calculatorOperation.operation);
        }

    };
    static Number = class Number extends CalculatorAction {
        public value: number;

        constructor(value: number) {
            super();
            this.value = value;
        }
    };

    onEvent(state: ) {}

}

interface ICalculatorState {
    firstOperand: string,
    operator: CalculatorAction | null,
    secondOperand: string,
}

const Calculator = () => {
    const [state, setState] = useState<ICalculatorState>(
        {firstOperand: "", operator: null, secondOperand: ""}
    );

    let displayedText = useRef<string>();

    useEffect(() => {
        displayedText.current = Object.values(state).map(val => {
            return val;
        }).join(" ");
    }, [state]);

    function onEvent(value: string) {
        if (state.operator !== null && state.secondOperand !== "") {
        }
    }

    return (
        <div className="main">
            <CalculatorInput text={displayedText.current}/>
            <div className="buttons">
                <CalculatorButton symbol={"7"} onClick={symbol => onEvent(symbol)}/>
            </div>
        </div>
    );
};

export default Calculator;