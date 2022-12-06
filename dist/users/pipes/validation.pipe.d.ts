import { PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';
export declare class ValidationPipe implements PipeTransform {
    private schema;
    constructor(schema: ObjectSchema);
    transform(value: any): any;
}
