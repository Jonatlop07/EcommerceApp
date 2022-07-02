import { Global, Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config_service: ConfigService): Promise<MongooseModuleOptions> => ({
        uri: config_service.get<string>('DB_URI')
      })
    })
  ],
  exports: [
    MongooseModule
  ]
})
export class InfrastructureModule {}
