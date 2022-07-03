import * as moment from 'moment';
import { Schema } from 'mongoose';

export function getCurrentDateString(): string {
  const DATE_FORMAT = 'YYYY/MM/DD HH:mm:ss';
  return moment().local().format(DATE_FORMAT);
}

export function getCurrentDate(): Date {
  return moment().local().toDate();
}
