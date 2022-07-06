import { Test } from '@nestjs/testing';

export function createTestModule() {
  return Test.createTestingModule({
    providers: [
    ]
  }).compile();
}
