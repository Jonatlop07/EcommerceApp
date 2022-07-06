import { SchemaFactory } from '@nestjs/mongoose';
import Account from '@infrastructure/adapter/persistence/mongodb/entity/account.model';

const AccountSchema = SchemaFactory.createForClass(Account);

export default AccountSchema;
