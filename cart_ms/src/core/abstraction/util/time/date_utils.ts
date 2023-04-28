import * as moment from 'moment';

const DATE_FORMAT = 'YYYY/MM/DD HH:mm:ss';

export function getCurrentDateString(): string {
  return moment().local().format(DATE_FORMAT);
}

export function getCurrentDate(): Date {
  return moment().local().toDate();
}

export function toDate(date: string): Date {
  return new Date(date);
}

export function toMomentString(date: Date): string {
  return moment(date).local().format(DATE_FORMAT);
}
