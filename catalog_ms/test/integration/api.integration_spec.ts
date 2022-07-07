import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import { APIServerConfiguration } from '@infrastructure/config/api_server.config';
import { RootModule } from '@application/module/.root.module';

describe('REST API Integration Test Suite', () => {
  let app: NestExpressApplication;

  const api_prefix: string = APIServerConfiguration.API_PREFIX;
  const port = process.env.PORT || APIServerConfiguration.PORT;
  const host = process.env.HOST || APIServerConfiguration.HOST;

  const api_client = () => {
    return request(app.getHttpServer());
  };

  beforeEach(async () => {
    const module_ref = await Test.createTestingModule({
      imports: [RootModule]
    }).compile();

    app = module_ref.createNestApplication<NestExpressApplication>();
    app.setGlobalPrefix(api_prefix);
    await app.listen(
      port,
      host,
    );
  });

  afterEach(async () => {
    const connection: Connection = app.get(getConnectionToken());
    await connection.db.dropDatabase();
    await app.close();
  });

  it('adds an item to the catalog', async () => {
    await api_client()
      .post(`/${api_prefix}/catalog`)
      .send({
        vendor_id: '1',
        name: 'item1',
        description: '',
        price: 1.0,
        units_available: 1
      })
      .expect(HttpStatus.CREATED);
  });

  it('queries catalog by name', async () => {
    await api_client()
      .get(`/${api_prefix}/catalog?item_name=item`)
      .send()
      .expect(HttpStatus.OK);
  });
});
