import { CoreApiResponse } from '@core/common/api/core_api_response';
import { Nullable } from '@core/common/type/common_types';
import filterObject from '@test/integration/util/filter_object';

export class ResponseExpect {
  public static codeAndMessage(
    response: CoreApiResponse<unknown>,
    expected: { code: number, message: string }
  ): void {
    expect(filterObject(response, ['code', 'message'])).toEqual(expected);
  }

  public static data(
    options: { response: CoreApiResponse<unknown>, pass_fields?: string[] },
    expected: Nullable<unknown>
  ): void {
    const toFilterObject = (object: any): unknown => {
      return options.pass_fields
        ? filterObject(object, options.pass_fields)
        : object;
    };
    const filtered_data: unknown = Array.isArray(options.response.data)
      ? options.response.data.map(item => toFilterObject(item))
      : toFilterObject(options.response.data);

    expect(filtered_data).toEqual(expected);
  }

}
