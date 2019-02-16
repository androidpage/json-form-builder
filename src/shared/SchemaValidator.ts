import * as Ajv from 'ajv';

export class SchemaValidator {
  private ajv: Ajv.Ajv;
  private schemas: ISchemaWithId[];
  private validatorResult: boolean | undefined;

  constructor(schemas: ISchemaWithId[] | any) {
    this.schemas = schemas;
    this.ajv = new Ajv({ schemas });
  }

  public async validate(dataToValidate: any, schemaId?: string): Promise<boolean> {
    const schema = schemaId || (this.schemas[0].$id as string);
    const validator = this.ajv.getSchema(schema);
    const isValid = (await validator(dataToValidate)) || false;
    this.validatorResult = isValid;
    return isValid;
  }

  public isValid() {
    return this.validatorResult;
  }

  public getErrors() {
    return this.ajv.errorsText();
  }
}

export interface ISchemaWithId {
  $id: string;
  [key: string]: any;
}
