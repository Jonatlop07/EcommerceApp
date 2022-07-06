import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export default class Account {
  @Prop()
  acc_username: string;

  @Prop()
  acc_password: string;

  @Prop()
  acc_created_at: Date;

  @Prop()
  acc_auth_token: string;
}
