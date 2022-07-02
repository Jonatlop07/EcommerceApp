import * as moment from 'moment';

export function getCurrentDateString() {
  const DATE_FORMAT = 'YYYY/MM/DD HH:mm:ss';
  return moment().local().format(DATE_FORMAT);
}
