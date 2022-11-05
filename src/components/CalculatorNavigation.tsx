import React from "react";
import {CalculatorNavigationProps} from "../common/types";
import "../css/CalculatorNavigation.css";

const CalculatorNavigation = ({calculatorNavigationType, onBurgerChoiceClick}: CalculatorNavigationProps) => {
    return (
        <nav className="calculator__nav">
            {calculatorNavigationType}
        </nav>
    );
};

export default CalculatorNavigation;