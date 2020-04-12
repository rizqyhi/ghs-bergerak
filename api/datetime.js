const moment = require('moment-timezone');
moment.locale('id');

module.exports = (req, res) => {
  const now = moment().tz('Asia/Jakarta');

  res.send({
    locale: moment.locale(), // Should be 'id', but got 'en' instead
    now: now,
    localeFormatted: now.format('LLLL'),
    customFormat: now.format('dddd, D MMMM YYYY') // Should be, e.g. Minggu, 12 April 2020
  })
}
