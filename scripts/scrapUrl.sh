#!/bin/bash

# This script creates a list of URLs of md files.
# The list is saved in a file named ./urls.json

# Create the urls.json file
echo "[" > ./urls.json

# Find all md files in the posts directory
find .. -name "*.md" | while read file; do
  # Get the URL of the file
  url=$(echo $file)

  # ignore node_modules
  if [[ $url == *"node_modules"* ]]; then
    continue
  fi

  # remove first path
  url=$(echo $url | cut -d'/' -f2-)

  # Add the URL to the urls.json file
  echo "  \"$url\"," >> ./urls.json
done
echo "  \"\"" >> ./urls.json
# Close the urls.json file
echo "]" >> ./urls.json

