export declare class SchemaValidator {
    private ajv;
    private schemas;
    private validatorResult;
    constructor(schemas: ISchemaWithId[] | any);
    validate(dataToValidate: any, schemaId?: string): Promise<boolean>;
    isValid(): boolean | undefined;
    getErrors(): string;
}
export interface ISchemaWithId {
    $id: string;
    [key: string]: any;
}
