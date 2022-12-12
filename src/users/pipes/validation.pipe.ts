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
    if (value.full_name) {
      value.full_name = value.full_name.toLowerCase().trimStart().trimEnd();
    }
    if (value.email) {
      value.email = value.email.toLowerCase().trim();
    }
    if (value.alternate_email) {
      value.alternate_email = value.alternate_email.toLowerCase().trim();
    }
    if (value.period) {
      value.period = value.period.toLowerCase();
    }
    if (value.permission) {
      value.permission = value.permission.toLowerCase();
    }
    if (value.current_status) {
      value.current_status = value.current_status.toLowerCase();
    }
    return value;
  }
}
