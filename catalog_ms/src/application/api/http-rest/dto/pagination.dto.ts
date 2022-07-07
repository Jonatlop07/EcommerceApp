import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class PaginationDTO {
  @ApiProperty() @IsNumber() @IsOptional() @IsPositive() limit?: number;
  @ApiProperty() @IsNumber() @IsOptional() @IsPositive() offset?: number;
}
