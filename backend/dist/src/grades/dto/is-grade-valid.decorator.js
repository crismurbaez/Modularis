"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsGradeValidConstraint = void 0;
exports.IsGradeValid = IsGradeValid;
const class_validator_1 = require("class-validator");
let IsGradeValidConstraint = class IsGradeValidConstraint {
    validate(value, args) {
        if (value === 'S/CALIFICAR' || value === 'SIN CALIFICAR')
            return true;
        const num = Number(value);
        if (!isNaN(num)) {
            return num >= 1 && num <= 10;
        }
        return false;
    }
    defaultMessage(args) {
        return 'La calificación debe ser un número entre 1 y 10, o el texto "S/CALIFICAR" / "SIN CALIFICAR".';
    }
};
exports.IsGradeValidConstraint = IsGradeValidConstraint;
exports.IsGradeValidConstraint = IsGradeValidConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsGradeValidConstraint);
function IsGradeValid(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsGradeValidConstraint,
        });
    };
}
//# sourceMappingURL=is-grade-valid.decorator.js.map