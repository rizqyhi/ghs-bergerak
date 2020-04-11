const baseSvg = require('./base-donasi-svg')

const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donasi Terakhir</title>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap" rel="stylesheet">
    <style>
      * {margin: 0; padding: 0;}
      .wrapper {
        position: relative;
        height: 2560px;
        width: 1440px;
      }
      .tanggal, .waktu, .donasi, .sisaHari {
        position: absolute;
      }
      .tanggal {
        top: 730px;
        width: 100%;
        text-align: center;
      }
      .tanggal span {
        background: #eb252f;
        font-family: Ubuntu;
        font-weight: bold;
        padding: 5px 20px;
        font-size: 45px;
        color: #fff;
      }
      .waktu {
        top: 800px;
        width: 100%;
        text-align: center;
        font-family: Ubuntu;
        font-weight: bold;
        font-size: 37px;
        color: #fff;
      }
      .donasi {
        top: 1100px;
        width: 100%;
        text-align: center;
        font-family: Ubuntu;
        font-weight: bold;
        font-size: 147px;
        color: #fff;
      }
      .sisaHari {
        top: 1370px;
        right: 200px;
        width: 100%;
        text-align: right;
        font-family: Ubuntu;
        font-weight: bold;
        font-size: 42px;
        color: #f1f1f2;
      }
      .barWrapper {
        content: '';
        position: absolute;
        height: 32px;
        width: 1040px;
        top: 1300px;
        left: 170px;
        padding: 0 15px;
      }
      .bar {
        content: '';
        height: 32px;
        width: 200px;
        border-radius: 10px;
        background: #faa321;
      }
      #tanggal, #path219, #waktu, #donasi, #text347 {
        display: none;
      }
    </style>
</head>
<body>
  <div class="wrapper">
    <div class="tanggal"><span><%= tanggal %></span></div>
    <div class="waktu">(pukul <%= jam %> WIB)</div>
    <div class="donasi"><%= donasi %></div>
    <div class="sisaHari"><%= sisaHari %> hari lagi</div>
    <div class="barWrapper"><div class="bar" style="width: <%= barWidth %>%"></div></div>
    ${baseSvg}
  </div>
</body>
</html>
`

module.exports = template
