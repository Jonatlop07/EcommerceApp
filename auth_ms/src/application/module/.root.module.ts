import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { setEnvironment } from '@application/environments';
import InfrastructureModule from '@application/module/infrastructure.module';
import AuthModule from '@application/module/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${setEnvironment()}`,
    }),
    InfrastructureModule,
    AuthModule
  ],
  providers: []
})
export class RootModule {}
