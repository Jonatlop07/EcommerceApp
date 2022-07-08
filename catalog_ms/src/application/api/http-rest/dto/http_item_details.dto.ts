import { Id } from '@core/common/type/common_types'
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export default class HttpItemDetailsDTO {
  @IsUUID()
  vendor_id: Id;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsArray()
  media_uris: Array<string>;
}
