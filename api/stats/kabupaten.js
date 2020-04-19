const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')

async function fetchPage() {
  const response = await fetch('https://infocorona.magelangkab.go.id/')
  return await response.text()
}

function scrapeData(doc) {
  return Array.from(doc.querySelectorAll('#collapseTwo table tbody tr')).map(kecamatan => {
    const name = kecamatan.children[0].textContent

    return {
      kecamatan: name.charAt(0) + name.slice(1).toLowerCase(),
      odp: parseInt(kecamatan.children[1].textContent),
      pdp_aktif: parseInt(kecamatan.children[2].textContent),
      pdp_sembuh: parseInt(kecamatan.children[3].textContent),
      pdp_meninggal: parseInt(kecamatan.children[4].textContent),
      positif_total: parseInt(kecamatan.children[5].textContent),
      positif_sembuh: parseInt(kecamatan.children[6].textContent),
      positif_meninggal: parseInt(kecamatan.children[7].textContent)
    }
  })
}

module.exports = async (req, res) => {
  const rawPage = await fetchPage()
  const { document } = (new JSDOM(rawPage)).window
  const data = scrapeData(document)

  res.json({
    updatedAt: Date.now(),
    source: 'https://infocorona.magelangkab.go.id/',
    data
  })
}
