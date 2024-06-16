#!/bin/bash

# This script creates a list of URLs of md files.
# The list is saved in a file named posts/url.json

# Create the posts directory if it does not exist
mkdir -p posts

# Create the url.json file
echo "[" > posts/url.json

# Find all md files in the posts directory
find . -name "*.md" | while read file; do
  # Get the URL of the file
  url=$(echo $file)
  # Add the URL to the url.json file
  echo "  \"$url\"," >> posts/url.json
done

# Remove the last comma
sed -i '$ s/.$//' posts/url.json

# Close the url.json file
echo "]" >> posts/url.json

