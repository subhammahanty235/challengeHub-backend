const { startOfDay, differenceInDays, isFriday, isDate } = require('date-fns');
const { utcToZonedTime } = require('date-fns-tz');
const moment = require('moment-timezone')
exports.dayDifferenceCalculator = (startDate) => {
  const startDateUTC = new Date(startDate);
  const currentDateUTC = new Date();

  // Convert to Asia/Kolkata time zone
  const timeZoneIST = 'Asia/Kolkata';
  const startDateIST = utcToZonedTime(startDateUTC, timeZoneIST);
  const currentDateIST = utcToZonedTime(currentDateUTC, timeZoneIST);

  // Set time components to zero for both dates
  const startDateISTStartOfDay = startOfDay(startDateIST);
  const currentDateISTStartOfDay = startOfDay(currentDateIST);

  const dayDifferenceIST = differenceInDays(currentDateISTStartOfDay, startDateISTStartOfDay);
  //   console.log(dayDifferenceIST);
  return dayDifferenceIST;
};

exports.UTCtoIST = (date) => {
  const utcDate = new Date(date);
  //convert to Asia/Kolkata time zone
  const timeZoneIST = 'Asia/Kolkata';
  const dateIST = utcToZonedTime(utcDate, timeZoneIST);
  // console.log(dateIST)
  return dateIST;
}

exports.checkExceeded =(date) => {
  const istDate = moment(date).tz('Asia/Kolkata');
  const currentDateIST = moment().tz('Asia/Kolkata');
  istDate.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
  if (currentDateIST.isSameOrAfter(istDate)) {
    return 2;
  } else {
    return 3;
  }
}

