import {ActionType, CalculatorNavigationType, MouseState} from "./enums";

export type ShadowHoverState = {
    boxShadow: string,
    left: number,
    top: number
}

export type Action = {
    type: ActionType
    value: string
}

export type CalculatorState = {
    firstOperand: number | string,
    operator: ActionType,
    secondOperand: number | string,
    type: CalculatorNavigationType
}

export type MousePosition = {
    x: number,
    y: number,
    type: MouseState
}

export type CalculatorButtonsProps = {
    onClickDispatcher: (obj: Action) => void
}

export type CalculatorNavigationProps = {
    calculatorNavigationType: CalculatorNavigationType,
    onBurgerChoiceClick: (type: CalculatorNavigationType) => void;
}

export type ShadowBoxProps = {
    style: ShadowHoverState
}