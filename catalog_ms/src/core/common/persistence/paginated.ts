import { PaginationDTO } from '@core/common/persistence/pagination.dto'
import { Optional } from '@core/common/type/common_types'

export default interface Paginated {
  pagination?: Optional<PaginationDTO>;
}
