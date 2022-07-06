import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { setEnvironment } from '@application/environments';
import InfrastructureModule from '@application/module/infrastructure.module';
import CatalogModule from '@application/module/catalog.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${setEnvironment()}`,
    }),
    InfrastructureModule,
    CatalogModule
  ],
  providers: []
})
export class RootModule {}
