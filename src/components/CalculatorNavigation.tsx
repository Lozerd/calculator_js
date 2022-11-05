import React from "react";
import {CalculatorNavigationProps} from "../common/types";
import "../css/CalculatorNavigation.css";
import BurgerButton from "./BurgerButton";

const CalculatorNavigation = ({calculatorNavigationType, onBurgerChoiceClick}: CalculatorNavigationProps) => {
    return (
        <nav className="calculator__nav">
            <BurgerButton/>

            {calculatorNavigationType}
        </nav>
    );
};

export default CalculatorNavigation;