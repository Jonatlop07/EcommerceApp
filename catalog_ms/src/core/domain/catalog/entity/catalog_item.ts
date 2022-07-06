import { Entity } from '@core/common/entity/entity';
import { Id, Nullable, Optional } from '@core/common/type/common_types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { v4 } from 'uuid';
import CreateCatalogItemEntityPayload from '@core/domain/catalog/entity/type/create_catalog_item_entity_payload'
import { CoreAssert } from '@core/common/util/assert/core_assert'
import { CoreException } from '@core/common/exception/core.exception'
import { Code } from '@core/common/code/code'

export default class CatalogItem extends Entity<Id> {
  @IsString()
  private readonly vendor_id: string;

  @IsString()
  @IsNotEmpty()
  private readonly name: string;

  @IsString()
  private readonly description: Optional<string>;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false
  })
  private readonly price: number;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false
  })
  private readonly units_available: number;

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
    this.price = payload.price;
    CoreAssert.isTrue(
      this.hasValidPrice(),
      CoreException.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        override_message: 'CatalogItem: Invalid price -> Should be a real number greater or equal to 0.0'
      })
    );
    this.units_available = payload.units_available;
    CoreAssert.isTrue(
      this.hasValidUnitsAvailable(),
      CoreException.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        override_message: 'CatalogItem: Invalid units available -> Should be an integer greater or equal to 0'
      })
    );
    this.created_at = payload.created_at || null;
    this.updated_at = payload.updated_at || null;
  }

  private hasValidPrice(): boolean {
    return this.price >= 0.0;
  }

  private hasValidUnitsAvailable() {
    return this.units_available >= 0;
  }

  public static async new(payload: CreateCatalogItemEntityPayload): Promise<CatalogItem> {
    const catalog_item: CatalogItem = new CatalogItem(payload);
    await catalog_item.validate();
    return catalog_item;
  }
}
