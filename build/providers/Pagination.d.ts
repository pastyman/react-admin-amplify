interface Tokens {
    [index: string]: Array<string | null | undefined>;
}
export declare class Pagination {
    static tokens: Tokens;
    static getNextToken(querySignature: string, page: number): string | null | undefined;
    static saveNextToken(nextToken: string | null, querySignature: string, page: number): void;
}
export {};
