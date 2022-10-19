export function isNumber(number: unknown): boolean {
    return !isNaN(Number(number));
}