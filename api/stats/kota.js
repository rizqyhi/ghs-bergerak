const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')
const merge = require('lodash/merge')

async function fetchPage() {
  const response = await fetch('https://covid19.magelangkota.go.id/')
  return await response.text()
}

function scrapeODP(doc) {
  const $ODProws = Array.from(doc.querySelectorAll('[data-custom-id="bnrouctewtxoqsbvhejejuilwalrbwrfxyex"] .brz-row__container'))
  let odp = {}

  $ODProws.slice(2, $ODProws.length-1).forEach(row => {
    const columns = Array.from(row.querySelectorAll('.brz-columns'))
    const kelurahan = columns[0].textContent.replace(/([A-Z])/g, ' $1').replace(/\s\s+/g, ' ').trim()

    odp[kelurahan] = {
      odp: {
        ditemukan: parseInt(columns[1].textContent.trim()),
        dirawat: parseInt(columns[2].textContent.trim()),
        dipantau: parseInt(columns[3].textContent.trim()),
        sehat: parseInt(columns[4].textContent.trim()),
        meninggal: parseInt(columns[5].textContent.trim()),
      }
    }
  })

  return odp
}

function scrapePositif(doc) {
  const $positifRows = Array.from(doc.querySelectorAll('[data-custom-id="ptdyblsperwcnonfasdwxuzgqfbetvivtjdw"] .brz-row__container'))
  let positif = {}

  $positifRows.slice(2, $positifRows.length-1).forEach(row => {
    const columns = Array.from(row.querySelectorAll('.brz-columns'))
    const kelurahan = columns[0].textContent.trim()

    positif[kelurahan] = {
      positif: {
        ditemukan: parseInt(columns[1].textContent.trim()),
        dirawat: parseInt(columns[2].textContent.trim()),
        pulang: parseInt(columns[3].textContent.trim()),
        meninggal: parseInt(columns[4].textContent.trim()),
      }
    }
  })

  return positif
}

function scrapePDP(doc) {
  const $PDProws = Array.from(doc.querySelectorAll('[data-custom-id="srqkeginpcsxcevtssjcqkgjmctcwlmhzejk"] .brz-row__container'))
  let pdp = {}

  $PDProws.slice(2, $PDProws.length-1).forEach(row => {
    const columns = Array.from(row.querySelectorAll('.brz-columns'))
    const kelurahan = columns[0].textContent.replace(/([A-Z])/g, ' $1').replace(/\s\s+/g, ' ').trim()

    pdp[kelurahan] = {
      pdp: {
        ditemukan: parseInt(columns[1].textContent.trim()),
        dirawat: parseInt(columns[2].textContent.trim()),
        dirujuk: parseInt(columns[3].textContent.trim()),
        pulang: parseInt(columns[4].textContent.trim()),
        meninggal: parseInt(columns[5].textContent.trim()),
      }
    }
  })

  return pdp
}

module.exports = async (req, res) => {
  const rawPage = await fetchPage()
  const { document } = (new JSDOM(rawPage)).window

  const odp = scrapeODP(document)
  const positif = scrapePositif(document)
  const pdp = scrapePDP(document)
  const combined = merge(odp, pdp, positif)
  const stats = Object.keys(combined).map(kelurahan => ({kelurahan, ...combined[kelurahan]}))

  res.json({
    updatedAt: Date.now(),
    source: 'https://covid19.magelangkota.go.id/',
    data: stats
  })
}
