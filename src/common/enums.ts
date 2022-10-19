export enum ActionType {
    EMPTY = "",
    ADD = "+",
    SUBTRACT = "-",
    DIVIDE = "/",
    MULTIPLY = "×",
    DECIMAL = ".",
    SQUARE = "x²",
    NUMBER = "number",
    NAVIGATE = "navigate",
}

export enum MouseState {
    MOVE = "mousemove",
    LEAVE = "mouseleave"
}

export enum CalculatorNavigationType {
    REGULAR = "Обычный",
    ENGENEER = "Инженерный" // TODO to implement
}