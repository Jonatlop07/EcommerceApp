import { Test } from '@nestjs/testing';
import MongoDBAuthRepositoryAdapter
  from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_auth.repository.adapter';
import MongoDBDITokens from '@infrastructure/adapter/persistence/mongodb/di/mongodb_di_tokens';
import MongoDBAuthRepository from '@infrastructure/adapter/persistence/mongodb/repository/mongodb_auth.repository';

describe('MongoDBAuthRepositoryAdapter', () => {
  let mongodb_auth_repository_adapter: MongoDBAuthRepositoryAdapter;
  let mongodb_auth_repository: MongoDBAuthRepository;

  beforeEach(async () => {
    const module_ref = await Test.createTestingModule({
      providers: [
        MongoDBAuthRepositoryAdapter,
        {
          provide: MongoDBDITokens.AuthRepository,
          useClass: MongoDBAuthRepository
        }
      ]
    }).compile();

    mongodb_auth_repository_adapter = module_ref.get<MongoDBAuthRepositoryAdapter>(MongoDBAuthRepositoryAdapter);
    mongodb_auth_repository = module_ref.get<MongoDBAuthRepository>(MongoDBDITokens.AuthRepository);

    jest.clearAllMocks();
  });

  describe('', () => {
    
  });
});
