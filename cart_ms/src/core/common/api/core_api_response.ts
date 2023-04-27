import { Nullable } from '@core/common/type/common_types';
import { Code } from '@core/common/code/code';

export class CoreApiResponse<TData> {
  public readonly code: number;

  public readonly message: string;

  public readonly timestamp: number;

  public readonly data: Nullable<TData>;

  private constructor(code: number, message: string, data?: TData) {
    this.code = code;
    this.message = message;
    this.data = data || null;
    this.timestamp = Date.now();
  }

  public static success<TData>(
    data?: TData,
    message?: string,
  ): CoreApiResponse<TData> {
    const result_code: number = Code.SUCCESS.code;
    const result_message: string = message || Code.SUCCESS.message;

    return new CoreApiResponse(result_code, result_message, data);
  }

  public static error<TData>(
    code?: number,
    message?: string,
    data?: TData,
  ): CoreApiResponse<TData> {
    const result_code: number = code || Code.INTERNAL_ERROR.code;
    const result_message: string = message || Code.INTERNAL_ERROR.message;

    return new CoreApiResponse(result_code, result_message, data);
  }
}
