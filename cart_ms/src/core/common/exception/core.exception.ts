import { Optional } from '@core/common/type/common_types';
import { CodeDescription } from '@core/common/code/code';

export type CreateExceptionPayload<TData> = {
  code: CodeDescription;
  override_message?: string;
  data?: TData;
};

export class CoreException<TData> extends Error {
  public readonly code: number;

  public readonly data: Optional<TData>;

  private constructor(
    code_description: CodeDescription,
    override_message?: string,
    data?: TData,
  ) {
    super();

    this.name = this.constructor.name;
    this.code = code_description.code;
    this.data = data;
    this.message = override_message || code_description.message;

    Error.captureStackTrace(this, this.constructor);
  }

  public static new<TData>(
    payload: CreateExceptionPayload<TData>,
  ): CoreException<TData> {
    return new CoreException(
      payload.code,
      payload.override_message,
      payload.data,
    );
  }
}
