import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDTO {
  @IsNumber() @IsOptional() @IsPositive() limit: number;
  @IsNumber() @IsOptional() @IsPositive() offset: number;
}
