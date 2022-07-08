import { Entity } from '@core/common/entity/entity';
import { Id, Nullable, Optional } from '@core/common/type/common_types';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { v4 } from 'uuid';
import CreateCatalogItemEntityPayload from '@core/domain/catalog/entity/type/create_catalog_item_entity_payload'
import { CoreAssert } from '@core/common/util/assert/core_assert'
import { CoreException } from '@core/common/exception/core.exception'
import { Code } from '@core/common/code/code'
import CatalogItemDTO from '@core/domain/catalog/use-case/dto/catalog_item.dto'

export default class CatalogItem extends Entity<Id> {
  @IsString()
  private readonly vendor_id: string;

  @IsString()
  @IsNotEmpty()
  private readonly name: string;

  @IsString()
  private readonly description: Optional<string>;

  @IsArray()
  private readonly media_uris: Array<string>;

  @IsOptional()
  @IsString()
  private readonly created_at: Nullable<string>;

  @IsOptional()
  @IsString()
  private readonly updated_at: Nullable<string>;

  constructor(payload: CreateCatalogItemEntityPayload) {
    super();
    this._id = payload.item_id || v4();
    this.vendor_id = payload.vendor_id;
    this.name = payload.name;
    this.description = payload.description || '';
    this.media_uris = payload.media_uris;
    this.created_at = payload.created_at || null;
    this.updated_at = payload.updated_at || null;
  }

  public static async new(payload: CreateCatalogItemEntityPayload): Promise<CatalogItem> {
    const catalog_item: CatalogItem = new CatalogItem(payload);
    await catalog_item.validate();
    return catalog_item;
  }

  public toDTO(): CatalogItemDTO {
    return {
      item_id: this._id,
      vendor_id: this.vendor_id,
      name: this.name,
      description: this.description,
      media_uris: this.media_uris,
      created_at: this.created_at,
      updated_at: this.updated_at
    }
  }
}
