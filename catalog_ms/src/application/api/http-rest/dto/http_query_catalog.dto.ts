import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDTO } from '@application/api/http-rest/dto/pagination.dto';

export default class HttpQueryCatalogDTO extends PaginationDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  item_name: string;
}
