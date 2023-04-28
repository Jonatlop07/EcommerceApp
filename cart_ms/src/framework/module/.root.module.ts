import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { setEnvironment } from '../environments';
import InfrastructureModule from '../module/infrastructure.module';
import { APP_FILTER } from "@nestjs/core";
import { NestHttpExceptionFilter } from "../api/http-rest/exception-filter/nest_http.exception_filter";

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
