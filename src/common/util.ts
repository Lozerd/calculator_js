import {DEBUG} from "../App";
import {ActionType} from "./enums";

export function isNumber(number: unknown): boolean {
    return !isNaN(Number(number));
}

export function elementsOverlap(first: DOMRect, second: DOMRect): boolean {
    const rect1 = {height: first.height, width: first.width, x: first.x, y: first.y};
    const rect2 = {height: second.height, width: second.width, x: second.x, y: second.y};

    const isInHorizontalBounds = rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
    const isInVerticalBounds = rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
    return isInHorizontalBounds && isInVerticalBounds;
}

export function toNumber(value: any, default_value: number = 0): number {
    try {
        let strValue = String(value);

        if (strValue.includes(ActionType.DECIMAL)) {
            return parseFloat(strValue.replace("[^0-9-.]", ""));
        } else {
            return parseInt(strValue.replace("[^0-9-]", ""));
        }
    } catch (e) {
        if (DEBUG) {
            console.log(`An error occurred: \n${e}`);
        }
        return default_value;
    }
}
