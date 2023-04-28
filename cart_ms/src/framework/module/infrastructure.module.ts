import { Global, Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config_service: ConfigService): MongooseModuleOptions => ({
        uri: config_service.get<string>('DB_URI'),
      }),
    }),
  ],
  exports: [MongooseModule],
})
export default class InfrastructureModule {}
