import Account from '@infrastructure/adapter/persistence/mongodb/entity/account.model';
import { Document } from 'mongoose';

type AccountDocument = Account & Document;

export default AccountDocument;
