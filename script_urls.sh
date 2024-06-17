#!/bin/bash

# This script creates a list of URLs of md files.
# The list is saved in a file named posts/urls.json

# Create the posts directory if it does not exist
mkdir -p posts

# Create the urls.json file
echo "[" > posts/urls.json

# Find all md files in the posts directory
find . -name "*.md" | while read file; do
  # Get the URL of the file
  url=$(echo $file)

  # ignore node_modules
  if [[ $url == *"node_modules"* ]]; then
    continue
  fi

  # Add the URL to the urls.json file
  echo "  \"$url\"," >> posts/urls.json
done
echo "  \"\"" >> posts/urls.json
# Close the urls.json file
echo "]" >> posts/urls.json

