import { Global, Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Account from '@infrastructure/adapter/persistence/mongodb/entity/account.model';
import AccountSchema from '@infrastructure/adapter/persistence/mongodb/entity/account.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema
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
