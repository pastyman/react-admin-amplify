export declare class Filter {
    static getQueryName(queries: Record<string, string>, filter: Record<string, unknown>): string | null;
    static getQueryVariables(filter: Record<string, unknown>): Record<string, unknown> | null;
    static isObject(obj: unknown): boolean;
    static isObjectOfLength(obj: unknown, length?: number): boolean;
    static isString(str: unknown): boolean;
    static isHashKeyValid(key: unknown): boolean;
    static isSortKeyValid(obj: unknown): boolean;
}
