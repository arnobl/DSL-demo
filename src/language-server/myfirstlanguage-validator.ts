import { /* ValidationAcceptor, */ ValidationCheck, ValidationRegistry } from 'langium';
import { MyExpressionAstType } from './generated/ast';
import { MyfirstlanguageServices } from './myfirstlanguage-module';

/**
 * Map AST node types to validation checks.
 */
type MyfirstlanguageChecks = { [type in MyExpressionAstType]?: ValidationCheck | ValidationCheck[] }

/**
 * Registry for validation checks.
 */
export class MyfirstlanguageValidationRegistry extends ValidationRegistry {
    constructor(services: MyfirstlanguageServices) {
        super(services);
        const validator = services.validation.MyfirstlanguageValidator;
        const checks: MyfirstlanguageChecks = {
//            Person: validator.checkPersonStartsWithCapital
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class MyfirstlanguageValidator {

/*    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
	}*/

}
