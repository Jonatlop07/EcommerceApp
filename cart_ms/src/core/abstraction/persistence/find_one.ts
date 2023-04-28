import { Optional } from '@core/abstraction/type/common_types';

export default interface FindOne<F, R> {
  findOne(params: F): Promise<Optional<R>>;
}
