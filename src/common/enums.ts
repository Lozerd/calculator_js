export enum ActionType {
    EMPTY = "",
    ADD = "+",
    SUBTRACT = "-",
    DIVIDE = "÷",
    MULTIPLY = "×",
    DECIMAL = ".",
    INVERSE_DEGREE = "1/x",
    SQUARE = "x²",
    SQUARE_ROOT = "√",
    NUMBER = "number",
    NAVIGATE = "navigate",
    NEGATE = "+/-",
    CALCULATE = "=",
    CLEAR = "C",
    REMOVE_OPERAND = "CE",
    REMOVE = "⌫",
    PERCENT = "%",
}

export enum CalculatorNavigationType {
    REGULAR = "Обычный",
    ENGENEER = "Инженерный" // TODO to implement
}