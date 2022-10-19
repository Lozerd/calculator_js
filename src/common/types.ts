import {ActionType, MouseState} from "./enums";

export type ShadowHoverState = {
    boxShadow: string,
    mouseX: number,
    mouseY: number
}

export type Action = {
    type: ActionType
    value: string
}

export type CalculatorState = {
    firstOperand: number | string,
    operator: ActionType,
    secondOperand: number | string,
}

export type MousePosition = {
    x: number,
    y: number,
    type: MouseState
}

export type CalculatorButtonsProps = {
    onClickDispatcher: (obj: Action) => void
}

export type ButtonsRefCallback = {
    button: HTMLButtonElement,
    index: number
}