#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")"

# Install dependencies
npm install

# Build the project
npm run build

# Copy the _redirects file to the dist directory
cp public/_redirects dist/

# Copy the static.html file to the dist directory as 404.html
cp public/static.html dist/404.html

# Create a simple index.html file in the dist directory if it doesn't exist
if [ ! -f dist/index.html ]; then
  echo "Creating a simple index.html file in the dist directory"
  cat > dist/index.html << EOL
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Primary Care Financial Masterclass</title>
  <meta http-equiv="refresh" content="0;url=/index.html" />
</head>
<body>
  <h1>Primary Care Financial Masterclass</h1>
  <p>If you are not redirected automatically, please <a href="/index.html">click here</a> to go to the homepage.</p>
</body>
</html>
EOL
fi

echo "Build completed successfully!"
