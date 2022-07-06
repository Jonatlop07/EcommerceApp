export default interface CreateAccountDocumentDTO {
  acc_username: string;
  acc_password: string;
  acc_created_at: Date;
  acc_auth_token: string;
}
