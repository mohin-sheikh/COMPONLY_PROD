import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException({
        status: 400,
        message:
          'Validation failed - ' + error.message.replace(/(\"|\[|\d\])/g, ''),
        response: {},
      });
    }
    if (value.name) {
      value.name = value.name.toLowerCase().trimStart().trimEnd();
    }
    if (value.first_name) {
      value.first_name = value.first_name.toLowerCase().trimStart().trimEnd();
    }
    if (value.last_name) {
      value.last_name = value.last_name.toLowerCase().trimStart().trimEnd();
    }
    if (value.email) {
      value.email = value.email.toLowerCase();
    }
    if (value.alternate_email) {
      value.alternate_email = value.alternate_email.toLowerCase();
    }
    return value;
  }
}
