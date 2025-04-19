#!/bin/bash

# This script helps deploy a Vite React application to Netlify

# Step 1: Build the application
echo "Building the application..."
npm run build

# Step 2: Create a netlify.toml file in the dist directory
echo "Creating netlify.toml in the dist directory..."
cat > dist/netlify.toml << EOL
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = true
EOL

# Step 3: Copy the _redirects file to the dist directory
echo "Copying _redirects file to the dist directory..."
cp public/_redirects dist/

# Step 4: Create a package.json file in the dist directory
echo "Creating package.json in the dist directory..."
cat > dist/package.json << EOL
{
  "name": "financialmd",
  "version": "1.0.0",
  "description": "Financial MD Deployment",
  "main": "index.html",
  "scripts": {
    "start": "serve -s ."
  },
  "dependencies": {
    "serve": "^14.0.0"
  }
}
EOL

echo "Deployment preparation complete!"
echo "You can now deploy the 'dist' directory to Netlify."
