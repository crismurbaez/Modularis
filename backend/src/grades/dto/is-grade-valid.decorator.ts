import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsGradeValidConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (value === 'S/CALIFICAR' || value === 'SIN CALIFICAR') return true;
    const num = Number(value);
    if (!isNaN(num)) {
      return num >= 1 && num <= 10;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'La calificación debe ser un número entre 1 y 10, o el texto "S/CALIFICAR" / "SIN CALIFICAR".';
  }
}

export function IsGradeValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsGradeValidConstraint,
    });
  };
}
