// This is a custom Netlify build plugin to ensure the _redirects file is correctly copied to the build output
module.exports = {
  onPostBuild: async ({ utils }) => {
    const fs = require('fs');
    const path = require('path');
    
    // Ensure the _redirects file exists in the publish directory
    const redirectsSource = path.join(__dirname, 'public', '_redirects');
    const redirectsDestination = path.join(__dirname, 'dist', '_redirects');
    
    if (fs.existsSync(redirectsSource)) {
      // Copy the _redirects file to the build output
      fs.copyFileSync(redirectsSource, redirectsDestination);
      console.log('Successfully copied _redirects file to build output');
    } else {
      // Create a _redirects file in the build output
      fs.writeFileSync(redirectsDestination, '/* /index.html 200');
      console.log('Created _redirects file in build output');
    }
    
    // Also create a basic index.html in the root if it doesn't exist
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    if (!fs.existsSync(indexPath)) {
      console.log('Warning: index.html not found in build output. Creating a basic one.');
      const basicHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Primary Care Financial Masterclass</title>
    <meta http-equiv="refresh" content="0;url=/" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/index.js"></script>
  </body>
</html>
      `;
      fs.writeFileSync(indexPath, basicHtml);
    }
  }
};
