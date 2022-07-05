import SignUpGateway from '@core/domain/auth/use-case/gateway/sign_up.gateway'
import ValidateCredentialsGateway from '@core/domain/auth/use-case/gateway/validate_credentials.gateway';

export default interface AuthRepository
  extends SignUpGateway, ValidateCredentialsGateway {}
