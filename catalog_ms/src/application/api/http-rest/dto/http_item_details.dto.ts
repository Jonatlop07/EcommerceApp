import { Id } from '@core/common/type/common_types'
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export default class HttpItemDetailsDTO {
  @IsUUID()
  vendor_id: Id;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  units_available: number;
}
