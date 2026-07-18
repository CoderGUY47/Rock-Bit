const fs = require('fs');
const path = require('path');
const https = require('https');

const iconsDir = path.join(__dirname, 'public', 'assets', 'coins');

// Create directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const coins = ['btc', 'eth', 'usdt', 'bnb', 'sol', 'xrp', 'ada', 'avax', 'uni', 'aave', 'arb', 'op', 'link', 'dot', 'doge', 'shib', 'matic', 'ltc', 'near', 'atom'];

function downloadIcon(coin) {
  const url = `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/${coin}.svg`;
  const dest = path.join(iconsDir, `${coin}.svg`);
  const file = fs.createWriteStream(dest);

  https.get(url, (response) => {
    if (response.statusCode === 200) {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Successfully downloaded ${coin}.svg`);
      });
    } else {
      file.close();
      fs.unlink(dest, () => {}); // Delete empty file
      console.error(`Failed to download ${coin}.svg: Status Code ${response.statusCode}`);
    }
  }).on('error', (err) => {
    fs.unlink(dest, () => {});
    console.error(`Error downloading ${coin}.svg: ${err.message}`);
  });
}

coins.forEach(downloadIcon);
