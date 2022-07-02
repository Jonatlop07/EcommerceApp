import { HttpStatus, INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { getConnectionToken, MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import { APIServerConfiguration } from '@infrastructure/config/api_server.config';

describe('SignUp', () => {
  let app: INestApplication;

  const api_prefix: string = APIServerConfiguration.API_PREFIX;

  const api_client = () => {
    return supertest(app.getHttpServer());
  };

  beforeEach(async () => {
    const module_ref = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (config_service: ConfigService): Promise<MongooseModuleOptions> => ({
            uri: config_service.get<string>('DB_URI'),
          })
        }),
        AuthModule
      ]
    }).compile();

    app = module_ref.createNestApplication<NestExpressApplication>();
    app.setGlobalPrefix(api_prefix);
    await app.listen(
      process.env.PORT || APIServerConfiguration.PORT,
      process.env.HOST || APIServerConfiguration.HOST,
    );
  });

  afterEach(async () => {
    const connection: Connection = app.get(getConnectionToken());
    await connection.db.dropDatabase();
    await app.close();
  });

  const valid_username = 'new_user';
  const valid_password = 'Abc123_tr';

  it('signs up', async () => {
    await api_client()
      .post(`${api_prefix}/account`)
      .send({
        username: valid_username,
        password: valid_password
      })
      .expect(HttpStatus.CREATED);
  });
});
