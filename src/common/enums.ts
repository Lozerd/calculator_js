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
    NEGATE = "+/-",
    CALCULATE = "=",
}

export enum CalculatorNavigationType {
    REGULAR = "Обычный",
    ENGENEER = "Инженерный" // TODO to implement
}