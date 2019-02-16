export interface IIndexerType extends Object {
    [key: string]: any;
}
export declare function replacer<T extends IIndexerType>(variables: T, key: string, val: any): any;
