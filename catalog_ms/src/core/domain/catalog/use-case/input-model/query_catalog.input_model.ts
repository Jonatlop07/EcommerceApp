import { Optional } from '@core/common/type/common_types'
import Paginated from '@core/common/persistence/paginated'

export default interface QueryCatalogInputModel extends Paginated {
  item_name?: Optional<string>;
}
