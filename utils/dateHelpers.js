const { startOfDay, differenceInDays } = require('date-fns');
const { utcToZonedTime} = require('date-fns-tz');

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


