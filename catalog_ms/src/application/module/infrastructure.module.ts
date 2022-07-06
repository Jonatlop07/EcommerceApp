import { Global, Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import CatalogItem from '@infrastructure/adapter/persistence/mongodb/entity/catalog_item.model'
import CatalogItemSchema from '@infrastructure/adapter/persistence/mongodb/entity/catalog_item.schema'

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CatalogItem.name,
        schema: CatalogItemSchema
      }
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config_service: ConfigService): MongooseModuleOptions => ({
        uri: config_service.get<string>('DB_URI')
      })
    })
  ],
  exports: [
    MongooseModule
  ]
})
export default class InfrastructureModule {}
