const fetch = require('node-fetch')
const ejs = require('ejs')
const posterTemplate = require('./_poster/donasi-terakhir')
const moment = require('moment-timezone');
const getScreenshot = require('../_utils/getScreenshot');

import { writeTempFile, pathToFileURL } from '../_utils/file'

async function getDonationsData() {
  const response = await fetch(process.env.DONATION_DATA_URL)
  const data = await response.json()

  return data.feed.entry.map(entry => entry.content.$t)
}

const dates = {
  11: "Sabtu, 11 April 2020",
  12: "Minggu, 12 April 2020",
  13: "Senin, 13 April 2020",
  14: "Selasa, 14 April 2020",
  15: "Rabu, 15 April 2020",
  16: "Kamis, 16 April 2020",
  17: "Jumat, 17 April 2020",
}

const isDev = process.env.NOW_REGION === "dev1";
const targetDonasi = 200000000;

module.exports = async (req, res) => {
  try {
    const donations = await getDonationsData()
    const latestDonationAmountFormatted = await donations[donations.length - 1].slice(2, -3).replace(/,/g, '.')
    const latestDonationAmount = parseInt(latestDonationAmountFormatted.replace(/\./g, ''))

    moment.locale('id')
    const now = moment().tz('Asia/Jakarta')

    const posterCanvas = ejs.render(posterTemplate, {
      tanggal: dates[now.date()],
      jam: now.format('H:mm'),
      donasi: `Rp ${latestDonationAmountFormatted},-`,
      sisaHari: moment('2020-04-18').tz('Asia/Jakarta').diff(now, 'days'),
      barWidth: (latestDonationAmount / targetDonasi) * 100
    })

    const filePath = await writeTempFile('donasiterakhir', posterCanvas);
    const fileUrl = pathToFileURL(filePath);

    if (isDev) {
      res.send(posterCanvas)
      return;
    }

    const file = await getScreenshot(fileUrl, 'png');
    res.statusCode = 200;
    res.setHeader('Content-Type', `image/png`);
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
}
