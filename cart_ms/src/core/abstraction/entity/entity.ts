import { Optional } from '@core/abstraction/type/common_types';
import { CoreException } from '@core/abstraction/exception/core.exception';
import { Code } from '@core/abstraction/code/code';
import {
  ClassValidationDetails,
  ClassValidator,
} from '@core/abstraction/util/class-validator/class_validator';

export class Entity<TIdentifier extends string | number> {
  protected _id: Optional<TIdentifier>;

  public get id(): TIdentifier {
    if (typeof this._id === 'undefined') {
      throw CoreException.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        override_message: `${this.constructor.name}: ID is empty.`,
      });
    }
    return this._id;
  }

  public async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> =
      await ClassValidator.validate(this);
    if (details) {
      throw CoreException.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        data: details,
      });
    }
  }
}
