'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  // write code here
  let day;
  let month;
  let year;
  let newYear;
  const dateArray = date.split(fromFormat[3]);
  const resultDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = dateArray[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dateArray[i];
    }

    if (fromFormat[i] === 'DD') {
      day = dateArray[i];
    }
  }

  for (const i of fromFormat) {
    if (i === 'YY') {
      for (const j of toFormat) {
        if (j === 'YYYY') {
          if (parseInt(year, 10) < 30 || year === '00') {
            newYear = year.split('');
            newYear.unshift(2, 0);
            year = newYear.join('');
          } else {
            newYear = year.split('');
            newYear.unshift(1, 9);
            year = newYear.join('');
          }
        }
      }
    }
  }

  for (const i of fromFormat) {
    if (i === 'YYYY') {
      for (const j of toFormat) {
        if (j === 'YY') {
          newYear = year.split('');
          newYear.shift();
          newYear.shift();
          year = newYear.join('');
        }
      }
    }
  }

  for (const i of toFormat) {
    if (i === 'YY' || i === 'YYYY') {
      resultDate.push(year);
    }

    if (i === 'MM') {
      resultDate.push(month);
    }

    if (i === 'DD') {
      resultDate.push(day);
    }
  }

  return resultDate.join(toFormat[3]);
}

module.exports = formatDate;
