import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsUnimayorEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsUnimayorEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string' && value.endsWith('@unimayor.edu.co');
        },
        defaultMessage(args: ValidationArguments) {
          return 'Debes ser estudiante de Unimayor';
        },
      },
    });
  };
}
