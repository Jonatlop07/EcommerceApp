import { NestFactory } from '@nestjs/core';
import {
  INestApplication,
  Logger,
  NestApplicationOptions,
} from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { RootModule } from '@application/module/.root.module';
import { APIServerConfiguration } from '@infrastructure/config/api_server.config';
import * as chalk from 'chalk';
import { ValidationPipe } from '@application/api/http-rest/common/pipes/validation.pipe';

function buildAPIDocumentation(app: INestApplication): void {
  const title = 'Mini Ecommerce Catalog Microservice';
  const description = 'Mini Ecommerce Catalog Microservice API Documentation';
  const version = '1.0.0';
  const tag = 'auth';

  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addTag(tag)
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

export class ServerApplication {
  private readonly host: string = APIServerConfiguration.HOST;
  private readonly port: number = APIServerConfiguration.PORT;
  private readonly enable_log: boolean = APIServerConfiguration.ENABLE_LOG;
  private readonly api_prefix: string = APIServerConfiguration.API_PREFIX;

  public async run(): Promise<void> {
    try {
      const options: NestApplicationOptions = {};
      if (!this.enable_log) {
        options['logger'] = false;
      }
      const app = await NestFactory.create(RootModule, options);
      app.setGlobalPrefix(this.api_prefix);
      app.enableCors({
        origin: '*'
      });
      app.useGlobalPipes(new ValidationPipe());
      buildAPIDocumentation(app);
      await app.listen(
        process.env.PORT || this.port,
        process.env.HOST || this.host,
      );
      Logger.log(
        `Environment: ${chalk
          .hex('#87e8de')
          .bold(`${process.env.NODE_ENV?.toUpperCase()}`)}`,
      );

      process.env.NODE_ENV === 'production'
        ? Logger.log(
            `✅  Server ready at http://${this.host}:${chalk
              .hex('#87e8de')
              .bold(`${this.port}`)}`,
          )
        : Logger.log(
            `✅  Server is listening on port ${chalk
              .hex('#87e8de')
              .bold(`${this.port}`)}`,
          );
    } catch (error) {
      Logger.error(`❌  Error starting server, ${error}`);
      process.exit();
    }
  }

  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
