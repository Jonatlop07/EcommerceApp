export default class AuthDITokens {
  public static readonly SignUpInteractor: unique symbol = Symbol('SignUpInteractor');
  public static readonly ValidateCredentialsInteractor: unique symbol = Symbol('ValidateCredentialsInteractor');
  public static readonly AuthRepository: unique symbol = Symbol('AuthRepository');
}
