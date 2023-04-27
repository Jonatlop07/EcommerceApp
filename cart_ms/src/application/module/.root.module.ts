import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { setEnvironment } from '@application/environments';
import InfrastructureModule from '@application/module/infrastructure.module';
import { APP_FILTER } from "@nestjs/core";
import { NestHttpExceptionFilter } from "@application/api/http-rest/exception-filter/nest_http.exception_filter";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${setEnvironment()}`,
    }),
    InfrastructureModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NestHttpExceptionFilter
    }
  ]
})
export class RootModule {}
